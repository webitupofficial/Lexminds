import crypto from 'crypto';
import { appendToSheet, findRowById, updateRowById, upsertRowById } from './google-sheets';
import { InternshipApplication, ArticleSubmission, PaymentRecord } from './types';

// ==============================================================================
// Authoritative Server-Side Product Catalog & Pricing (in Paise)
// ==============================================================================
export const PRODUCT_CATALOG: Record<
  string,
  { name: string; amountPaise: number; currency: string }
> = {
  internship_enrollment: {
    name: 'Legal Research & Editorial Fellowship Enrollment',
    amountPaise: 29900, // ₹299.00
    currency: 'INR',
  },
  article_submission: {
    name: 'Article Submission & Double-Blind Peer Review',
    amountPaise: 49900, // ₹499.00
    currency: 'INR',
  },
};

/**
 * Validates whether Razorpay secrets are configured and not demo placeholders.
 */
export function validateRazorpayCredentials(): { keyId: string; keySecret: string } {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret || keySecret.includes('DemoSecret') || keySecret.includes('YourRazorpay')) {
    if (process.env.APP_ENV === 'test') {
      return { keyId: 'rzp_test_mock_id', keySecret: 'mock_test_secret_32chars_length_ok' };
    }
    throw new Error('Razorpay server credentials are not configured or contain demo values. Failing closed.');
  }

  return { keyId, keySecret };
}

/**
 * Generates an HMAC-SHA256 signature for Razorpay verification.
 */
export function generateRazorpayHmac(data: string, secret: string): string {
  return crypto.createHmac('sha256', secret).update(data).digest('hex');
}

/**
 * Verifies Razorpay client signature: HMAC_SHA256(order_id + "|" + payment_id, secret).
 */
export function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  if (!orderId || !paymentId || !signature) return false;

  const { keySecret } = validateRazorpayCredentials();
  const payload = `${orderId}|${paymentId}`;
  const expected = generateRazorpayHmac(payload, keySecret);

  try {
    return crypto.timingSafeEqual(Buffer.from(signature, 'utf8'), Buffer.from(expected, 'utf8'));
  } catch {
    return false;
  }
}

/**
 * Creates an authoritative Razorpay order and writes a pending record to Google Sheets.
 */
export async function createAuthoritativeOrder(params: {
  productKey: string;
  firebaseUid: string;
  verifiedEmail: string;
  metadata?: Record<string, any>;
}): Promise<{
  orderId: string;
  amountPaise: number;
  currency: string;
  keyId: string;
  paymentRecordId: string;
  internalReference: string;
}> {
  const product = PRODUCT_CATALOG[params.productKey];
  if (!product) {
    throw new Error(`Invalid product key: "${params.productKey}". Order creation rejected.`);
  }

  const { keyId, keySecret } = validateRazorpayCredentials();

  const timestamp = new Date().toISOString();
  const paymentRecordId = `PAY-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  const internalReference =
    params.productKey === 'internship_enrollment'
      ? `APP-${Date.now().toString(36).toUpperCase()}`
      : `SUB-${Date.now().toString(36).toUpperCase()}`;

  const receipt = `rcpt_${paymentRecordId.toLowerCase()}`;

  let orderId = '';

  if (process.env.APP_ENV === 'test') {
    orderId = `order_test_${Date.now()}`;
  } else {
    const authHeader = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
    const res = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${authHeader}`,
      },
      body: JSON.stringify({
        amount: product.amountPaise,
        currency: product.currency,
        receipt,
        notes: {
          productKey: params.productKey,
          internalReference,
          firebaseUid: params.firebaseUid,
          verifiedEmail: params.verifiedEmail,
        },
      }),
    });

    const data = await res.json();
    if (!res.ok || !data.id) {
      console.error('[Razorpay Order API Error]:', data);
      throw new Error(data.error?.description || 'Failed to create order with payment gateway.');
    }
    orderId = data.id;
  }

  // Row mapping for Payments tab:
  // [Payment Record ID, Product Key, Internal Reference, Firebase UID, Verified Email,
  //  Razorpay Order ID, Razorpay Payment ID, Amount (Paise), Currency, Status,
  //  Linked Entity ID, Receipt, Created At, Verified At, Webhook At, Refund Status, Raw Payload Hash]
  const paymentRow = [
    paymentRecordId,
    params.productKey,
    internalReference,
    params.firebaseUid,
    params.verifiedEmail,
    orderId,
    '', // payment ID empty until verified
    product.amountPaise,
    product.currency,
    'created',
    internalReference,
    receipt,
    timestamp,
    '', // verifiedAt
    '', // webhookAt
    'none',
    '',
  ];

  await appendToSheet('Payments', paymentRow);

  return {
    orderId,
    amountPaise: product.amountPaise,
    currency: product.currency,
    keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || keyId,
    paymentRecordId,
    internalReference,
  };
}

