import React from 'react';
import Link from 'next/link';
import { 
  Scale, 
  BookOpen, 
  ArrowRight, 
  Clock, 
  ChevronRight,
  FileText,
  Calendar,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { INITIAL_INTERNSHIPS, INITIAL_ARTICLES } from '@/lib/data-store';

export const metadata = {
  title: 'LexMinds | Legal Scholarship & Research Fellowship',
  description: 'LexMinds is an independent student-led legal scholarship initiative publishing analytical treatises, student research, and merit-based research fellowship dossiers.',
};

export default function HomePage() {
  const flagshipInternship = INITIAL_INTERNSHIPS[0];
  const leadArticle = INITIAL_ARTICLES[0];
  const recentArticles = INITIAL_ARTICLES.slice(1, 4);

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      
      {/* 1. MASTHEAD DATELINE BAR */}
      <div className="border-b border-ink-200 dark:border-ink-800 bg-ivory-100/60 dark:bg-ink-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono uppercase tracking-widest text-ink-500 dark:text-ink-400 gap-1 sm:gap-4">
          <div className="flex items-center space-x-2">
            <span>Vol. II &bull; Issue IV</span>
            <span>&bull;</span>
            <span>September 2026</span>
          </div>
          <div className="flex items-center space-x-3">
            <span>ISSN Docket Pending</span>
            <span className="hidden sm:inline">&bull;</span>
            <span className="hidden sm:inline">Student-Led Legal Review</span>
          </div>
        </div>
      </div>

      {/* 2. ASYMMETRICAL EDITORIAL MASTHEAD HERO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left: Headline & Manifesto (7 cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="space-y-2">
              <span className="inline-block text-[11px] font-mono font-semibold uppercase tracking-[0.25em] text-oxblood-700 dark:text-oxblood-400">
                Forum for Indian Jurisprudence &amp; Law
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-ink-950 dark:text-white leading-[1.12]">
                Where Analytical Rigor Meets Legal Scholarship
              </h1>
            </div>

            <p className="text-sm sm:text-base text-ink-600 dark:text-ink-300 leading-relaxed max-w-xl font-normal">
              An independent, student-led legal research review dedicated to publishing incisive statutory treatises, landmark case commentaries, and curating selective academic research fellowships.
            </p>

            {/* Editorial Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                href="/internships"
                className="px-6 py-3.5 bg-oxblood-700 hover:bg-oxblood-800 dark:bg-oxblood-600 dark:hover:bg-oxblood-500 text-white font-serif text-xs font-semibold uppercase tracking-widest rounded-sm text-center transition-all shadow-sm flex items-center justify-center space-x-2"
              >
                <span>Examine Fellowship Dossier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/articles"
                className="px-6 py-3.5 bg-white dark:bg-ink-850 hover:bg-ivory-200 dark:hover:bg-ink-800 text-ink-900 dark:text-ink-100 border border-ink-300 dark:border-ink-700 font-serif text-xs font-semibold uppercase tracking-widest rounded-sm text-center transition-all shadow-sm flex items-center justify-center space-x-2"
              >
                <BookOpen className="w-3.5 h-3.5 text-oxblood-700 dark:text-oxblood-400" />
                <span>Read Legal Treatises</span>
              </Link>
            </div>

            {/* Micro Editorial Byline */}
            <div className="pt-2 border-t border-ink-200 dark:border-ink-800 flex items-center space-x-4 text-[11px] font-mono text-ink-500 dark:text-ink-400">
              <span>National Law University Alumni &amp; Scholars</span>
              <span>&bull;</span>
              <span>Peer Scholarly Forum</span>
            </div>
          </div>

          {/* Right: Flagship Editorial Dispatch Panel (5 cols) */}
          <div className="lg:col-span-5">
            <div className="editorial-dossier p-6 sm:p-7 rounded-sm bg-white dark:bg-ink-850 border border-ink-200 dark:border-ink-800 space-y-5">
              
              <div className="flex items-center justify-between border-b border-ink-200 dark:border-ink-800 pb-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-oxblood-700 dark:text-oxblood-400">
                  Editorial Dispatch &bull; Volume IV
                </span>
                <span className="text-[10px] font-mono text-ink-400">Call for Submissions</span>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-xl font-bold text-ink-950 dark:text-white leading-snug">
                  Current Jurisprudential Inquiries
                </h3>
                <p className="text-xs text-ink-600 dark:text-ink-300 leading-relaxed">
                  The Editorial Council invites scholarly manuscripts exploring three pressing regulatory transitions in India:
                </p>
              </div>

              {/* Ruled Topic Index */}
              <div className="space-y-2.5 border-t border-b border-ink-100 dark:border-ink-800 py-3 text-xs">
                <div className="flex items-start space-x-2 text-ink-700 dark:text-ink-300">
                  <span className="font-mono text-oxblood-700 dark:text-oxblood-400 font-bold shrink-0">01.</span>
                  <span><strong>DPDP Act 2023:</strong> Compliance obligations for Significant Data Fiduciaries.</span>
                </div>
                <div className="flex items-start space-x-2 text-ink-700 dark:text-ink-300">
                  <span className="font-mono text-oxblood-700 dark:text-oxblood-400 font-bold shrink-0">02.</span>
                  <span><strong>Bharatiya Nyaya Sanhita:</strong> Procedural transitions in criminal jurisprudence.</span>
                </div>
                <div className="flex items-start space-x-2 text-ink-700 dark:text-ink-300">
                  <span className="font-mono text-oxblood-700 dark:text-oxblood-400 font-bold shrink-0">03.</span>
                  <span><strong>Competition Law:</strong> CCI regulatory posture on digital market cartels.</span>
                </div>
              </div>

              <div className="pt-1 flex items-center justify-between">
                <Link
                  href="/publish"
                  className="text-xs font-serif font-bold uppercase tracking-wider text-oxblood-700 dark:text-oxblood-400 hover:underline flex items-center space-x-1"
                >
                  <span>Author Guidelines &amp; Submission</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[10px] font-mono text-ink-400">Standard: Bluebook 21st</span>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 3. DOSSIER-STYLE FEATURED FELLOWSHIP PANEL */}
      {flagshipInternship && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            
            {/* Dossier Header Label */}
            <div className="flex items-center justify-between border-b border-ink-300 dark:border-ink-700 pb-2.5">
              <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-widest text-oxblood-700 dark:text-oxblood-400">
                <Scale className="w-3.5 h-3.5" />
                <span>Scholarship Dossier &bull; Term Opening</span>
              </div>
              <span className="text-xs font-mono text-ink-500 dark:text-ink-400">
                Docket No. LM-2026-F01
              </span>
            </div>

            {/* Dossier Body Card */}
            <div className="editorial-card rounded-sm p-6 sm:p-10 border border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-850 space-y-8">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Fellowship Description & Scope (8 cols) */}
                <div className="lg:col-span-8 space-y-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-sm bg-ivory-200 dark:bg-ink-800 text-oxblood-700 dark:text-oxblood-400 border border-ink-200 dark:border-ink-700 font-semibold">
                      {flagshipInternship.practiceArea}
                    </span>
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-sm bg-ivory-100 dark:bg-ink-800 text-ink-600 dark:text-ink-300 border border-ink-200 dark:border-ink-700">
                      {flagshipInternship.mode} &bull; {flagshipInternship.duration}
                    </span>
                  </div>

                  <div>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink-950 dark:text-white leading-tight">
                      {flagshipInternship.title}
                    </h2>
                    <p className="text-xs font-mono text-oxblood-700 dark:text-oxblood-400 mt-1 uppercase tracking-wider">
                      {flagshipInternship.organization} &bull; {flagshipInternship.location}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-300 leading-relaxed font-normal">
                    {flagshipInternship.description}
                  </p>

                  {/* Syllabus / Responsibilities */}
                  <div className="pt-2 space-y-2">
                    <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-ink-900 dark:text-white">
                      Core Research Responsibilities:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-ink-600 dark:text-ink-300">
                      {flagshipInternship.responsibilities.slice(0, 4).map((resp, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-oxblood-700 dark:text-oxblood-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{resp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Dossier Metadata & Single Primary CTA (4 cols) */}
                <div className="lg:col-span-4 p-6 rounded-sm bg-ivory-100/70 dark:bg-ink-900/60 border border-ink-200 dark:border-ink-800 space-y-5">
                  
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-ink-500 dark:text-ink-400 block">
                      Application &amp; Evaluation Fee
                    </span>
                    <div className="text-2xl font-serif font-bold text-ink-950 dark:text-white">
                      ₹{flagshipInternship.applicationFee}.00
                    </div>
                    <span className="text-[10px] font-mono text-ink-400 block">Inclusive of editorial triage</span>
                  </div>

                  <div className="border-t border-ink-200 dark:border-ink-800 pt-3 space-y-2.5 text-xs font-mono">
                    <div className="flex justify-between items-center text-ink-600 dark:text-ink-300">
                      <span>Term Duration:</span>
                      <strong className="text-ink-900 dark:text-white font-medium">{flagshipInternship.duration}</strong>
                    </div>
                    <div className="flex justify-between items-center text-ink-600 dark:text-ink-300">
                      <span>Cohort Size:</span>
                      <strong className="text-ink-900 dark:text-white font-medium">{flagshipInternship.seats} Selected Fellows</strong>
                    </div>
                    <div className="flex justify-between items-center text-ink-600 dark:text-ink-300">
                      <span>Submission Deadline:</span>
                      <strong className="text-rose-700 dark:text-rose-400 font-semibold">{flagshipInternship.deadline}</strong>
                    </div>
                  </div>

                  {/* One Single Primary CTA */}
                  <div className="pt-2">
                    <Link
                      href={`/internships/${flagshipInternship.slug}`}
                      className="w-full py-3.5 px-4 rounded-sm bg-oxblood-700 hover:bg-oxblood-800 dark:bg-oxblood-600 dark:hover:bg-oxblood-500 text-white font-serif text-xs font-semibold uppercase tracking-widest text-center block transition-all shadow-sm"
                    >
                      Examine Dossier &amp; Apply
                    </Link>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </section>
      )}

      {/* 4. ARTICLES: 1 FLAGSHIP TREATISE + CLEAN RECENT PUBLICATIONS LEDGER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-ink-300 dark:border-ink-700 pb-3">
          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-oxblood-700 dark:text-oxblood-400">
              LexMinds Law Review
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink-950 dark:text-white mt-0.5">
              Recent Treatises &amp; Commentaries
            </h2>
          </div>

          <Link
            href="/articles"
            className="text-xs font-serif font-bold uppercase tracking-wider text-oxblood-700 dark:text-oxblood-400 hover:underline flex items-center space-x-1"
          >
            <span>View All Treatises</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 1 Flagship + Clean Ruled List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Flagship Lead Treatise (7 cols) */}
          {leadArticle && (
            <div className="lg:col-span-7 editorial-card rounded-sm p-6 sm:p-8 bg-white dark:bg-ink-850 border border-ink-200 dark:border-ink-800 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="px-2 py-0.5 rounded-sm bg-ivory-200 dark:bg-ink-800 text-oxblood-700 dark:text-oxblood-400 font-semibold uppercase tracking-wider text-[10px]">
                  Featured Treatise &bull; {leadArticle.category}
                </span>
                <span className="text-ink-400 flex items-center space-x-1 text-[11px]">
                  <Clock className="w-3 h-3" />
                  <span>{leadArticle.readTime}</span>
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-bold text-ink-950 dark:text-white leading-snug">
                <Link href={`/articles/${leadArticle.slug}`} className="hover:text-oxblood-700 dark:hover:text-oxblood-400 transition-colors">
                  {leadArticle.title}
                </Link>
              </h3>

              <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-300 leading-relaxed line-clamp-4">
                {leadArticle.abstract}
              </p>

              <div className="pt-3 border-t border-ink-100 dark:border-ink-800 flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-ink-900 dark:text-white block">{leadArticle.author.name}</span>
                  <span className="text-[11px] text-ink-400 font-mono block">{leadArticle.author.institution}</span>
                </div>
                <Link
                  href={`/articles/${leadArticle.slug}`}
                  className="px-4 py-2 rounded-sm bg-ivory-100 dark:bg-ink-800 hover:bg-oxblood-700 hover:text-white text-ink-800 dark:text-ink-200 font-serif text-xs font-semibold uppercase tracking-wider border border-ink-200 dark:border-ink-700 transition-all flex items-center space-x-1"
                >
                  <span>Read Treatise</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* Clean Recent Publications List (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="text-[11px] font-mono font-bold uppercase tracking-widest text-ink-500 dark:text-ink-400 border-b border-ink-200 dark:border-ink-800 pb-1.5">
              Recent Archival Additions
            </h4>

            <div className="divide-y divide-ink-200 dark:divide-ink-800">
              {recentArticles.map((article, idx) => (
                <article key={article.id} className="py-3.5 space-y-1.5 first:pt-0 group">
                  <div className="flex items-center justify-between text-[10px] font-mono text-ink-400">
                    <span className="text-oxblood-700 dark:text-oxblood-400 font-semibold uppercase">
                      {article.category}
                    </span>
                    <span>{article.publishedAt}</span>
                  </div>

                  <h4 className="font-serif text-base font-bold text-ink-950 dark:text-white group-hover:text-oxblood-700 dark:group-hover:text-oxblood-400 transition-colors leading-snug">
                    <Link href={`/articles/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h4>

                  <div className="flex items-center justify-between text-[11px] text-ink-500 dark:text-ink-400 pt-1 font-mono">
                    <span>By {article.author.name}</span>
                    <span>{article.readTime}</span>
                  </div>
                </article>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/publish"
                className="w-full py-2.5 px-4 text-center block rounded-sm bg-ivory-100 dark:bg-ink-800 hover:bg-ivory-200 dark:hover:bg-ink-700 text-ink-800 dark:text-ink-200 border border-ink-200 dark:border-ink-700 font-serif text-xs font-semibold uppercase tracking-wider transition-all"
              >
                Submit Manuscript to Law Review &rarr;
              </Link>
            </div>
          </div>

        </div>

      </section>

      {/* 5. THREE-STEP EDITORIAL PROCESS (SUBMIT, REVIEW, PUBLISH) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="editorial-card rounded-sm p-8 sm:p-12 border border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-850 space-y-8">
          
          <div className="max-w-2xl mx-auto text-center space-y-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-oxblood-700 dark:text-oxblood-400">
              Editorial Rigor &amp; Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink-950 dark:text-white">
              The Three-Step Publication Pathway
            </h2>
            <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-300 leading-relaxed font-normal">
              A transparent, structured editorial evaluation ensuring academic integrity, uniform citation formatting, and verified authorship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            
            {/* Step 01: Submit */}
            <div className="p-6 rounded-sm bg-ivory-50 dark:bg-ink-900/60 border border-ink-200 dark:border-ink-800 space-y-3">
              <div className="font-mono text-sm font-bold text-oxblood-700 dark:text-oxblood-400 pb-1 border-b border-ink-200 dark:border-ink-800 flex items-center justify-between">
                <span>01. SUBMIT</span>
                <span className="text-[10px] text-ink-400 uppercase">Manuscript Intake</span>
              </div>
              <h3 className="font-serif text-base font-bold text-ink-950 dark:text-white">
                Structured Manuscript Intake
              </h3>
              <p className="text-xs text-ink-600 dark:text-ink-300 leading-relaxed font-normal">
                Authors submit papers with abstracts, keywords, and institutional affiliations. Manuscripts must adhere to Bluebook (21st) or OSCOLA citation standards.
              </p>
            </div>

            {/* Step 02: Review */}
            <div className="p-6 rounded-sm bg-ivory-50 dark:bg-ink-900/60 border border-ink-200 dark:border-ink-800 space-y-3">
              <div className="font-mono text-sm font-bold text-oxblood-700 dark:text-oxblood-400 pb-1 border-b border-ink-200 dark:border-ink-800 flex items-center justify-between">
                <span>02. REVIEW</span>
                <span className="text-[10px] text-ink-400 uppercase">Editorial Triage</span>
              </div>
              <h3 className="font-serif text-base font-bold text-ink-950 dark:text-white">
                Editorial Board Evaluation
              </h3>
              <p className="text-xs text-ink-600 dark:text-ink-300 leading-relaxed font-normal">
                Senior student editors and academic reviewers evaluate analytical depth, novelty of rationale, and academic integrity. Revisions are communicated clearly to authors.
              </p>
            </div>

            {/* Step 03: Publish */}
            <div className="p-6 rounded-sm bg-ivory-50 dark:bg-ink-900/60 border border-ink-200 dark:border-ink-800 space-y-3">
              <div className="font-mono text-sm font-bold text-oxblood-700 dark:text-oxblood-400 pb-1 border-b border-ink-200 dark:border-ink-800 flex items-center justify-between">
                <span>03. PUBLISH</span>
                <span className="text-[10px] text-ink-400 uppercase">Archival Docket</span>
              </div>
              <h3 className="font-serif text-base font-bold text-ink-950 dark:text-white">
                Archival Docket &amp; Indexing
              </h3>
              <p className="text-xs text-ink-600 dark:text-ink-300 leading-relaxed font-normal">
                Accepted treatises are assigned formal volume and publication markers, published in open-access format, and indexed for legal academic citation.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 6. ACADEMIC CORRESPONDENCE DESK INQUIRY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 sm:p-12 rounded-sm bg-ivory-100 dark:bg-ink-900/80 border border-ink-200 dark:border-ink-800 space-y-3">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-oxblood-700 dark:text-oxblood-400">
            Editorial &amp; Fellowship Secretariat
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink-950 dark:text-white">
            Have Inquiries Regarding Fellowships or Treatises?
          </h2>
          <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-300 max-w-lg mx-auto font-normal">
            Reach out to our student editorial desk for submission questions, fellowship details, or institutional collaborations.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-sm bg-oxblood-700 hover:bg-oxblood-800 dark:bg-oxblood-600 dark:hover:bg-oxblood-500 text-white font-serif text-xs font-semibold uppercase tracking-wider transition-all shadow-sm"
            >
              <span>Contact Academic Desk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
