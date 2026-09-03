'use client';

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  User,
  Auth
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'demo-api-key',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'lexminds-demo.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'lexminds-demo',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'lexminds-demo.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '1234567890',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:1234567890:web:demo',
};

// Singleton Firebase App instance
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

export const auth: Auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export interface GoogleAuthResult {
  user: User | null;
  idToken: string | null;
  error?: string;
}

/**
 * Triggers native Google Sign-in popup via Firebase Auth
 */
export async function signInWithGoogle(): Promise<GoogleAuthResult> {
  // If no real API key is configured yet in .env.local, provide interactive test fallback for dev
  if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY || process.env.NEXT_PUBLIC_FIREBASE_API_KEY === 'demo-api-key') {
    console.warn('[Firebase Auth]: Operating in Dev Mock Mode because NEXT_PUBLIC_FIREBASE_API_KEY is not set.');
    const mockUser = {
      uid: 'demo_scholar_uid_101',
      displayName: 'Adv. Manav Verma',
      email: 'scholar.manav@lexminds.in',
      emailVerified: true,
      photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      getIdToken: async () => `mock_firebase_id_token_${Date.now()}`
    } as unknown as User;

    return {
      user: mockUser,
      idToken: await mockUser.getIdToken()
    };
  }

  try {
    const result = await signInWithPopup(auth, googleProvider);
    const idToken = await result.user.getIdToken();
    return {
      user: result.user,
      idToken
    };
  } catch (err: any) {
    console.error('[Firebase Auth Error]:', err);
    return {
      user: null,
      idToken: null,
      error: err.message || 'Google sign-in failed'
    };
  }
}

/**
 * Signs out current user
 */
export async function signOutGoogle(): Promise<void> {
  try {
    await signOut(auth);
  } catch (err) {
    console.error('[Firebase Signout Error]:', err);
  }
}

export { onAuthStateChanged };
export type { User };
