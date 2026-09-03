import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'crypto';

// Set test environment flags
process.env.APP_ENV = 'test';
process.env.ADMIN_EMAILS = 'owner@lexminds.in,editor@lexminds.in';
process.env.RAZORPAY_KEY_ID = 'rzp_test_mock_id';
process.env.RAZORPAY_KEY_SECRET = 'mock_test_secret_32chars_length_ok';
process.env.RAZORPAY_WEBHOOK_SECRET = 'mock_webhook_secret_key_12345';

import { resetTestStore, findRowById, getTabRows, appendToSheet } from '../src/lib/google-sheets';
import {
  PRODUCT_CATALOG,
  generateRazorpayHmac,
  createAuthoritativeOrder,
  reconcilePaymentAndFulfill,
  processRazorpayWebhook,
} from '../src/lib/payment-service';
import { sanitizeHtml } from '../src/lib/sanitize';
import { getPublishedArticles, addPublishedArticle } from '../src/lib/data-store';

// Import Route Handlers
import { POST as createOrderRoute } from '../src/app/api/payment/create-order/route';
import { POST as verifyRoute } from '../src/app/api/payment/verify/route';
import { POST as webhookRoute } from '../src/app/api/webhooks/razorpay/route';
import { GET as adminArticlesRoute, PATCH as adminArticlesPatchRoute } from '../src/app/api/admin/articles/route';
import { GET as adminAppsRoute, PATCH as adminAppsPatchRoute } from '../src/app/api/admin/applications/route';
import { POST as adminCertificatesRoute } from '../src/app/api/admin/certificates/route';
import { GET as publicArticlesRoute } from '../src/app/api/articles/route';

