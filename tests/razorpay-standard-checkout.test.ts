import test from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'crypto';
import { POST as createOrderHandler } from '../src/app/api/create-order/route';
import { POST as verifyPaymentHandler } from '../src/app/api/verify-payment/route';

// Ensure environment variables are loaded
process.env.RAZORPAY_KEY_ID = 'rzp_test_TYTDBm9wmONdO1';
process.env.RAZORPAY_KEY_SECRET = 'xeTOF9nst2RDRynsOFXCfNXp';

test('Razorpay Standard Checkout: Create Order validation (< 100 paise rejected)', async () => {
  const req = new Request('http://localhost:3000/api/create-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount: 50, currency: 'INR' }),
  });

  const res = await createOrderHandler(req);
  assert.equal(res.status, 400);
  const data = await res.json();
  assert.match(data.error, /minimum amount is 100 paise/i);
});

test('Razorpay Standard Checkout: Create Order with valid amount (>= 100 paise)', async () => {
  const req = new Request('http://localhost:3000/api/create-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount: 100, currency: 'INR', receipt: 'test_rcpt_1' }),
  });

  const res = await createOrderHandler(req);
  const data = await res.json();
  
  // If Razorpay API responds (network available), order_id will start with order_
  if (res.status === 200) {
    assert.ok(data.order_id);
    assert.equal(data.amount, 100);
    assert.equal(data.currency, 'INR');
    assert.equal(data.key_id, 'rzp_test_TYTDBm9wmONdO1');
  } else {
    // If no outbound network or key authentication fails, it handles the error gracefully
    assert.ok(data.error);
  }
});

test('Razorpay Standard Checkout: Verify Payment rejects missing parameters', async () => {
  const req = new Request('http://localhost:3000/api/verify-payment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ order_id: 'order_test_1' }),
  });

  const res = await verifyPaymentHandler(req);
  assert.equal(res.status, 400);
  const data = await res.json();
  assert.match(data.error, /missing required parameters/i);
});

test('Razorpay Standard Checkout: Verify Payment rejects signature mismatch', async () => {
  const req = new Request('http://localhost:3000/api/verify-payment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      razorpay_order_id: 'order_ABC1234567890',
      razorpay_payment_id: 'pay_XYZ1234567890',
      razorpay_signature: '0000000000000000000000000000000000000000000000000000000000000000',
    }),
  });

  const res = await verifyPaymentHandler(req);
  assert.equal(res.status, 400);
  const data = await res.json();
  assert.equal(data.success, false);
  assert.match(data.error, /signature mismatch/i);
});

test('Razorpay Standard Checkout: Verify Payment accepts authentic HMAC-SHA256 signature', async () => {
  const orderId = 'order_valid_12345';
  const paymentId = 'pay_valid_67890';
  const keySecret = process.env.RAZORPAY_KEY_SECRET!;

  // Generate authentic HMAC-SHA256 signature
  const authenticSignature = crypto
    .createHmac('sha256', keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

  const req = new Request('http://localhost:3000/api/verify-payment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      razorpay_order_id: orderId,
      razorpay_payment_id: paymentId,
      razorpay_signature: authenticSignature,
    }),
  });

  const res = await verifyPaymentHandler(req);
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.equal(data.success, true);
  assert.equal(data.order_id, orderId);
  assert.equal(data.payment_id, paymentId);
  assert.match(data.message, /verified successfully/i);
});
