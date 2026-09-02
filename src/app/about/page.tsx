import React from 'react';
import Link from 'next/link';
import { 
  Scale, 
  ShieldCheck, 
  Award, 
  BookOpen, 
  Users, 
  Briefcase, 
  GraduationCap, 
  Building2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: 'About LexMinds | Bridging Legal Education & Industry Practice',
  description: 'Learn about LexMinds, India’s premier legal ecosystem platform founded to connect law students to verified industry clerkships and peer-reviewed journal publishing.',
  alternates: {
    canonical: 'https://lexminds.in/about',
  },
};

export default function AboutPage() {
  const advisoryBoard = [
    {
      name: 'Senior Adv. Arvind P. Datar (Honorary Advisor)',
      role: 'Senior Advocate, Supreme Court of India',
      bio: 'Renowned constitutional and corporate tax counsel with over 40 years of appellate experience before the Supreme Court of India and High Courts.'
    },
    {
      name: 'Prof. (Dr.) Sudhir Krishnaswamy',
      role: 'Vice-Chancellor, NLSIU Bengaluru',
      bio: 'Leading constitutional scholar and legal education reform pioneer in South Asia.'
    },
    {
      name: 'Adv. Pallavi Shroff',
      role: 'Managing Partner, Shardul Amarchand Mangaldas',
      bio: 'Pioneer in Indian antitrust, dispute resolution, and corporate governance.'
    },
    {
      name: 'Dr. Menaka Guruswamy',
      role: 'Senior Advocate, Supreme Court of India',
      bio: 'Constitutional jurist recognized globally for landmark civil rights and public interest litigation.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10 sm:space-y-12">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ name: 'About LexMinds', href: '/about' }]} />

      {/* Hero Section */}
      <div className="neumorph-card rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-slate-200 dark:border-gold-500/30">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold-50 dark:bg-gold-950/80 border border-gold-500/30 text-gold-700 dark:text-gold-400 text-xs font-bold uppercase tracking-wider">
            <Scale className="w-3.5 h-3.5" />
            <span>Our Foundation &amp; Mission</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">
            Democratizing <span className="gold-gradient-text">Legal Excellence</span> Across India
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            LexMinds (<code>lexminds.in</code>) was established by alumni from India&apos;s premier National Law Universities and Senior Advocates with a unified mission: dismantle the traditional barriers of nepotism and opacity in legal internships and create an open, merit-driven scholarship journal.
          </p>
        </div>
      </div>

      {/* Core Pillars */}
      <div className="space-y-6">
        <div className="border-b border-slate-200 dark:border-legal-800 pb-4">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-700 dark:text-gold-400">
            Institutional Pillars
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white mt-1">
            How We Transform Legal Careers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="neumorph-card rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-gold-100 dark:bg-gold-950 border border-gold-500/30 flex items-center justify-center text-gold-700 dark:text-gold-400">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-white">Merit-Based Internship Placements</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              We partner directly with leading Tier-1 law firms and Supreme Court chambers to standardize application evaluation, ensuring candidates from every law school receive an unbiased opportunity.
            </p>
          </div>

          <div className="neumorph-card rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-gold-100 dark:bg-gold-950 border border-gold-500/30 flex items-center justify-center text-gold-700 dark:text-gold-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-white">Rigorous Peer-Reviewed Journal</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Our law review enforces double-blind peer reviews, anti-plagiarism verification, and standardized Bluebook/OSCOLA citation formatting.
            </p>
          </div>

          <div className="neumorph-card rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-gold-100 dark:bg-gold-950 border border-gold-500/30 flex items-center justify-center text-gold-700 dark:text-gold-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-white">Ethical &amp; BCI Compliant</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Strictly non-solicitous and compliant with Bar Council of India norms, operating as an educational platform and research facilitator.
            </p>
          </div>
        </div>
      </div>

      {/* Advisory Council */}
      <div className="space-y-6">
        <div className="border-b border-slate-200 dark:border-legal-800 pb-4">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-700 dark:text-gold-400">
            Guiding Leadership
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white mt-1">
            Distinguished Academic &amp; Legal Advisory Council
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {advisoryBoard.map((advisor, index) => (
            <div
              key={index}
              className="neumorph-card rounded-2xl p-6 flex items-start space-x-4"
            >
              <div className="w-12 h-12 rounded-xl bg-gold-100 dark:bg-gold-950 border border-gold-500/30 flex items-center justify-center text-gold-700 dark:text-gold-400 font-serif font-bold text-lg shrink-0">
                {advisor.name.charAt(0)}
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-serif font-bold text-slate-900 dark:text-white">{advisor.name}</h3>
                <p className="text-xs text-gold-700 dark:text-gold-400 font-semibold">{advisor.role}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-1">{advisor.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Join the Network CTA */}
      <div className="neumorph-card rounded-3xl p-8 sm:p-10 text-center space-y-4">
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-white">
          Ready to Elevate Your Legal Trajectory?
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Explore current internship openings or submit your research paper for publication review today.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/internships"
            className="px-6 py-3 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm dark:shadow-glow-gold transition-all"
          >
            Explore Internships
          </Link>
          <Link
            href="/publish"
            className="px-6 py-3 bg-slate-100 dark:bg-legal-850 hover:bg-slate-200 dark:hover:bg-legal-800 text-slate-700 dark:text-white border border-slate-200 dark:border-legal-700 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all"
          >
            Submit Paper
          </Link>
        </div>
      </div>

    </div>
  );
}
