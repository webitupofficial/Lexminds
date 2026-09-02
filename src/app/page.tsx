import React from 'react';
import Link from 'next/link';
import { 
  Scale, 
  BookOpen, 
  Briefcase, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  Sparkles,
  Award,
  Layers,
  FileText,
  Compass,
  GraduationCap
} from 'lucide-react';
import { INITIAL_INTERNSHIPS, INITIAL_ARTICLES } from '@/lib/data-store';

export const metadata = {
  title: 'LexMinds | Modern Legal Scholarship & Research Fellowship',
  description: 'LexMinds is a legal research and scholarship initiative connecting aspiring law students with peer-reviewed publications and selective research fellowships.',
};

export default function HomePage() {
  const flagshipInternship = INITIAL_INTERNSHIPS[0];
  const featuredArticles = INITIAL_ARTICLES.slice(0, 3);

  return (
    <div className="space-y-24 sm:space-y-36 pb-24 relative overflow-hidden">
      
      {/* Abstract Ethereal Ambient Orbs */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[400px] sm:h-[550px] bg-gradient-to-b from-amber-500/10 via-gold-500/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 -left-48 w-[400px] h-[400px] bg-blue-600/5 dark:bg-blue-900/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-2/3 -right-48 w-[400px] h-[400px] bg-gold-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* 1. HERO SECTION (SPACIOUS, EDITORIAL, MINIMAL) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-24 text-center space-y-8">
        
        {/* Clean Static Badge (No Blinking) */}
        <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-slate-100/80 dark:bg-slate-900/70 border border-slate-200/80 dark:border-gold-500/30 text-slate-700 dark:text-gold-300 text-xs font-semibold tracking-wide backdrop-blur-md shadow-sm">
          <Scale className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400" />
          <span>Independent Legal Scholarship &amp; Research Initiative</span>
        </div>

        {/* Hero Main Headline */}
        <div className="space-y-6 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
            Where Rigorous Legal Mind Meets <span className="gold-gradient-text">Scholarly Depth</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
            A focused platform dedicated to advancing critical legal research, peer-reviewed articles, and merit-based research fellowships for emerging law scholars.
          </p>
        </div>

        {/* Hero Actions (Generous Claymorphic / Glass Buttons) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/internships"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-950 dark:bg-gradient-to-r dark:from-gold-400 dark:via-gold-500 dark:to-gold-400 text-white dark:text-slate-950 font-bold text-xs uppercase tracking-widest hover:opacity-90 shadow-[0_10px_25px_rgba(0,0,0,0.15)] dark:shadow-[0_10px_30px_rgba(212,175,55,0.3)] transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
          >
            <span>View Fellowship Opening</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/articles"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/80 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10 font-semibold text-xs uppercase tracking-widest backdrop-blur-xl shadow-sm transition-all flex items-center justify-center space-x-2"
          >
            <BookOpen className="w-4 h-4 text-gold-600 dark:text-gold-400" />
            <span>Read Law Articles</span>
          </Link>
        </div>

      </section>

      {/* 2. SINGLE FLAGSHIP INTERNSHIP SPOTLIGHT */}
      {flagshipInternship && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-gold-600 dark:text-gold-400">
                  Current Opening
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900 dark:text-white mt-1">
                  Active Research Fellowship
                </h2>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                1 Selective Opportunity Active
              </span>
            </div>

            {/* Claymorphic Spotlight Card */}
            <div className="clay-card rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-gold-500/30 relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Details (8 Cols) */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-lg bg-gold-50 dark:bg-gold-950/80 text-gold-700 dark:text-gold-400 border border-gold-500/30">
                      {flagshipInternship.practiceArea}
                    </span>
                    <span className="text-xs font-medium px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {flagshipInternship.mode} &bull; {flagshipInternship.duration}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">
                      {flagshipInternship.title}
                    </h3>
                    <p className="text-sm font-semibold text-gold-700 dark:text-gold-400 mt-1">
                      {flagshipInternship.organization} &bull; {flagshipInternship.location}
                    </p>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {flagshipInternship.description}
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {flagshipInternship.responsibilities.slice(0, 2).map((item, idx) => (
                      <div key={idx} className="flex items-start space-x-2.5 text-xs text-slate-600 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-gold-600 dark:text-gold-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action / Summary Box (4 Cols) */}
                <div className="lg:col-span-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 p-6 space-y-5 text-xs">
                  <div className="space-y-1">
                    <span className="text-slate-400 uppercase text-[10px] font-semibold tracking-wider">Evaluation Fee</span>
                    <div className="text-2xl font-serif font-bold text-slate-900 dark:text-gold-400">
                      ₹{flagshipInternship.applicationFee}.00
                    </div>
                  </div>

                  <div className="space-y-2 border-t border-slate-200 dark:border-white/10 pt-3 text-slate-600 dark:text-slate-400">
                    <div className="flex justify-between">
                      <span>Available Seats:</span>
                      <span className="font-semibold text-slate-900 dark:text-white">{flagshipInternship.seats} Fellows</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Application Deadline:</span>
                      <span className="font-semibold text-rose-600 dark:text-rose-400">{flagshipInternship.deadline}</span>
                    </div>
                  </div>

                  <Link
                    href={`/internships/${flagshipInternship.slug}`}
                    className="w-full py-3.5 rounded-xl bg-slate-900 dark:bg-gold-400 text-white dark:text-slate-950 font-bold text-xs uppercase tracking-wider text-center block shadow-md transition-all hover:opacity-90"
                  >
                    View Role &amp; Apply
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </section>
      )}

      {/* 3. PEER-REVIEWED ARTICLES (EDITORIAL MINIMALISM) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold-600 dark:text-gold-400">
              Publications &amp; Case Notes
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900 dark:text-white mt-1">
              Recent Law Treatises
            </h2>
          </div>

          <Link
            href="/articles"
            className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-gold-700 dark:text-gold-400 hover:text-gold-600 dark:hover:text-gold-300 transition-colors"
          >
            <span>All Articles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredArticles.map((article) => (
            <div
              key={article.id}
              className="clay-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-900 text-gold-700 dark:text-gold-400 border border-slate-200 dark:border-white/10">
                    {article.category}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime}</span>
                  </span>
                </div>

                <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {article.abstract}
                </p>

                <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{article.author.name}</span>
                  <span>{article.publishedAt}</span>
                </div>
              </div>

              <Link
                href={`/articles/${article.slug}`}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-900/80 hover:bg-gold-500 hover:text-slate-950 dark:hover:bg-gold-400 dark:hover:text-slate-950 text-slate-700 dark:text-slate-200 font-semibold text-xs uppercase tracking-wider border border-slate-200/80 dark:border-white/10 transition-all flex items-center justify-center space-x-1.5 group/btn"
              >
                <span>Read Full Treatise</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>

      </section>

      {/* 4. FOUNDATIONAL PILLARS (ETHICAL & ACADEMIC) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="clay-card rounded-3xl p-8 sm:p-14 border border-slate-200/80 dark:border-white/10 space-y-10">
          
          <div className="max-w-2xl mx-auto text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-600 dark:text-gold-400">
              Our Academic Commitments
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900 dark:text-white">
              Built on Integrity, Rigor &amp; Merit
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              We are building a scholarly foundation that prioritizes quality research, accessible legal mentorship, and unbiased evaluation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/70 dark:border-white/5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-gold-100 dark:bg-slate-800 border border-gold-500/30 flex items-center justify-center text-gold-700 dark:text-gold-400 font-serif font-bold">
                01
              </div>
              <h3 className="text-base font-serif font-bold text-slate-900 dark:text-white">
                Double-Blind Peer Review
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                All submitted manuscripts are scrubbed of author identities and evaluated objectively by independent legal reviewers.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/70 dark:border-white/5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-gold-100 dark:bg-slate-800 border border-gold-500/30 flex items-center justify-center text-gold-700 dark:text-gold-400 font-serif font-bold">
                02
              </div>
              <h3 className="text-base font-serif font-bold text-slate-900 dark:text-white">
                Merit-Based Fellowships
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Every applicant receives equal consideration regardless of institution tier, assessed strictly on analytical drafting and rationale.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/70 dark:border-white/5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-gold-100 dark:bg-slate-800 border border-gold-500/30 flex items-center justify-center text-gold-700 dark:text-gold-400 font-serif font-bold">
                03
              </div>
              <h3 className="text-base font-serif font-bold text-slate-900 dark:text-white">
                Standardized Citations
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Treatises and notes are indexed with uniform Bluebook (21st) and OSCOLA citation formats for academic utility.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 5. INQUIRY / CONTACT CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-slate-100 to-slate-200/70 dark:from-slate-900 dark:to-slate-950 border border-slate-200 dark:border-white/10 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">
            Have Questions or Want to Collaborate?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
            Reach out to our academic desk for research inquiries, fellowship details, or editorial submissions.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 px-7 py-3 rounded-full bg-slate-900 dark:bg-gold-400 text-white dark:text-slate-950 text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all shadow-md"
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
