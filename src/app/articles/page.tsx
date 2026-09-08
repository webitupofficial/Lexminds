import React from 'react';
import type { Metadata } from 'next';
import ArticlesClient from './ArticlesClient';

export const metadata: Metadata = {
  title: 'Legal Articles, Treatises & Student Law Review',
  description:
    'Explore peer-reviewed legal articles, statutory analyses, and case commentaries on DPDP Act 2023, Bharatiya Nyaya Sanhita (BNS), Corporate M&A, and Intellectual Property Law.',
  keywords: [
    'Legal Articles India',
    'Student Law Review',
    'DPDP Act 2023 Analysis',
    'Bharatiya Nyaya Sanhita Commentary',
    'Legal Research Papers',
    'Law Student Publications',
    'Indian Jurisprudence Treatise',
  ],
  alternates: {
    canonical: 'https://lexminds.in/articles',
  },
  openGraph: {
    title: 'Legal Articles, Treatises & Student Law Review | Lex Minds',
    description:
      'Peer-reviewed legal articles, statutory analyses, and student research publications on emerging Indian jurisprudence.',
    url: 'https://lexminds.in/articles',
    siteName: 'Lex Minds Law Review',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Legal Articles, Treatises & Student Law Review | Lex Minds',
    description:
      'Peer-reviewed legal articles, statutory analyses, and student research publications on emerging Indian jurisprudence.',
  },
};

export default function ArticlesPage() {
  return <ArticlesClient />;
}
