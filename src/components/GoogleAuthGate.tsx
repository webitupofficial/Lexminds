'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  LogOut, 
  CheckCircle2, 
  Sparkles, 
  Loader2, 
  AlertCircle 
} from 'lucide-react';
import { 
  signInWithGoogle, 
  signOutGoogle, 
  auth, 
  onAuthStateChanged, 
  User 
} from '@/lib/firebase';

interface GoogleAuthGateProps {
  onAuthStateChange?: (user: User | null, idToken: string | null) => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  requireAuthBeforeRender?: boolean;
}

export default function GoogleAuthGate({
  onAuthStateChange,
  title = 'Institutional Google Verification Required',
  description = 'Sign in with your verified Google account to prevent spam, secure your application record, and access instant confirmation.',
  children,
  requireAuthBeforeRender = false
}: GoogleAuthGateProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentToken, setCurrentToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [signingIn, setSigningIn] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const token = await user.getIdToken();
          setCurrentToken(token);
          if (onAuthStateChange) onAuthStateChange(user, token);
        } catch (e) {
          console.error('Failed to get user token:', e);
        }
      } else {
        setCurrentToken(null);
        if (onAuthStateChange) onAuthStateChange(null, null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [onAuthStateChange]);

  const handleSignIn = async () => {
    setSigningIn(true);
    setAuthError(null);
    try {
      const result = await signInWithGoogle();
      if (result.error) {
        setAuthError(result.error);
      } else if (result.user) {
        setCurrentUser(result.user);
        setCurrentToken(result.idToken);
        if (onAuthStateChange) onAuthStateChange(result.user, result.idToken);
      }
    } catch (err: any) {
      setAuthError(err.message || 'Failed to authenticate with Google');
    } finally {
      setSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    await signOutGoogle();
    setCurrentUser(null);
    setCurrentToken(null);
    if (onAuthStateChange) onAuthStateChange(null, null);
  };

  if (loading) {
    return (
      <div className="p-4 rounded-sm tactile-control border border-ink-300 dark:border-ink-700 flex items-center justify-center space-x-3 text-xs text-ink-600 dark:text-ink-400 font-mono">
        <Loader2 className="w-4 h-4 animate-spin text-vermilion" />
        <span>Checking institutional session...</span>
      </div>
    );
  }

  // 1. User is Authenticated: Show verified badge card
  if (currentUser) {
    return (
      <div className="space-y-4">
        <div className="p-3.5 sm:p-4 rounded-sm bg-ivory-100 dark:bg-ink-900 border border-ink-200 dark:border-ink-800 flex flex-wrap items-center justify-between gap-3 transition-all">
          <div className="flex items-center space-x-3">
            {currentUser.photoURL ? (
              <img 
                src={currentUser.photoURL} 
                alt={currentUser.displayName || 'Google User'} 
                className="w-9 h-9 rounded-sm border border-ink-300 dark:border-ink-700 object-cover shadow-sm"
              />
            ) : (
              <div className="w-9 h-9 rounded-sm bg-oxblood-700 text-white font-serif font-bold flex items-center justify-center text-sm shadow-sm">
                {(currentUser.displayName || currentUser.email || 'U')[0].toUpperCase()}
              </div>
            )}
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xs font-bold text-ink-950 dark:text-white">
                  {currentUser.displayName || 'Verified Scholar'}
                </span>
                <CheckCircle2 className="w-3.5 h-3.5 text-oxblood-700 dark:text-oxblood-400" />
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-oxblood-700 dark:text-oxblood-400 bg-ivory-200 dark:bg-ink-800 px-1.5 py-0.2 rounded-sm border border-ink-200 dark:border-ink-700">
                  Google Verified
                </span>
              </div>
              <p className="text-[11px] text-ink-500 dark:text-ink-400 font-mono">
                {currentUser.email}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            className="text-[11px] font-mono text-ink-500 dark:text-ink-400 hover:text-rose-700 dark:hover:text-rose-400 flex items-center space-x-1 px-3 py-1.5 rounded-sm border border-ink-200 dark:border-ink-700 hover:border-rose-300 transition-colors"
          >
            <LogOut className="w-3 h-3" />
            <span>Switch Account</span>
          </button>
        </div>

        {children}
      </div>
    );
  }

  // 2. User is NOT Authenticated:
  if (requireAuthBeforeRender) {
    return (
      <div className="p-6 sm:p-8 rounded-sm editorial-card border border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-850 text-center space-y-4">
        <div className="w-10 h-10 rounded-sm bg-ivory-100 dark:bg-ink-900 border border-ink-300 dark:border-ink-700 flex items-center justify-center mx-auto text-oxblood-700 dark:text-oxblood-400">
          <ShieldCheck className="w-5 h-5" />
        </div>

        <div className="space-y-1.5 max-w-md mx-auto">
          <h3 className="text-base font-serif font-bold text-ink-950 dark:text-white">
            {title}
          </h3>
          <p className="text-xs text-ink-600 dark:text-ink-400 leading-relaxed">
            {description}
          </p>
        </div>

        {authError && (
          <div className="p-3 rounded-sm bg-rose-50 dark:bg-rose-950/30 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex items-center space-x-2 max-w-md mx-auto text-left">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{authError}</span>
          </div>
        )}

        <button
          type="button"
          onClick={handleSignIn}
          disabled={signingIn}
          className="w-full max-w-sm mx-auto py-2.5 px-4 bg-white dark:bg-ink-900 hover:bg-ivory-50 dark:hover:bg-ink-800 text-ink-900 dark:text-white font-serif text-xs font-semibold rounded-sm border border-ink-300 dark:border-ink-700 shadow-sm transition-all flex items-center justify-center space-x-2.5"
        >
          {signingIn ? (
            <Loader2 className="w-4 h-4 animate-spin text-oxblood-700" />
          ) : (
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
          )}
          <span>{signingIn ? 'Connecting to Google...' : 'Sign in with Google'}</span>
        </button>

        <div className="flex items-center justify-center space-x-3 text-[10px] font-mono text-ink-400">
          <span className="flex items-center space-x-1">
            <Lock className="w-3 h-3 text-oxblood-700 dark:text-oxblood-400" />
            <span>Encrypted Firebase Auth</span>
          </span>
          <span>&bull;</span>
          <span>Zero Spam Policy</span>
        </div>
      </div>
    );
  }

  // If requireAuthBeforeRender is false:
  return (
    <div className="space-y-4">
      <div className="p-4 rounded-sm bg-ivory-100 dark:bg-ink-900 border border-ink-200 dark:border-ink-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-sm bg-white dark:bg-ink-850 border border-ink-300 dark:border-ink-700 text-oxblood-700 dark:text-oxblood-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-ink-950 dark:text-white font-serif">
              Google Account Sign-In Recommended
            </h4>
            <p className="text-[11px] text-ink-600 dark:text-ink-400">
              Sign in with Google to auto-verify your submission and enable submission tracking.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSignIn}
          disabled={signingIn}
          className="py-2 px-3 bg-white dark:bg-ink-850 hover:bg-ivory-50 dark:hover:bg-ink-800 text-ink-900 dark:text-white font-serif text-xs font-semibold rounded-sm border border-ink-300 dark:border-ink-700 shadow-sm flex items-center space-x-2 transition-all"
        >
          {signingIn ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-oxblood-700" />
          ) : (
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
          )}
          <span>{signingIn ? 'Authenticating...' : 'Sign in with Google'}</span>
        </button>
      </div>

      {children}
    </div>
  );
}
