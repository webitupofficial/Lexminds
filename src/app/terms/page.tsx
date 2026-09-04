import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Scale, CheckCircle2, AlertCircle, FileCheck } from 'lucide-react';

export const metadata = {
  title: 'Terms of Publication & Use | LexMinds',
  description: 'Terms and conditions of use for LexMinds legal scholarship platform.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <Breadcrumbs items={[{ name: 'Terms of Service' }]} />

      <div className="space-y-3 border-b border-ink-900/15 dark:border-ink-700 pb-8">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-royal-500 dark:text-royal-400">
          User Agreement &bull; Governance
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-ink-950 dark:text-ink-50">
          Terms &amp; Conditions
        </h1>
        <p className="text-xs sm:text-sm text-ink-500 dark:text-ink-400 font-mono">
          Last updated: September 2026 &bull; General Platform Terms
        </p>
      </div>

      <div className="p-8 sm:p-12 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 space-y-8 text-sm text-ink-700 dark:text-ink-300 leading-relaxed shadow-brutal">
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5">
            <Scale className="w-5 h-5 text-royal-500 dark:text-royal-400" />
            <span>1. Platform Purpose &amp; Academic Scope</span>
          </h2>
          <p>
            LexMinds is an academic research and student legal scholarship platform. The content, articles, and commentaries hosted on this website are published strictly for educational and scholarly purposes and do not constitute formal legal advice or attorney-client representation.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5">
            <FileCheck className="w-5 h-5 text-royal-500 dark:text-royal-400" />
            <span>2. Intellectual Property &amp; Authorship</span>
          </h2>
          <p>
            Authors submitting manuscripts to the LexMinds Law Journal affirm that their submissions represent original, unplagiarized scholarship. Published works are shared under open-access principles with full academic attribution to the respective authors.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5">
            <CheckCircle2 className="w-5 h-5 text-royal-500 dark:text-royal-400" />
            <span>3. Fellowship Applications &amp; Evaluation</span>
          </h2>
          <p>
            Submissions for research fellowships undergo non-discriminatory evaluation based on academic credentials, writing capability, and merit. Evaluation fees cover administrative processing and editorial assessments.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5">
            <AlertCircle className="w-5 h-5 text-royal-500 dark:text-royal-400" />
            <span>4. Changes to Terms</span>
          </h2>
          <p>
            We may amend these general terms periodically to reflect institutional updates. Continued use of the platform constitutes agreement with the revised terms.
          </p>
        </section>
      </div>
    </div>
  );
}
