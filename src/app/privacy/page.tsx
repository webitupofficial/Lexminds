import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | LexMinds',
  description: 'General Privacy Policy and data handling practices for LexMinds legal platform.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <Breadcrumbs items={[{ name: 'Privacy Policy' }]} />

      <div className="space-y-3 border-b border-slate-200 dark:border-white/10 pb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-gold-600 dark:text-gold-400">
          Transparency &amp; Ethics
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 dark:text-white">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Last updated: September 2026 &bull; General Policy Framework
        </p>
      </div>

      <div className="clay-card rounded-3xl p-6 sm:p-10 space-y-8 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-serif font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <Eye className="w-4 h-4 text-gold-600 dark:text-gold-400" />
            <span>1. Information We Collect</span>
          </h2>
          <p>
            When you interact with LexMinds, we may collect basic information required to process fellowship applications, research manuscript submissions, or general inquiries:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-slate-600 dark:text-slate-400 pl-2">
            <li><strong>Contact Details:</strong> Full name, institutional email address, phone number, and academic institution.</li>
            <li><strong>Application Data:</strong> CV, Statement of Purpose (SOP), writing samples, and research manuscripts.</li>
            <li><strong>Transaction Identifiers:</strong> Razorpay payment reference IDs (we do not store your credit card or UPI credentials).</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-serif font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <Lock className="w-4 h-4 text-gold-600 dark:text-gold-400" />
            <span>2. Purpose &amp; Use of Information</span>
          </h2>
          <p>
            Your information is utilized strictly for academic evaluation, peer review coordination, fellowship candidate shortlisting, and responding to your direct inquiries. We do not sell, rent, or trade your personal data to third parties.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-serif font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-gold-600 dark:text-gold-400" />
            <span>3. Data Security &amp; Retention</span>
          </h2>
          <p>
            We implement standard encryption protocols and administrative safeguards to protect your personal information against unauthorized access, loss, or alteration.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-serif font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <FileText className="w-4 h-4 text-gold-600 dark:text-gold-400" />
            <span>4. Contact Regarding Privacy</span>
          </h2>
          <p>
            For any queries, data removal requests, or clarifications regarding this privacy policy, please contact us at <strong className="text-gold-600 dark:text-gold-400">contact@lexminds.in</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
