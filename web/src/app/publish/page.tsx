import React from 'react';
import type { Metadata } from 'next';
import PublishClient from './PublishClient';

export const metadata: Metadata = {
  title: 'Call For Papers & Manuscript Submission | Lex Minds Law Review',
  description:
    'Submit your legal research papers, case commentaries, and statutory analyses to the Lex Minds Law Journal. Structured peer-review, citation verification, and academic publication docket.',
  keywords: [
    'Publish Law Paper',
    'Call for Papers Law 2026',
    'Legal Journal Submission India',
    'Law Student Publication',
    'Case Commentary Submission',
    'Lex Minds Journal',
    'Submit Legal Manuscript',
  ],
  alternates: {
    canonical: 'https://lexminds.in/publish',
  },
  openGraph: {
    title: 'Call For Papers & Manuscript Submission | Lex Minds',
    description:
      'Submit your legal research papers, case commentaries, and statutory analyses for peer-reviewed student publication with Lex Minds.',
    url: 'https://lexminds.in/publish',
    siteName: 'Lex Minds Law Review',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Call For Papers & Manuscript Submission | Lex Minds',
    description:
      'Submit your legal research papers, case commentaries, and statutory analyses for peer-reviewed student publication with Lex Minds.',
  },
};

export default function PublishPage() {
  return <PublishClient />;
}