/**
 * Reconciles and completes a payment verification idempotently.
 */
export async function reconcilePaymentAndFulfill(params: {
  orderId: string;
  paymentId: string;
  signature: string;
  productKey: string;
  firebaseUid: string;
  verifiedEmail: string;
  payload: Record<string, any>;
}): Promise<{
  verified: boolean;
  paymentRecordId: string;
  referenceId: string;
  alreadyProcessed?: boolean;
}> {
  // 1. Verify HMAC Signature
  const isValidSignature = verifyRazorpaySignature(params.orderId, params.paymentId, params.signature);
  if (!isValidSignature) {
    throw new Error('Payment signature verification failed. Cryptographic mismatch.');
  }

  // 2. Find pending payment record by Order ID (col index 5)
  const existingRecord = await findRowById('Payments', 5, params.orderId);
  if (!existingRecord) {
    throw new Error(`No payment order found matching order ID: ${params.orderId}`);
  }

  const [
    paymentRecordId,
    recordedProductKey,
    internalReference,
    recordedUid,
    recordedEmail,
    orderId,
    recordedPaymentId,
    amountPaiseStr,
    currency,
    currentStatus,
  ] = existingRecord.row;

  // 3. Confirm verified product & amount match server record
  const product = PRODUCT_CATALOG[params.productKey];
  if (!product || recordedProductKey !== params.productKey) {
    throw new Error('Product mismatch detected between order creation and payment confirmation.');
  }

  if (Number(amountPaiseStr) !== product.amountPaise) {
    throw new Error('Payment amount tampering detected. Transaction rejected.');
  }

  // 4. Idempotency Check: if already verified, return immediately without duplicate writes
  if (currentStatus === 'verified' && recordedPaymentId === params.paymentId) {
    return {
      verified: true,
      paymentRecordId,
      referenceId: internalReference,
      alreadyProcessed: true,
    };
  }

  const now = new Date().toISOString();

  // 5. Update Payments row to verified
  const updatedPaymentRow = [...existingRecord.row];
  updatedPaymentRow[6] = params.paymentId; // Razorpay Payment ID
  updatedPaymentRow[9] = 'verified'; // Status
  updatedPaymentRow[13] = now; // Verified At

  await updateRowById('Payments', 5, params.orderId, updatedPaymentRow);

  // 6. Write to destination tab (Applications or ArticleSubmissions) idempotently
  if (params.productKey === 'internship_enrollment') {
    // Applications Tab Mapping:
    // [Application ID, Firebase UID, Verified Email, Applicant Name, Phone, Institution,
    //  Year of Study, Academic Score, Internship Key, Status, Payment Record ID, Admin Notes, Created At, Updated At]
    const appRow = [
      internalReference,
      params.firebaseUid,
      params.verifiedEmail,
      params.payload.applicantName || params.payload.fullName || 'Scholar Applicant',
      params.payload.phone || '',
      params.payload.institution || params.payload.collegeName || '',
      params.payload.yearOfStudy || '',
      params.payload.academicScore || params.payload.cgpa || '',
      params.payload.internshipKey || params.payload.internshipId || 'legal-research-fellowship',
      'paid', // Status: paid
      paymentRecordId,
      params.payload.sop || '',
      now,
      now,
    ];

    await upsertRowById('Applications', 0, internalReference, appRow);
  } else if (params.productKey === 'article_submission') {
    // ArticleSubmissions Tab Mapping:
    // [Submission ID, Firebase UID, Verified Email, Author Name, Designation, Institution,
    //  Author Bio, Signature Line, Title, Category, Keywords, Abstract, Content / Doc URL,
    //  Originality Declaration, Consent to Publish, Payment Record ID, Status, Reviewer Notes,
    //  Plagiarism Notes, AI Review Notes, Publication URL, Created At, Reviewed At, Published At, Reviewer Email]
    const keywordsStr = Array.isArray(params.payload.keywords)
      ? params.payload.keywords.join(', ')
      : String(params.payload.keywords || '');

    const subRow = [
      internalReference,
      params.firebaseUid,
      params.verifiedEmail,
      params.payload.authorName || '',
      params.payload.designation || '',
      params.payload.institution || '',
      params.payload.authorBio || '',
      params.payload.signatureLine || '',
      params.payload.title || '',
      params.payload.category || '',
      keywordsStr,
      params.payload.abstract || '',
      params.payload.content || params.payload.manuscriptUrl || '',
      params.payload.originalityDeclaration ? 'true' : 'false',
      params.payload.consentToPublish ? 'true' : 'false',
      paymentRecordId,
      'paid_submitted', // Status: paid_submitted
      '', // Reviewer notes
      '', // Plagiarism notes
      '', // AI review notes
      '', // Publication URL
      now,
      '', // Reviewed At
      '', // Published At
      '', // Reviewer Email
    ];

    await upsertRowById('ArticleSubmissions', 0, internalReference, subRow);
  }

  return {
    verified: true,
    paymentRecordId,
    referenceId: internalReference,
    alreadyProcessed: false,
  };
}

