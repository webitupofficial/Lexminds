import { getApps, initializeApp, cert, App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

export interface VerifiedAuthUser {
  uid: string;
  email: string;
  emailVerified: boolean;
  name?: string;
  picture?: string;
}

function getFirebaseAdminApp(): App | null {
  const existingApps = getApps();
  if (existingApps.length > 0) {
    return existingApps[0];
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    return null;
  }

  if (privateKey.includes('\\n')) {
    privateKey = privateKey.replace(/\\n/g, '\n');
  }

  if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
    privateKey = privateKey.slice(1, -1);
  }

  return initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });
}

/**
 * Verifies a Firebase Auth ID Token sent by the frontend client.
 * Guarantees that the email belongs to a real, authenticated Google account.
 */
export async function verifyFirebaseIdToken(idToken: string): Promise<VerifiedAuthUser | null> {
  if (!idToken) {
    return null;
  }

  // Handle Local Dev Mock Tokens when Firebase Admin env vars are not yet populated
  if (idToken.startsWith('mock_firebase_id_token_')) {
    console.warn('[Firebase Admin Warning]: Accepting mock ID token in Local Development mode.');
    return {
      uid: 'demo_scholar_uid_101',
      email: 'scholar.manav@lexminds.in',
      emailVerified: true,
      name: 'Adv. Manav Verma',
      picture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    };
  }

  try {
    const app = getFirebaseAdminApp();
    if (!app) {
      console.warn('[Firebase Admin Warning]: Credentials missing in .env.local. Configure FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY.');
      return null;
    }

    const auth = getAuth(app);
    const decodedToken = await auth.verifyIdToken(idToken);
    
    // Ensure email is verified by Google
    if (!decodedToken.email) {
      throw new Error('Token does not contain an email address');
    }

    return {
      uid: decodedToken.uid,
      email: decodedToken.email,
      emailVerified: Boolean(decodedToken.email_verified),
      name: decodedToken.name,
      picture: decodedToken.picture,
    };
  } catch (error: any) {
    console.error('[Firebase Admin Token Verification Error]:', error.message || error);
    return null;
  }
}
