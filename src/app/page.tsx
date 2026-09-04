import React from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  ArrowUpRight, 
  Clock, 
  ChevronRight, 
  Check, 
  BookOpen, 
  Search, 
  PenTool, 
  Smartphone, 
  GraduationCap, 
  Scale, 
  Sparkles, 
  Users, 
  TrendingUp, 
  AlertCircle,
  Mail,
  Compass
} from 'lucide-react';
import { INITIAL_INTERNSHIPS, INITIAL_ARTICLES } from '@/lib/data-store';

export const metadata = {
  title: 'LexMinds India | Legal Education, Research, Writing & Media',
  description: 'LexMinds India is a student-led platform empowering students through legal learning, research, writing, publications, and practical skills. Learn. Research. Write. Create. Grow.',
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
              <span>Student-Led Legal Education &amp; Media Platform</span>
            </div>

            <div className="space-y-4">
              <h1 className="font-serif text-fluid-hero font-bold text-ink dark:text-ink-50 tracking-tight leading-[1.04]">
                Empowering Students Through{' '}
                <span className="text-royal-500 dark:text-royal-400 block sm:inline">
                  Legal Learning &amp; Practical Skills.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-ink-600 dark:text-ink-300 max-w-xl leading-relaxed font-normal">
                Welcome to <strong className="text-ink-900 dark:text-ink-100 font-semibold">LexMinds India</strong>. We create a space where law students can learn, research, write, create, and share legal knowledge while developing practical skills that support their academic and professional growth.
              </p>
            </div>

            {/* Clear Primary & Secondary Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href="/internships"
                className="px-6 py-3.5 btn-brand-primary text-sm font-semibold tracking-wide text-center flex items-center justify-center space-x-2"
              >
                <span>Explore Internship Programmes</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/articles"
                className="px-6 py-3.5 btn-brand-secondary text-sm font-semibold tracking-wide text-center flex items-center justify-center space-x-2"
              >
                <span>Read Student Publications</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Core Mantra Marker */}
            <div className="pt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-ink-500 dark:text-ink-400">
              <span className="font-bold text-royal-600 dark:text-royal-400 uppercase tracking-wider">
                Learn &bull; Research &bull; Write &bull; Create &bull; Grow
              </span>
              <span>&bull;</span>
              <span>Student-Led Initiative</span>
            </div>

          </div>

          {/* Right: Editorial Composition & Pillars (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              <div className="relative p-6 sm:p-8 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 shadow-brutal transition-all duration-300">
                
                {/* Visual Header Strip */}
                <div className="flex items-center justify-between pb-4 border-b border-ink-900/10 dark:border-ink-800 font-mono text-[11px] text-ink-500 dark:text-ink-400">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-royal-500 dark:bg-royal-400 inline-block" />
                    <span className="font-bold uppercase tracking-wider text-ink-900 dark:text-ink-100">LexMinds India Core Focus</span>
                  </div>
                  <span>Practical Skills</span>
                </div>

                {/* Core Pillars List */}
                <div className="py-6 space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-sm bg-royal-50 dark:bg-royal-950/50 border border-royal-200 dark:border-royal-800 flex items-center justify-center text-royal-600 dark:text-royal-400 shrink-0">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-ink-950 dark:text-ink-50 text-sm">Legal Education</h4>
                      <p className="text-xs text-ink-600 dark:text-ink-400">Educational resources to understand legal concepts &amp; developments.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-sm bg-royal-50 dark:bg-royal-950/50 border border-royal-200 dark:border-royal-800 flex items-center justify-center text-royal-600 dark:text-royal-400 shrink-0">
                      <Search className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-ink-950 dark:text-ink-50 text-sm">Legal Research</h4>
                      <p className="text-xs text-ink-600 dark:text-ink-400">Exploring contemporary legal issues through structured analysis.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-sm bg-royal-50 dark:bg-royal-950/50 border border-royal-200 dark:border-royal-800 flex items-center justify-center text-royal-600 dark:text-royal-400 shrink-0">
                      <PenTool className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-ink-950 dark:text-ink-50 text-sm">Legal Writing &amp; Publications</h4>
                      <p className="text-xs text-ink-600 dark:text-ink-400">Articles, case commentaries, judgment analyses, and blogs.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-sm bg-royal-50 dark:bg-royal-950/50 border border-royal-200 dark:border-royal-800 flex items-center justify-center text-royal-600 dark:text-royal-400 shrink-0">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-ink-950 dark:text-ink-50 text-sm">Legal Media</h4>
                      <p className="text-xs text-ink-600 dark:text-ink-400">Legal news, carousels, videos, and legal awareness content.</p>
                    </div>
                  </div>
                </div>

                {/* Annotation Footnote */}
                <div className="pt-4 border-t border-ink-900/10 dark:border-ink-800 flex items-center justify-between font-mono text-[10px] text-ink-500 dark:text-ink-400">
                  <div className="flex items-center space-x-1.5 text-royal-600 dark:text-royal-400 font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Beyond Textbooks &amp; Classrooms</span>
                  </div>
                  <span>Open Access</span>
                </div>

                {/* Decorative Geometric Tag */}
                <div className="absolute -bottom-3 -right-3 px-3 py-1.5 bg-coral text-white font-mono font-bold text-xs flex items-center justify-center border border-ink-900 shadow-brutal-sm">
                  GROW
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 2. OUR VISION & MISSION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 space-y-8 shadow-brutal">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Vision (6 cols) */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-royal-500 dark:text-royal-400">
                Our Vision
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-ink-950 dark:text-ink-50 tracking-tight">
                Legal Education Beyond Textbooks &amp; Classrooms
              </h2>
              <p className="text-sm sm:text-base text-ink-600 dark:text-ink-300 leading-relaxed font-normal">
                We believe that legal education should go beyond textbooks and classrooms. LexMinds India aims to encourage students to explore the law through research, legal writing, case analysis, publications, and responsible legal communication.
              </p>
              <p className="text-sm sm:text-base text-ink-600 dark:text-ink-300 leading-relaxed font-normal">
                Our vision is to build a growing community where students can develop their knowledge, skills, and confidence while contributing meaningful educational content to the legal community.
              </p>
            </div>

            {/* Mission (6 cols) */}
            <div className="lg:col-span-6 space-y-4 p-6 sm:p-8 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-coral font-semibold">
                Our Mission
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-ink-950 dark:text-ink-50">
                Meaningful Practical Learning
              </h3>
              <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-300 leading-relaxed font-normal">
                Our mission is to create meaningful learning opportunities that help students develop critical skills:
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 text-xs font-mono">
                <span className="p-2 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900/10 dark:border-ink-700 text-center font-bold text-royal-600 dark:text-royal-400">
                  Research
                </span>
                <span className="p-2 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900/10 dark:border-ink-700 text-center font-bold text-royal-600 dark:text-royal-400">
                  Legal Writing
                </span>
                <span className="p-2 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900/10 dark:border-ink-700 text-center font-bold text-royal-600 dark:text-royal-400">
                  Analysis
                </span>
                <span className="p-2 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900/10 dark:border-ink-700 text-center font-bold text-royal-600 dark:text-royal-400">
                  Communication
                </span>
                <span className="p-2 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900/10 dark:border-ink-700 text-center font-bold text-royal-600 dark:text-royal-400 col-span-2 sm:col-span-2">
                  Content Creation
                </span>
              </div>

              <p className="text-xs text-ink-500 dark:text-ink-400 pt-2 italic">
                We aim to encourage responsible, accurate, and accessible legal education while providing students with opportunities to learn through practical work.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 3. WHAT WE DO: 4 PILLARS DETAILED */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-ink-900/15 dark:border-ink-700 pb-4 space-y-1">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-royal-500 dark:text-royal-400">
            Pillars of Activity
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-ink-950 dark:text-ink-50 tracking-tight">
            What We Do
          </h2>
          <p className="text-sm text-ink-600 dark:text-ink-300">
            At LexMinds India, we focus on different areas of legal learning and development:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* 1. Legal Education */}
          <div className="p-6 sm:p-7 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 space-y-3 shadow-brutal flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-sm bg-royal-50 dark:bg-royal-950/50 border border-royal-200 dark:border-royal-800 flex items-center justify-center text-royal-600 dark:text-royal-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-ink-950 dark:text-ink-50">
                Legal Education
              </h3>
              <p className="text-xs text-ink-600 dark:text-ink-300 leading-relaxed">
                We create and share educational resources to help students better understand legal concepts, foundational principles, and ongoing statutory developments.
              </p>
            </div>
            <div className="pt-3 border-t border-ink-900/10 dark:border-ink-800 text-[11px] font-mono text-royal-600 dark:text-royal-400 font-semibold">
              Open Educational Resources
            </div>
          </div>

          {/* 2. Legal Research */}
          <div className="p-6 sm:p-7 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 space-y-3 shadow-brutal flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-sm bg-royal-50 dark:bg-royal-950/50 border border-royal-200 dark:border-royal-800 flex items-center justify-center text-royal-600 dark:text-royal-400">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-ink-950 dark:text-ink-50">
                Legal Research
              </h3>
              <p className="text-xs text-ink-600 dark:text-ink-300 leading-relaxed">
                We encourage students to explore emerging legal issues through structured research, doctrine tracking, comparative analysis, and academic rigor.
              </p>
            </div>
            <div className="pt-3 border-t border-ink-900/10 dark:border-ink-800 text-[11px] font-mono text-royal-600 dark:text-royal-400 font-semibold">
              Structured Methodology
            </div>
          </div>

          {/* 3. Legal Writing & Publications */}
          <div className="p-6 sm:p-7 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 space-y-3 shadow-brutal flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-sm bg-royal-50 dark:bg-royal-950/50 border border-royal-200 dark:border-royal-800 flex items-center justify-center text-royal-600 dark:text-royal-400">
                <PenTool className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-ink-950 dark:text-ink-50">
                Writing &amp; Publications
              </h3>
              <ul className="text-xs text-ink-600 dark:text-ink-300 space-y-1">
                <li>&bull; Legal article writing</li>
                <li>&bull; Case commentaries</li>
                <li>&bull; Judgment analysis</li>
                <li>&bull; Legal blog writing</li>
                <li>&bull; Research publications</li>
              </ul>
            </div>
            <div className="pt-3 border-t border-ink-900/10 dark:border-ink-800 text-[11px] font-mono text-royal-600 dark:text-royal-400 font-semibold">
              Editorial Review
            </div>
          </div>

          {/* 4. Legal Media */}
          <div className="p-6 sm:p-7 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 space-y-3 shadow-brutal flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-sm bg-royal-50 dark:bg-royal-950/50 border border-royal-200 dark:border-royal-800 flex items-center justify-center text-royal-600 dark:text-royal-400">
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-ink-950 dark:text-ink-50">
                Legal Media
              </h3>
              <ul className="text-xs text-ink-600 dark:text-ink-300 space-y-1">
                <li>&bull; Legal news &amp; updates</li>
                <li>&bull; Educational posts</li>
                <li>&bull; Informative carousels</li>
                <li>&bull; Short-form legal videos</li>
                <li>&bull; Legal awareness content</li>
              </ul>
            </div>
            <div className="pt-3 border-t border-ink-900/10 dark:border-ink-800 text-[11px] font-mono text-royal-600 dark:text-royal-400 font-semibold">
              Modern Communication
            </div>
          </div>

        </div>
      </section>

      {/* 4. OUR INTERNSHIP PROGRAMMES: OVERVIEW & FEATURED COHORT */}
      {flagshipInternship && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="border-b border-ink-900/15 dark:border-ink-700 pb-3 space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-royal-500 dark:text-royal-400">
              Practical Learning
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-ink-950 dark:text-ink-50 tracking-tight">
              Our Internship Programmes
            </h2>
            <p className="text-sm text-ink-600 dark:text-ink-300 max-w-3xl">
              LexMinds India organises student-focused programmes designed to provide practical learning experiences. The focus of our programmes may vary depending on the particular internship or programme.
            </p>
          </div>

          <div className="rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 p-8 sm:p-12 shadow-brutal relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Opportunity Scope & Details (8 cols) */}
              <div className="lg:col-span-8 space-y-6">
                
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-3 py-1 bg-royal-50 dark:bg-royal-950/40 text-royal-600 dark:text-royal-400 font-mono text-xs font-bold uppercase tracking-wider border border-royal-200 dark:border-royal-800">
                    Active Internship Programme
                  </span>
                  <span className="px-3 py-1 bg-paper-200 dark:bg-ink-800 text-ink-700 dark:text-ink-300 font-mono text-xs border border-ink-900/10 dark:border-ink-700">
                    {flagshipInternship.mode} &bull; {flagshipInternship.duration}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-3xl sm:text-4xl font-bold text-ink-950 dark:text-ink-50 tracking-tight">
                    {flagshipInternship.title}
                  </h3>
                  <p className="text-sm font-mono text-coral font-semibold uppercase tracking-wide">
                    {flagshipInternship.organization} &bull; {flagshipInternship.location}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-ink-600 dark:text-ink-300 leading-relaxed max-w-2xl font-normal">
                  {flagshipInternship.description}
                </p>

                {/* Practical Activities List */}
                <div className="space-y-2 pt-1">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-ink-500 dark:text-ink-400 block">
                    Programme Activities Include:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-ink-700 dark:text-ink-300">
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-royal-500 shrink-0" />
                      <span>Legal research &amp; legal writing</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-royal-500 shrink-0" />
                      <span>Article &amp; case commentary drafting</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-royal-500 shrink-0" />
                      <span>Judgment analysis &amp; blog writing</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-royal-500 shrink-0" />
                      <span>Legal media &amp; awareness initiatives</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Status, Fee & Application Panel (4 cols) */}
              <div className="lg:col-span-4 p-6 sm:p-8 bg-paper dark:bg-ink-900 border border-ink-900 dark:border-ink-700 space-y-6">
                
                <div className="space-y-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-ink-500 dark:text-ink-400 block">
                    Administrative Evaluation Fee
                  </span>
                  <div className="text-3xl font-serif font-bold text-ink-950 dark:text-ink-50">
                    ₹{flagshipInternship.applicationFee}.00
                  </div>
                  <span className="text-[11px] font-mono text-ink-500 dark:text-ink-400 block">
                    Covers evaluation, coordination &amp; certification
                  </span>
                </div>

                <div className="border-t border-ink-900/10 dark:border-ink-800 pt-4 space-y-3 text-xs font-mono">
                  <div className="flex justify-between items-center text-ink-700 dark:text-ink-300">
                    <span>Duration:</span>
                    <strong className="text-ink-900 dark:text-ink-100 font-semibold">{flagshipInternship.duration}</strong>
                  </div>
                  <div className="flex justify-between items-center text-ink-700 dark:text-ink-300">
                    <span>Cohort Size:</span>
                    <strong className="text-ink-900 dark:text-ink-100 font-semibold">{flagshipInternship.seats} Participants</strong>
                  </div>
                  <div className="flex justify-between items-center text-ink-700 dark:text-ink-300">
                    <span>Deadline:</span>
                    <strong className="text-coral font-bold">{flagshipInternship.deadline}</strong>
                  </div>
                </div>

                <div className="pt-2 space-y-2">
                  <Link
                    href={`/internships/${flagshipInternship.slug}`}
                    className="w-full py-3.5 btn-brand-primary text-xs font-semibold uppercase tracking-wider text-center block"
                  >
                    View Details &amp; Apply
                  </Link>
                  <Link
                    href="/internships"
                    className="w-full py-2.5 text-center block text-xs font-mono text-ink-600 dark:text-ink-400 hover:text-royal-600"
                  >
                    View All Programmes &rarr;
                  </Link>
                </div>

              </div>

            </div>
          </div>
        </section>
      )}

      {/* 5. OUR VALUES & STUDENT-LED INITIATIVE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="p-8 sm:p-12 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 space-y-8 shadow-brutal">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-ink-900/15 dark:border-ink-700 pb-8">
            
            <div className="lg:col-span-7 space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-royal-500 dark:text-royal-400">
                Our Foundation
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-ink-950 dark:text-ink-50 tracking-tight">
                Student-Led Initiative
              </h2>
              <p className="text-sm text-ink-600 dark:text-ink-300 leading-relaxed">
                LexMinds India is built and managed as a student-led initiative. We believe that students have the potential to learn, collaborate, and create meaningful contributions to legal education.
              </p>
              <p className="text-sm text-ink-600 dark:text-ink-300 leading-relaxed">
                As a growing platform, we also value the guidance of experienced legal professionals, educators, and mentors who can help us improve our work and maintain professional standards.
              </p>
            </div>

            <div className="lg:col-span-5 p-6 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 space-y-3">
              <div className="flex items-center space-x-2 text-royal-600 dark:text-royal-400 font-mono text-xs font-bold uppercase tracking-wider">
                <Users className="w-4 h-4" />
                <span>Mentorship &amp; Guidance</span>
              </div>
              <p className="text-xs text-ink-600 dark:text-ink-300 leading-relaxed">
                We actively seek mentorship from advocates, judicial clerks, and law educators to ensure our publications and research cohorts adhere to academic integrity and standard citation benchmarks.
              </p>
            </div>

          </div>

          {/* 5 Core Values */}
          <div className="space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-ink-500 dark:text-ink-400 block">
              Our Values
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              
              <div className="p-4 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 space-y-2">
                <div className="text-lg">⚖️</div>
                <h4 className="font-serif font-bold text-sm text-ink-950 dark:text-ink-50">Accuracy</h4>
                <p className="text-xs text-ink-600 dark:text-ink-300 leading-relaxed">
                  Responsible and accurate presentation of legal information.
                </p>
              </div>

              <div className="p-4 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 space-y-2">
                <div className="text-lg">📖</div>
                <h4 className="font-serif font-bold text-sm text-ink-950 dark:text-ink-50">Learning</h4>
                <p className="text-xs text-ink-600 dark:text-ink-300 leading-relaxed">
                  Continuous learning is essential for every law student.
                </p>
              </div>

              <div className="p-4 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 space-y-2">
                <div className="text-lg">✍️</div>
                <h4 className="font-serif font-bold text-sm text-ink-950 dark:text-ink-50">Originality</h4>
                <p className="text-xs text-ink-600 dark:text-ink-300 leading-relaxed">
                  Original research, writing, and creative analytical thinking.
                </p>
              </div>

              <div className="p-4 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 space-y-2">
                <div className="text-lg">🤝</div>
                <h4 className="font-serif font-bold text-sm text-ink-950 dark:text-ink-50">Collaboration</h4>
                <p className="text-xs text-ink-600 dark:text-ink-300 leading-relaxed">
                  Learning, researching, and growing together as a community.
                </p>
              </div>

              <div className="p-4 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 space-y-2">
                <div className="text-lg">🌱</div>
                <h4 className="font-serif font-bold text-sm text-ink-950 dark:text-ink-50">Growth</h4>
                <p className="text-xs text-ink-600 dark:text-ink-300 leading-relaxed">
                  Helping students develop practical skills and lasting confidence.
                </p>
              </div>

            </div>
          </div>

        </div>

      </section>

      {/* 6. JOURNAL SPOTLIGHT: 1 DOMINANT ARTICLE + SHORT RECENT INDEX */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-ink-900/15 dark:border-ink-700 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-royal-500 dark:text-royal-400">
              Publications &amp; Writing
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-ink-950 dark:text-ink-50 tracking-tight">
              Selected Legal Articles &amp; Commentaries
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
                  <span>Read Article</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          )}

          {/* Simple Recent Articles Ledger (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-500 dark:text-ink-400 pb-2 border-b border-ink-900/10 dark:border-ink-800">
              Recent Student Submissions
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
                Submit Your Article for Publication &rarr;
              </Link>
            </div>

          </div>

        </div>

      </section>

      {/* 7. IMPORTANT NOTE (TRANSPARENCY & TRUST) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-sm bg-amber-500/10 dark:bg-amber-500/5 border border-amber-500/20 space-y-3">
          <div className="flex items-center space-x-2 text-amber-900 dark:text-amber-300 font-serif font-bold text-base">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>Important Note</span>
          </div>
          <p className="text-xs sm:text-sm text-ink-700 dark:text-ink-300 leading-relaxed">
            LexMinds India is an independent, student-led platform. Unless explicitly stated otherwise through an official and verifiable affiliation, LexMinds India is not a law firm, university, government institution, or statutory authority.
          </p>
          <p className="text-xs sm:text-sm text-ink-700 dark:text-ink-300 leading-relaxed font-medium">
            The content available on the platform is intended strictly for educational and informational purposes.
          </p>
        </div>
      </section>

      {/* 8. JOIN OUR JOURNEY (FINAL CALL TO ACTION) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-10 sm:p-16 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 space-y-6 shadow-brutal max-w-4xl mx-auto">
          
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-royal-500 dark:text-royal-400">
              Join Our Journey
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-ink-950 dark:text-ink-50 tracking-tight">
              Learn. Research. Write. Create. Grow.
            </h2>
            <p className="text-base text-ink-600 dark:text-ink-300 max-w-xl mx-auto font-normal leading-relaxed">
              Whether you are interested in legal research, writing, publications, or legal media, LexMinds India aims to provide a platform for learning, collaboration, and growth.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/publish"
              className="w-full sm:w-auto px-7 py-3.5 btn-brand-primary text-sm font-semibold tracking-wide"
            >
              Submit Your Writing
            </Link>
            <Link
              href="/internships"
              className="w-full sm:w-auto px-7 py-3.5 btn-brand-secondary text-sm font-semibold tracking-wide"
            >
              Explore Programmes
            </Link>
          </div>

          <div className="pt-4 border-t border-ink-900/10 dark:border-ink-800 flex items-center justify-center space-x-2 text-xs font-mono text-ink-500 dark:text-ink-400">
            <Mail className="w-3.5 h-3.5 text-royal-500" />
            <span>
              Contact Us:{' '}
              <a href="mailto:lexmindsindia@gmail.com" className="text-royal-600 dark:text-royal-400 font-bold hover:underline">
                lexmindsindia@gmail.com
              </a>
            </span>
          </div>

        </div>
      </section>

    </div>
  );
}
