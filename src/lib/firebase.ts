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
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || `${projectId}.firebaseapp.com`,
  projectId: projectId,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || `${projectId}.appspot.com`,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
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
  if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
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
