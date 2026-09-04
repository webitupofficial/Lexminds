import React from 'react';
import Link from 'next/link';
import { 
  Scale, 
  BookOpen, 
  ArrowUpRight, 
  ArrowRight, 
  Clock, 
  ChevronRight,
  CheckCircle2,
  ShieldAlert,
  Check
} from 'lucide-react';
import { INITIAL_INTERNSHIPS, INITIAL_ARTICLES } from '@/lib/data-store';

export const metadata = {
  title: 'LexMinds | Independent Legal Journal & Research Fellowship',
  description: 'LexMinds is an independent student-led legal scholarship initiative publishing peer-informed statutory treatises and curating selective academic research fellowship dossiers.',
};

export default function HomePage() {
  const flagshipInternship = INITIAL_INTERNSHIPS[0];
  const leadArticle = INITIAL_ARTICLES[0];
  const recentArticles = INITIAL_ARTICLES.slice(1, 4);

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      
      {/* 1. MASTHEAD DATELINE BAR */}
      <div className="border-b border-ink-900/10 dark:border-ink-800 bg-paper-200/60 dark:bg-ink-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono uppercase tracking-wider text-ink-500 dark:text-ink-400 gap-1 sm:gap-4">
          <div className="flex items-center space-x-2">
            <span>Vol. IV &bull; Issue IX</span>
            <span>&bull;</span>
            <span>September 2026</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-vermilion font-semibold">Open Call: Autumn Fellowship</span>
            <span className="hidden sm:inline">&bull;</span>
            <span className="hidden sm:inline">Student-Led Legal Scholarship</span>
          </div>
        </div>
      </div>

      {/* 2. ASYMMETRICAL EDITORIAL MASTHEAD HERO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left: Headline & Manifesto (7 cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7">
            <div className="space-y-2.5">
              <div className="inline-flex items-center space-x-2 text-[11px] font-mono font-bold uppercase tracking-wider text-vermilion">
                <span className="w-2 h-2 bg-vermilion rounded-none"></span>
                <span>Independent Forum for Contemporary Jurisprudence</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink-900 dark:text-ink-100 leading-[1.08]">
                Where Analytical Rigor Meets Legal Scholarship.
              </h1>
            </div>

            <p className="text-sm sm:text-base text-ink-700 dark:text-ink-300 leading-relaxed max-w-xl font-normal">
              An independent, student-led legal scholarship platform dedicated to publishing critical statutory treatises, constitutional commentaries, and curating merit-based research fellowships for emerging legal scholars.
            </p>

            {/* Neo-brutalist Dual Action Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                href="/internships"
                className="px-5 py-3 btn-neo-primary text-xs uppercase tracking-wider text-center flex items-center justify-center space-x-2"
              >
                <span>Examine Fellowship Dossier</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/articles"
                className="px-5 py-3 btn-neo-secondary text-xs uppercase tracking-wider text-center flex items-center justify-center space-x-2"
              >
                <BookOpen className="w-3.5 h-3.5 text-vermilion" />
                <span>Read Treatises Index</span>
              </Link>
            </div>

            {/* Micro Editorial Credential Strip */}
            <div className="pt-3 border-t border-ink-900/10 dark:border-ink-800 flex items-center space-x-4 text-[11px] font-mono text-ink-500 dark:text-ink-400">
              <span>National Law University Contributors</span>
              <span>&bull;</span>
              <span>Open-Access Archival Dockets</span>
            </div>
          </div>

          {/* Right: Editorial Dispatch / Current Open Inquiries (5 cols) */}
          <div className="lg:col-span-5">
            <div className="neo-card p-6 sm:p-7 space-y-5 bg-paper-50 dark:bg-ink-900">
              
              <div className="flex items-center justify-between border-b border-ink-900/15 dark:border-ink-700 pb-3">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-vermilion">
                  Editorial Dispatch &bull; Vol. IV
                </span>
                <span className="text-[10px] font-mono text-ink-400">Autumn Docket</span>
              </div>

              <div className="space-y-2">
                <h2 className="font-serif text-xl font-bold text-ink-900 dark:text-ink-100 leading-snug">
                  Current Jurisprudential Inquiries
                </h2>
                <p className="text-xs text-ink-600 dark:text-ink-300 leading-relaxed">
                  The Editorial Council invites scholarly manuscripts exploring three pressing regulatory transitions in India:
                </p>
              </div>

              {/* Ruled Topic Index */}
              <div className="space-y-2.5 border-t border-b border-ink-900/10 dark:border-ink-800 py-3 text-xs">
                <div className="flex items-start space-x-2 text-ink-800 dark:text-ink-200">
                  <span className="font-mono text-vermilion font-bold shrink-0">01.</span>
                  <span><strong>DPDP Act 2023:</strong> Compliance obligations for Significant Data Fiduciaries.</span>
                </div>
                <div className="flex items-start space-x-2 text-ink-800 dark:text-ink-200">
                  <span className="font-mono text-vermilion font-bold shrink-0">02.</span>
                  <span><strong>Bharatiya Nyaya Sanhita:</strong> Procedural transitions in criminal jurisprudence.</span>
                </div>
                <div className="flex items-start space-x-2 text-ink-800 dark:text-ink-200">
                  <span className="font-mono text-vermilion font-bold shrink-0">03.</span>
                  <span><strong>Competition Law:</strong> CCI regulatory posture on digital algorithmic cartels.</span>
                </div>
              </div>

              <div className="pt-1 flex items-center justify-between">
                <Link
                  href="/publish"
                  className="text-xs font-semibold uppercase tracking-wider text-vermilion hover:underline flex items-center space-x-1"
                >
                  <span>Author Submission Portal</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[10px] font-mono text-ink-400">Citation: Bluebook 21st</span>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 3. DOSSIER-STYLE FEATURED FELLOWSHIP WITH LIQUID GLASS SHEEN */}
      {flagshipInternship && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            
            {/* Dossier Header Label */}
            <div className="flex items-center justify-between border-b border-ink-900/15 dark:border-ink-700 pb-2.5">
              <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-vermilion">
                <Scale className="w-3.5 h-3.5" />
                <span>Scholarship Dossier &bull; Term Opening</span>
              </div>
              <span className="text-xs font-mono text-ink-500 dark:text-ink-400">
                Docket No. LM-2026-F01
              </span>
            </div>

            {/* Dossier Body with Liquid Glass Highlight Sheen */}
            <div className="liquid-glass-dossier p-6 sm:p-10 space-y-8 bg-white dark:bg-ink-900">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
                
                {/* Fellowship Description & Scope (8 cols) */}
                <div className="lg:col-span-8 space-y-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 bg-paper-200 dark:bg-ink-800 text-vermilion border border-ink-900/20 dark:border-ink-700 font-semibold">
                      {flagshipInternship.practiceArea}
                    </span>
                    <span className="text-[11px] font-mono px-2.5 py-0.5 bg-paper-100 dark:bg-ink-800 text-ink-700 dark:text-ink-300 border border-ink-900/15 dark:border-ink-700">
                      {flagshipInternship.mode} &bull; {flagshipInternship.duration}
                    </span>
                  </div>

                  <div>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink-900 dark:text-ink-100 leading-tight">
                      {flagshipInternship.title}
                    </h2>
                    <p className="text-xs font-mono text-vermilion mt-1 uppercase tracking-wider font-semibold">
                      {flagshipInternship.organization} &bull; {flagshipInternship.location}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-ink-700 dark:text-ink-300 leading-relaxed font-normal">
                    {flagshipInternship.description}
                  </p>

                  {/* Syllabus / Responsibilities */}
                  <div className="pt-2 space-y-2">
                    <h3 className="text-[11px] font-mono font-bold uppercase tracking-wider text-ink-900 dark:text-ink-100">
                      Core Research Responsibilities:
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-ink-700 dark:text-ink-300">
                      {flagshipInternship.responsibilities.slice(0, 4).map((resp, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-vermilion shrink-0 mt-0.5" />
                          <span className="leading-snug">{resp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Dossier Metadata & Single Primary Neo-brutalist CTA (4 cols) */}
                <div className="lg:col-span-4 p-6 bg-paper-100 dark:bg-ink-850 border border-ink-900/20 dark:border-ink-700 space-y-5">
                  
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-ink-500 dark:text-ink-400 block">
                      Application &amp; Evaluation Fee
                    </span>
                    <div className="text-2xl font-serif font-bold text-ink-900 dark:text-ink-100">
                      ₹{flagshipInternship.applicationFee}.00
                    </div>
                    <span className="text-[10px] font-mono text-ink-500 dark:text-ink-400 block">Transparent administrative triage</span>
                  </div>

                  <div className="border-t border-ink-900/10 dark:border-ink-800 pt-3 space-y-2.5 text-xs font-mono">
                    <div className="flex justify-between items-center text-ink-700 dark:text-ink-300">
                      <span>Term Duration:</span>
                      <strong className="text-ink-900 dark:text-ink-100 font-semibold">{flagshipInternship.duration}</strong>
                    </div>
                    <div className="flex justify-between items-center text-ink-700 dark:text-ink-300">
                      <span>Cohort Size:</span>
                      <strong className="text-ink-900 dark:text-ink-100 font-semibold">{flagshipInternship.seats} Selected Fellows</strong>
                    </div>
                    <div className="flex justify-between items-center text-ink-700 dark:text-ink-300">
                      <span>Submission Deadline:</span>
                      <strong className="text-vermilion font-bold">{flagshipInternship.deadline}</strong>
                    </div>
                  </div>

                  {/* Single Primary Action Button */}
                  <div className="pt-2">
                    <Link
                      href={`/internships/${flagshipInternship.slug}`}
                      className="w-full py-3 px-4 btn-neo-primary text-xs uppercase tracking-wider text-center block"
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
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-ink-900/15 dark:border-ink-700 pb-3">
          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-vermilion">
              LexMinds Law Journal Index
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink-900 dark:text-ink-100 mt-0.5">
              Recent Treatises &amp; Commentaries
            </h2>
          </div>

          <Link
            href="/articles"
            className="text-xs font-semibold uppercase tracking-wider text-vermilion hover:underline flex items-center space-x-1"
          >
            <span>View Full Treatise Index</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 1 Flagship + Clean Ruled Ledger List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Flagship Lead Treatise (7 cols) */}
          {leadArticle && (
            <div className="lg:col-span-7 neo-card p-6 sm:p-8 space-y-4 bg-white dark:bg-ink-900">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="px-2 py-0.5 bg-paper-200 dark:bg-ink-800 text-vermilion font-semibold uppercase tracking-wider text-[10px] border border-ink-900/15 dark:border-ink-700">
                  Featured Treatise &bull; {leadArticle.category}
                </span>
                <span className="text-ink-500 dark:text-ink-400 flex items-center space-x-1 text-[11px]">
                  <Clock className="w-3 h-3" />
                  <span>{leadArticle.readTime}</span>
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-bold text-ink-900 dark:text-ink-100 leading-snug">
                <Link href={`/articles/${leadArticle.slug}`} className="hover:text-vermilion transition-colors">
                  {leadArticle.title}
                </Link>
              </h3>

              <p className="text-xs sm:text-sm text-ink-700 dark:text-ink-300 leading-relaxed line-clamp-4">
                {leadArticle.abstract}
              </p>

              <div className="pt-3 border-t border-ink-900/10 dark:border-ink-800 flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-ink-900 dark:text-ink-100 block">{leadArticle.author.name}</span>
                  <span className="text-[11px] text-ink-500 dark:text-ink-400 font-mono block">{leadArticle.author.institution}</span>
                </div>
                <Link
                  href={`/articles/${leadArticle.slug}`}
                  className="px-3.5 py-1.5 btn-neo-secondary text-xs uppercase tracking-wider flex items-center space-x-1"
                >
                  <span>Read Treatise</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* Clean Recent Publications Ledger (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-ink-500 dark:text-ink-400 border-b border-ink-900/15 dark:border-ink-700 pb-1.5">
              Recent Archival Additions
            </h4>

            <div className="divide-y divide-ink-900/10 dark:divide-ink-800">
              {recentArticles.map((article) => (
                <article key={article.id} className="py-3.5 space-y-1.5 first:pt-0 group">
                  <div className="flex items-center justify-between text-[10px] font-mono text-ink-400">
                    <span className="text-vermilion font-semibold uppercase">
                      {article.category}
                    </span>
                    <span>{article.publishedAt}</span>
                  </div>

                  <h4 className="font-serif text-base font-bold text-ink-900 dark:text-ink-100 group-hover:text-vermilion transition-colors leading-snug">
                    <Link href={`/articles/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h4>

                  <div className="flex items-center justify-between text-[11px] text-ink-600 dark:text-ink-400 pt-1 font-mono">
                    <span>By {article.author.name}</span>
                    <span>{article.readTime}</span>
                  </div>
                </article>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/publish"
                className="w-full py-2.5 px-4 text-center block btn-neo-secondary text-xs uppercase tracking-wider"
              >
                Submit Manuscript to Review &rarr;
              </Link>
            </div>
          </div>

        </div>

      </section>

      {/* 5. THREE-STEP EDITORIAL PROCESS (SUBMIT, REVIEW, PUBLISH) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="neo-card p-8 sm:p-12 space-y-8 bg-paper-50 dark:bg-ink-900">
          
          <div className="max-w-2xl mx-auto text-center space-y-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-vermilion">
              Editorial Rigor &amp; Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink-900 dark:text-ink-100">
              The Three-Step Publication Pathway
            </h2>
            <p className="text-xs sm:text-sm text-ink-700 dark:text-ink-300 leading-relaxed font-normal">
              A transparent, structured editorial evaluation ensuring academic integrity, uniform citation formatting, and verified authorship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            
            {/* Step 01: Submit */}
            <div className="p-6 bg-paper-100 dark:bg-ink-850 border border-ink-900/15 dark:border-ink-700 space-y-3">
              <div className="font-mono text-sm font-bold text-vermilion pb-1 border-b border-ink-900/10 dark:border-ink-800 flex items-center justify-between">
                <span>01. SUBMIT</span>
                <span className="text-[10px] text-ink-500 dark:text-ink-400 uppercase">Intake</span>
              </div>
              <h3 className="font-serif text-base font-bold text-ink-900 dark:text-ink-100">
                Structured Manuscript Intake
              </h3>
              <p className="text-xs text-ink-700 dark:text-ink-300 leading-relaxed font-normal">
                Authors submit papers with abstracts, keywords, and institutional affiliations. Manuscripts must adhere to Bluebook (21st) or OSCOLA citation standards.
              </p>
            </div>

            {/* Step 02: Review */}
            <div className="p-6 bg-paper-100 dark:bg-ink-850 border border-ink-900/15 dark:border-ink-700 space-y-3">
              <div className="font-mono text-sm font-bold text-vermilion pb-1 border-b border-ink-900/10 dark:border-ink-800 flex items-center justify-between">
                <span>02. REVIEW</span>
                <span className="text-[10px] text-ink-500 dark:text-ink-400 uppercase">Editorial Triage</span>
              </div>
              <h3 className="font-serif text-base font-bold text-ink-900 dark:text-ink-100">
                Student Editorial Evaluation
              </h3>
              <p className="text-xs text-ink-700 dark:text-ink-300 leading-relaxed font-normal">
                Senior student editors evaluate analytical depth, novelty of rationale, and academic integrity. Revisions are communicated clearly to authors.
              </p>
            </div>

            {/* Step 03: Publish */}
            <div className="p-6 bg-paper-100 dark:bg-ink-850 border border-ink-900/15 dark:border-ink-700 space-y-3">
              <div className="font-mono text-sm font-bold text-vermilion pb-1 border-b border-ink-900/10 dark:border-ink-800 flex items-center justify-between">
                <span>03. PUBLISH</span>
                <span className="text-[10px] text-ink-500 dark:text-ink-400 uppercase">Archival Docket</span>
              </div>
              <h3 className="font-serif text-base font-bold text-ink-900 dark:text-ink-100">
                Archival Docket &amp; Indexing
              </h3>
              <p className="text-xs text-ink-700 dark:text-ink-300 leading-relaxed font-normal">
                Accepted treatises are assigned formal volume and publication markers, published in open-access format, and indexed for legal academic citation.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 6. TRANSPARENT TRUST MATRIX (WHAT LEXMINDS DOES & DOES NOT PROMISE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="neo-card p-8 sm:p-10 space-y-6 bg-white dark:bg-ink-900">
          
          <div className="space-y-2 border-b border-ink-900/15 dark:border-ink-700 pb-4">
            <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-vermilion">
              <ShieldAlert className="w-4 h-4" />
              <span>Editorial Transparency &amp; Operating Standards</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink-900 dark:text-ink-100">
              What LexMinds Does &amp; What We Do Not Promise
            </h2>
            <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-300 max-w-2xl font-normal">
              As an independent, student-led legal scholarship initiative, we believe in radical transparency regarding our institutional status, evaluation standards, and fellowship outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
            
            {/* What We Do Promise */}
            <div className="space-y-4">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center space-x-2">
                <Check className="w-4 h-4" />
                <span>What We Provide &amp; Guarantee</span>
              </h3>
              
              <ul className="space-y-3 text-xs text-ink-700 dark:text-ink-300">
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0">&bull;</span>
                  <span><strong>Independent Student Evaluation:</strong> All submitted manuscripts receive constructive review from senior law students and research fellows.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0">&bull;</span>
                  <span><strong>Structured Research Syllabi:</strong> Research fellowship cohorts follow clearly defined syllabi with assigned deliverables and weekly benchmarks.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0">&bull;</span>
                  <span><strong>Open-Access Archival Dockets:</strong> Accepted articles remain permanently published with permanent URL identifiers and academic citation links.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0">&bull;</span>
                  <span><strong>Verifiable Credentials:</strong> Completed fellowships receive cryptographically traceable verification reference numbers.</span>
                </li>
              </ul>
            </div>

            {/* What We Do NOT Promise */}
            <div className="space-y-4">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 flex items-center space-x-2">
                <ShieldAlert className="w-4 h-4" />
                <span>What We Do Not Claim or Promise</span>
              </h3>
              
              <ul className="space-y-3 text-xs text-ink-700 dark:text-ink-300">
                <li className="flex items-start space-x-2">
                  <span className="text-rose-600 dark:text-rose-400 font-bold shrink-0">&times;</span>
                  <span><strong>No Guaranteed Clerkships:</strong> Participation in research fellowships does not guarantee employment, law firm placements, or judicial clerkships.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-rose-600 dark:text-rose-400 font-bold shrink-0">&times;</span>
                  <span><strong>Not a Law Firm or University Body:</strong> LexMinds is an independent academic initiative, not a university, government agency, or bar council entity.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-rose-600 dark:text-rose-400 font-bold shrink-0">&times;</span>
                  <span><strong>No Guaranteed Acceptance:</strong> Paying the administrative evaluation fee does not guarantee publication or fellowship selection.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-rose-600 dark:text-rose-400 font-bold shrink-0">&times;</span>
                  <span><strong>No Unsubstantiated Fast-Track Claims:</strong> We adhere to thorough editorial timelines rather than making unverified 48-hour triage claims.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* 7. ACADEMIC CORRESPONDENCE DESK INQUIRY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 sm:p-12 neo-card space-y-3 bg-paper-100 dark:bg-ink-900">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-vermilion">
            Editorial &amp; Fellowship Secretariat
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink-900 dark:text-ink-100">
            Have Inquiries Regarding Fellowships or Treatises?
          </h2>
          <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-300 max-w-lg mx-auto font-normal">
            Reach out to our student editorial desk for submission inquiries, fellowship guidelines, or institutional collaborations.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 px-6 py-3 btn-neo-primary text-xs uppercase tracking-wider"
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
