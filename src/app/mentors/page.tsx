import React from 'react';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import MentorsClient from './MentorsClient';
import { MENTORS_DATA } from '@/lib/mentors-data';
import { Scale, Users, Sparkles, Award, GraduationCap, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Mentors & Faculty Advisory Council | LexMinds India',
  description:
    'Connect with distinguished Senior Advocates, Tier-1 Law Firm Partners, and NLU Faculty members for 1:1 clinical guidance, appellate drafting, and legal research publication mentorship.',
  alternates: {
    canonical: 'https://lexminds.in/mentors',
  },
  openGraph: {
    title: 'Mentors & Faculty Advisory Council | LexMinds India',
    description:
      'Distinguished Senior Advocates, Tier-1 Partners, and NLU Professors providing 1:1 clinical guidance for law students and researchers.',
    url: 'https://lexminds.in/mentors',
    siteName: 'LexMinds India',
    images: [
      {
        url: '/icon.svg',
        width: 800,
        height: 800,
        alt: 'LexMinds Gavel Insignia',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Mentors & Faculty Advisory Council | LexMinds India',
    description:
      'Distinguished Senior Advocates, Tier-1 Partners, and NLU Professors providing 1:1 clinical guidance for law students and researchers.',
    images: ['/icon.svg'],
  },
};

export default function MentorsPage() {
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'LexMinds Mentors & Faculty Advisory Council',
    description: 'Distinguished legal mentors and clinical advisors at LexMinds India.',
    url: 'https://lexminds.in/mentors',
    numberOfItems: MENTORS_DATA.length,
    itemListElement: MENTORS_DATA.map((mentor, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Person',
        name: mentor.name,
        jobTitle: mentor.title,
        worksFor: {
          '@type': 'Organization',
          name: mentor.organization,
        },
        alumniOf: mentor.almaMater,
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
      <div className="p-8 sm:p-12 md:p-14 bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 rounded-2xl shadow-brutal space-y-6 relative overflow-hidden">
        
        {/* Ambient subtle glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-royal-500/10 dark:bg-royal-500/15 blur-3xl pointer-events-none rounded-full" />

        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-royal-50 dark:bg-royal-950/60 border border-royal-200 dark:border-royal-800/70 text-royal-700 dark:text-royal-300 text-[11px] font-mono font-bold uppercase tracking-wider">
          <Users className="w-3.5 h-3.5" />
          <span>Faculty &amp; Advisory Council &bull; LexMinds India</span>
        </div>

        <div className="space-y-3 max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-ink-950 dark:text-ink-50 tracking-tight leading-tight">
            Distinguished Mentors &amp; Clinical Advisory Council
          </h1>
          <p className="text-base sm:text-lg text-ink-700 dark:text-ink-200 leading-relaxed font-normal">
            Bridging academic scholarship with premier industry and courtroom practice. Receive 1:1 clinical mentorship from designated Senior Advocates, Tier-1 M&amp;A Partners, Technology Counsel, and National Law University professors.
          </p>
        </div>

        {/* Highlight Metrics */}
        <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-ink-900/10 dark:border-ink-800">
          <div className="space-y-0.5">
            <div className="text-2xl sm:text-3xl font-serif font-black text-royal-600 dark:text-royal-400">
              6
            </div>
            <div className="text-xs font-mono uppercase tracking-wider text-ink-600 dark:text-ink-400">
              Council Mentors
            </div>
          </div>
          <div className="space-y-0.5">
            <div className="text-2xl sm:text-3xl font-serif font-black text-royal-600 dark:text-royal-400">
              18+ Yrs
            </div>
            <div className="text-xs font-mono uppercase tracking-wider text-ink-600 dark:text-ink-400">
              Avg. Bar &amp; Firm Exp.
            </div>
          </div>
          <div className="space-y-0.5">
            <div className="text-2xl sm:text-3xl font-serif font-black text-royal-600 dark:text-royal-400">
              1:1
            </div>
            <div className="text-xs font-mono uppercase tracking-wider text-ink-600 dark:text-ink-400">
              Clinical Advisory
            </div>
          </div>
          <div className="space-y-0.5">
            <div className="text-2xl sm:text-3xl font-serif font-black text-royal-600 dark:text-royal-400">
              100%
            </div>
            <div className="text-xs font-mono uppercase tracking-wider text-ink-600 dark:text-ink-400">
              Verified Practitioners
            </div>
          </div>
        </div>

      </div>

      {/* Main Interactive Mentors Client with 6 Glass Cards */}
      <MentorsClient initialMentors={MENTORS_DATA} />

    </div>
  );
}
