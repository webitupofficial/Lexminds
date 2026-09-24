import React from 'react';
import type { Metadata } from 'next';
import ContactClient from './ContactClient';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Contact Academic & Editorial Desk | Lex Minds',
  description:
    'Contact Lex Minds student editorial council, fellowship coordinators, and academic operations desk for internship inquiries, manuscript reviews, or institutional partnerships.',
  keywords: [
    'Contact Lex Minds',
    'Lex Minds Email',
    'Legal Internship Inquiries',
    'Student Law Review Contact',
    'Lex Minds Office',
    'Legal Education Support India',
  ],
  alternates: {
    canonical: 'https://lexminds.in/contact',
  },
  openGraph: {
    title: 'Contact Academic & Editorial Desk | Lex Minds',
    description:
      'Contact Lex Minds student editorial council and fellowship coordinators for inquiries, credential verification, and manuscript reviews.',
    url: 'https://lexminds.in/contact',
    siteName: 'Lex Minds',
  },
  twitter: {
    card: 'summary',
    title: 'Contact Academic & Editorial Desk | Lex Minds',
    description:
      'Contact Lex Minds student editorial council and fellowship coordinators for inquiries, credential verification, and manuscript reviews.',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does Lex Minds structure and evaluate fellowship cohorts?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fellowships are structured by senior student editors. Fellows receive directed guidance in statutory interpretation, case digest drafting, and citation standardization under OSCOLA and Bluebook rules.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the standard turnaround time for article submissions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Initial manuscript intake screening takes 3-5 business days. Evaluation by the student editorial board takes 7-10 business days, after which authors receive written editorial notes and publication decisions.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are certificates of publication and fellowship credentials verifiable by universities?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Every publication docket and fellowship completion letter issued via Lex Minds contains a unique, tamper-evident alphanumeric reference code verifiable with our academic desk.',
      },
    },
    {
      '@type': 'Question',
      name: 'How are evaluation and application fees processed?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'All fees are securely processed via Razorpay with instant support for UPI (Google Pay, PhonePe, Paytm), Debit/Credit Cards, and Net Banking with immediate receipt generation.',
      },
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <ContactClient />
    </>
  );
}
