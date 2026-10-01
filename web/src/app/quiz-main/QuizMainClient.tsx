'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { 
  Trophy, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Lock, 
  ArrowRight, 
  Sparkles, 
  ExternalLink, 
  HelpCircle, 
  Clock, 
  Award, 
  RefreshCw,
  BookOpen,
  FileCheck2,
  KeyRound,
  Search,
  LogOut,
  AlertTriangle,
  UserCheck
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { 
  signInWithGoogle, 
  signOutGoogle, 
  auth, 
  onAuthStateChanged, 
  User as FirebaseUser 
} from '@/lib/firebase';

function WhatsAppIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
    </svg>
  );
}

interface QuizAccessData {
  hasAccess: boolean;
  participantName?: string;
  email?: string;
  referenceId?: string;
  paymentRecordId?: string;
  quizKey?: string;
  status?: string;
  paidAt?: string;
  quizLink?: string;
  whatsappGroupLink?: string;
  isAdmin?: boolean;
  error?: string;
  reason?: string;
}

export default function QuizMainClient() {
  const [mounted, setMounted] = useState(false);
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [currentToken, setCurrentToken] = useState<string | null>(null);
  const [authChecking, setAuthChecking] = useState<boolean>(true);
  const [signingIn, setSigningIn] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const [accessData, setAccessData] = useState<QuizAccessData | null>(null);
  const [verifying, setVerifying] = useState<boolean>(false);

  // Manual Reference / Email lookup state
  const [lookupQuery, setLookupQuery] = useState<string>('');
  const [lookupLoading, setLookupLoading] = useState<boolean>(false);
  const [lookupError, setLookupError] = useState<string | null>(null);

  // Guard to prevent multiple simultaneous auto-checks
  const isCheckingRef = useRef(false);

  // Core Access Verification Method
  const checkAccess = useCallback(async (params: { token?: string; referenceId?: string; email?: string }) => {
    if (isCheckingRef.current) return;
    isCheckingRef.current = true;
    setVerifying(true);
    setLookupError(null);

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (params.token) {
        headers['Authorization'] = `Bearer ${params.token}`;
      }

      const res = await fetch('/api/quiz/access', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          referenceId: params.referenceId || '',
          email: params.email || '',
        }),
      });

      const data = await res.json();
      if (data.hasAccess) {
        setAccessData(data);
        setLookupError(null);
        if (typeof window !== 'undefined') {
          try {
            sessionStorage.setItem('lexminds_quiz_access_cache', JSON.stringify(data));
          } catch {}
        }
      } else {
        setAccessData(data);
        if (params.referenceId || params.email) {
          setLookupError(data.error || 'No confirmed paid registration found for this Docket Reference or Email.');
        }
      }
    } catch (err: any) {
      setAccessData({
        hasAccess: false,
        error: err.message || 'Error communicating with verification registry.',
      });
    } finally {
      setVerifying(false);
      setAuthChecking(false);
      isCheckingRef.current = false;
    }
  }, []);

  // Handle Manual Docket Reference / Email Lookup Form
  const handleManualLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = lookupQuery.trim();
    if (!query) return;

    setLookupLoading(true);
    setLookupError(null);

    try {
      const isEmail = query.includes('@');
      const payload = isEmail ? { email: query } : { referenceId: query };
      await checkAccess(payload);
    } finally {
      setLookupLoading(false);
    }
  };

  // Mount initialization: Check Cache, URL Params, Stored Docket, and Firebase Auth
  useEffect(() => {
    setMounted(true);

    // 1. Session Storage Cache (instant load on page return / reload)
    let restoredFromCache = false;
    try {
      const cached = sessionStorage.getItem('lexminds_quiz_access_cache');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed?.hasAccess) {
          setAccessData(parsed);
          setAuthChecking(false);
          restoredFromCache = true;
        }
      }
    } catch {}

    // 2. Read URL search params (?ref=... & ?email=...)
    const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    const urlRef = urlParams?.get('ref') || urlParams?.get('referenceId') || '';
    const urlEmail = urlParams?.get('email') || '';

    if (urlRef) {
      setLookupQuery(urlRef);
      if (!restoredFromCache) {
        checkAccess({ referenceId: urlRef, email: urlEmail });
        return;
      }
    }

    // 3. Local Storage: Check if this browser recently completed payment
    try {
      const stored = localStorage.getItem('lexminds_quiz_confirmed_docket');
      if (stored && !restoredFromCache) {
        const parsed = JSON.parse(stored);
        if (parsed?.referenceId) {
          setLookupQuery(parsed.referenceId);
          checkAccess({ referenceId: parsed.referenceId, email: parsed.email });
          return;
        }
      }
    } catch {}

    // 4. Background Firebase Auth Session Check
    if (!auth || typeof onAuthStateChanged !== 'function') {
      setAuthChecking(false);
      return;
    }

    let unsub: (() => void) | null = null;
    try {
      unsub = onAuthStateChanged(auth, async (user) => {
        setCurrentUser(user);
        if (user) {
          try {
            const token = await user.getIdToken();
            setCurrentToken(token);
            if (!restoredFromCache && !isCheckingRef.current) {
              checkAccess({ token });
            }
          } catch (e) {
            console.error('Failed to get token:', e);
            setAuthChecking(false);
          }
        } else {
          setCurrentToken(null);
          setAuthChecking(false);
        }
      });
    } catch {
      setAuthChecking(false);
    }

    return () => {
      if (unsub) unsub();
    };
  }, [checkAccess]);

  // Google One-Click Sign In
  const handleSignIn = async () => {
    setSigningIn(true);
    setAuthError(null);
    try {
      const result = await signInWithGoogle();
      if (result.error) {
        setAuthError(result.error);
      } else if (result.user && result.idToken) {
        setCurrentUser(result.user);
        setCurrentToken(result.idToken);
        await checkAccess({ token: result.idToken });
      }
    } catch (err: any) {
      setAuthError(err.message || 'Google sign-in failed');
    } finally {
      setSigningIn(false);
    }
  };

  // Google Sign Out
  const handleSignOut = async () => {
    await signOutGoogle();
    setCurrentUser(null);
    setCurrentToken(null);
    setAccessData(null);
    try {
      sessionStorage.removeItem('lexminds_quiz_access_cache');
    } catch {}
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      
      {/* Breadcrumbs */}
      <Breadcrumbs 
        items={[
          { name: 'Virtual Quiz', href: '/quiz' },
          { name: 'Candidate Desk', href: '/quiz-main' }
        ]} 
      />

      {/* Main Header Banner - Always Rendered & Rock Solid */}
      <div className="p-6 sm:p-10 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 shadow-brutal space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-royal-500/10 dark:bg-royal-500/15 blur-3xl pointer-events-none rounded-full" />

        {/* Status Pill */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-sm bg-royal-50 dark:bg-royal-950/40 border border-royal-200 dark:border-royal-800 text-royal-600 dark:text-royal-400 font-bold uppercase tracking-wider text-[11px]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Virtual Competition &bull; Candidate Desk</span>
          </div>

          {mounted && accessData?.hasAccess ? (
            <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-sm border border-emerald-200 dark:border-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Access Confirmed (₹19 Paid)</span>
            </div>
          ) : (
            <div className="flex items-center space-x-1.5 text-ink-500 dark:text-ink-400 font-mono text-[11px]">
              <Lock className="w-3 h-3 text-royal-500" />
              <span>Registered &amp; Paid Candidates Only</span>
            </div>
          )}
        </div>

        {/* Title & Description */}
        <div className="space-y-3 relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-ink-950 dark:text-ink-50 tracking-tight leading-tight">
            LexMinds Virtual Quiz <span className="text-royal-600 dark:text-royal-400">Candidate Desk</span>
          </h1>
          <p className="text-sm sm:text-base text-ink-600 dark:text-ink-300 leading-relaxed max-w-2xl font-normal">
            Welcome to the official desk for verified candidates. Access your confirmed candidate docket, the private candidates WhatsApp group, and the official examination window.
          </p>
        </div>

        {/* Quick Facts Ledger Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-ink-900/10 dark:border-ink-800 text-xs font-mono relative z-10">
          <div className="p-3 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700">
            <span className="text-ink-500 dark:text-ink-400 block text-[10px] uppercase">Format</span>
            <span className="font-semibold text-ink-950 dark:text-ink-50 mt-1 block">Online MCQs</span>
          </div>
          <div className="p-3 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700">
            <span className="text-ink-500 dark:text-ink-400 block text-[10px] uppercase">Duration</span>
            <span className="font-semibold text-ink-950 dark:text-ink-50 mt-1 block">45 Minutes</span>
          </div>
          <div className="p-3 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700">
            <span className="text-ink-500 dark:text-ink-400 block text-[10px] uppercase">Registration Fee</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400 mt-1 block">₹19.00 (Paid)</span>
          </div>
          <div className="p-3 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700">
            <span className="text-ink-500 dark:text-ink-400 block text-[10px] uppercase">Recognition</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400 mt-1 block flex items-center gap-1">
              <Award className="w-3 h-3" />
              E-Certificate
            </span>
          </div>
        </div>
      </div>

      {/* Authenticated Profile Strip (when signed in with Google) */}
      {currentUser && (
        <div className="p-4 rounded-sm bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-800 flex flex-wrap items-center justify-between gap-3 transition-all">
          <div className="flex items-center space-x-3">
            {currentUser.photoURL ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img 
                src={currentUser.photoURL} 
                alt={currentUser.displayName || 'Google User'} 
                className="w-10 h-10 rounded-sm border border-ink-900/20 dark:border-ink-700 object-cover shadow-sm"
              />
            ) : (
              <div className="w-10 h-10 rounded-sm bg-royal-600 text-white font-serif font-bold flex items-center justify-center text-sm shadow-sm">
                {(currentUser.displayName || currentUser.email || 'U')[0].toUpperCase()}
              </div>
            )}
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold text-ink-950 dark:text-ink-50">
                  {currentUser.displayName || 'Verified Scholar'}
                </span>
                <CheckCircle2 className="w-4 h-4 text-royal-500 dark:text-royal-400" />
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-royal-600 dark:text-royal-400 bg-royal-50 dark:bg-royal-950/50 px-2 py-0.5 rounded-sm border border-royal-200 dark:border-royal-800">
                  Google Verified
                </span>
              </div>
              <p className="text-xs text-ink-500 dark:text-ink-400 font-mono">
                {currentUser.email}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            className="text-xs font-mono text-ink-500 dark:text-ink-400 hover:text-rose-700 dark:hover:text-rose-400 flex items-center space-x-1.5 px-3 py-1.5 rounded-sm border border-ink-900/15 dark:border-ink-700 hover:border-rose-300 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Switch Account</span>
          </button>
        </div>
      )}

      {/* In-Flight Verification Status Banner (Non-Intrusive, No Full Screen Replacement) */}
      {(verifying || (authChecking && !accessData?.hasAccess)) && (
        <div className="p-4 rounded-sm bg-royal-50 dark:bg-royal-950/40 border border-royal-200 dark:border-royal-800 flex items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center space-x-2.5 text-royal-700 dark:text-royal-300">
            <Loader2 className="w-4 h-4 animate-spin text-royal-600 dark:text-royal-400 shrink-0" />
            <span>Validating candidate registration on the official LexMinds registry...</span>
          </div>
          <span className="text-[10px] text-ink-400 uppercase tracking-wider hidden sm:inline-block">Instant Registry Check</span>
        </div>
      )}

      {/* SECTION A: ACCESS GRANTED -> Show Confirmed Candidate Docket & Examination Links */}
      {accessData?.hasAccess && (
        <div className="space-y-8 animate-editorial-reveal">
          
          {/* Confirmed Candidate Docket */}
          <div className="p-6 sm:p-7 rounded-sm bg-emerald-50/70 dark:bg-emerald-950/30 border-2 border-emerald-500/50 dark:border-emerald-500/40 shadow-brutal space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-300 dark:border-emerald-800">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h3 className="font-serif font-bold text-base text-ink-950 dark:text-ink-50">
                  Confirmed Candidate Docket
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold uppercase bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 border border-emerald-300">
                Verified Candidate
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3 bg-white/90 dark:bg-ink-900/90 rounded border border-emerald-200 dark:border-emerald-800/60">
                <span className="text-ink-500 dark:text-ink-400 block text-[10px] uppercase">Candidate Name</span>
                <span className="font-bold text-ink-950 dark:text-ink-50 text-sm mt-0.5 block truncate">
                  {accessData.participantName || 'Registered Scholar'}
                </span>
              </div>
              <div className="p-3 bg-white/90 dark:bg-ink-900/90 rounded border border-emerald-200 dark:border-emerald-800/60">
                <span className="text-ink-500 dark:text-ink-400 block text-[10px] uppercase">Docket Reference</span>
                <span className="font-bold text-royal-600 dark:text-royal-400 text-sm mt-0.5 block truncate">
                  {accessData.referenceId || 'CONFIRMED'}
                </span>
              </div>
              <div className="p-3 bg-white/90 dark:bg-ink-900/90 rounded border border-emerald-200 dark:border-emerald-800/60">
                <span className="text-ink-500 dark:text-ink-400 block text-[10px] uppercase">Registration Status</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 text-sm mt-0.5 block">
                  Paid ₹19.00
                </span>
              </div>
            </div>
          </div>

          {/* TWO CORE CANDIDATE ACTIONS: WHATSAPP GROUP & QUIZ LINK */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 1. WHATSAPP CANDIDATES GROUP */}
            <div className="p-6 sm:p-7 rounded-sm bg-emerald-50/80 dark:bg-emerald-950/30 border-2 border-emerald-500/40 dark:border-emerald-500/30 shadow-brutal flex flex-col justify-between space-y-6 transition-all hover:shadow-lg">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                    <WhatsAppIcon className="w-6 h-6 fill-white" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-emerald-100 dark:bg-emerald-900/70 text-emerald-800 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700">
                    Paid Candidates Only
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-serif font-bold text-xl text-ink-950 dark:text-ink-50">
                    Official Candidates WhatsApp Group
                  </h3>
                  <p className="text-xs text-ink-600 dark:text-ink-300 leading-relaxed font-normal">
                    Join the private WhatsApp community exclusively for verified candidates. All live updates, test countdown alerts, instructions, answer keys, and rankings take place here.
                  </p>
                </div>

                <div className="space-y-2 text-xs font-mono text-emerald-900 dark:text-emerald-300 bg-white/80 dark:bg-ink-900/80 p-3 rounded border border-emerald-200 dark:border-emerald-800/60">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Live countdown &amp; examination window alerts</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Direct coordinator support &amp; guidance</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Post-quiz answer keys &amp; participation e-certificates</span>
                  </div>
                </div>
              </div>

              <a
                href={accessData.whatsappGroupLink || 'https://chat.whatsapp.com/LexMindsQuiz2026Official'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-serif text-sm font-semibold rounded-sm shadow-md transition-all flex items-center justify-center space-x-2.5 cursor-pointer group"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white shrink-0 group-hover:scale-110 transition-transform" />
                <span>Join Candidates WhatsApp Group</span>
                <ExternalLink className="w-4 h-4 shrink-0" />
              </a>
            </div>

            {/* 2. OFFICIAL QUIZ PORTAL LINK */}
            <div className="p-6 sm:p-7 rounded-sm bg-royal-50/80 dark:bg-royal-950/30 border-2 border-royal-500/40 dark:border-royal-500/30 shadow-brutal flex flex-col justify-between space-y-6 transition-all hover:shadow-lg">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-royal-600 text-white flex items-center justify-center shadow-md">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-royal-100 dark:bg-royal-900/70 text-royal-800 dark:text-royal-200 border border-royal-300 dark:border-royal-700">
                    Examination Portal
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-serif font-bold text-xl text-ink-950 dark:text-ink-50">
                    Official Quiz Examination Link
                  </h3>
                  <p className="text-xs text-ink-600 dark:text-ink-300 leading-relaxed font-normal">
                    Access the official examination window. When the quiz window goes live as announced in the WhatsApp group, click below to open your questions and submit your answers.
                  </p>
                </div>

                <div className="space-y-2 text-xs font-mono text-royal-900 dark:text-royal-300 bg-white/80 dark:bg-ink-900/80 p-3 rounded border border-royal-200 dark:border-royal-800/60">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-3.5 h-3.5 text-royal-600 shrink-0" />
                    <span>Duration: 45 Minutes (Timed Examination)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-3.5 h-3.5 text-royal-600 shrink-0" />
                    <span>50 Multiple Choice Legal Jurisprudence Questions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-royal-600 shrink-0" />
                    <span>Single submission per registered candidate</span>
                  </div>
                </div>
              </div>

              <a
                href={accessData.quizLink || 'https://forms.gle/LexMindsVirtualQuiz2026'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-5 bg-royal-600 hover:bg-royal-700 active:bg-royal-800 text-white font-serif text-sm font-semibold rounded-sm shadow-md transition-all flex items-center justify-center space-x-2.5 cursor-pointer group"
              >
                <Trophy className="w-4 h-4 shrink-0 group-hover:scale-110 transition-transform" />
                <span>Launch Official Quiz Portal</span>
                <ExternalLink className="w-4 h-4 shrink-0" />
              </a>
            </div>

          </div>

          {/* Competition Guidelines & Highlights */}
          <div className="p-6 sm:p-8 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 shadow-brutal space-y-6">
            <div className="flex items-center space-x-2 pb-3 border-b border-ink-900/10 dark:border-ink-800">
              <FileCheck2 className="w-5 h-5 text-royal-600 dark:text-royal-400" />
              <h3 className="font-serif font-bold text-lg text-ink-950 dark:text-ink-50">
                Examination Guidelines &amp; Protocol
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-ink-600 dark:text-ink-300 font-normal leading-relaxed">
              <div className="space-y-3">
                <h4 className="font-serif font-bold text-ink-950 dark:text-ink-50 text-sm flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-royal-500" />
                  <span>Subject Coverage &amp; Syllabus</span>
                </h4>
                <ul className="space-y-2 font-mono text-[11px] list-disc list-inside">
                  <li>Constitutional Law &amp; Fundamental Rights</li>
                  <li>Landmark Judgments of the Supreme Court of India</li>
                  <li>Bharatiya Nyaya Sanhita (BNS) &amp; Criminal Procedure</li>
                  <li>Contemporary Legal Developments &amp; Tech Jurisprudence</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-serif font-bold text-ink-950 dark:text-ink-50 text-sm flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Important Instructions for Participants</span>
                </h4>
                <ul className="space-y-2 font-mono text-[11px] list-disc list-inside">
                  <li>Ensure a stable internet connection on laptop or phone before launching the quiz link.</li>
                  <li>Submit your responses before the countdown finishes; late responses are not logged.</li>
                  <li>All official notifications, instructions, and rankings are published in the WhatsApp group.</li>
                  <li>E-Certificates of Participation will be issued to all verified attendees.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Need Assistance Bar */}
          <div className="p-4 sm:p-5 rounded-sm bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center space-x-2 text-ink-600 dark:text-ink-400">
              <HelpCircle className="w-4 h-4 text-royal-500 shrink-0" />
              <span>Need support with your registration docket or examination access?</span>
            </div>
            <div className="flex items-center space-x-3">
              <Link
                href="/contact"
                className="font-bold text-royal-600 dark:text-royal-400 hover:underline"
              >
                Contact Helpdesk &rarr;
              </Link>
            </div>
          </div>

        </div>
      )}

      {/* SECTION B: NOT YET VERIFIED -> Show Candidate Verification Gate */}
      {(!accessData || !accessData.hasAccess) && (
        <div className="space-y-6">
          
          {/* If signed in to Google but no paid record found for this specific email */}
          {currentUser && accessData && !accessData.hasAccess && (
            <div className="p-6 sm:p-8 rounded-sm bg-surface-light dark:bg-surface-dark border-2 border-amber-500/40 dark:border-amber-500/30 shadow-brutal space-y-5 text-center">
              <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 flex items-center justify-center mx-auto text-amber-600 dark:text-amber-400">
                <AlertTriangle className="w-6 h-6" />
              </div>

              <div className="space-y-1.5 max-w-lg mx-auto">
                <h3 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50">
                  No Paid Registration Found for this Google Account
                </h3>
                <p className="text-xs text-ink-600 dark:text-ink-300 leading-relaxed font-normal">
                  Signed in as <strong className="text-ink-950 dark:text-ink-50">{currentUser.email}</strong>. Our records do not show a completed ₹19 payment associated with this email address. If you registered under a different email or have your Docket Reference ID, verify below.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Link
                  href="/quiz"
                  className="w-full sm:w-auto py-3 px-6 btn-brand-primary text-xs uppercase tracking-wider font-semibold flex items-center justify-center space-x-2"
                >
                  <span>Register &amp; Pay ₹19 for Quiz</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  type="button"
                  onClick={() => currentToken && checkAccess({ token: currentToken })}
                  className="w-full sm:w-auto py-3 px-5 bg-paper dark:bg-ink-800 hover:bg-paper-200 dark:hover:bg-ink-700 text-ink-900 dark:text-ink-100 font-mono text-xs font-semibold rounded-sm border border-ink-900/15 dark:border-ink-700 flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Re-check Google Session</span>
                </button>
              </div>
            </div>
          )}

          {/* Unified Verification Card */}
          <div className="p-6 sm:p-10 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 shadow-brutal space-y-6">
            
            <div className="text-center space-y-2 max-w-md mx-auto">
              <div className="w-12 h-12 rounded-sm bg-royal-50 dark:bg-royal-950/50 border border-royal-200 dark:border-royal-800 flex items-center justify-center mx-auto text-royal-600 dark:text-royal-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-ink-950 dark:text-ink-50">
                Candidate Verification Gate
              </h2>
              <p className="text-xs text-ink-600 dark:text-ink-400 leading-relaxed font-normal">
                To access the candidate WhatsApp group and quiz examination link, please authenticate your paid registration below.
              </p>
            </div>

            {authError && (
              <div className="p-3.5 rounded-sm bg-rose-50 dark:bg-rose-950/30 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex items-center space-x-2 max-w-md mx-auto font-mono">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            {/* Method 1: Google One-Click Sign In */}
            <div className="max-w-md mx-auto space-y-3">
              <button
                type="button"
                onClick={handleSignIn}
                disabled={signingIn || verifying}
                className="w-full py-3.5 px-5 bg-surface-light dark:bg-surface-dark hover:bg-paper dark:hover:bg-ink-800 text-ink-900 dark:text-white font-serif text-sm font-semibold rounded-sm border border-ink-900 dark:border-ink-700 shadow-brutal-sm transition-all flex items-center justify-center space-x-3 cursor-pointer disabled:opacity-50"
              >
                {signingIn ? (
                  <Loader2 className="w-4 h-4 animate-spin text-royal-600" />
                ) : (
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                )}
                <span>{signingIn ? 'Connecting to Google...' : 'Sign in with Google (1-Click Verification)'}</span>
              </button>

              <div className="flex items-center justify-center space-x-3 text-[11px] font-mono text-ink-400">
                <span className="flex items-center space-x-1.5">
                  <Lock className="w-3.5 h-3.5 text-royal-500" />
                  <span>Google Authentication</span>
                </span>
                <span>&bull;</span>
                <span>Instant Registry Check</span>
              </div>
            </div>

            {/* Divider */}
            <div className="relative max-w-md mx-auto my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-ink-900/10 dark:border-ink-800" />
              </div>
              <div className="relative flex justify-center text-xs font-mono uppercase">
                <span className="bg-surface-light dark:bg-surface-dark px-3 text-ink-400">
                  Or Look Up By Docket Reference
                </span>
              </div>
            </div>

            {/* Method 2: Manual Reference ID or Email Lookup */}
            <form onSubmit={handleManualLookup} className="max-w-md mx-auto space-y-3">
              <div className="space-y-1">
                <label className="block text-xs font-mono font-bold text-ink-900 dark:text-ink-100 uppercase">
                  Docket Reference ID or Registered Email
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={lookupQuery}
                    onChange={(e) => setLookupQuery(e.target.value)}
                    placeholder="e.g. QUIZ-MULNJ94D-V63C or email@domain.com"
                    className="w-full py-2.5 px-3.5 bg-paper dark:bg-ink-900 border border-ink-900/20 dark:border-ink-700 text-xs font-mono rounded-sm focus:outline-none focus:border-royal-500 text-ink-950 dark:text-ink-50 placeholder-ink-400"
                  />
                  <KeyRound className="w-4 h-4 text-ink-400 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              {lookupError && (
                <div className="p-2.5 rounded-sm bg-rose-50 dark:bg-rose-950/30 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex items-center space-x-2 font-mono">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{lookupError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={lookupLoading || verifying || !lookupQuery.trim()}
                className="w-full py-2.5 px-4 bg-paper-200 dark:bg-ink-800 hover:bg-paper-300 dark:hover:bg-ink-700 text-ink-900 dark:text-ink-100 font-mono text-xs font-semibold rounded-sm border border-ink-900/20 dark:border-ink-700 flex items-center justify-center space-x-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {lookupLoading || verifying ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Search className="w-3.5 h-3.5" />
                )}
                <span>{lookupLoading || verifying ? 'Verifying Registration...' : 'Verify Registration & Unlock'}</span>
              </button>
            </form>

            {/* Haven't Registered Callout */}
            <div className="pt-4 border-t border-ink-900/10 dark:border-ink-800 text-center max-w-md mx-auto space-y-2">
              <p className="text-xs text-ink-500 dark:text-ink-400 font-mono">
                Haven&apos;t registered for the LexMinds Virtual Quiz yet?
              </p>
              <Link
                href="/quiz"
                className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-royal-600 dark:text-royal-400 hover:underline"
              >
                <span>Complete Registration &amp; Pay ₹19 &rarr;</span>
              </Link>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
