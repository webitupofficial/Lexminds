import React from 'react';
import type { Metadata } from 'next';
import RightsClient from './RightsClient';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Data Principal Rights & Redressal Center | DPDP Act 2023 | Lex Minds',
  description:
    'Exercise your statutory rights under India’s Digital Personal Data Protection Act, 2023 (DPDP Act). Request personal data access, correction, erasure, consent withdrawal, or grievance redressal with Lex Minds.',
  alternates: {
    canonical: 'https://lexminds.in/privacy/rights',
  },
  openGraph: {
    title: 'Data Principal Rights & Redressal Center | DPDP Act 2023 | Lex Minds',
    description:
      'Exercise your statutory data protection rights under Sections 11, 12, 13, and 14 of the Digital Personal Data Protection Act, 2023.',
    url: 'https://lexminds.in/privacy/rights',
    siteName: 'Lex Minds',
  },
};

const dpdpSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Data Principal Rights & Redressal Portal (DPDP Act, 2023)',
  description:
    'Official self-service compliance portal enabling users to exercise Data Principal rights under India’s Digital Personal Data Protection Act, 2023.',
  url: 'https://lexminds.in/privacy/rights',
  publisher: {
    '@type': 'Organization',
    name: 'Lex Minds',
    url: 'https://lexminds.in',
  },
};

export default function RightsPage() {
  return (
    <>
      <JsonLd data={dpdpSchema} />
      <RightsClient />
    </>
  );
}
