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

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'lex-minds';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyDummyKeyForBuildPrerender12345',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || `${projectId}.firebaseapp.com`,
  projectId: projectId,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || `${projectId}.appspot.com`,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '123456789012',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:123456789012:web:abcdef123456',
};

// Singleton Firebase App instance with safe initialization for SSR/SSG
let app: FirebaseApp;
try {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
} catch {
  const existingApps = getApps();
  if (existingApps.length > 0) {
    app = existingApps[0];
  } else {
    app = initializeApp(firebaseConfig, 'lexminds-app');
  }
}

let authInstance: Auth;
try {
  authInstance = getAuth(app);
} catch {
  authInstance = {} as Auth;
}

export const auth: Auth = authInstance;
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
  const rawKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!rawKey || rawKey.includes('DummyKey')) {
    return {
      user: null,
      idToken: null,
      error: 'Firebase Web API Key is not configured. Please add NEXT_PUBLIC_FIREBASE_API_KEY in your environment.'
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
