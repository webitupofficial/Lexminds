import React from 'react';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import PrivacyContent from './PrivacyContent';
import JsonLd from '@/components/JsonLd';
import { ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy & Data Protection Governance | DPDP Act 2023 | Lex Minds',
  description:
    'Comprehensive Privacy Policy of Lex Minds in compliance with India’s Digital Personal Data Protection Act, 2023 (DPDP Act). Notice of personal data processing, Data Principal rights, and grievance redressal.',
  alternates: {
    canonical: 'https://lexminds.in/privacy',
  },
  openGraph: {
    title: 'Privacy Policy & Data Protection Governance | DPDP Act 2023 | Lex Minds',
    description:
      'Digital Personal Data Protection Act, 2023 (DPDPA) compliance policy of Lex Minds India. Transparent notice, consent management, Data Principal statutory rights, and grievance redressal.',
    url: 'https://lexminds.in/privacy',
    siteName: 'Lex Minds',
  },
};

const dpdpPolicySchema = {
  '@context': 'https://schema.org',
  '@type': 'PrivacyPolicy',
  name: 'Lex Minds Privacy Policy and DPDP Act Governance',
  description:
    'Statutory privacy policy compliant with the Digital Personal Data Protection Act, 2023 of India.',
  url: 'https://lexminds.in/privacy',
  publisher: {
    '@type': 'Organization',
    name: 'Lex Minds',
    url: 'https://lexminds.in',
  },
};

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={dpdpPolicySchema} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
        <Breadcrumbs items={[{ name: 'Privacy Policy' }]} />

        {/* Header */}
        <div className="space-y-3 border-b border-ink-900/15 dark:border-ink-700 pb-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-sm bg-royal-50 dark:bg-royal-950/40 border border-royal-200 dark:border-royal-800 text-royal-700 dark:text-royal-300 text-[11px] font-mono font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Governance &amp; DPDP Act 2023 Data Protection</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-ink-950 dark:text-ink-50 tracking-tight">
            Privacy Policy
          </h1>
          <div className="flex flex-wrap gap-y-1 gap-x-4 text-xs font-mono text-ink-500 dark:text-ink-400">
            <span><strong>Act Alignment:</strong> DPDP Act, 2023 (India)</span>
            <span>&bull;</span>
            <span><strong>Platform:</strong> Lex Minds (https://lexminds.in)</span>
            <span>&bull;</span>
            <span>
              <strong>Grievance Email:</strong>{' '}
              <a href="mailto:lexmindsindia@gmail.com" className="text-royal-600 dark:text-royal-400 hover:underline">
                lexmindsindia@gmail.com
              </a>
            </span>
          </div>
        </div>

        <PrivacyContent />
      </div>
    </>
  );
}
