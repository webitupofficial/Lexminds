import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

// Set test environment flags
process.env.APP_ENV = 'test';
process.env.ADMIN_EMAILS = 'owner@lexminds.in,editor@lexminds.in';
process.env.RAZORPAY_KEY_ID = 'rzp_test_mock_id';
process.env.RAZORPAY_KEY_SECRET = 'mock_test_secret_32chars_length_ok';
process.env.RAZORPAY_WEBHOOK_SECRET = 'mock_webhook_secret_key_12345';
process.env.PAYMENT_SESSION_SECRET = 'mock_test_secret_32chars_length_ok';
process.env.CRON_SECRET = 'mock_cron_secret_test_token_32chars_ok';

import { resetTestStore, findRowById, getTabRows, appendToSheet } from '../src/lib/google-sheets';
import {
  PRODUCT_CATALOG,
  generateRazorpayHmac,
  createAuthoritativeOrder,
  createPendingSubmissionOrder,
  reconcilePaymentAndFulfill,
  verifySessionAndFulfill,
  processRazorpayWebhook,
} from '../src/lib/payment-service';
import { createPaymentSessionToken, verifyPaymentSessionToken } from '../src/lib/payment-token';
import { reportAndCleanupAbandonedPendingRows } from '../src/lib/maintenance';
import { sanitizeHtml } from '../src/lib/sanitize';
import {
  getPublishedArticles,
  addPublishedArticle,
  fetchArticlesFromCMS,
  fetchInternshipsFromCMS,
} from '../src/lib/data-store';

// Import Route Handlers
import { POST as createOrderRoute } from '../src/app/api/payment/create-order/route';
import { POST as verifyRoute } from '../src/app/api/payment/verify/route';
import { POST as sessionInfoRoute } from '../src/app/api/payment/session-info/route';
import { POST as submitApplicationRoute } from '../src/app/api/applications/submit/route';
import { POST as submitPublishRoute } from '../src/app/api/publish/submit/route';
import { POST as webhookRoute } from '../src/app/api/webhooks/razorpay/route';
import { GET as publicArticlesRoute } from '../src/app/api/articles/route';
import { POST as maintenanceCleanupRoute } from '../src/app/api/maintenance/cleanup-abandoned/route';
import { POST as submitContactRoute } from '../src/app/api/contact/submit/route';

