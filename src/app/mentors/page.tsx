import React from 'react';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import MentorsClient from './MentorsClient';
import { MENTORS_DATA } from '@/lib/mentors-data';
import { Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Mentors & Faculty Advisory Council | Lex Minds',
  description:
    'Connect with experienced legal mentors, advocates, and academic scholars for guidance in legal research, analytical writing, and practical legal jurisprudence.',
  alternates: {
    canonical: 'https://lexminds.in/mentors',
  },
  openGraph: {
    title: 'Mentors & Faculty Advisory Council | Lex Minds',
    description:
      'Distinguished legal mentors and scholars providing guidance for law students and researchers.',
    url: 'https://lexminds.in/mentors',
    siteName: 'Lex Minds',
    images: [
      {
        url: '/icon.svg',
        width: 800,
        height: 800,
        alt: 'Lex Minds Gavel Insignia',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Mentors & Faculty Advisory Council | Lex Minds',
    description:
      'Distinguished legal mentors and scholars providing guidance for law students and researchers.',
    images: ['/icon.svg'],
  },
};

export default function MentorsPage() {
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Lex Minds Mentors & Faculty Advisory Council',
    description: 'Distinguished legal mentors and advisors at Lex Minds.',
    url: 'https://lexminds.in/mentors',
    numberOfItems: MENTORS_DATA.length,
    itemListElement: MENTORS_DATA.map((mentor, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Person',
        name: mentor.name,
        jobTitle: mentor.designation,
        worksFor: mentor.organization
          ? {
              '@type': 'Organization',
              name: mentor.organization,
            }
          : undefined,
        description: mentor.bio,
      },
    })),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <JsonLd data={jsonLdData} />

      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ name: 'Mentors & Faculty', href: '/mentors' }]} />

      {/* Hero Section */}
      <div className="p-8 sm:p-12 md:p-14 bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 rounded-sm shadow-brutal space-y-5 relative overflow-hidden">
        
        {/* Ambient subtle glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-royal-500/10 dark:bg-royal-500/15 blur-3xl pointer-events-none rounded-full" />

        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-sm bg-royal-50 dark:bg-royal-950/60 border border-royal-200 dark:border-royal-800 text-royal-700 dark:text-royal-300 text-[11px] font-mono font-bold uppercase tracking-wider">
          <Users className="w-3.5 h-3.5" />
          <span>Faculty &amp; Advisory Council &bull; Lex Minds</span>
        </div>

        <div className="space-y-3 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-ink-950 dark:text-ink-50 tracking-tight leading-tight">
            Mentors &amp; Faculty Advisory Council
          </h1>
          <p className="text-sm sm:text-base text-ink-600 dark:text-ink-300 leading-relaxed font-normal">
            Bridging academic legal scholarship with practical legal education and courtroom insight. Connect with experienced mentors for guidance in legal research, analytical writing, and professional legal development.
          </p>
        </div>
      </div>

      {/* Main Clean Mentors Grid */}
      <MentorsClient initialMentors={MENTORS_DATA} />

    </div>
  );
}
