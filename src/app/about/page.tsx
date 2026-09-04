import React from 'react';
import Link from 'next/link';
import { 
  Scale, 
  ShieldCheck, 
  BookOpen, 
  Briefcase, 
  GraduationCap, 
  ArrowRight
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: 'About LexMinds | Legal Scholarship & Research Fellowship',
  description: 'Learn about LexMinds, an independent student-led legal scholarship initiative publishing analytical treatises and hosting research fellowships.',
  alternates: {
    canonical: 'https://lexminds.in/about',
  },
};

export default function AboutPage() {
  const editorialPillars = [
    {
      title: 'Student-Led Editorial Initiative',
      desc: 'Founded and managed by law students and recent alumni across Indian law universities to promote serious academic legal writing and case analysis.'
    },
    {
      title: 'Structured Research Fellowships',
      desc: 'Curated 8-week research programs providing emerging scholars with dedicated drafting practice, statutory interpretation, and legal citation guidance.'
    },
    {
      title: 'Open-Access Legal Scholarship',
      desc: 'All published treatises and legislative analyses are made openly accessible under Creative Commons licensing to support student researchers nationwide.'
    },
    {
      title: 'Academic Citation Standards',
      desc: 'Strict adherence to Bluebook (21st Edition) and OSCOLA rules, instilling academic rigor in undergraduate legal drafting.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 sm:space-y-10">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ name: 'About LexMinds', href: '/about' }]} />

      {/* Hero Section */}
      <div className="editorial-card rounded-sm p-8 sm:p-12 bg-white dark:bg-ink-850 border border-ink-200 dark:border-ink-800">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-sm bg-ivory-200 dark:bg-ink-800 border border-ink-300 dark:border-ink-700 text-oxblood-700 dark:text-oxblood-400 text-[10px] font-mono font-bold uppercase tracking-wider">
            <Scale className="w-3.5 h-3.5" />
            <span>Our Foundation &amp; Mission</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-ink-950 dark:text-white tracking-tight leading-tight">
            Advancing Student Legal Scholarship Across India
          </h1>

          <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-300 leading-relaxed font-normal">
            LexMinds (<code>lexminds.in</code>) was established as an independent, student-led legal research publication. Our mission is to provide law students and young advocates with an accessible, rigorous platform for publishing analytical treatises, examining statutory transitions, and engaging in structured research fellowships.
          </p>
        </div>
      </div>

      {/* Core Institutional Pillars */}
      <div className="space-y-6">
        <div className="border-b border-ink-300 dark:border-ink-700 pb-3">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-oxblood-700 dark:text-oxblood-400">
            Principles of Publication
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink-950 dark:text-white mt-0.5">
            How We Foster Legal Rigor
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="editorial-card rounded-sm p-6 space-y-3 bg-white dark:bg-ink-850 border border-ink-200 dark:border-ink-800">
            <div className="w-9 h-9 rounded-sm bg-ivory-100 dark:bg-ink-900 border border-ink-300 dark:border-ink-700 flex items-center justify-center text-oxblood-700 dark:text-oxblood-400">
              <Briefcase className="w-4 h-4" />
            </div>
            <h3 className="text-base font-serif font-bold text-ink-950 dark:text-white">Research Fellowships</h3>
            <p className="text-xs text-ink-600 dark:text-ink-300 leading-relaxed">
              Selective cohorts focused on deep legal writing, statutory tracking (e.g. DPDP Act, BNS), and editorial drafting under structured deadlines.
            </p>
          </div>

          <div className="editorial-card rounded-sm p-6 space-y-3 bg-white dark:bg-ink-850 border border-ink-200 dark:border-ink-800">
            <div className="w-9 h-9 rounded-sm bg-ivory-100 dark:bg-ink-900 border border-ink-300 dark:border-ink-700 flex items-center justify-center text-oxblood-700 dark:text-oxblood-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <h3 className="text-base font-serif font-bold text-ink-950 dark:text-white">Law Review Publishing</h3>
            <p className="text-xs text-ink-600 dark:text-ink-300 leading-relaxed">
              Our journal enforces originality standards, citation review, and structured editorial feedback for all submitted legal manuscripts.
            </p>
          </div>

          <div className="editorial-card rounded-sm p-6 space-y-3 bg-white dark:bg-ink-850 border border-ink-200 dark:border-ink-800">
            <div className="w-9 h-9 rounded-sm bg-ivory-100 dark:bg-ink-900 border border-ink-300 dark:border-ink-700 flex items-center justify-center text-oxblood-700 dark:text-oxblood-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-base font-serif font-bold text-ink-950 dark:text-white">Ethical &amp; Educational Focus</h3>
            <p className="text-xs text-ink-600 dark:text-ink-300 leading-relaxed">
              Strictly non-solicitous and dedicated exclusively to educational discourse and scholarly development in line with professional norms.
            </p>
          </div>
        </div>
      </div>

      {/* Editorial Council Values */}
      <div className="space-y-6">
        <div className="border-b border-ink-300 dark:border-ink-700 pb-3">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-oxblood-700 dark:text-oxblood-400">
            Editorial Structure
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink-950 dark:text-white mt-0.5">
            Key Facets of Our Editorial Council
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {editorialPillars.map((item, index) => (
            <div
              key={index}
              className="editorial-card rounded-sm p-6 space-y-2 bg-white dark:bg-ink-850 border border-ink-200 dark:border-ink-800"
            >
              <div className="flex items-center space-x-2 font-mono text-xs text-oxblood-700 dark:text-oxblood-400 font-bold">
                <span>0{index + 1}.</span>
                <span className="text-ink-950 dark:text-white font-serif text-base">{item.title}</span>
              </div>
              <p className="text-xs text-ink-600 dark:text-ink-300 leading-relaxed font-normal">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Box */}
      <div className="editorial-card rounded-sm p-8 sm:p-10 text-center space-y-3 bg-white dark:bg-ink-850 border border-ink-200 dark:border-ink-800">
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-ink-950 dark:text-white">
          Engage With Our Student Law Review
        </h3>
        <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-300 max-w-xl mx-auto">
          Explore our active fellowship docket or submit your research manuscript for editorial evaluation today.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/internships"
            className="px-5 py-2.5 bg-oxblood-700 hover:bg-oxblood-800 dark:bg-oxblood-600 dark:hover:bg-oxblood-500 text-white font-serif text-xs font-semibold uppercase tracking-wider rounded-sm shadow-sm transition-all"
          >
            Explore Fellowships
          </Link>
          <Link
            href="/publish"
            className="px-5 py-2.5 bg-ivory-100 dark:bg-ink-800 hover:bg-ivory-200 dark:hover:bg-ink-700 text-ink-800 dark:text-ink-200 border border-ink-200 dark:border-ink-700 font-serif text-xs font-semibold uppercase tracking-wider rounded-sm transition-all"
          >
            Submit Paper
          </Link>
        </div>
      </div>

    </div>
  );
}
