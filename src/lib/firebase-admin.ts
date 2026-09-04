import { getApps, initializeApp, cert, App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

export interface VerifiedAuthUser {
  uid: string;
  email: string;
  emailVerified: boolean;
  name?: string;
  picture?: string;
}

/**
 * Initializes or retrieves singleton Firebase Admin SDK instance.
 */
export function formatPrivateKey(rawKey: string | undefined): string | null {
  if (!rawKey || typeof rawKey !== 'string') return null;
  let key = rawKey.trim();

  if ((key.startsWith('"') && key.endsWith('"')) || (key.startsWith("'") && key.endsWith("'"))) {
    key = key.slice(1, -1).trim();
  }

  if (!key.includes('BEGIN PRIVATE KEY') && !key.includes('BEGIN RSA PRIVATE KEY')) {
    try {
      const decoded = Buffer.from(key, 'base64').toString('utf8');
      if (decoded.includes('BEGIN PRIVATE KEY') || decoded.includes('BEGIN RSA PRIVATE KEY')) {
        key = decoded.trim();
      }
    } catch {
      // not base64
    }
  }

  key = key.replace(/\\n/g, '\n').replace(/\\r/g, '');

  const isRsa = key.includes('RSA PRIVATE KEY');
  const header = isRsa ? '-----BEGIN RSA PRIVATE KEY-----' : '-----BEGIN PRIVATE KEY-----';
  const footer = isRsa ? '-----END RSA PRIVATE KEY-----' : '-----END PRIVATE KEY-----';

  if (!key.includes(header) || !key.includes(footer)) {
    return null;
  }

  const startIndex = key.indexOf(header) + header.length;
  const endIndex = key.indexOf(footer);
  const rawBody = key.slice(startIndex, endIndex);

  const cleanBase64 = rawBody.replace(/[^A-Za-z0-9+/=]/g, '');
  if (!cleanBase64) return null;

  const chunks = cleanBase64.match(/.{1,64}/g);
  if (!chunks) return null;

  return `${header}\n${chunks.join('\n')}\n${footer}\n`;
}

function getFirebaseAdminApp(): App | null {
  const existingApps = getApps();
  if (existingApps.length > 0) {
    return existingApps[0];
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = formatPrivateKey(process.env.FIREBASE_PRIVATE_KEY);

  if (!projectId) {
    lastVerificationError = 'FIREBASE_PROJECT_ID is not configured';
    return null;
  }
  if (!clientEmail) {
    lastVerificationError = 'FIREBASE_CLIENT_EMAIL is not configured';
    return null;
  }
  if (!privateKey) {
    lastVerificationError = 'FIREBASE_PRIVATE_KEY is not configured or formatPrivateKey failed';
    return null;
  }

  try {
    return initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });
  } catch (err: any) {
    lastVerificationError = `Firebase Admin initializeApp failed: ${err.message || err}`;
    console.error('[Firebase Admin Init Error]:', err.message || err);
    return null;
  }
}

/**
 * Verifies a Firebase Auth ID Token sent by the frontend client in Authorization: Bearer <token>.
 * Guarantees that the email belongs to a real, authenticated Google account.
 */
export let lastVerificationError: string | null = null;

export async function verifyFirebaseIdToken(idToken: string): Promise<VerifiedAuthUser | null> {
  lastVerificationError = null;
  if (!idToken || typeof idToken !== 'string') {
    lastVerificationError = 'Empty or non-string token provided.';
    return null;
  }

  // Support explicit test token ONLY in automated test environments
  if (process.env.APP_ENV === 'test' && idToken.startsWith('test_token_')) {
    const email = idToken.replace('test_token_', '');
    return {
      uid: `test_uid_${email}`,
      email,
      emailVerified: true,
      name: 'Automated Test User',
    };
  }

  try {
    const app = getFirebaseAdminApp();
    if (!app) {
      if (!lastVerificationError) {
        lastVerificationError = 'getFirebaseAdminApp returned null without error message.';
      }
      console.error('[Firebase Admin]:', lastVerificationError);
      return null;
    }

    const auth = getAuth(app);
    const decodedToken = await auth.verifyIdToken(idToken);

    const verifiedEmail = decodedToken.email || (decodedToken as any).claims?.email;
    if (!verifiedEmail) {
      lastVerificationError = 'Token missing email claim.';
      console.warn('[Firebase Admin]: Token missing email claim.');
      return null;
    }

    return {
      uid: decodedToken.uid,
      email: verifiedEmail.toLowerCase(),
      emailVerified: Boolean(decodedToken.email_verified),
      name: decodedToken.name,
      picture: decodedToken.picture,
    };
  } catch (error: any) {
    lastVerificationError = error.message || String(error);
    console.error('[Firebase Admin Token Verification Error]:', error.message || error);
    return null;
  }
}

/**
 * Extracts the Bearer token from the incoming HTTP Request headers.
 */
export function extractBearerToken(req: Request): string | null {
  const authHeader = req.headers.get('Authorization') || req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7).trim();
}

/**
 * Verifies that the request comes from an authenticated user.
 */
export async function verifyUserAuth(req: Request): Promise<VerifiedAuthUser | null> {
  const token = extractBearerToken(req);
  if (!token) return null;
  return verifyFirebaseIdToken(token);
}

/**
 * Returns the allowlist of admin emails configured via ADMIN_EMAILS.
 */
export function getAdminEmails(): string[] {
  const adminEnv = process.env.ADMIN_EMAILS || '';
  return adminEnv
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

/**
 * Verifies that the request comes from an authorized administrator.
 * Compares the verified token email against the server-side ADMIN_EMAILS allowlist.
 */
export async function verifyAdminAuth(req: Request): Promise<VerifiedAuthUser | null> {
  const user = await verifyUserAuth(req);
  if (!user || !user.email) {
    return null;
  }

  const allowedAdmins = getAdminEmails();
  if (allowedAdmins.length === 0) {
    console.warn('[Admin Authorization Warning]: ADMIN_EMAILS environment variable is not configured.');
    return null;
  }

  const isAllowed = allowedAdmins.includes(user.email.toLowerCase());
  if (!isAllowed) {
    console.warn(`[Admin Security Alert]: Unauthorized admin access attempted by ${user.email}`);
    return null;
  }

  return user;
}