describe('LexMinds Final MVP Security & Transaction Pipeline Test Suite', () => {
  beforeEach(() => {
    resetTestStore();
  });

  // ---------------------------------------------------------------------------
  // 1. Unauthenticated Paid Submission Rejection
  // ---------------------------------------------------------------------------
  test('1. Rejects unauthenticated order creation, application submission, and payment verification with 401', async () => {
    const orderReq = new Request('http://localhost:3000/api/payment/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productKey: 'internship_enrollment' }),
    });
    const orderRes = await createOrderRoute(orderReq);
    assert.equal(orderRes.status, 401);

    const appReq = new Request('http://localhost:3000/api/applications/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Test Applicant',
        phone: '9876543210',
        collegeName: 'NLS Bangalore',
        yearOfStudy: '4th Year',
        sop: 'A valid statement of purpose with more than 30 characters.',
        declaration: true,
      }),
    });
    const appRes = await submitApplicationRoute(appReq);
    assert.equal(appRes.status, 401);

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
  test('2. Rejects requests with invalid or forged Firebase ID tokens with 401', async () => {
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

    const appReq = new Request('http://localhost:3000/api/applications/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer invalid_forged_token_xyz',
      },
      body: JSON.stringify({
        fullName: 'Test Applicant',
        phone: '9876543210',
        collegeName: 'NLS Bangalore',
        yearOfStudy: '4th Year',
        sop: 'A valid statement of purpose with more than 30 characters.',
        declaration: true,
      }),
    });
    const appRes = await submitApplicationRoute(appReq);
    assert.equal(appRes.status, 401);
  });

  // ---------------------------------------------------------------------------
  // 3. Form Submission Creates Pending Row Before Payment & Generates Session Token
  // ---------------------------------------------------------------------------
  test('3. Authenticated submission creates payment_pending row in Google Sheets and returns signed payment session token', async () => {
    const authHeader = 'Bearer test_token_scholar@nls.ac.in';
    const appReq = new Request('http://localhost:3000/api/applications/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader,
      },
      body: JSON.stringify({
        fullName: 'Arjun Nambiar',
        phone: '9876543210',
        collegeName: 'National Law School of India University',
        yearOfStudy: '4th Year (5-Year B.A. LL.B)',
        academicScore: '7.8 CGPA',
        sop: 'Passionate about statutory interpretation and regulatory compliance across high-growth markets.',
        declaration: true,
        internshipKey: 'legal-research-fellowship',
      }),
    });

    const appRes = await submitApplicationRoute(appReq);
    assert.equal(appRes.status, 200);

    const data = await appRes.json();
    assert.equal(data.success, true);
    assert.ok(data.orderId.startsWith('order_test_'));
    assert.ok(data.referenceId.startsWith('APP-'));
    assert.ok(data.sessionToken);
    assert.ok(data.paymentUrl.includes('/payment?orderId='));

    // Verify row was stored in Applications with payment_pending status
    const appRow = await findRowById('Applications', 0, data.referenceId);
    assert.ok(appRow);
    assert.equal(appRow.row[2], 'scholar@nls.ac.in');
    assert.equal(appRow.row[3], 'Arjun Nambiar');
    assert.equal(appRow.row[9], 'payment_pending'); // Initial status must be payment_pending

    // Verify Payments row created
    const payRow = await findRowById('Payments', 5, data.orderId);
    assert.ok(payRow);
    assert.equal(payRow.row[9], 'created');
  });

  // ---------------------------------------------------------------------------
  // 4. Standalone Payment Session Flow (No Firebase Auth in React State Required)
  // ---------------------------------------------------------------------------
  test('4. Standalone /payment page verifies session token without requiring Firebase token in state', async () => {
    const token = createPaymentSessionToken({
      orderId: 'order_session_456',
      referenceId: 'APP-SESSION-123',
      productKey: 'internship_enrollment',
      amountPaise: 3900,
      currency: 'INR',
      email: 'applicant@nls.ac.in',
      firebaseUid: 'uid_session_123',
    });

    const infoReq = new Request('http://localhost:3000/api/payment/session-info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId: 'order_session_456', token }),
    });

    const infoRes = await sessionInfoRoute(infoReq);
    assert.equal(infoRes.status, 200);

    const infoData = await infoRes.json();
    assert.equal(infoData.success, true);
    assert.equal(infoData.referenceId, 'APP-SESSION-123');
    assert.equal(infoData.amountPaise, 3900);
    assert.equal(infoData.email, 'applicant@nls.ac.in');
  });

  // ---------------------------------------------------------------------------
  // 5. Missing or Invalid Razorpay Signature Rejection
  // ---------------------------------------------------------------------------
  test('5. Rejects payment verification with missing or invalid cryptographic signature', async () => {
    const token = createPaymentSessionToken({
      orderId: 'order_sig_test',
      referenceId: 'APP-SIG-TEST',
      productKey: 'internship_enrollment',
      amountPaise: 3900,
      currency: 'INR',
      email: 'sig@nls.ac.in',
      firebaseUid: 'uid_sig',
    });

    // Missing signature
    const missingSigReq = new Request('http://localhost:3000/api/payment/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        razorpay_order_id: 'order_sig_test',
        razorpay_payment_id: 'pay_sig_test',
        token,
      }),
    });
    const missingRes = await verifyRoute(missingSigReq);
    assert.equal(missingRes.status, 400);

    // Invalid signature
    const invalidSigReq = new Request('http://localhost:3000/api/payment/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        razorpay_order_id: 'order_sig_test',
        razorpay_payment_id: 'pay_sig_test',
        razorpay_signature: 'invalid_forged_hmac_hex_string_that_does_not_match',
        token,
      }),
    });
    const invalidRes = await verifyRoute(invalidSigReq);
    assert.equal(invalidRes.status, 400);
  });

  // ---------------------------------------------------------------------------
  // 6. Successful Payment Updates Pending Row to Paid & Records Exactly One Payment
  // ---------------------------------------------------------------------------
  test('6. Successful payment updates payment_pending row to paid without creating duplicate rows', async () => {
    // 1. Submit application to create pending row
    const submission = await createPendingSubmissionOrder({
      productKey: 'internship_enrollment',
      firebaseUid: 'scholar_uid_777',
      verifiedEmail: 'scholar777@nls.ac.in',
      formData: {
        applicantName: 'Rohan Varma',
        phone: '9876543210',
        institution: 'ILS Law College Pune',
        yearOfStudy: '5th Year B.A. LL.B',
        sop: 'Detailed research interest in antitrust deal value thresholds.',
        internshipKey: 'competition-antitrust-fellowship',
      },
    });

    // Confirm initial state is payment_pending
    const initialApp = await findRowById('Applications', 0, submission.internalReference);
    assert.ok(initialApp);
    assert.equal(initialApp.row[9], 'payment_pending');

    // 2. Perform verification with valid Razorpay HMAC
    const paymentId = 'pay_verified_777';
    const validSig = generateRazorpayHmac(
      `${submission.orderId}|${paymentId}`,
      process.env.RAZORPAY_KEY_SECRET!
    );

    const verifyReq = new Request('http://localhost:3000/api/payment/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        razorpay_order_id: submission.orderId,
        razorpay_payment_id: paymentId,
        razorpay_signature: validSig,
        token: submission.sessionToken,
      }),
    });

    const verifyRes = await verifyRoute(verifyReq);
    assert.equal(verifyRes.status, 200);

    const verifyData = await verifyRes.json();
    assert.equal(verifyData.success, true);
    assert.equal(verifyData.verified, true);
    assert.equal(verifyData.referenceId, submission.internalReference);

    // Verify row was updated in-place to paid
    const updatedApp = await findRowById('Applications', 0, submission.internalReference);
    assert.ok(updatedApp);
    assert.equal(updatedApp.row[9], 'paid');
    assert.equal(updatedApp.row[3], 'Rohan Varma'); // Preserved applicant name

    // Verify Payments row updated to verified
    const payRow = await findRowById('Payments', 5, submission.orderId);
    assert.ok(payRow);
    assert.equal(payRow.row[6], paymentId);
    assert.equal(payRow.row[9], 'verified');

    // Verify total count in Applications is exactly 1 data row (getTabRows excludes header)
    const allApps = await getTabRows('Applications');
    assert.equal(allApps.length, 1);
  });

  // ---------------------------------------------------------------------------
  // 7. Failed Payment Does NOT Become Paid
  // ---------------------------------------------------------------------------
  test('7. Failed payment attempt leaves row in payment_pending status', async () => {
    const submission = await createPendingSubmissionOrder({
      productKey: 'internship_enrollment',
      firebaseUid: 'failed_uid_888',
      verifiedEmail: 'failed@nls.ac.in',
      formData: {
        applicantName: 'Failed Applicant',
        phone: '9876543210',
        institution: 'Campus Law Centre',
        sop: 'Research on environmental constitutionalism under Article 21.',
      },
    });

    // Attempt verification with invalid signature
    const verifyReq = new Request('http://localhost:3000/api/payment/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        razorpay_order_id: submission.orderId,
        razorpay_payment_id: 'pay_failed_888',
        razorpay_signature: 'tampered_signature',
        token: submission.sessionToken,
      }),
    });

    const verifyRes = await verifyRoute(verifyReq);
    assert.equal(verifyRes.status, 400);

    // Row must still be payment_pending
    const appRow = await findRowById('Applications', 0, submission.internalReference);
    assert.ok(appRow);
    assert.equal(appRow.row[9], 'payment_pending');
  });

  // ---------------------------------------------------------------------------
  // 8. Refreshing or Duplicate Callbacks: Same Payment ID Succeeds Without Writing, Conflicting ID Rejects
  // ---------------------------------------------------------------------------
  test('8. Duplicate verification callbacks or page refreshes are idempotent', async () => {
    const submission = await createPendingSubmissionOrder({
      productKey: 'internship_enrollment',
      firebaseUid: 'idemp_uid',
      verifiedEmail: 'idemp@nls.ac.in',
      formData: { applicantName: 'Idempotency User', phone: '9876543210', sop: 'Testing idempotency.' },
    });

    const paymentId = 'pay_idemp_111';
    const validSig = generateRazorpayHmac(
      `${submission.orderId}|${paymentId}`,
      process.env.RAZORPAY_KEY_SECRET!
    );

    // First call: succeeds and writes
    const res1 = await verifySessionAndFulfill({
      orderId: submission.orderId,
      paymentId,
      signature: validSig,
      sessionToken: submission.sessionToken,
    });
    assert.equal(res1.verified, true);
    assert.equal(res1.alreadyProcessed, false);

    // Second call with identical payment ID: re-reads row and returns success without writing
    const res2 = await verifySessionAndFulfill({
      orderId: submission.orderId,
      paymentId,
      signature: validSig,
      sessionToken: submission.sessionToken,
    });
    assert.equal(res2.verified, true);
    assert.equal(res2.alreadyProcessed, true);

    // Third call with conflicting DIFFERENT payment ID for the same order: rejects and alerts
    const conflictingPaymentId = 'pay_conflicting_999';
    const conflictingSig = generateRazorpayHmac(
      `${submission.orderId}|${conflictingPaymentId}`,
      process.env.RAZORPAY_KEY_SECRET!
    );

    await assert.rejects(
      async () => {
        await verifySessionAndFulfill({
          orderId: submission.orderId,
          paymentId: conflictingPaymentId,
          signature: conflictingSig,
          sessionToken: submission.sessionToken,
        });
      },
      /Payment conflict/
    );

    // Verify row counts: exactly 1 in Applications, 1 in Payments (never appends a second paid record)
    const apps = await getTabRows('Applications');
    const payments = await getTabRows('Payments');
    assert.equal(apps.length, 1);
    assert.equal(payments.length, 1);
  });

  // ---------------------------------------------------------------------------
  // 9. Webhook Signature Verification and Event Processing
  // ---------------------------------------------------------------------------
  test('9. Validates Razorpay webhooks with raw body HMAC and rejects invalid signatures', async () => {
    const rawPayload = JSON.stringify({
      event: 'payment.captured',
      payload: {
        payment: {
          entity: {
            id: 'pay_hook_999',
            order_id: 'order_hook_999',
            amount: 3900,
            status: 'captured',
          },
        },
      },
    });

    const validSig = crypto
      .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(rawPayload)
      .digest('hex');

    // Valid webhook
    const validRes = await processRazorpayWebhook(rawPayload, validSig);
    assert.equal(validRes.success, true);
    assert.equal(validRes.event, 'payment.captured');

    // Tampered body with same signature rejected
    await assert.rejects(
      async () => {
        await processRazorpayWebhook(rawPayload + 'tampered', validSig);
      },
      /Invalid Razorpay webhook signature/
    );
  });

  // ---------------------------------------------------------------------------
  // 10. Abandoned Pending Rows Cleanup & Protected Maintenance Endpoint
  // ---------------------------------------------------------------------------
  test('10. Abandoned payment_pending rows cleanup marks stale rows as abandoned and requires CRON_SECRET', async () => {
    // Inject a pending row with timestamp 48 hours in the past
    const pastTime = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString();

    const staleAppRow = [
      'APP-STALE-001',
      'stale_uid',
      'stale@nls.ac.in',
      'Stale Applicant',
      '9876543210',
      'Old College',
      '3rd Year',
      '',
      'fellowship',
      'payment_pending',
      'PAY-STALE-001',
      'Old SOP',
      pastTime,
      pastTime,
    ];
    await appendToSheet('Applications', staleAppRow);

    // 1. Calling /api/maintenance/cleanup-abandoned without CRON_SECRET is rejected with 401
    const unauthReq = new Request('http://localhost:3000/api/maintenance/cleanup-abandoned', {
      method: 'POST',
    });
    const unauthRes = await maintenanceCleanupRoute(unauthReq);
    assert.equal(unauthRes.status, 401);

    // 2. Calling with wrong secret is rejected with 401
    const invalidSecretReq = new Request('http://localhost:3000/api/maintenance/cleanup-abandoned', {
      method: 'POST',
      headers: { Authorization: 'Bearer wrong_token_attempt' },
    });
    const invalidSecretRes = await maintenanceCleanupRoute(invalidSecretReq);
    assert.equal(invalidSecretRes.status, 401);

    // 3. Calling with valid CRON_SECRET succeeds with 200 and performs cleanup
    const authReq = new Request('http://localhost:3000/api/maintenance/cleanup-abandoned?maxAgeHours=24', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.CRON_SECRET}` },
    });
    const authRes = await maintenanceCleanupRoute(authReq);
    assert.equal(authRes.status, 200);

    const reportData = await authRes.json();
    assert.equal(reportData.success, true);
    assert.ok(reportData.report.applicationsAbandoned >= 1);

    // Verify row status transitioned to abandoned
    const cleanedApp = await findRowById('Applications', 0, 'APP-STALE-001');
    assert.ok(cleanedApp);
    assert.equal(cleanedApp.row[9], 'abandoned');
  });

  // ---------------------------------------------------------------------------
  // 11. Custom Admin Portal & Admin APIs Removed
  // ---------------------------------------------------------------------------
  test('11. Confirms custom admin portal and admin APIs have been completely removed', () => {
    const adminPagePath = path.join(__dirname, '../src/app/admin');
    const adminApiPath = path.join(__dirname, '../src/app/api/admin');
    const razorpayModalPath = path.join(__dirname, '../src/components/RazorpayModal.tsx');

    assert.equal(fs.existsSync(adminPagePath), false, 'src/app/admin must not exist');
    assert.equal(fs.existsSync(adminApiPath), false, 'src/app/api/admin must not exist');
    assert.equal(fs.existsSync(razorpayModalPath), false, 'RazorpayModal must not exist (replaced by /payment)');
  });

  // ---------------------------------------------------------------------------
  // 12. Stored XSS Attack Vectors Neutralized
  // ---------------------------------------------------------------------------
  test('12. Stored XSS attack vectors in article text are neutralized by sanitizer', () => {
    const maliciousInput = '<script>alert("XSS")</script><p>Valid analysis</p><img src="x" onerror="alert(1)">';
    const cleanOutput = sanitizeHtml(maliciousInput);
    assert.equal(cleanOutput.includes('<script>'), false);
    assert.equal(cleanOutput.includes('onerror'), false);
    assert.equal(cleanOutput.includes('Valid analysis'), true);
  });

  // ---------------------------------------------------------------------------
  // 13. Public Articles Endpoint
  // ---------------------------------------------------------------------------
  test('13. Public articles endpoint returns published treatises', async () => {
    const req = new Request('http://localhost:3000/api/articles');
    const res = await publicArticlesRoute(req);
    assert.equal(res.status, 200);

    const data = await res.json();
    assert.ok(Array.isArray(data.articles));
    assert.ok(data.articles.length > 0);
  });

  // ---------------------------------------------------------------------------
  // 14. Sanity Headless CMS Adapter
  // ---------------------------------------------------------------------------
  test('14. Sanity CMS adapter returns editorial content with robust fallback', async () => {
    const articles = await fetchArticlesFromCMS();
    assert.ok(Array.isArray(articles));
    assert.ok(articles.length > 0);

    const internships = await fetchInternshipsFromCMS();
    assert.ok(Array.isArray(internships));
    assert.ok(internships.length > 0);
  });

  // ---------------------------------------------------------------------------
  // 15. Regression: Firebase Admin Server Module Loads Without ERR_REQUIRE_ESM
  // ---------------------------------------------------------------------------
  test('15. Regression: Firebase Admin server modules and payment route load without ERR_REQUIRE_ESM', async () => {
    const admin = require('firebase-admin');
    const adminApp = require('firebase-admin/app');
    const adminAuth = require('firebase-admin/auth');
    const jwks = require('jwks-rsa');
    const jose = require('jose');

    assert.ok(admin, 'firebase-admin must load cleanly');
    assert.equal(admin.SDK_VERSION, '13.10.0', 'firebase-admin must resolve pinned version 13.10.0');
    assert.ok(adminApp.initializeApp, 'firebase-admin/app must export initializeApp');
    assert.ok(adminAuth.getAuth, 'firebase-admin/auth must export getAuth');
    assert.equal(typeof jwks, 'function', 'jwks-rsa must export factory function');
    assert.ok(jose, 'jose must resolve in CommonJS environment without ERR_REQUIRE_ESM');

    const unauthReq = new Request('http://localhost:3000/api/payment/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productKey: 'internship_enrollment' }),
    });

    const response = await createOrderRoute(unauthReq);
    assert.equal(response.status, 401);
  });

  // ---------------------------------------------------------------------------
  // 16. Contact Tickets: Submits valid contact inquiry to ContactTickets tab
  // ---------------------------------------------------------------------------
  test('16. Submits valid contact inquiry to ContactTickets sheet tab and rejects invalid inputs', async () => {
    // 1. Missing name should fail
    const invalidReq1 = new Request('http://localhost:3000/api/contact/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: '',
        email: 'scholar@example.com',
        subject: 'General Question',
        message: 'This is a valid inquiry message.',
      }),
    });
    const res1 = await submitContactRoute(invalidReq1);
    assert.equal(res1.status, 400);

    // 2. Invalid email should fail
    const invalidReq2 = new Request('http://localhost:3000/api/contact/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Aditya Sharma',
        email: 'not-an-email',
        subject: 'General Question',
        message: 'This is a valid inquiry message.',
      }),
    });
    const res2 = await submitContactRoute(invalidReq2);
    assert.equal(res2.status, 400);

    // 3. Short message should fail
    const invalidReq3 = new Request('http://localhost:3000/api/contact/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Aditya Sharma',
        email: 'aditya@example.com',
        subject: 'General Question',
        message: 'Short',
      }),
    });
    const res3 = await submitContactRoute(invalidReq3);
    assert.equal(res3.status, 400);

    // 4. Valid submission should succeed and append row to ContactTickets tab
    const validReq = new Request('http://localhost:3000/api/contact/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Aditya Sharma',
        email: 'aditya.sharma@nls.ac.in',
        phone: '+91 9876543210',
        institution: 'National Law School of India University',
        category: 'Internship & Research Fellowship',
        subject: 'Spring Fellowship Timeline',
        message: 'Could you please clarify the expected cohort commencement date for the upcoming fellowship?',
      }),
    });
    const validRes = await submitContactRoute(validReq);
    assert.equal(validRes.status, 200);

    const validData = await validRes.json();
    assert.equal(validData.success, true);
    assert.ok(validData.ticketId.startsWith('TKT-'));

    // Verify row was written to ContactTickets tab in testStore
    const contactRows = await getTabRows('ContactTickets');
    assert.equal(contactRows.length, 1);
    assert.equal(contactRows[0][0], validData.ticketId);
    assert.equal(contactRows[0][1], 'aditya.sharma@nls.ac.in');
    assert.equal(contactRows[0][2], 'Aditya Sharma');
    assert.equal(contactRows[0][3], '+91 9876543210');
    assert.equal(contactRows[0][4], 'National Law School of India University');
    assert.equal(contactRows[0][5], '[Internship & Research Fellowship] Spring Fellowship Timeline');
    assert.equal(contactRows[0][7], 'new');
  });
});
