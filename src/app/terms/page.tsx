import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Scale, CheckCircle2, AlertCircle, FileCheck } from 'lucide-react';

export const metadata = {
  title: 'Terms of Publication & Use | LexMinds',
  description: 'Terms and conditions of use for LexMinds legal scholarship platform.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <Breadcrumbs items={[{ name: 'Terms of Service' }]} />

      <div className="space-y-2 border-b border-ink-300 dark:border-ink-700 pb-6">
        <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-oxblood-700 dark:text-oxblood-400">
          User Agreement
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-ink-950 dark:text-white">
          Terms &amp; Conditions
        </h1>
        <p className="text-xs sm:text-sm text-ink-500 dark:text-ink-400 font-mono">
          Last updated: September 2026 &bull; General Platform Terms
        </p>
      </div>

      <div className="editorial-card rounded-sm p-6 sm:p-10 space-y-8 text-xs sm:text-sm text-ink-700 dark:text-ink-300 leading-relaxed bg-white dark:bg-ink-850 border border-ink-200 dark:border-ink-800">
        <section className="space-y-3">
          <h2 className="text-lg font-serif font-bold text-ink-950 dark:text-white flex items-center space-x-2">
            <Scale className="w-4 h-4 text-oxblood-700 dark:text-oxblood-400" />
            <span>1. Platform Purpose &amp; Academic Scope</span>
          </h2>
          <p>
            LexMinds is an academic research and student legal scholarship platform. The content, articles, and commentaries hosted on this website are published strictly for educational and scholarly purposes and do not constitute formal legal advice or attorney-client representation.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-serif font-bold text-ink-950 dark:text-white flex items-center space-x-2">
            <FileCheck className="w-4 h-4 text-oxblood-700 dark:text-oxblood-400" />
            <span>2. Intellectual Property &amp; Authorship</span>
          </h2>
          <p>
            Authors submitting manuscripts to the LexMinds Law Review affirm that their submissions represent original, unplagiarized scholarship. Published works are shared under open-access principles with full academic attribution to the respective authors.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-serif font-bold text-ink-950 dark:text-white flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-oxblood-700 dark:text-oxblood-400" />
            <span>3. Fellowship Applications &amp; Evaluation</span>
          </h2>
          <p>
            Submissions for research fellowships undergo non-discriminatory evaluation based on academic credentials, writing capability, and merit. Evaluation fees cover administrative processing and editorial assessments.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-serif font-bold text-ink-950 dark:text-white flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-oxblood-700 dark:text-oxblood-400" />
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
