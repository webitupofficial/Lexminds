import crypto from 'crypto';

export interface PaymentSessionPayload {
  orderId: string;
  referenceId: string; // APP-xxxx or SUB-xxxx
  productKey: string;
  amountPaise: number;
  currency: string;
  email: string;
  firebaseUid: string;
  exp: number; // Unix timestamp in seconds
}

function getSessionSecret(): string {
  const secret = process.env.PAYMENT_SESSION_SECRET || process.env.RAZORPAY_KEY_SECRET;
  if (!secret) {
    if (process.env.APP_ENV === 'test') {
      return 'test_payment_session_secret_32chars_ok';
    }
    throw new Error('Payment session signing secret is not configured.');
  }
  return secret;
}

/**
 * Creates a tamper-proof, short-lived HMAC-SHA256 signed payment session token.
 * Default expiration: 30 minutes (1800 seconds).
 */
export function createPaymentSessionToken(
  data: Omit<PaymentSessionPayload, 'exp'>,
  expiresInSeconds: number = 1800
): string {
  const secret = getSessionSecret();
  const exp = Math.floor(Date.now() / 1000) + expiresInSeconds;
  const payload: PaymentSessionPayload = {
    ...data,
    exp,
  };

  const payloadB64 = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
  const signature = crypto.createHmac('sha256', secret).update(payloadB64).digest('base64url');

  return `${payloadB64}.${signature}`;
}

/**
 * Cryptographically verifies the payment session token and its expiration.
 * Returns null if the token is tampered, malformed, or expired.
 */
export function verifyPaymentSessionToken(token: string): PaymentSessionPayload | null {
  if (!token || typeof token !== 'string' || !token.includes('.')) {
    return null;
  }

  const parts = token.split('.');
  if (parts.length !== 2) {
    return null;
  }

  const [payloadB64, signature] = parts;

  try {
    const secret = getSessionSecret();
    const expectedSig = crypto.createHmac('sha256', secret).update(payloadB64).digest('base64url');

    const sigBuf = Buffer.from(signature, 'utf8');
    const expBuf = Buffer.from(expectedSig, 'utf8');

    if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
      return null;
    }

    const payloadJson = Buffer.from(payloadB64, 'base64url').toString('utf8');
    const payload: PaymentSessionPayload = JSON.parse(payloadJson);

    const now = Math.floor(Date.now() / 1000);
    if (!payload.exp || payload.exp < now) {
      return null; // Expired
    }

    if (!payload.orderId || !payload.referenceId || !payload.productKey || !payload.amountPaise) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}
