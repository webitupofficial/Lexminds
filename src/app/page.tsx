import React from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  ArrowUpRight, 
  Clock, 
  ChevronRight, 
  Check, 
  ShieldAlert,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { INITIAL_INTERNSHIPS, INITIAL_ARTICLES } from '@/lib/data-store';

export const metadata = {
  title: 'LexMinds | Legal Scholarship & Research Studio',
  description: 'LexMinds connects law students with rigorous research fellowships, editorial mentorship, and open-access publication. Student-led and transparently run.',
};

export default function HomePage() {
  const flagshipInternship = INITIAL_INTERNSHIPS[0];
  const leadArticle = INITIAL_ARTICLES[0];
  const recentArticles = INITIAL_ARTICLES.slice(1, 4);

  return (
    <div className="space-y-24 sm:space-y-36 pb-24">
      
      {/* 1. HERO: ONE DECISIVE MESSAGE & TWO ACTIONS */}
      <section className="pt-10 sm:pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left: Confident Oversized Typography & Clear Actions (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            <div className="inline-flex items-center space-x-2.5 px-3 py-1 rounded-full border border-ink-900/15 dark:border-ink-700 bg-surface-light dark:bg-surface-dark text-xs font-mono text-ink-600 dark:text-ink-300 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-coral inline-block animate-pulse" />
              <span>Autumn 2026 Research Docket Open</span>
            </div>

            <div className="space-y-4">
              <h1 className="font-serif text-fluid-hero font-bold text-ink dark:text-ink-50 tracking-tight leading-[1.04]">
                Research worth reading.{' '}
                <span className="text-royal-500 dark:text-royal-400 block sm:inline">
                  Legal minds, published.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-ink-600 dark:text-ink-300 max-w-xl leading-relaxed font-normal">
                LexMinds is a student-led research studio and independent legal journal. We connect ambitious law students with structured fellowships, editorial mentorship, and permanent open-access publication.
              </p>
            </div>

            {/* Clear Primary & Secondary Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href="/internships"
                className="px-6 py-3.5 btn-brand-primary text-sm font-semibold tracking-wide text-center flex items-center justify-center space-x-2"
              >
                <span>Explore opportunities</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/articles"
                className="px-6 py-3.5 btn-brand-secondary text-sm font-semibold tracking-wide text-center flex items-center justify-center space-x-2"
              >
                <span>Read the journal</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Restrained Transparency Marker */}
            <div className="pt-4 flex items-center space-x-3 text-xs font-mono text-ink-500 dark:text-ink-400">
              <span className="font-semibold text-ink-700 dark:text-ink-200">100% Student-Led</span>
              <span>&bull;</span>
              <span>Open-Access Scholarship</span>
              <span>&bull;</span>
              <span>Zero Artificial Metrics</span>
            </div>

          </div>

          {/* Right: Abstract Editorial Manuscript Composition (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Abstract Layered Legal Manuscript SVG Graphic */}
              <div className="relative p-6 sm:p-8 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 shadow-brutal transition-all duration-300">
                
                {/* Visual Header Strip */}
                <div className="flex items-center justify-between pb-4 border-b border-ink-900/10 dark:border-ink-800 font-mono text-[11px] text-ink-500 dark:text-ink-400">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-royal-500 dark:bg-royal-400 inline-block" />
                    <span className="font-bold uppercase tracking-wider text-ink-900 dark:text-ink-100">Docket № LM-2026</span>
                  </div>
                  <span>Bluebook 21st</span>
                </div>

                {/* Simulated Editorial Text Block */}
                <div className="py-6 space-y-4 font-serif">
                  <div className="text-xs font-mono uppercase tracking-widest text-coral font-bold">
                    § 14(2) Jurisprudential Review
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-ink-950 dark:text-ink-50 leading-snug">
                    Statutory Interpretation in the Digital Economy
                  </h3>
                  <div className="space-y-2 text-xs font-sans text-ink-600 dark:text-ink-300 leading-relaxed">
                    <p className="border-l-2 border-royal-500 dark:border-royal-400 pl-3 italic">
                      &ldquo;When statutes transition into digital regulatory environments, judicial construction must balance legislative text with technological realities.&rdquo;
                    </p>
                  </div>
                </div>

                {/* Annotation & Verification Footnote */}
                <div className="pt-4 border-t border-ink-900/10 dark:border-ink-800 flex items-center justify-between font-mono text-[10px] text-ink-500 dark:text-ink-400">
                  <div className="flex items-center space-x-1.5 text-royal-600 dark:text-royal-400 font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Editorial Review Verified</span>
                  </div>
                  <span>Permanent DOI Archive</span>
                </div>

                {/* Subtle Decorative Geometric Marker */}
                <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-coral text-white font-mono font-bold text-xs flex items-center justify-center border border-ink-900 shadow-brutal-sm">
                  ¶ 01
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 2. FEATURED OPPORTUNITY: ONE CLEAR FEE / DEADLINE / STATUS BLOCK */}
      {flagshipInternship && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 p-8 sm:p-12 shadow-brutal relative overflow-hidden">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Opportunity Scope & Details (8 cols) */}
              <div className="lg:col-span-8 space-y-6">
                
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-3 py-1 bg-royal-50 dark:bg-royal-950/40 text-royal-600 dark:text-royal-400 font-mono text-xs font-bold uppercase tracking-wider border border-royal-200 dark:border-royal-800">
                    Featured Research Fellowship
                  </span>
                  <span className="px-3 py-1 bg-paper-200 dark:bg-ink-800 text-ink-700 dark:text-ink-300 font-mono text-xs border border-ink-900/10 dark:border-ink-700">
                    {flagshipInternship.mode} &bull; {flagshipInternship.duration}
                  </span>
                </div>

                <div className="space-y-2">
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink-950 dark:text-ink-50 tracking-tight">
                    {flagshipInternship.title}
                  </h2>
                  <p className="text-sm font-mono text-coral font-semibold uppercase tracking-wide">
                    {flagshipInternship.organization} &bull; {flagshipInternship.location}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-ink-600 dark:text-ink-300 leading-relaxed max-w-2xl font-normal">
                  {flagshipInternship.description}
                </p>

                {/* Key Deliverables Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-ink-700 dark:text-ink-300">
                  {flagshipInternship.responsibilities.slice(0, 4).map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-royal-500 dark:text-royal-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Status, Fee & Single Primary CTA (4 cols) */}
              <div className="lg:col-span-4 p-6 sm:p-8 bg-paper dark:bg-ink-900 border border-ink-900 dark:border-ink-700 space-y-6">
                
                <div className="space-y-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-ink-500 dark:text-ink-400 block">
                    Administrative Evaluation Fee
                  </span>
                  <div className="text-3xl font-serif font-bold text-ink-950 dark:text-ink-50">
                    ₹{flagshipInternship.applicationFee}.00
                  </div>
                  <span className="text-[11px] font-mono text-ink-500 dark:text-ink-400 block">
                    Transparent evaluation &amp; cohort triage
                  </span>
                </div>

                <div className="border-t border-ink-900/10 dark:border-ink-800 pt-4 space-y-3 text-xs font-mono">
                  <div className="flex justify-between items-center text-ink-700 dark:text-ink-300">
                    <span>Duration:</span>
                    <strong className="text-ink-900 dark:text-ink-100 font-semibold">{flagshipInternship.duration}</strong>
                  </div>
                  <div className="flex justify-between items-center text-ink-700 dark:text-ink-300">
                    <span>Cohort Size:</span>
                    <strong className="text-ink-900 dark:text-ink-100 font-semibold">{flagshipInternship.seats} Fellows</strong>
                  </div>
                  <div className="flex justify-between items-center text-ink-700 dark:text-ink-300">
                    <span>Deadline:</span>
                    <strong className="text-coral font-bold">{flagshipInternship.deadline}</strong>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href={`/internships/${flagshipInternship.slug}`}
                    className="w-full py-3.5 btn-brand-primary text-xs font-semibold uppercase tracking-wider text-center block"
                  >
                    Examine Docket &amp; Apply
                  </Link>
                </div>

              </div>

            </div>

          </div>
        </section>
      )}

      {/* 3. JOURNAL SPOTLIGHT: 1 DOMINANT ARTICLE + SHORT RECENT INDEX */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-ink-900/15 dark:border-ink-700 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-royal-500 dark:text-royal-400">
              Publication Spotlight
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-ink-950 dark:text-ink-50 tracking-tight">
              Selected Legal Treatises
            </h2>
          </div>
          <Link
            href="/articles"
            className="text-sm font-semibold text-royal-600 dark:text-royal-400 hover:underline flex items-center space-x-1"
          >
            <span>Explore all publications</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Dominant Lead Treatise (7 cols) */}
          {leadArticle && (
            <div className="lg:col-span-7 p-8 sm:p-10 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 space-y-5 shadow-brutal">
              
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="px-2.5 py-0.5 bg-royal-50 dark:bg-royal-950/40 text-royal-600 dark:text-royal-400 font-bold uppercase tracking-wider text-[11px] border border-royal-200 dark:border-royal-800">
                  {leadArticle.category}
                </span>
                <span className="text-ink-500 dark:text-ink-400 flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{leadArticle.readTime}</span>
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-ink-950 dark:text-ink-50 leading-snug">
                <Link href={`/articles/${leadArticle.slug}`} className="hover:text-royal-500 dark:hover:text-royal-400 transition-colors">
                  {leadArticle.title}
                </Link>
              </h3>

              <p className="text-sm text-ink-600 dark:text-ink-300 leading-relaxed font-normal">
                {leadArticle.abstract}
              </p>

              <div className="pt-4 border-t border-ink-900/10 dark:border-ink-800 flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-ink-950 dark:text-ink-50 block">{leadArticle.author.name}</span>
                  <span className="text-[11px] text-ink-500 dark:text-ink-400 font-mono block">{leadArticle.author.institution}</span>
                </div>
                <Link
                  href={`/articles/${leadArticle.slug}`}
                  className="px-4 py-2 btn-brand-secondary text-xs font-semibold uppercase tracking-wider flex items-center space-x-1"
                >
                  <span>Read Treatise</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          )}

          {/* Simple Recent Articles Ledger (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-500 dark:text-ink-400 pb-2 border-b border-ink-900/10 dark:border-ink-800">
              Recent Additions to the Ledger
            </h4>

            <div className="divide-y divide-ink-900/10 dark:divide-ink-800">
              {recentArticles.map((article) => (
                <article key={article.id} className="py-4 space-y-1.5 group">
                  <div className="flex items-center justify-between text-[11px] font-mono text-ink-400">
                    <span className="text-royal-600 dark:text-royal-400 font-semibold uppercase">
                      {article.category}
                    </span>
                    <span>{article.publishedAt}</span>
                  </div>

                  <h4 className="font-serif text-lg font-bold text-ink-950 dark:text-ink-50 group-hover:text-royal-500 dark:group-hover:text-royal-400 transition-colors leading-snug">
                    <Link href={`/articles/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h4>

                  <div className="flex items-center justify-between text-xs text-ink-600 dark:text-ink-400 pt-1 font-mono">
                    <span>By {article.author.name}</span>
                    <span>{article.readTime}</span>
                  </div>
                </article>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/publish"
                className="w-full py-3 px-4 text-center block btn-brand-secondary text-xs font-semibold uppercase tracking-wider"
              >
                Submit Your Manuscript &rarr;
              </Link>
            </div>

          </div>

        </div>

      </section>

      {/* 4. HOW IT WORKS: DISCOVER -> SUBMIT -> PAY SECURELY -> PARTICIPATE OR PUBLISH */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 p-8 sm:p-14 shadow-brutal space-y-10">
          
          <div className="max-w-xl space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-royal-500 dark:text-royal-400">
              Clear &amp; Predictable Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-ink-950 dark:text-ink-50 tracking-tight">
              How LexMinds Operates
            </h2>
            <p className="text-sm text-ink-600 dark:text-ink-300 leading-relaxed font-normal">
              A transparent four-step workflow from discovery to peer publication or research completion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
            
            {/* Step 1 */}
            <div className="p-6 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 space-y-3">
              <div className="font-mono text-xs font-bold text-royal-500 dark:text-royal-400 border-b border-ink-900/10 dark:border-ink-800 pb-2 flex items-center justify-between">
                <span>01. DISCOVER</span>
                <span className="text-ink-400">Open calls</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-ink-950 dark:text-ink-50">
                Explore Dockets
              </h3>
              <p className="text-xs text-ink-600 dark:text-ink-300 leading-relaxed">
                Review active research fellowship openings or examine upcoming publication themes and citation requirements.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 space-y-3">
              <div className="font-mono text-xs font-bold text-royal-500 dark:text-royal-400 border-b border-ink-900/10 dark:border-ink-800 pb-2 flex items-center justify-between">
                <span>02. SUBMIT</span>
                <span className="text-ink-400">Intake form</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-ink-950 dark:text-ink-50">
                Sign In &amp; Apply
              </h3>
              <p className="text-xs text-ink-600 dark:text-ink-300 leading-relaxed">
                Authenticate securely via Google to associate your verified credentials with your research proposal or manuscript draft.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 space-y-3">
              <div className="font-mono text-xs font-bold text-royal-500 dark:text-royal-400 border-b border-ink-900/10 dark:border-ink-800 pb-2 flex items-center justify-between">
                <span>03. PAY SECURELY</span>
                <span className="text-ink-400">Razorpay</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-ink-950 dark:text-ink-50">
                Processing Fee
              </h3>
              <p className="text-xs text-ink-600 dark:text-ink-300 leading-relaxed">
                Complete the administrative intake fee via encrypted Razorpay checkout with instant verification tokens.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-6 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 space-y-3">
              <div className="font-mono text-xs font-bold text-royal-500 dark:text-royal-400 border-b border-ink-900/10 dark:border-ink-800 pb-2 flex items-center justify-between">
                <span>04. PARTICIPATE</span>
                <span className="text-ink-400">Publish</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-ink-950 dark:text-ink-50">
                Research &amp; Output
              </h3>
              <p className="text-xs text-ink-600 dark:text-ink-300 leading-relaxed">
                Engage in your 8-week structured fellowship cohort or work with student editors toward permanent open-access publication.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 5. TRANSPARENT TRUST MANIFESTO: WHAT WE DO & DO NOT PROMISE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 p-8 sm:p-12 shadow-brutal space-y-8">
          
          <div className="space-y-2 border-b border-ink-900/15 dark:border-ink-700 pb-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-royal-500 dark:text-royal-400">
              Institutional Honesty
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-ink-950 dark:text-ink-50 tracking-tight">
              What LexMinds Does &amp; What We Do Not Promise
            </h2>
            <p className="text-sm text-ink-600 dark:text-ink-300 max-w-2xl leading-relaxed font-normal">
              As a student-led initiative, we prioritize genuine academic rigor over inflated commercial claims.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
            
            {/* What We Provide */}
            <div className="space-y-4">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center space-x-2">
                <Check className="w-4 h-4" />
                <span>What We Stand By</span>
              </h3>
              
              <ul className="space-y-3 text-xs text-ink-700 dark:text-ink-300">
                <li className="flex items-start space-x-2.5">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0">&bull;</span>
                  <span><strong>Constructive Editorial Evaluation:</strong> Every submitted manuscript is carefully reviewed by senior student editors for thesis clarity and citation rigor.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0">&bull;</span>
                  <span><strong>Structured Fellowship Syllabi:</strong> Research fellows follow realistic weekly milestones with statutory tracking deliverables.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0">&bull;</span>
                  <span><strong>Open-Access Archival Dockets:</strong> Published scholarship is permanently hosted and accessible to student researchers nationwide.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0">&bull;</span>
                  <span><strong>Verified Reference Records:</strong> Successful completion is recorded with verifiable administrative reference IDs.</span>
                </li>
              </ul>
            </div>

            {/* What We Do Not Claim */}
            <div className="space-y-4">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-coral flex items-center space-x-2">
                <ShieldAlert className="w-4 h-4" />
                <span>What We Do Not Claim</span>
              </h3>
              
              <ul className="space-y-3 text-xs text-ink-700 dark:text-ink-300">
                <li className="flex items-start space-x-2.5">
                  <span className="text-coral font-bold shrink-0">&times;</span>
                  <span><strong>No Guaranteed Clerkships or Jobs:</strong> Fellowships are educational and do not promise judicial clerkships or firm employment.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <span className="text-coral font-bold shrink-0">&times;</span>
                  <span><strong>Not an Official University Body:</strong> LexMinds is an independent academic initiative, not a university faculty or government agency.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <span className="text-coral font-bold shrink-0">&times;</span>
                  <span><strong>No Guaranteed Publication:</strong> Submitting an evaluation fee does not guarantee manuscript publication or fellowship selection.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <span className="text-coral font-bold shrink-0">&times;</span>
                  <span><strong>No Fictional Fast-Track Claims:</strong> We do not make unsubstantiated 48-hour peer-review claims.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* 6. CONCISE FINAL CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-10 sm:p-16 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 space-y-6 shadow-brutal max-w-4xl mx-auto">
          
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-ink-950 dark:text-ink-50 tracking-tight">
              Ready to publish your legal scholarship?
            </h2>
            <p className="text-base text-ink-600 dark:text-ink-300 max-w-lg mx-auto font-normal">
              Submit your analytical commentary for editorial review or join our upcoming research fellowship cohort.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/publish"
              className="w-full sm:w-auto px-7 py-3.5 btn-brand-primary text-sm font-semibold tracking-wide"
            >
              Submit manuscript
            </Link>
            <Link
              href="/internships"
              className="w-full sm:w-auto px-7 py-3.5 btn-brand-secondary text-sm font-semibold tracking-wide"
            >
              Explore fellowships
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
