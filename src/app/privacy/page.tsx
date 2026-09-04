import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | LexMinds',
  description: 'General Privacy Policy and data handling practices for LexMinds legal scholarship initiative.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <Breadcrumbs items={[{ name: 'Privacy Policy' }]} />

      <div className="space-y-3 border-b border-ink-900/15 dark:border-ink-700 pb-8">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-royal-500 dark:text-royal-400">
          Transparency &amp; Governance
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-ink-950 dark:text-ink-50">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-ink-500 dark:text-ink-400 font-mono">
          Last updated: September 2026 &bull; General Policy Framework
        </p>
      </div>

      <div className="p-8 sm:p-12 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 space-y-8 text-sm text-ink-700 dark:text-ink-300 leading-relaxed shadow-brutal">
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5">
            <Eye className="w-5 h-5 text-royal-500 dark:text-royal-400" />
            <span>1. Information We Collect</span>
          </h2>
          <p>
            When you interact with LexMinds, we may collect basic information required to process fellowship applications, research manuscript submissions, or general inquiries:
          </p>
          <ul className="list-disc list-inside space-y-2 text-ink-600 dark:text-ink-400 pl-2">
            <li><strong>Contact Details:</strong> Full name, verified institutional email address, phone number, and affiliated academic institution.</li>
            <li><strong>Application Data:</strong> Statement of Purpose (SOP), academic standing / year of study, research interests, and manuscript drafts. <em>(Note: The current portal does not collect, store, or require CVs or resumes.)</em></li>
            <li><strong>Transaction Identifiers:</strong> Razorpay payment reference IDs and order tokens (we do not store credit card, debit card, or UPI credentials).</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5">
            <Lock className="w-5 h-5 text-royal-500 dark:text-royal-400" />
            <span>2. Purpose &amp; Use of Information</span>
          </h2>
          <p>
            Your information is utilized strictly for academic evaluation, editorial review coordination, fellowship cohort shortlisting, and responding to your direct inquiries. We do not sell, rent, or trade personal applicant data to third parties.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5">
            <ShieldCheck className="w-5 h-5 text-royal-500 dark:text-royal-400" />
            <span>3. Data Security &amp; Retention</span>
          </h2>
          <p>
            We implement standard encryption protocols, HTTPS transmission, and administrative safeguards to protect your personal information against unauthorized access, loss, or alteration.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5">
            <FileText className="w-5 h-5 text-royal-500 dark:text-royal-400" />
            <span>4. Contact Regarding Privacy</span>
          </h2>
          <p>
            For any queries, data removal requests, or clarifications regarding this privacy policy, please contact the secretariat at <strong className="text-royal-600 dark:text-royal-400 font-mono">editorial@lexminds.in</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