/**
 * Verifies and processes Razorpay Webhook events.
 */
export async function processRazorpayWebhook(
  rawBody: string,
  signatureHeader: string | null
): Promise<{ success: boolean; event: string; message: string }> {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

  if (!webhookSecret) {
    if (process.env.APP_ENV === 'test') {
      // Allow test execution
    } else {
      throw new Error('RAZORPAY_WEBHOOK_SECRET is not configured. Webhook rejected.');
    }
  }

  if (!signatureHeader && process.env.APP_ENV !== 'test') {
    throw new Error('Missing x-razorpay-signature header.');
  }

  if (webhookSecret && signatureHeader) {
    const expectedSig = crypto.createHmac('sha256', webhookSecret).update(rawBody).digest('hex');
    const isValid = crypto.timingSafeEqual(
      Buffer.from(signatureHeader, 'utf8'),
      Buffer.from(expectedSig, 'utf8')
    );
    if (!isValid) {
      throw new Error('Invalid Razorpay webhook signature.');
    }
  }

  const payload = JSON.parse(rawBody);
  const event = payload.event;
  const paymentEntity = payload.payload?.payment?.entity;
  const orderId = paymentEntity?.order_id;
  const paymentId = paymentEntity?.id;
  const now = new Date().toISOString();

  if (!orderId) {
    return { success: true, event, message: 'No order ID in webhook payload. Skipped.' };
  }

  const record = await findRowById('Payments', 5, orderId);
  if (!record) {
    console.warn(`[Webhook]: Payment record not found for order ${orderId}`);
    return { success: true, event, message: 'Payment record not found for order.' };
  }

  const [
    paymentRecordId,
    productKey,
    internalReference,
    firebaseUid,
    verifiedEmail,
    ,
    ,
    amountPaiseStr,
    currency,
    currentStatus,
  ] = record.row;

  if (event === 'payment.captured') {
    // If not already verified, reconcile asynchronously
    if (currentStatus !== 'verified') {
      const updatedRow = [...record.row];
      updatedRow[6] = paymentId || updatedRow[6];
      updatedRow[9] = 'verified';
      updatedRow[13] = updatedRow[13] || now;
      updatedRow[14] = now; // webhookAt

      await updateRowById('Payments', 5, orderId, updatedRow);

      // Reconcile linked application or submission
      if (productKey === 'internship_enrollment') {
        const appRecord = await findRowById('Applications', 0, internalReference);
        if (appRecord) {
          const appRow = [...appRecord.row];
          appRow[9] = 'paid';
          appRow[13] = now;
          await updateRowById('Applications', 0, internalReference, appRow);
        }
      } else if (productKey === 'article_submission') {
        const subRecord = await findRowById('ArticleSubmissions', 0, internalReference);
        if (subRecord) {
          const subRow = [...subRecord.row];
          subRow[16] = 'paid_submitted';
          await updateRowById('ArticleSubmissions', 0, internalReference, subRow);
        }
      }
    }
  } else if (event === 'payment.failed') {
    const updatedRow = [...record.row];
    updatedRow[9] = 'failed';
    updatedRow[14] = now;
    await updateRowById('Payments', 5, orderId, updatedRow);
  } else if (event === 'refund.processed' || event === 'refund.created') {
    const updatedRow = [...record.row];
    updatedRow[9] = 'refunded';
    updatedRow[14] = now;
    updatedRow[15] = 'full';
    await updateRowById('Payments', 5, orderId, updatedRow);

    // Update linked entity to refunded
    if (productKey === 'internship_enrollment') {
      const appRecord = await findRowById('Applications', 0, internalReference);
      if (appRecord) {
        const appRow = [...appRecord.row];
        appRow[9] = 'cancelled';
        appRow[13] = now;
        await updateRowById('Applications', 0, internalReference, appRow);
      }
    } else if (productKey === 'article_submission') {
      const subRecord = await findRowById('ArticleSubmissions', 0, internalReference);
      if (subRecord) {
        const subRow = [...subRecord.row];
        subRow[16] = 'refunded';
        await updateRowById('ArticleSubmissions', 0, internalReference, subRow);
      }
    }
  }

  return { success: true, event, message: `Webhook processed successfully for ${event}.` };
}
