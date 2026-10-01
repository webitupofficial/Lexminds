'use client';

import React, { useState, useEffect, useCallback } from 'react';
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
  Calendar,
  AlertTriangle
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import GoogleAuthGate from '@/components/GoogleAuthGate';
import { User as FirebaseUser } from 'firebase/auth';

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
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [currentToken, setCurrentToken] = useState<string | null>(null);
  const [accessData, setAccessData] = useState<QuizAccessData | null>(null);
  const [loadingAccess, setLoadingAccess] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const verifyAccess = useCallback(async (token: string) => {
    setLoadingAccess(true);
    setFetchError(null);
    try {
      const res = await fetch('/api/quiz/access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok && res.status !== 200) {
        setFetchError(data.error || 'Failed to verify quiz access.');
        setAccessData({ hasAccess: false, error: data.error });
      } else {
        setAccessData(data);
      }
    } catch (err: any) {
      setFetchError(err.message || 'Error communicating with verification registry.');
      setAccessData({ hasAccess: false, error: err.message });
    } finally {
      setLoadingAccess(false);
    }
  }, []);

  const handleAuthStateChange = (user: FirebaseUser | null, token: string | null) => {
    setCurrentUser(user);
    setCurrentToken(token);
    if (token) {
      verifyAccess(token);
    } else {
      setAccessData(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      
      {/* Breadcrumbs */}
      <Breadcrumbs 
        items={[
          { name: 'Virtual Quiz', href: '/quiz' },
          { name: 'Candidate Desk (Quiz-main)', href: '/quiz-main' }
        ]} 
      />

      <GoogleAuthGate
        requireAuthBeforeRender={true}
        title="Candidate Authentication Required"
        description="Sign in with the Google account you used to register and pay for the LexMinds Virtual Quiz to access candidate resources, the examination portal, and the official WhatsApp group."
        onAuthStateChange={handleAuthStateChange}
      >
        {/* Verification Loading State */}
        {loadingAccess && (
          <div className="p-12 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 shadow-brutal text-center space-y-4">
            <Loader2 className="w-10 h-10 animate-spin text-royal-600 dark:text-royal-400 mx-auto" />
            <h3 className="font-serif font-bold text-lg text-ink-950 dark:text-ink-50">
              Validating Candidate Docket...
            </h3>
            <p className="text-xs text-ink-500 dark:text-ink-400 font-mono max-w-sm mx-auto">
              Connecting to LexMinds central registry to verify your ₹19 payment status and candidate credentials.
            </p>
          </div>
        )}

        {/* ACCESS GRANTED: Verified Paid User */}
        {!loadingAccess && accessData?.hasAccess && (
          <div className="space-y-8">
            
            {/* Hero Banner */}
            <div className="p-6 sm:p-10 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 shadow-brutal space-y-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-royal-500/10 dark:bg-royal-500/15 blur-3xl pointer-events-none rounded-full" />

              <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono relative z-10">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-sm bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 font-bold uppercase tracking-wider text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Candidate &bull; Access Granted</span>
                </div>

                {accessData.isAdmin && (
                  <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-sm bg-amber-50 dark:bg-amber-950/60 border border-amber-300 text-amber-800 dark:text-amber-300 text-[11px] font-mono font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Admin Supervision Mode</span>
                  </span>
                )}
              </div>

              <div className="space-y-2 relative z-10">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-ink-950 dark:text-ink-50 tracking-tight leading-tight">
                  Welcome to the <span className="text-royal-600 dark:text-royal-400">LexMinds Virtual Quiz Portal</span>
                </h1>
                <p className="text-sm text-ink-600 dark:text-ink-300 leading-relaxed font-normal">
                  Candidate confirmed: <strong className="text-ink-950 dark:text-ink-50 font-semibold">{accessData.participantName || 'Scholar'}</strong> ({accessData.email}). Your registration and fee payment have been verified. Access your candidate resources below.
                </p>
              </div>

              {/* Registration Docket Ledger */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-ink-900/10 dark:border-ink-800 text-xs font-mono relative z-10">
                <div className="p-3 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700">
                  <span className="text-ink-500 dark:text-ink-400 block text-[10px] uppercase">Docket Reference</span>
                  <span className="font-bold text-royal-600 dark:text-royal-400 mt-1 block truncate">
                    {accessData.referenceId || 'CONFIRMED'}
                  </span>
                </div>
                <div className="p-3 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700">
                  <span className="text-ink-500 dark:text-ink-400 block text-[10px] uppercase">Payment Status</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400 mt-1 block flex items-center gap-1">
                    <Lock className="w-3 h-3 text-emerald-500" />
                    Paid (₹19.00)
                  </span>
                </div>
                <div className="p-3 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700">
                  <span className="text-ink-500 dark:text-ink-400 block text-[10px] uppercase">Format</span>
                  <span className="font-semibold text-ink-950 dark:text-ink-50 mt-1 block">Online MCQs</span>
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

            {/* TWO CORE CANDIDATE ACTIONS: WHATSAPP GROUP & QUIZ LINK */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* 1. WHATSAPP CANDIDATES GROUP */}
              <div className="p-6 sm:p-7 rounded-sm bg-emerald-50/70 dark:bg-emerald-950/30 border-2 border-emerald-500/40 dark:border-emerald-500/30 shadow-brutal flex flex-col justify-between space-y-6 transition-all hover:shadow-lg">
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
                      Join the private WhatsApp group exclusively reserved for paid candidates. All live updates, examination time reminders, instructions, question keys, and certificate distribution will take place inside this community.
                    </p>
                  </div>

                  <div className="space-y-2 text-xs font-mono text-emerald-900 dark:text-emerald-300 bg-white/70 dark:bg-ink-900/70 p-3 rounded border border-emerald-200 dark:border-emerald-800/60">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Live countdown and test window alerts</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Direct coordinator helpdesk support</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Post-quiz answer keys &amp; merit rankings</span>
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
              <div className="p-6 sm:p-7 rounded-sm bg-royal-50/70 dark:bg-royal-950/30 border-2 border-royal-500/40 dark:border-royal-500/30 shadow-brutal flex flex-col justify-between space-y-6 transition-all hover:shadow-lg">
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
                      Access the official examination docket. When the quiz window opens as scheduled, click below to launch the question paper and submit your responses.
                    </p>
                  </div>

                  <div className="space-y-2 text-xs font-mono text-royal-900 dark:text-royal-300 bg-white/70 dark:bg-ink-900/70 p-3 rounded border border-royal-200 dark:border-royal-800/60">
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
                      <span>Single submission per registered Google ID</span>
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

            {/* Comprehensive Competition Guidelines & Highlights */}
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
                    <li>Ensure a stable internet connection on laptop or mobile phone before launching the quiz link.</li>
                    <li>Sign in to the examination form using the same Google account ({accessData.email}).</li>
                    <li>Submit your responses before the countdown concludes; late submissions will not be logged.</li>
                    <li>Results and e-certificates will be published inside the Candidates WhatsApp Group.</li>
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
                <button
                  onClick={() => currentToken && verifyAccess(currentToken)}
                  className="flex items-center space-x-1 text-ink-500 dark:text-ink-400 hover:text-ink-900 dark:hover:text-ink-100"
                  title="Refresh Registration Status"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Refresh</span>
                </button>
              </div>
            </div>

          </div>
        )}

        {/* ACCESS DENIED: User is Authenticated, but has NOT paid ₹19 */}
        {!loadingAccess && accessData && !accessData.hasAccess && (
          <div className="p-8 sm:p-10 rounded-sm bg-surface-light dark:bg-surface-dark border-2 border-amber-500/40 dark:border-amber-500/30 shadow-brutal space-y-6 text-center">
            
            <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 flex items-center justify-center mx-auto text-amber-600 dark:text-amber-400 shadow-sm">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <div className="space-y-2 max-w-lg mx-auto">
              <h2 className="text-2xl font-serif font-bold text-ink-950 dark:text-ink-50">
                No Paid Quiz Registration Found
              </h2>
              <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-300 leading-relaxed font-normal">
                You are currently signed in as <strong className="text-ink-950 dark:text-ink-50 font-semibold">{currentUser?.email}</strong>. Our central registry does not show a completed ₹19 payment associated with this Google account.
              </p>
            </div>

            {/* Guidance Ledger */}
            <div className="max-w-md mx-auto p-4 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-800 text-left text-xs font-mono space-y-2.5 text-ink-700 dark:text-ink-300">
              <p className="font-bold text-ink-950 dark:text-ink-50 uppercase text-[10px] tracking-wider">
                Why am I seeing this?
              </p>
              <div className="flex items-start space-x-2">
                <span className="text-amber-500 font-bold">&bull;</span>
                <span>If you haven&apos;t registered yet, please complete the ₹19 participation fee to unlock this portal and the WhatsApp group.</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-amber-500 font-bold">&bull;</span>
                <span>If you completed payment with a different Google account, please click &quot;Switch Account&quot; above.</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-amber-500 font-bold">&bull;</span>
                <span>If you just paid moments ago, click &quot;Refresh Verification&quot; to re-sync with our registry.</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/quiz"
                className="w-full sm:w-auto py-3.5 px-6 btn-brand-primary text-xs uppercase tracking-wider font-semibold flex items-center justify-center space-x-2"
              >
                <span>Register &amp; Pay ₹19 for Quiz</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={() => currentToken && verifyAccess(currentToken)}
                disabled={loadingAccess}
                className="w-full sm:w-auto py-3.5 px-5 bg-paper dark:bg-ink-800 hover:bg-paper-200 dark:hover:bg-ink-700 text-ink-900 dark:text-ink-100 font-mono text-xs font-semibold rounded-sm border border-ink-900/15 dark:border-ink-700 flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingAccess ? 'animate-spin' : ''}`} />
                <span>Refresh Verification</span>
              </button>
            </div>

          </div>
        )}

      </GoogleAuthGate>

    </div>
  );
}
