import React from 'react';
import type { Metadata } from 'next';
import InternshipsClient from './InternshipsClient';

export const metadata: Metadata = {
  title: 'Legal Internships & Practical Learning Programmes in India',
  description:
    'Apply for verified student legal internships, legal media cohorts, and research fellowships in India. Hands-on learning in legal research, content creation, and statutory drafting with certified mentorship.',
  keywords: [
    'Legal Internships India',
    'Law Student Internship 2026',
    'Online Legal Internship',
    'Legal Research Fellowship',
    'Legal Media Internship',
    'Law Internships for Law Students',
    'Lex Minds Internship',
    'Legal Drafting Workshop',
  ],
  alternates: {
    canonical: 'https://lexminds.in/internships',
  },
  openGraph: {
    title: 'Legal Internships & Practical Learning Programmes | Lex Minds',
    description:
      'Verified online legal internships, practical media cohorts, and research fellowships for law students across India.',
    url: 'https://lexminds.in/internships',
    siteName: 'Lex Minds',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Legal Internships & Practical Learning Programmes | Lex Minds',
    description:
      'Verified online legal internships, practical media cohorts, and research fellowships for law students across India.',
  },
};

export default function InternshipsPage() {
  return <InternshipsClient />;
}
