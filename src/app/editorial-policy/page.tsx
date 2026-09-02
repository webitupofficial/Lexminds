import React from 'react';
import Link from 'next/link';
import { 
  Scale, 
  ShieldCheck, 
  FileCheck2, 
  BookOpen, 
  Quote, 
  AlertTriangle, 
  CheckCircle2, 
  Lock, 
  ArrowRight 
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: 'Editorial Policy & Publication Ethics | LexMinds Law Review',
  description: 'Detailed guidelines on double-blind peer review, plagiarism thresholds, Bluebook citation formatting, and author copyright terms for LexMinds.',
  alternates: {
    canonical: 'https://lexminds.in/editorial-policy',
  },
};

export default function EditorialPolicyPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10 sm:space-y-12">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ name: 'Editorial Policy & Ethics', href: '/editorial-policy' }]} />

      {/* Header */}
      <div className="border-b border-slate-200 dark:border-legal-800 pb-6 space-y-3">
        <span className="text-[11px] font-bold uppercase tracking-widest text-gold-700 dark:text-gold-400 bg-gold-50 dark:bg-gold-950/80 px-3 py-1 rounded border border-gold-500/20">
          Academic Integrity &amp; COPE Standards
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">
          Editorial Policy &amp; Publication Ethics
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          The LexMinds Law Review adheres to the highest standards of academic publishing, following the principles set forth by the Committee on Publication Ethics (COPE).
        </p>
      </div>

      {/* Policy Sections */}
      <div className="space-y-8 sm:space-y-10 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        
        {/* 1. Double-Blind Peer Review */}
        <section className="neumorph-card rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-gold-700 dark:text-gold-400" />
            <span>1. Double-Blind Peer Review Mechanism</span>
          </h2>
          <p>
            To guarantee complete impartiality, all submitted manuscripts undergo a rigorous double-blind peer review process:
          </p>
          <ul className="space-y-2 list-disc list-inside text-slate-600 dark:text-slate-400">
            <li>The identities of both the author(s) and peer reviewers remain undisclosed to each other throughout the review cycle.</li>
            <li>Initial screening is performed by the Executive Editorial Board to verify relevance, preliminary formatting, and thematic coherence.</li>
            <li>Submissions passing initial triage are assigned to two independent faculty reviewers or specialized legal practitioners.</li>
            <li>Review outcomes are categorized as: <em>(a) Accepted without revisions, (b) Accepted subject to minor amendments, (c) Resubmit for second review after major revisions, or (d) Rejected.</em></li>
          </ul>
        </section>

        {/* 2. Plagiarism Policy */}
        <section id="plagiarism" className="neumorph-card rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <FileCheck2 className="w-5 h-5 text-gold-700 dark:text-gold-400" />
            <span>2. Strict Anti-Plagiarism &amp; AI Disclosure Threshold</span>
          </h2>
          <p>
            Academic originality is non-negotiable at LexMinds:
          </p>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-legal-950 border border-slate-200 dark:border-legal-800 space-y-2">
            <div className="flex items-center space-x-2 text-rose-600 dark:text-rose-400 font-bold text-xs">
              <AlertTriangle className="w-4 h-4" />
              <span>Similarity Index Limit: Maximum 10%</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              Every manuscript is scanned via Turnitin and iThenticate. Submissions showing a similarity index exceeding 10% (excluding direct statutory citations and references) will be immediately returned for rewriting or rejected.
            </p>
          </div>
          <p>
            <strong>Generative AI Policy:</strong> The use of LLMs or AI assistants for core legal analysis or drafting must be explicitly declared in the methodology section. Purely AI-generated text without substantial human scholarship will not be published.
          </p>
        </section>

        {/* 3. Citation Standards */}
        <section id="citation-guide" className="neumorph-card rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <Quote className="w-5 h-5 text-gold-700 dark:text-gold-400" />
            <span>3. Citation &amp; Footnoting Standards</span>
          </h2>
          <p>
            All manuscripts must adhere strictly to uniform legal citation formats:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-legal-950 border border-slate-200 dark:border-legal-800 space-y-1">
              <h4 className="font-bold text-gold-700 dark:text-gold-400 text-xs">The Bluebook (21st Edition)</h4>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                Preferred for corporate law, antitrust, and comparative constitutional treatises.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-legal-950 border border-slate-200 dark:border-legal-800 space-y-1">
              <h4 className="font-bold text-gold-700 dark:text-gold-400 text-xs">OSCOLA (4th Edition)</h4>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                Accepted for international human rights, public international law, and arbitration papers.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Copyright & Open Access */}
        <section className="neumorph-card rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <Lock className="w-5 h-5 text-gold-700 dark:text-gold-400" />
            <span>4. Author Rights &amp; Open Access Licensing</span>
          </h2>
          <p>
            LexMinds champions open-access legal knowledge:
          </p>
          <ul className="space-y-2 list-disc list-inside text-slate-600 dark:text-slate-400">
            <li>Authors retain moral and intellectual copyright of their published treatises.</li>
            <li>Articles are distributed under the Creative Commons Attribution 4.0 International (CC BY 4.0) License.</li>
            <li>Authors receive an official high-resolution Certificate of Publication and permanent archival URL (<code>https://lexminds.in/articles/[slug]</code>).</li>
          </ul>
        </section>

      </div>

      {/* CTA Box */}
      <div className="p-8 rounded-3xl neumorph-card border border-slate-200 dark:border-gold-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-white">Have a manuscript ready for submission?</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Review process takes 4-7 business days with verified feedback.</p>
        </div>
        <Link
          href="/publish"
          className="px-6 py-3 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm dark:shadow-glow-gold transition-all shrink-0"
        >
          Submit Manuscript Now
        </Link>
      </div>

    </div>
  );
}
