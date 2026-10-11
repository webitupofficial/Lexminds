'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Trophy, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Sparkles,
  Award,
  Globe,
  Check,
  FileCheck2,
  Gift,
  BookOpen,
  AlertTriangle
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import QuizInstructionsBanner from '@/components/QuizInstructionsBanner';

export default function QuizClient() {

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ name: 'Virtual Quiz', href: '/quiz' }]} />

      {/* Prominent Quick-Access Header for Returning Paid Candidates */}
      <div className="p-4 sm:p-5 rounded-sm bg-gradient-to-r from-emerald-500/15 via-emerald-500/10 to-transparent border-2 border-emerald-600/50 dark:border-emerald-500/50 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-sm bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block">
              Returning Candidate Portal
            </span>
            <h2 className="text-sm sm:text-base font-serif font-bold text-ink-950 dark:text-ink-50">
              Already completed your ₹19 registration payment?
            </h2>
            <p className="text-xs text-ink-600 dark:text-ink-300 font-mono">
              Access your Candidate Dashboard, official WhatsApp group, and the Quiz Examination link directly.
            </p>
          </div>
        </div>

        <Link
          href="/quiz-main"
          id="btn-quiz-dashboard"
          className="inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-sm bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg shrink-0"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Access Quiz Dashboard</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Header Banner */}
      <div className="p-6 sm:p-10 md:p-12 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 shadow-brutal space-y-6">
        
        {/* Category & Status Pill */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-sm bg-royal-50 dark:bg-royal-950/40 border border-royal-200 dark:border-royal-800 text-royal-600 dark:text-royal-400 font-bold uppercase tracking-wider text-[11px]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Virtual Competition &bull; 2026 Edition</span>
          </div>

          <div className="flex items-center space-x-1.5 text-rose-600 dark:text-rose-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span>Registrations Closed</span>
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-ink-950 dark:text-ink-50 tracking-tight leading-tight">
            LexMinds <span className="text-royal-500 dark:text-royal-400">Virtual Quiz Competition</span>
          </h1>
          <p className="text-sm sm:text-base text-ink-600 dark:text-ink-300 leading-relaxed max-w-2xl font-normal">
            Registrations for the Legal Awareness Quiz Competition are now officially closed. The quiz will take place today, <strong className="text-royal-600 dark:text-royal-400 font-bold">11 October 2026, from 12:00 PM to 1:00 PM (IST)</strong>.
          </p>
        </div>

        {/* Quick Facts Ledger Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-ink-900/10 dark:border-ink-800 text-xs font-mono">
          <div className="p-3 sm:p-4 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700">
            <span className="text-ink-500 dark:text-ink-400 block text-[10px] uppercase">Format &amp; Time</span>
            <span className="font-semibold text-ink-950 dark:text-ink-50 mt-1 block flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-royal-500" />
              25 MCQs &bull; 12 PM – 1 PM
            </span>
          </div>
          <div className="p-3 sm:p-4 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700">
            <span className="text-ink-500 dark:text-ink-400 block text-[10px] uppercase">Level &amp; Syllabus</span>
            <span className="font-semibold text-ink-950 dark:text-ink-50 mt-1 block">General Legal Awareness</span>
          </div>
          <div className="p-3 sm:p-4 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700">
            <span className="text-ink-500 dark:text-ink-400 block text-[10px] uppercase">Registration Status</span>
            <div className="flex items-baseline space-x-1.5 mt-1">
              <span className="font-bold text-rose-600 dark:text-rose-400 text-sm">Closed</span>
              <span className="text-ink-400 text-[11px] font-mono">(Slots Full)</span>
            </div>
          </div>
          <div className="p-3 sm:p-4 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700">
            <span className="text-ink-500 dark:text-ink-400 block text-[10px] uppercase">Awards &amp; Recognition</span>
            <span className="font-semibold text-ink-950 dark:text-ink-50 mt-1 block flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              Prize &amp; Certificates
            </span>
          </div>
        </div>

      </div>

      {/* Main Registration Form Card */}
      <div className="p-6 sm:p-10 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 shadow-brutal space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-ink-900/15 dark:border-ink-700 pb-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-sm bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 flex items-center justify-center text-rose-600 dark:text-rose-400 shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-ink-950 dark:text-ink-50">
                Registrations are Closed
              </h2>
              <p className="text-xs text-ink-500 dark:text-ink-400 font-mono">
                The registration window for the Legal Awareness Quiz Competition has officially concluded.
              </p>
            </div>
          </div>

          <Link
            href="/quiz-main"
            className="self-start sm:self-auto inline-flex items-center space-x-2 px-5 py-2.5 rounded-sm bg-emerald-600 hover:bg-emerald-700 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-md shrink-0"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Go to Candidate Desk &rarr;</span>
          </Link>
        </div>

        {/* Notice for Registered Participants */}
        <div className="p-4 rounded-sm bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-800 space-y-2 text-xs font-mono">
          <p className="font-semibold text-ink-950 dark:text-ink-50 flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Information for Registered Candidates</span>
          </p>
          <p className="text-ink-600 dark:text-ink-300 font-mono text-[11px] leading-relaxed">
            If you have already registered and paid the ₹19 registration fee, proceed to the <strong>Quiz Candidate Desk</strong> (<Link href="/quiz-main" className="text-royal-600 dark:text-royal-400 underline font-semibold">/quiz-main</Link>) to access your candidate docket, WhatsApp group, and the examination link.
          </p>
        </div>

        <div className="pt-2">
          <QuizInstructionsBanner showBorder={false} className="p-0 sm:p-0 md:p-0 bg-transparent dark:bg-transparent" />
        </div>

      </div>

      {/* Comprehensive Examination Guidelines & Protocol */}
      <div className="p-6 sm:p-10 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 shadow-brutal space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-ink-900/10 dark:border-ink-800">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-sm bg-royal-50 dark:bg-royal-950/50 border border-royal-200 dark:border-royal-800 flex items-center justify-center text-royal-600 dark:text-royal-400 shrink-0">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-ink-950 dark:text-ink-50">
                Examination Guidelines &amp; Protocol
              </h3>
              <p className="text-xs text-ink-500 dark:text-ink-400 font-mono">
                Official scope, test parameters, syllabus, and participant offerings.
              </p>
            </div>
          </div>
          <span className="self-start sm:self-auto px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-royal-50 dark:bg-royal-950/60 text-royal-700 dark:text-royal-300 border border-royal-200 dark:border-royal-800">
            2026 Virtual Edition
          </span>
        </div>

        {/* 4 Key Parameter Cards: Format, Schedule, Difficulty, Scope */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3.5 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 space-y-1">
            <span className="text-ink-500 dark:text-ink-400 block text-[10px] uppercase">Format &amp; Time</span>
            <span className="font-bold text-ink-950 dark:text-ink-50 text-sm block">25 MCQs &bull; 30 Mins</span>
            <span className="text-[11px] text-ink-500">Strict timed online window</span>
          </div>

          <div className="p-3.5 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 space-y-1">
            <span className="text-ink-500 dark:text-ink-400 block text-[10px] uppercase">Examination Window</span>
            <span className="font-bold text-ink-950 dark:text-ink-50 text-sm block">11 Oct, 12 PM – 1 PM</span>
            <span className="text-[11px] text-ink-500">12:00 PM to 1:00 PM (IST)</span>
          </div>

          <div className="p-3.5 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 space-y-1">
            <span className="text-ink-500 dark:text-ink-400 block text-[10px] uppercase">Difficulty Level</span>
            <span className="font-bold text-ink-950 dark:text-ink-50 text-sm block">Easy to Medium</span>
            <span className="text-[11px] text-ink-500">+ 4–5 tricky analytical Qs</span>
          </div>

          <div className="p-3.5 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 space-y-1">
            <span className="text-ink-500 dark:text-ink-400 block text-[10px] uppercase">Syllabus Scope</span>
            <span className="font-bold text-royal-600 dark:text-royal-400 text-sm block">General Legal Awareness</span>
            <span className="text-[11px] text-ink-500">Civic &amp; constitutional law</span>
          </div>
        </div>

        {/* Detailed 2-Column Ledger: Syllabus Breakdown & LexMinds Offerings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
          
          {/* Column 1: Scope & Syllabus */}
          <div className="p-5 rounded-sm bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 space-y-3">
            <h4 className="font-serif font-bold text-ink-950 dark:text-ink-50 text-base flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-royal-600 dark:text-royal-400" />
              <span>Syllabus &amp; Question Coverage</span>
            </h4>
            <p className="text-xs text-ink-600 dark:text-ink-300 leading-relaxed font-normal">
              Formulated to evaluate legal acumen, fundamental principles, and general awareness:
            </p>
            <ul className="space-y-2 text-xs font-mono text-ink-800 dark:text-ink-200">
              <li className="flex items-start space-x-2">
                <Check className="w-3.5 h-3.5 text-royal-500 shrink-0 mt-0.5" />
                <span><strong>Core Constitutional Fundamentals:</strong> Fundamental Rights, Directive Principles, and Basic Structure.</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="w-3.5 h-3.5 text-royal-500 shrink-0 mt-0.5" />
                <span><strong>Landmark Judicial Precedents:</strong> Landmark Supreme Court of India judgments and doctrines.</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="w-3.5 h-3.5 text-royal-500 shrink-0 mt-0.5" />
                <span><strong>Contemporary Legal Awareness:</strong> Modern statutory updates (BNS, BNSS, BSA) &amp; tech jurisprudence.</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="w-3.5 h-3.5 text-royal-500 shrink-0 mt-0.5" />
                <span><strong>Analytical Problem-Solving:</strong> 4–5 tricky questions designed to test candidate sharpness.</span>
              </li>
            </ul>
          </div>

          {/* Column 2: What Are The Offerings From Us */}
          <div className="p-5 rounded-sm bg-emerald-50/50 dark:bg-emerald-950/20 border-2 border-emerald-500/30 dark:border-emerald-500/20 space-y-3">
            <h4 className="font-serif font-bold text-ink-950 dark:text-ink-50 text-base flex items-center space-x-2">
              <Gift className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Official Offerings &amp; Rewards from Us</span>
            </h4>
            <p className="text-xs text-ink-600 dark:text-ink-300 leading-relaxed font-normal">
              Every candidate gains verifiable academic credentialing and competition rewards:
            </p>
            <ul className="space-y-2.5 text-xs font-mono">
              <li className="p-2.5 bg-white dark:bg-ink-900 rounded border border-emerald-200 dark:border-emerald-800/60 flex items-start space-x-2.5">
                <Trophy className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-ink-950 dark:text-ink-50 block">Exclusive Prize for Winner:</strong>
                  <span className="text-ink-600 dark:text-ink-300 text-[11px]">The top Winner will receive an exclusive official Prize from Us (LexMinds India) with merit recognition!</span>
                </div>
              </li>
              <li className="p-2.5 bg-white dark:bg-ink-900 rounded border border-emerald-200 dark:border-emerald-800/60 flex items-start space-x-2.5">
                <Award className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-ink-950 dark:text-ink-50 block">Certificate of Participation for All:</strong>
                  <span className="text-ink-600 dark:text-ink-300 text-[11px]">Every registered candidate who attends and submits the quiz will receive an official verifiable digital Certificate of Participation.</span>
                </div>
              </li>
              <li className="p-2.5 bg-white dark:bg-ink-900 rounded border border-emerald-200 dark:border-emerald-800/60 flex items-start space-x-2.5">
                <ShieldCheck className="w-4 h-4 text-royal-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-ink-950 dark:text-ink-50 block">Candidate Desk &amp; WhatsApp Group:</strong>
                  <span className="text-ink-600 dark:text-ink-300 text-[11px]">Direct coordinator support, live countdown reminders, and candidate docket access.</span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Important Participation Rules & Amendment Rights */}
        <div className="p-4 bg-amber-50/80 dark:bg-amber-950/40 border border-amber-400 dark:border-amber-700/60 rounded-sm text-xs font-mono space-y-2">
          <div className="flex items-center space-x-2 font-bold uppercase text-[11px] text-amber-900 dark:text-amber-300">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>Crucial Rules &amp; Institutional Governance</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] text-amber-950 dark:text-amber-100 leading-relaxed">
            <div>
              <strong>Single-ID Winner Rule:</strong> A person with one ID is eligible for the Post of Winner. Any person attempting or submitting with multiple IDs will be disqualified from the quiz.
            </div>
            <div>
              <strong>Amendment Rights:</strong> Terms and conditions are subject to change according to operational needs. We reserve full rights to change or make amendments without prior notice.
            </div>
          </div>
        </div>

        {/* Official Governance Link */}
        <div className="pt-3 border-t border-ink-900/10 dark:border-ink-800 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          <span className="text-ink-500 dark:text-ink-400">Official Competition Governance:</span>
          <Link
            href="/quiz/terms"
            target="_blank"
            className="text-royal-600 dark:text-royal-400 hover:underline font-semibold flex items-center space-x-1"
          >
            <span>Read Complete Terms &amp; Conditions for Quiz &rarr;</span>
          </Link>
        </div>

      </div>

    </div>
  );
}
