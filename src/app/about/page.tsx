import React from 'react';
import Link from 'next/link';
import { 
  Scale, 
  ShieldCheck, 
  BookOpen, 
  Briefcase, 
  ArrowRight
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: 'About LexMinds | Legal Scholarship & Research Opportunities',
  description: 'Learn about LexMinds, an independent student-led legal scholarship initiative publishing analytical commentaries and hosting structured research cohorts.',
  alternates: {
    canonical: 'https://lexminds.in/about',
  },
};

export default function AboutPage() {
  const editorialPillars = [
    {
      title: 'Student-Led Initiative',
      desc: 'Founded and managed by law students and recent graduates across Indian law universities to foster disciplined legal writing and contemporary statutory analysis.'
    },
    {
      title: 'Structured Research Cohorts',
      desc: 'Curated 8-week research programs providing emerging scholars with dedicated drafting practice, statutory interpretation, and legal citation guidance.'
    },
    {
      title: 'Open-Access Legal Scholarship',
      desc: 'All published commentaries and legislative analyses are made openly accessible under Creative Commons licensing to support student researchers nationwide.'
    },
    {
      title: 'Academic Citation Standards',
      desc: 'Strict adherence to Bluebook (21st Edition) and OSCOLA rules, instilling academic rigor in undergraduate legal drafting.'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ name: 'About LexMinds', href: '/about' }]} />

      {/* Hero Section */}
      <div className="p-8 sm:p-14 bg-surface border border-ink/10 dark:border-white/10 rounded-sm">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-sm bg-royal-50 dark:bg-royal-950/40 border border-royal-200 dark:border-royal-800 text-royal-700 dark:text-royal-300 text-[11px] font-mono font-bold uppercase tracking-wider">
            <Scale className="w-3.5 h-3.5" />
            <span>Our Foundation &amp; Mission</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-ink tracking-tight leading-tight">
            Advancing Student Legal Scholarship Across India
          </h1>

          <p className="text-sm sm:text-base text-ink/70 leading-relaxed font-normal">
            LexMinds (<code>lexminds.in</code>) was established as an independent, student-led legal research publication. Our mission is to provide law students and young advocates with an accessible, rigorous platform for publishing analytical treatises, examining statutory transitions, and engaging in structured research fellowships.
          </p>
        </div>
      </div>

      {/* Core Institutional Pillars */}
      <div className="space-y-6">
        <div className="border-b border-ink/10 dark:border-white/10 pb-3">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-royal-600 dark:text-royal-400">
            Principles of Publication
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink mt-1">
            How We Foster Legal Rigor
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 space-y-3 bg-surface border border-ink/10 dark:border-white/10 rounded-sm">
            <div className="w-10 h-10 rounded-sm bg-royal-50 dark:bg-royal-950/50 border border-royal-200 dark:border-royal-800 flex items-center justify-center text-royal-600 dark:text-royal-400">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif font-bold text-ink">Research Cohorts</h3>
            <p className="text-xs sm:text-sm text-ink/70 leading-relaxed">
              Selective cohorts focused on deep legal writing, statutory tracking (e.g. DPDP Act, BNS), and editorial drafting under structured deadlines.
            </p>
          </div>

          <div className="p-6 space-y-3 bg-surface border border-ink/10 dark:border-white/10 rounded-sm">
            <div className="w-10 h-10 rounded-sm bg-royal-50 dark:bg-royal-950/50 border border-royal-200 dark:border-royal-800 flex items-center justify-center text-royal-600 dark:text-royal-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif font-bold text-ink">Law Review Publishing</h3>
            <p className="text-xs sm:text-sm text-ink/70 leading-relaxed">
              Our journal enforces originality standards, citation review, and structured editorial feedback for all submitted legal manuscripts.
            </p>
          </div>

          <div className="p-6 space-y-3 bg-surface border border-ink/10 dark:border-white/10 rounded-sm">
            <div className="w-10 h-10 rounded-sm bg-royal-50 dark:bg-royal-950/50 border border-royal-200 dark:border-royal-800 flex items-center justify-center text-royal-600 dark:text-royal-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif font-bold text-ink">Ethical &amp; Educational Focus</h3>
            <p className="text-xs sm:text-sm text-ink/70 leading-relaxed">
              Strictly non-solicitous and dedicated exclusively to educational discourse and scholarly development in line with professional norms.
            </p>
          </div>
        </div>
      </div>

      {/* Editorial Standards & Methodology */}
      <div className="space-y-6">
        <div className="border-b border-ink/10 dark:border-white/10 pb-3">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-royal-600 dark:text-royal-400">
            Editorial Framework
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink mt-1">
            Our Editorial Standards &amp; Methodology
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {editorialPillars.map((item, index) => (
            <div
              key={index}
              className="p-6 space-y-2 bg-surface border border-ink/10 dark:border-white/10 rounded-sm"
            >
              <div className="flex items-center space-x-2 font-mono text-xs text-royal-600 dark:text-royal-400 font-bold">
                <span>0{index + 1}.</span>
                <span className="text-ink font-serif text-base">{item.title}</span>
              </div>
              <p className="text-xs sm:text-sm text-ink/70 leading-relaxed font-normal">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Box */}
      <div className="p-8 sm:p-12 text-center space-y-4 bg-surface border border-ink/10 dark:border-white/10 rounded-sm">
        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-ink">
          Engage With Our Student Law Review
        </h3>
        <p className="text-xs sm:text-sm text-ink/70 max-w-xl mx-auto">
          Explore our active fellowship docket or submit your research manuscript for editorial evaluation today.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/internships"
            className="btn-brand-primary"
          >
            Explore Fellowships
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Link>
          <Link
            href="/publish"
            className="btn-brand-secondary"
          >
            Submit Paper
          </Link>
        </div>
      </div>

    </div>
  );
}