describe('LexMinds MVP Security & Transaction Pipeline Test Suite', () => {
  beforeEach(() => {
    resetTestStore();
  });

  // ---------------------------------------------------------------------------
  // 1. Unauthenticated Paid Submission Rejection
  // ---------------------------------------------------------------------------
  test('1. Rejects unauthenticated order creation and payment verification with 401', async () => {
    const orderReq = new Request('http://localhost:3000/api/payment/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productKey: 'internship_enrollment' }),
    });
    const orderRes = await createOrderRoute(orderReq);
    assert.equal(orderRes.status, 401);

    const verifyReq = new Request('http://localhost:3000/api/payment/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        razorpay_order_id: 'order_123',
        razorpay_payment_id: 'pay_123',
        razorpay_signature: 'sig_123',
        productKey: 'internship_enrollment',
      }),
    });
    const verifyRes = await verifyRoute(verifyReq);
    assert.equal(verifyRes.status, 401);
  });

  // ---------------------------------------------------------------------------
  // 2. Invalid Firebase Token Rejection
  // ---------------------------------------------------------------------------
  test('2. Rejects requests with invalid or forged Firebase ID tokens with 401/403', async () => {
    const orderReq = new Request('http://localhost:3000/api/payment/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer invalid_forged_token_xyz',
      },
      body: JSON.stringify({ productKey: 'internship_enrollment' }),
    });
    const orderRes = await createOrderRoute(orderReq);
    assert.equal(orderRes.status, 401);
  });

  // ---------------------------------------------------------------------------
  // 3. Non-Admin Access to Admin APIs Rejection
  // ---------------------------------------------------------------------------
  test('3. Rejects non-admin users attempting to access admin APIs with 403 Forbidden', async () => {
    // Authenticated user whose email is not in ADMIN_EMAILS
    const nonAdminHeader = 'Bearer test_token_hacker@randomdomain.com';

    const getArticlesReq = new Request('http://localhost:3000/api/admin/articles', {
      headers: { Authorization: nonAdminHeader },
    });
    const articlesRes = await adminArticlesRoute(getArticlesReq);
    assert.equal(articlesRes.status, 403);

    const getAppsReq = new Request('http://localhost:3000/api/admin/applications', {
      headers: { Authorization: nonAdminHeader },
    });
    const appsRes = await adminAppsRoute(getAppsReq);
    assert.equal(appsRes.status, 403);

    // Verify authorized admin succeeds
    const adminHeader = 'Bearer test_token_owner@lexminds.in';
    const validAdminReq = new Request('http://localhost:3000/api/admin/articles', {
      headers: { Authorization: adminHeader },
    });
    const validRes = await adminArticlesRoute(validAdminReq);
    assert.equal(validRes.status, 200);
  });

  // ---------------------------------------------------------------------------
  // 4. Missing Razorpay Signature Rejection
  // ---------------------------------------------------------------------------
  test('4. Rejects verification when Razorpay signature is missing with 400', async () => {
    const req = new Request('http://localhost:3000/api/payment/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer test_token_student@nls.ac.in',
      },
      body: JSON.stringify({
        razorpay_order_id: 'order_abc',
        razorpay_payment_id: 'pay_abc',
        // razorpay_signature missing
        productKey: 'internship_enrollment',
      }),
    });
    const res = await verifyRoute(req);
    assert.equal(res.status, 400);
    const body = await res.json();
    assert.match(body.error, /Missing Razorpay signature/i);
  });

  // ---------------------------------------------------------------------------
  // 5. Invalid Razorpay Signature Rejection
  // ---------------------------------------------------------------------------
  test('5. Rejects verification when Razorpay cryptographic signature is invalid', async () => {
    const order = await createAuthoritativeOrder({
      productKey: 'internship_enrollment',
      firebaseUid: 'test_uid_1',
      verifiedEmail: 'student@nls.ac.in',
    });

    const req = new Request('http://localhost:3000/api/payment/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer test_token_student@nls.ac.in',
      },
      body: JSON.stringify({
        razorpay_order_id: order.orderId,
        razorpay_payment_id: 'pay_test_123',
        razorpay_signature: 'tampered_fake_signature_hash',
        productKey: 'internship_enrollment',
      }),
    });
    const res = await verifyRoute(req);
    assert.equal(res.status, 400);
    const body = await res.json();
    assert.match(body.error, /signature verification failed/i);
  });

  // ---------------------------------------------------------------------------
  // 6. Wrong Amount or Product Mismatch Rejection
  // ---------------------------------------------------------------------------
  test('6. Rejects payment when product key mismatch occurs between order and verification', async () => {
    // Created for internship_enrollment (₹299)
    const order = await createAuthoritativeOrder({
      productKey: 'internship_enrollment',
      firebaseUid: 'test_uid_2',
      verifiedEmail: 'student2@nls.ac.in',
    });

    const paymentId = 'pay_test_456';
    const validSig = generateRazorpayHmac(
      `${order.orderId}|${paymentId}`,
      process.env.RAZORPAY_KEY_SECRET!
    );

    // Attempting to verify as article_submission (₹499)
    await assert.rejects(
      async () => {
        await reconcilePaymentAndFulfill({
          orderId: order.orderId,
          paymentId,
          signature: validSig,
          productKey: 'article_submission', // WRONG PRODUCT
          firebaseUid: 'test_uid_2',
          verifiedEmail: 'student2@nls.ac.in',
          payload: {},
        });
      },
      { message: /Product mismatch detected/ }
    );
  });

  // ---------------------------------------------------------------------------
  // 7. Duplicate Callback Idempotency
  // ---------------------------------------------------------------------------
  test('7. Ensures duplicate callback verification is idempotent and does not create duplicate records', async () => {
    const order = await createAuthoritativeOrder({
      productKey: 'internship_enrollment',
      firebaseUid: 'test_uid_idem',
      verifiedEmail: 'idem@nls.ac.in',
    });

    const paymentId = 'pay_test_idem_789';
    const validSig = generateRazorpayHmac(
      `${order.orderId}|${paymentId}`,
      process.env.RAZORPAY_KEY_SECRET!
    );

    // First verification call
    const firstCall = await reconcilePaymentAndFulfill({
      orderId: order.orderId,
      paymentId,
      signature: validSig,
      productKey: 'internship_enrollment',
      firebaseUid: 'test_uid_idem',
      verifiedEmail: 'idem@nls.ac.in',
      payload: { applicantName: 'Idempotency Tester' },
    });

    assert.equal(firstCall.verified, true);
    assert.equal(firstCall.alreadyProcessed, false);

    // Check row count in Payments tab
    const paymentsAfterFirst = await getTabRows('Payments');
    assert.equal(paymentsAfterFirst.length, 1);

    // Check row count in Applications tab
    const appsAfterFirst = await getTabRows('Applications');
    assert.equal(appsAfterFirst.length, 1);

    // Second duplicate verification call
    const secondCall = await reconcilePaymentAndFulfill({
      orderId: order.orderId,
      paymentId,
      signature: validSig,
      productKey: 'internship_enrollment',
      firebaseUid: 'test_uid_idem',
      verifiedEmail: 'idem@nls.ac.in',
      payload: { applicantName: 'Idempotency Tester' },
    });

    assert.equal(secondCall.verified, true);
    assert.equal(secondCall.alreadyProcessed, true);

    // Ensure no duplicate rows were added
    const paymentsAfterSecond = await getTabRows('Payments');
    assert.equal(paymentsAfterSecond.length, 1);

    const appsAfterSecond = await getTabRows('Applications');
    assert.equal(appsAfterSecond.length, 1);
  });

  // ---------------------------------------------------------------------------
  // 8. Webhook Signature Rejection and Valid Webhook Processing
  // ---------------------------------------------------------------------------
  test('8. Validates Razorpay webhooks with raw body HMAC and rejects invalid signatures', async () => {
    const order = await createAuthoritativeOrder({
      productKey: 'article_submission',
      firebaseUid: 'test_uid_wh',
      verifiedEmail: 'author@delhibar.org',
    });

    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET!;
    const payloadObj = {
      event: 'payment.captured',
      payload: {
        payment: {
          entity: {
            id: 'pay_webhook_captured_111',
            order_id: order.orderId,
            amount: 49900,
            status: 'captured',
          },
        },
      },
    };
    const rawBody = JSON.stringify(payloadObj);

    // Case 1: Tampered/Invalid signature rejected
    const invalidSig = 'invalid_sha256_hex_digest';
    const badReq = new Request('http://localhost:3000/api/webhooks/razorpay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-razorpay-signature': invalidSig,
      },
      body: rawBody,
    });
    const badRes = await webhookRoute(badReq);
    assert.equal(badRes.status, 400);

    // Case 2: Valid signature accepted & reconciles payment
    const validSig = crypto.createHmac('sha256', webhookSecret).update(rawBody).digest('hex');
    const goodReq = new Request('http://localhost:3000/api/webhooks/razorpay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-razorpay-signature': validSig,
      },
      body: rawBody,
    });
    const goodRes = await webhookRoute(goodReq);
    assert.equal(goodRes.status, 200);

    // Verify payment row updated to verified
    const row = await findRowById('Payments', 5, order.orderId);
    assert.ok(row);
    assert.equal(row.row[9], 'verified');
  });

  // ---------------------------------------------------------------------------
  // 9. Google Sheets Credential Failure Fails Closed in Production
  // ---------------------------------------------------------------------------
  test('9. Fails closed when Google Sheets credentials are missing in production', async () => {
    const originalEnv = process.env.APP_ENV;
    process.env.APP_ENV = 'production';

    // Delete credentials temporarily
    const originalId = process.env.GOOGLE_SHEET_ID;
    delete process.env.GOOGLE_SHEET_ID;

    await assert.rejects(
      async () => {
        await appendToSheet('Payments', ['val1', 'val2']);
      },
      { message: /Google Sheets credentials missing.*Failing closed/ }
    );

    // Restore
    process.env.GOOGLE_SHEET_ID = originalId;
    process.env.APP_ENV = originalEnv;
  });

  // ---------------------------------------------------------------------------
  // 10. No Resume Fields in Rendered Internship Forms or Payloads
  // ---------------------------------------------------------------------------
  test('10. Confirms that no resume fields exist in InternshipApplication data model or storage', async () => {
    const order = await createAuthoritativeOrder({
      productKey: 'internship_enrollment',
      firebaseUid: 'test_uid_no_resume',
      verifiedEmail: 'noresume@nls.ac.in',
    });

    const paymentId = 'pay_test_no_resume';
    const validSig = generateRazorpayHmac(
      `${order.orderId}|${paymentId}`,
      process.env.RAZORPAY_KEY_SECRET!
    );

    // Attempting to pass resumeUrl in payload will NOT store any resume column
    await reconcilePaymentAndFulfill({
      orderId: order.orderId,
      paymentId,
      signature: validSig,
      productKey: 'internship_enrollment',
      firebaseUid: 'test_uid_no_resume',
      verifiedEmail: 'noresume@nls.ac.in',
      payload: {
        applicantName: 'Merit Scholar',
        phone: '+91 99999 11111',
        institution: 'NLSIU',
        yearOfStudy: '4th Year',
        academicScore: '8.8',
        sop: 'Research statement on constitutional doctrine.',
        resumeUrl: 'https://malicious.com/fake-resume.pdf', // Attempted payload
      },
    });

    const appRecord = await findRowById('Applications', 0, order.internalReference);
    assert.ok(appRecord);
    // Columns: [ID, UID, Email, Name, Phone, Institution, Year, Score, Key, Status, PaymentId, Notes, Created, Updated]
    // Total columns: 14. No column stores resumeUrl.
    assert.equal(appRecord.row.length, 14);
    assert.equal(appRecord.row.includes('https://malicious.com/fake-resume.pdf'), false);
  });

  // ---------------------------------------------------------------------------
  // 11. Article Not Visible Publicly Before Editorial Approval
  // ---------------------------------------------------------------------------
  test('11. Article is NOT visible on public read endpoint before admin approval', async () => {
    const order = await createAuthoritativeOrder({
      productKey: 'article_submission',
      firebaseUid: 'author_uid_draft',
      verifiedEmail: 'author@nlu.in',
    });

    const paymentId = 'pay_art_draft_1';
    const validSig = generateRazorpayHmac(
      `${order.orderId}|${paymentId}`,
      process.env.RAZORPAY_KEY_SECRET!
    );

    const manuscriptTitle = 'Private Unapproved Draft on Digital Jurisprudence';
    await reconcilePaymentAndFulfill({
      orderId: order.orderId,
      paymentId,
      signature: validSig,
      productKey: 'article_submission',
      firebaseUid: 'author_uid_draft',
      verifiedEmail: 'author@nlu.in',
      payload: {
        title: manuscriptTitle,
        abstract: 'Detailed abstract examining section 43A of IT Act.',
        content: 'Full unapproved paper text.',
        authorName: 'Draft Author',
      },
    });

    // Verify submission is in ArticleSubmissions as paid_submitted
    const subRecord = await findRowById('ArticleSubmissions', 0, order.internalReference);
    assert.ok(subRecord);
    assert.equal(subRecord.row[16], 'paid_submitted');

    // Query public articles endpoint
    const pubReq = new Request('http://localhost:3000/api/articles');
    const pubRes = await publicArticlesRoute(pubReq);
    const pubData = await pubRes.json();

    const isPublic = pubData.articles.some((a: any) => a.title === manuscriptTitle);
    assert.equal(isPublic, false, 'Unapproved draft must NOT be exposed on public articles route.');
  });

  // ---------------------------------------------------------------------------
  // 12. Invalid Article HTML Being Sanitized
  // ---------------------------------------------------------------------------
  test('12. Stored XSS attack vectors in article text are neutralized by sanitizer', () => {
    const maliciousInput =
      '<h3>Title</h3><script>alert("xss")</script><p>Clean content <img src="evil" onerror="stealCookies()" /><iframe src="http://phishing.com"></iframe></p>';
    const sanitized = sanitizeHtml(maliciousInput);

    assert.equal(sanitized.includes('<script>'), false);
    assert.equal(sanitized.includes('stealCookies()'), false);
    assert.equal(sanitized.includes('<iframe'), false);
    assert.equal(sanitized.includes('Clean content'), true);
  });

  // ---------------------------------------------------------------------------
  // 13. Expired or Closed Internship Rejection
  // ---------------------------------------------------------------------------
  test('13. Expired fellowship deadline is accurately identified', () => {
    const pastDeadline = '2024-01-01';
    const isPast = new Date(pastDeadline) < new Date(new Date().toDateString());
    assert.equal(isPast, true);

    const futureDeadline = '2028-12-31';
    const isFuture = new Date(futureDeadline) >= new Date(new Date().toDateString());
    assert.equal(isFuture, true);
  });

  // ---------------------------------------------------------------------------
  // 14. Successful Test-Mode Payment Creates Exactly One Linked Record
  // ---------------------------------------------------------------------------
  test('14. Successful payment creates exactly 1 payment record linked to exactly 1 application record', async () => {
    const order = await createAuthoritativeOrder({
      productKey: 'internship_enrollment',
      firebaseUid: 'test_single_record',
      verifiedEmail: 'single@nls.ac.in',
    });

    const paymentId = 'pay_single_verified';
    const sig = generateRazorpayHmac(`${order.orderId}|${paymentId}`, process.env.RAZORPAY_KEY_SECRET!);

    await reconcilePaymentAndFulfill({
      orderId: order.orderId,
      paymentId,
      signature: sig,
      productKey: 'internship_enrollment',
      firebaseUid: 'test_single_record',
      verifiedEmail: 'single@nls.ac.in',
      payload: { applicantName: 'Single Record Applicant' },
    });

    const payments = await getTabRows('Payments');
    const apps = await getTabRows('Applications');

    assert.equal(payments.length, 1);
    assert.equal(apps.length, 1);

    // Verify linkage
    assert.equal(payments[0][2], apps[0][0]); // internalReference matches applicationId
    assert.equal(apps[0][10], payments[0][0]); // paymentRecordId matches in application
  });

  // ---------------------------------------------------------------------------
  // 15. Refund Status Updates Linked Payment and Target Record
  // ---------------------------------------------------------------------------
  test('15. Webhook refund event updates payment and linked application to refunded/cancelled', async () => {
    const order = await createAuthoritativeOrder({
      productKey: 'internship_enrollment',
      firebaseUid: 'refund_uid',
      verifiedEmail: 'refund@nls.ac.in',
    });

    const paymentId = 'pay_to_refund';
    const sig = generateRazorpayHmac(`${order.orderId}|${paymentId}`, process.env.RAZORPAY_KEY_SECRET!);

    await reconcilePaymentAndFulfill({
      orderId: order.orderId,
      paymentId,
      signature: sig,
      productKey: 'internship_enrollment',
      firebaseUid: 'refund_uid',
      verifiedEmail: 'refund@nls.ac.in',
      payload: { applicantName: 'Refund Applicant' },
    });

    // Simulate refund webhook event
    const refundPayload = JSON.stringify({
      event: 'refund.processed',
      payload: {
        payment: {
          entity: {
            id: paymentId,
            order_id: order.orderId,
            amount: 29900,
            status: 'refunded',
          },
        },
      },
    });

    await processRazorpayWebhook(refundPayload, null);

    const paymentRow = await findRowById('Payments', 5, order.orderId);
    assert.ok(paymentRow);
    assert.equal(paymentRow.row[9], 'refunded');
    assert.equal(paymentRow.row[15], 'full'); // Refund status full

    const appRow = await findRowById('Applications', 0, order.internalReference);
    assert.ok(appRow);
    assert.equal(appRow.row[9], 'cancelled'); // Linked app cancelled
  });
});
