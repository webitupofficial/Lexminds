import React from 'react';
import Link from 'next/link';
import { 
  Scale, 
  BookOpen, 
  Search, 
  PenTool, 
  Smartphone, 
  Briefcase, 
  Users, 
  ArrowRight,
  AlertCircle,
  Mail,
  Check
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: 'About Us — Lex Minds | Legal Education, Research & Publications',
  description: 'Learn about Lex Minds, a student-led platform empowering students through legal learning, research, writing, publications, and practical skills.',
  alternates: {
    canonical: 'https://lexminds.in/about',
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ name: 'About Us', href: '/about' }]} />

      {/* Hero Section */}
      <div className="p-8 sm:p-14 bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 rounded-sm shadow-brutal space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-sm bg-royal-50 dark:bg-royal-950/40 border border-royal-200 dark:border-royal-800 text-royal-700 dark:text-royal-300 text-[11px] font-mono font-bold uppercase tracking-wider">
          <Scale className="w-3.5 h-3.5" />
          <span>About Us — Lex Minds</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-ink-950 dark:text-ink-50 tracking-tight leading-tight">
          Welcome to Lex Minds
        </h1>

        <p className="text-base sm:text-lg text-ink-700 dark:text-ink-200 leading-relaxed font-normal">
          <strong className="text-ink-950 dark:text-ink-50 font-semibold">Lex Minds</strong> is a student-led platform focused on legal education, research, writing, publications and legal media.
        </p>

        <p className="text-sm sm:text-base text-ink-600 dark:text-ink-300 leading-relaxed font-normal">
          Our mission is to create a space where law students can learn, research, write, create and share legal knowledge while developing practical skills that support their academic and professional growth.
        </p>

        <div className="pt-2 font-mono text-xs text-royal-600 dark:text-royal-400 font-bold uppercase tracking-wider">
          Learn &bull; Research &bull; Write &bull; Create &bull; Grow
        </div>
      </div>

      {/* Our Vision */}
      <div className="p-8 sm:p-10 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 shadow-brutal space-y-4">
        <div className="border-b border-ink-900/10 dark:border-ink-800 pb-2">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-royal-600 dark:text-royal-400">
            Guiding Philosophy
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink-950 dark:text-ink-50 mt-0.5">
            Our Vision
          </h2>
        </div>
        
        <p className="text-sm sm:text-base text-ink-700 dark:text-ink-300 leading-relaxed">
          We believe that legal education should go beyond textbooks and classrooms.
        </p>
        <p className="text-sm sm:text-base text-ink-700 dark:text-ink-300 leading-relaxed">
          Lex Minds aims to encourage students to explore the law through research, legal writing, case analysis, publications and responsible legal communication.
        </p>
        <p className="text-sm sm:text-base text-ink-700 dark:text-ink-300 leading-relaxed font-medium">
          Our vision is to build a growing community where students can develop their knowledge, skills and confidence while contributing meaningful educational content to the legal community.
        </p>
      </div>

      {/* What We Do */}
      <div className="space-y-6">
        <div className="border-b border-ink-900/15 dark:border-ink-700 pb-3">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-royal-600 dark:text-royal-400">
            Pillars of Learning &amp; Development
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink-950 dark:text-ink-50 mt-0.5">
            What We Do
          </h2>
          <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-400 mt-1">
            At Lex Minds, we focus on different areas of legal learning and development, including:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Legal Education */}
          <div className="p-6 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 space-y-3 shadow-brutal">
            <div className="w-10 h-10 rounded-sm bg-royal-50 dark:bg-royal-950/50 border border-royal-200 dark:border-royal-800 flex items-center justify-center text-royal-600 dark:text-royal-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif font-bold text-ink-950 dark:text-ink-50">
              📚 Legal Education
            </h3>
            <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-300 leading-relaxed">
              We create and share educational resources to help students better understand legal concepts and developments.
            </p>
          </div>

          {/* Legal Research */}
          <div className="p-6 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 space-y-3 shadow-brutal">
            <div className="w-10 h-10 rounded-sm bg-royal-50 dark:bg-royal-950/50 border border-royal-200 dark:border-royal-800 flex items-center justify-center text-royal-600 dark:text-royal-400">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif font-bold text-ink-950 dark:text-ink-50">
              🔍 Legal Research
            </h3>
            <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-300 leading-relaxed">
              We encourage students to explore legal issues through structured research and analysis.
            </p>
          </div>

          {/* Legal Writing & Publications */}
          <div className="p-6 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 space-y-3 shadow-brutal">
            <div className="w-10 h-10 rounded-sm bg-royal-50 dark:bg-royal-950/50 border border-royal-200 dark:border-royal-800 flex items-center justify-center text-royal-600 dark:text-royal-400">
              <PenTool className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif font-bold text-ink-950 dark:text-ink-50">
              ✍️ Legal Writing &amp; Publications
            </h3>
            <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-300">
              Our platform provides opportunities for students to develop skills in:
            </p>
            <ul className="text-xs text-ink-600 dark:text-ink-300 space-y-1 pl-1">
              <li>&bull; Legal article writing</li>
              <li>&bull; Case commentaries</li>
              <li>&bull; Judgment analysis</li>
              <li>&bull; Legal blog writing</li>
              <li>&bull; Research-based publications</li>
            </ul>
          </div>

          {/* Legal Media */}
          <div className="p-6 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 space-y-3 shadow-brutal">
            <div className="w-10 h-10 rounded-sm bg-royal-50 dark:bg-royal-950/50 border border-royal-200 dark:border-royal-800 flex items-center justify-center text-royal-600 dark:text-royal-400">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif font-bold text-ink-950 dark:text-ink-50">
              📱 Legal Media
            </h3>
            <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-300">
              We also explore modern ways of communicating legal knowledge through:
            </p>
            <ul className="text-xs text-ink-600 dark:text-ink-300 space-y-1 pl-1">
              <li>&bull; Legal news and updates</li>
              <li>&bull; Educational posts</li>
              <li>&bull; Informative carousels</li>
              <li>&bull; Short-form legal videos</li>
              <li>&bull; Legal awareness content</li>
            </ul>
          </div>

        </div>
      </div>

      {/* Our Internship Programmes */}
      <div className="p-8 sm:p-10 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 shadow-brutal space-y-5">
        <div className="border-b border-ink-900/10 dark:border-ink-800 pb-2">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-royal-600 dark:text-royal-400">
            Experiential Learning
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink-950 dark:text-ink-50 mt-0.5">
            Our Internship Programmes
          </h2>
        </div>

        <p className="text-sm sm:text-base text-ink-700 dark:text-ink-300 leading-relaxed">
          Lex Minds organises student-focused programmes designed to provide practical learning experiences. The focus of our programmes may vary depending on the particular internship or programme.
        </p>

        <div className="space-y-2">
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-ink-500 dark:text-ink-400">
            Our activities may include:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-ink-700 dark:text-ink-300 font-medium">
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-royal-500 shrink-0" />
              <span>Legal research</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-royal-500 shrink-0" />
              <span>Legal writing</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-royal-500 shrink-0" />
              <span>Article drafting</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-royal-500 shrink-0" />
              <span>Case commentary drafting</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-royal-500 shrink-0" />
              <span>Blog writing</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-royal-500 shrink-0" />
              <span>Judgment analysis</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-royal-500 shrink-0" />
              <span>Legal media and content creation</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-royal-500 shrink-0" />
              <span>Legal awareness initiatives</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-ink-500 dark:text-ink-400 italic pt-2">
          Each programme has its own objectives, structure and requirements, which are communicated to participants.
        </p>
      </div>

      {/* Our Mission */}
      <div className="p-8 sm:p-10 rounded-sm bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 space-y-4">
        <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-royal-600 dark:text-royal-400">
          Core Purpose
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink-950 dark:text-ink-50">
          Our Mission
        </h2>
        <p className="text-sm sm:text-base text-ink-700 dark:text-ink-300 leading-relaxed">
          Our mission is to create meaningful learning opportunities that help students develop important skills such as:
        </p>
        <div className="p-4 bg-surface-light dark:bg-surface-dark border border-ink-900/10 dark:border-ink-700 text-center font-mono font-bold text-sm sm:text-base text-royal-600 dark:text-royal-400">
          Research &bull; Legal Writing &bull; Analysis &bull; Communication &bull; Content Creation
        </div>
        <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-400 leading-relaxed">
          We aim to encourage responsible, accurate and accessible legal education while providing students with opportunities to learn through practical work.
        </p>
      </div>

      {/* Student-Led Initiative */}
      <div className="p-8 sm:p-10 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 shadow-brutal space-y-4">
        <div className="border-b border-ink-900/10 dark:border-ink-800 pb-2">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-royal-600 dark:text-royal-400">
            Community Leadership
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink-950 dark:text-ink-50 mt-0.5">
            Student-Led Initiative
          </h2>
        </div>
        <p className="text-sm sm:text-base text-ink-700 dark:text-ink-300 leading-relaxed">
          Lex Minds is built and managed as a student-led initiative. We believe that students have the potential to learn, collaborate and create meaningful contributions to legal education.
        </p>
        <p className="text-sm sm:text-base text-ink-700 dark:text-ink-300 leading-relaxed">
          As a growing platform, we also value the guidance of experienced legal professionals, educators and mentors who can help us improve our work and maintain professional standards.
        </p>
      </div>

      {/* Our Values */}
      <div className="space-y-6">
        <div className="border-b border-ink-900/15 dark:border-ink-700 pb-3">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-royal-600 dark:text-royal-400">
            Ethical Anchor
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink-950 dark:text-ink-50 mt-0.5">
            Our Values
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="p-5 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 space-y-2 shadow-brutal">
            <div className="text-xl">⚖️</div>
            <h4 className="font-serif font-bold text-base text-ink-950 dark:text-ink-50">Accuracy</h4>
            <p className="text-xs text-ink-600 dark:text-ink-300 leading-relaxed">
              We aim to encourage responsible and accurate presentation of legal information.
            </p>
          </div>

          <div className="p-5 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 space-y-2 shadow-brutal">
            <div className="text-xl">📖</div>
            <h4 className="font-serif font-bold text-base text-ink-950 dark:text-ink-50">Learning</h4>
            <p className="text-xs text-ink-600 dark:text-ink-300 leading-relaxed">
              We believe that continuous learning is essential for every law student.
            </p>
          </div>

          <div className="p-5 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 space-y-2 shadow-brutal">
            <div className="text-xl">✍️</div>
            <h4 className="font-serif font-bold text-base text-ink-950 dark:text-ink-50">Originality</h4>
            <p className="text-xs text-ink-600 dark:text-ink-300 leading-relaxed">
              We encourage original research, writing and creative thinking.
            </p>
          </div>

          <div className="p-5 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 space-y-2 shadow-brutal">
            <div className="text-xl">🤝</div>
            <h4 className="font-serif font-bold text-base text-ink-950 dark:text-ink-50">Collaboration</h4>
            <p className="text-xs text-ink-600 dark:text-ink-300 leading-relaxed">
              We believe in learning and growing together as a community.
            </p>
          </div>

          <div className="p-5 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 space-y-2 shadow-brutal">
            <div className="text-xl">🌱</div>
            <h4 className="font-serif font-bold text-base text-ink-950 dark:text-ink-50">Growth</h4>
            <p className="text-xs text-ink-600 dark:text-ink-300 leading-relaxed">
              We aim to help students develop practical skills and confidence.
            </p>
          </div>
        </div>
      </div>

      {/* Important Note */}
      <div className="p-6 sm:p-8 rounded-sm bg-amber-500/10 dark:bg-amber-500/5 border border-amber-500/20 space-y-3">
        <h3 className="text-base font-serif font-bold text-amber-900 dark:text-amber-300 flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          <span>Important Note</span>
        </h3>
        <p className="text-xs sm:text-sm text-ink-700 dark:text-ink-300 leading-relaxed">
          Lex Minds is an independent, student-led platform. Unless explicitly stated otherwise through an official and verifiable affiliation, Lex Minds is not a law firm, university, government institution or statutory authority.
        </p>
        <p className="text-xs sm:text-sm text-ink-700 dark:text-ink-300 leading-relaxed font-medium">
          The content available on the platform is intended for educational and informational purposes.
        </p>
      </div>

      {/* Join Our Journey CTA */}
      <div className="p-8 sm:p-12 text-center space-y-4 bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 rounded-sm shadow-brutal">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-royal-600 dark:text-royal-400">
          Join Our Journey
        </span>
        <h3 className="text-2xl sm:text-4xl font-serif font-bold text-ink-950 dark:text-ink-50">
          Learn. Research. Write. Create. Grow.
        </h3>
        <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-300 max-w-xl mx-auto leading-relaxed">
          Whether you are interested in legal research, writing, publications or legal media, Lex Minds aims to provide a platform for learning, collaboration and growth.
        </p>
        <p className="text-xs font-mono font-semibold text-ink-700 dark:text-ink-300">
          Empowering Students Through Legal Learning and Practical Skills.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/internships"
            className="btn-brand-primary"
          >
            Explore Programmes
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Link>
          <Link
            href="/publish"
            className="btn-brand-secondary"
          >
            Submit Writing
          </Link>
        </div>

        <div className="pt-4 border-t border-ink-900/10 dark:border-ink-800 text-xs font-mono text-ink-500">
          Contact Us:{' '}
          <a href="mailto:lexmindsindia@gmail.com" className="text-royal-600 dark:text-royal-400 underline font-bold">
            lexmindsindia@gmail.com
          </a>
        </div>
      </div>

    </div>
  );
}
