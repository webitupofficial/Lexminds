import React from 'react';
import Link from 'next/link';
import { 
  Scale, 
  ShieldCheck, 
  FileCheck2, 
  Quote, 
  AlertTriangle, 
  Lock, 
  ArrowRight 
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: 'Editorial Policy & Standards | LexMinds Law Review',
  description: 'Guidelines on student-led editorial review, originality standards, Bluebook & OSCOLA citation formatting, and author copyright terms.',
  alternates: {
    canonical: 'https://lexminds.in/editorial-policy',
  },
};

export default function EditorialPolicyPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 sm:space-y-10">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ name: 'Editorial Policy & Standards', href: '/editorial-policy' }]} />

      {/* Header */}
      <div className="border-b border-ink-300 dark:border-ink-700 pb-6 space-y-2">
        <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-oxblood-700 dark:text-oxblood-400">
          Academic Integrity &amp; Standards
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-ink-950 dark:text-white tracking-tight">
          Editorial Policy &amp; Publication Standards
        </h1>
        <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-300 max-w-3xl leading-relaxed">
          The LexMinds Law Review adheres to high standards of student legal publishing, promoting critical inquiry, original scholarship, and transparent editorial evaluation.
        </p>
      </div>

      {/* Policy Sections */}
      <div className="space-y-6 text-xs sm:text-sm text-ink-700 dark:text-ink-300 leading-relaxed">
        
        {/* 1. Student-Led Editorial Review */}
        <section className="editorial-card rounded-sm p-6 sm:p-8 space-y-4 bg-white dark:bg-ink-850 border border-ink-200 dark:border-ink-800">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-white flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-oxblood-700 dark:text-oxblood-400" />
            <span>1. Editorial Review Mechanism</span>
          </h2>
          <p>
            All submitted manuscripts undergo a structured editorial evaluation process led by the student Editorial Board:
          </p>
          <ul className="space-y-2 list-disc list-inside text-ink-600 dark:text-ink-400">
            <li><strong>Intake Screening:</strong> Manuscripts are evaluated for topical relevance, structural clarity, and baseline citation compliance.</li>
            <li><strong>Editorial Board Review:</strong> Manuscripts are evaluated by student editors for analytical depth, sound legal argumentation, and contribution to legal discourse.</li>
            <li><strong>Decision Outcomes:</strong> Authors receive formal notifications categorized as: <em>(a) Accepted for publication, (b) Accepted subject to minor editorial revisions, (c) Revise and resubmit, or (d) Rejected.</em></li>
          </ul>
        </section>

        {/* 2. Plagiarism & AI Disclosure Policy */}
        <section id="plagiarism" className="editorial-card rounded-sm p-6 sm:p-8 space-y-4 bg-white dark:bg-ink-850 border border-ink-200 dark:border-ink-800">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-white flex items-center space-x-2">
            <FileCheck2 className="w-5 h-5 text-oxblood-700 dark:text-oxblood-400" />
            <span>2. Originality &amp; Generative AI Disclosure</span>
          </h2>
          <p>
            Academic integrity and intellectual honesty are fundamental to the journal:
          </p>
          <div className="p-4 rounded-sm bg-ivory-50 dark:bg-ink-900 border border-ink-200 dark:border-ink-800 space-y-1.5">
            <div className="flex items-center space-x-2 text-oxblood-700 dark:text-oxblood-400 font-bold text-xs font-mono">
              <AlertTriangle className="w-4 h-4" />
              <span>Similarity Index Limit: Maximum 10%</span>
            </div>
            <p className="text-[11px] text-ink-600 dark:text-ink-400 leading-relaxed font-normal">
              Submissions showing unoriginal content exceeding 10% (excluding direct statutory excerpts and standard case citations) will be returned for rewriting or rejected.
            </p>
          </div>
          <p>
            <strong>Generative AI Policy:</strong> Any use of AI or large language model tools in drafting assistance or source summarization must be transparently disclosed in an author note. Submissions consisting of unattributed AI-generated analysis are strictly prohibited.
          </p>
        </section>

        {/* 3. Citation Standards */}
        <section id="citation-guide" className="editorial-card rounded-sm p-6 sm:p-8 space-y-4 bg-white dark:bg-ink-850 border border-ink-200 dark:border-ink-800">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-white flex items-center space-x-2">
            <Quote className="w-5 h-5 text-oxblood-700 dark:text-oxblood-400" />
            <span>3. Citation &amp; Footnoting Standards</span>
          </h2>
          <p>
            Manuscripts submitted to the journal must adhere to established legal citation formats:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 font-mono">
            <div className="p-4 rounded-sm bg-ivory-50 dark:bg-ink-900 border border-ink-200 dark:border-ink-800 space-y-1">
              <h4 className="font-bold text-oxblood-700 dark:text-oxblood-400 text-xs">The Bluebook (21st Edition)</h4>
              <p className="text-[11px] text-ink-600 dark:text-ink-400">
                Recommended for corporate law, antitrust, and constitutional jurisprudence treatises.
              </p>
            </div>
            <div className="p-4 rounded-sm bg-ivory-50 dark:bg-ink-900 border border-ink-200 dark:border-ink-800 space-y-1">
              <h4 className="font-bold text-oxblood-700 dark:text-oxblood-400 text-xs">OSCOLA (4th Edition)</h4>
              <p className="text-[11px] text-ink-600 dark:text-ink-400">
                Accepted for international law, human rights, and commercial arbitration papers.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Copyright & Open Access */}
        <section className="editorial-card rounded-sm p-6 sm:p-8 space-y-4 bg-white dark:bg-ink-850 border border-ink-200 dark:border-ink-800">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-white flex items-center space-x-2">
            <Lock className="w-5 h-5 text-oxblood-700 dark:text-oxblood-400" />
            <span>4. Author Rights &amp; Open Access Publishing</span>
          </h2>
          <p>
            LexMinds is dedicated to open-access legal scholarship:
          </p>
          <ul className="space-y-2 list-disc list-inside text-ink-600 dark:text-ink-400">
            <li>Authors retain the moral copyright and ownership of their published work.</li>
            <li>Published treatises are licensed under the Creative Commons Attribution 4.0 International (CC BY 4.0) License.</li>
            <li>Authors receive a digital Certificate of Publication and a dedicated permanent archival URL.</li>
          </ul>
        </section>

      </div>

      {/* CTA Box */}
      <div className="p-6 sm:p-8 rounded-sm editorial-card border border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-850 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-serif font-bold text-ink-950 dark:text-white">Have a manuscript ready for submission?</h3>
          <p className="text-xs text-ink-600 dark:text-ink-400 mt-0.5">Submit to our editorial desk for structured evaluation.</p>
        </div>
        <Link
          href="/publish"
          className="px-6 py-2.5 bg-oxblood-700 hover:bg-oxblood-800 dark:bg-oxblood-600 dark:hover:bg-oxblood-500 text-white font-serif text-xs font-semibold uppercase tracking-wider rounded-sm shadow-sm transition-all shrink-0"
        >
          Submit Manuscript Now
        </Link>
      </div>

    </div>
  );
}
