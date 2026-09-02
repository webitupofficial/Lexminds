import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Scale, CheckCircle2, AlertCircle, FileCheck } from 'lucide-react';

export const metadata = {
  title: 'Terms & Conditions | LexMinds',
  description: 'General terms and conditions of use for LexMinds platform.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <Breadcrumbs items={[{ name: 'Terms of Service' }]} />

      <div className="space-y-3 border-b border-slate-200 dark:border-white/10 pb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-gold-600 dark:text-gold-400">
          User Agreement
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 dark:text-white">
          Terms &amp; Conditions
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Last updated: September 2026 &bull; General Platform Terms
        </p>
      </div>

      <div className="clay-card rounded-3xl p-6 sm:p-10 space-y-8 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-serif font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <Scale className="w-4 h-4 text-gold-600 dark:text-gold-400" />
            <span>1. Platform Purpose &amp; Academic Scope</span>
          </h2>
          <p>
            LexMinds is an academic research and legal scholarship platform. The content, articles, and commentaries hosted on this website are published strictly for educational and informational purposes and do not constitute legal advice or formal attorney-client representation.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-serif font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <FileCheck className="w-4 h-4 text-gold-600 dark:text-gold-400" />
            <span>2. Intellectual Property &amp; Authorship</span>
          </h2>
          <p>
            Authors submitting manuscripts to the LexMinds Law Review affirm that their submissions represent original, unplagiarized scholarship. Published works are shared under open-access principles with full academic attribution to the respective authors.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-serif font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-gold-600 dark:text-gold-400" />
            <span>3. Fellowship Applications &amp; Evaluation</span>
          </h2>
          <p>
            Submissions for research fellowships undergo non-discriminatory evaluation based on academic credentials, writing capability, and merit. Evaluation fees cover administrative processing and peer assessments.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-serif font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-gold-600 dark:text-gold-400" />
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
