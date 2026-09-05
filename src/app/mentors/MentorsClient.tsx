'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Scale, 
  GraduationCap, 
  Briefcase, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Search, 
  Filter, 
  X, 
  CheckCircle2, 
  BookOpen, 
  Calendar, 
  Mail, 
  ExternalLink,
  Award,
  ChevronRight,
  MessageSquare,
  Users
} from 'lucide-react';
import { Mentor, MENTORS_DATA } from '@/lib/mentors-data';

interface MentorsClientProps {
  initialMentors?: Mentor[];
}

export default function MentorsClient({ initialMentors = MENTORS_DATA }: MentorsClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalMentor, setActiveModalMentor] = useState<Mentor | null>(null);
  const [detailsModalMentor, setDetailsModalMentor] = useState<Mentor | null>(null);

  // Form states for Request Mentorship Modal
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    institution: '',
    yearOfStudy: '3rd Year',
    guidanceArea: '',
    message: ''
  });

  const categories = [
    { id: 'all', label: 'All Mentors', count: initialMentors.length },
    { id: 'litigation', label: 'Constitutional & Litigation', count: initialMentors.filter(m => m.category === 'litigation').length },
    { id: 'corporate', label: 'Corporate & M&A', count: initialMentors.filter(m => m.category === 'corporate').length },
    { id: 'tech-ip', label: 'Tech, AI & IP', count: initialMentors.filter(m => m.category === 'tech-ip').length },
    { id: 'criminal', label: 'Criminal Law & BNS', count: initialMentors.filter(m => m.category === 'criminal').length },
  ];

  const filteredMentors = useMemo(() => {
    return initialMentors.filter((mentor) => {
      const matchesCategory = selectedCategory === 'all' || mentor.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !query ||
        mentor.name.toLowerCase().includes(query) ||
        mentor.title.toLowerCase().includes(query) ||
        mentor.organization.toLowerCase().includes(query) ||
        mentor.almaMater.toLowerCase().includes(query) ||
        mentor.specializations.some(s => s.toLowerCase().includes(query)) ||
        mentor.mentorshipTopics.some(t => t.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [initialMentors, selectedCategory, searchQuery]);

  const handleOpenRequest = (mentor: Mentor) => {
    setActiveModalMentor(mentor);
    setFormSubmitted(false);
    setFormData(prev => ({
      ...prev,
      guidanceArea: mentor.mentorshipTopics[0] || mentor.categoryLabel
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="space-y-12">
      {/* Search & Filter Bar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          
          {/* Search Input with glassmorphism */}
          <div className="relative flex-1 max-w-lg">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by mentor name, specialization, law school, or topic..."
              className="w-full pl-10 pr-10 py-2.5 rounded-lg text-sm bg-white/70 dark:bg-[#151724]/70 backdrop-blur-md border border-ink-900/15 dark:border-white/10 text-ink-900 dark:text-ink-50 placeholder:text-ink-400 dark:placeholder:text-ink-500 focus:outline-none focus:ring-2 focus:ring-royal-500/40 focus:border-royal-500 transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-ink-400 hover:text-ink-700 dark:hover:text-ink-200"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Result Count Badge */}
          <div className="flex items-center space-x-2 text-xs font-mono text-ink-500 dark:text-ink-400 shrink-0">
            <span>Showing</span>
            <span className="px-2 py-0.5 rounded bg-royal-100 dark:bg-royal-950/70 text-royal-700 dark:text-royal-300 font-bold border border-royal-200 dark:border-royal-800/80">
              {filteredMentors.length} of {initialMentors.length}
            </span>
            <span>Distinguished Mentors</span>
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" role="tablist">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 flex items-center space-x-1.5 ${
                  isActive
                    ? 'bg-royal-600 text-white shadow-sm ring-2 ring-royal-400/30 font-semibold'
                    : 'bg-white/60 dark:bg-[#151724]/60 hover:bg-white dark:hover:bg-[#1c1f30] text-ink-700 dark:text-ink-300 border border-ink-900/10 dark:border-white/10 backdrop-blur-sm'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-400'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 6 Glass Cards Grid */}
      {filteredMentors.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white/40 dark:bg-[#131522]/40 backdrop-blur-md border border-ink-900/10 dark:border-white/10 space-y-3">
          <Scale className="w-8 h-8 mx-auto text-ink-400" />
          <h3 className="text-base font-serif font-bold text-ink-900 dark:text-ink-100">
            No mentors match your search query
          </h3>
          <p className="text-xs text-ink-500 dark:text-ink-400 max-w-sm mx-auto">
            Try adjusting your search terms or selecting &ldquo;All Mentors&rdquo; to view the complete faculty council.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
            className="mt-2 text-xs font-mono font-bold text-royal-600 dark:text-royal-400 hover:underline uppercase tracking-wider"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredMentors.map((mentor) => (
            <div
              key={mentor.id}
              className="relative rounded-2xl backdrop-blur-xl bg-white/70 dark:bg-[#12141F]/65 border border-white/70 dark:border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.06)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_0_rgba(91,61,245,0.13)] dark:hover:shadow-[0_20px_45px_0_rgba(139,124,255,0.16)] hover:border-royal-400/40 dark:hover:border-royal-500/40 overflow-hidden flex flex-col group"
            >
              {/* Top ambient highlight line */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-royal-500/70 to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />

              {/* Radial atmospheric aura behind avatar */}
              <div className={`absolute -top-16 -right-16 w-44 h-44 rounded-full bg-gradient-to-br ${mentor.accentGlow} blur-2xl pointer-events-none opacity-60 group-hover:opacity-90 transition-opacity`} />

              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5 relative z-10">
                
                {/* Header: Avatar + Status + Category */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    
                    {/* Mentor Avatar */}
                    <div className="relative shrink-0">
                      <div className="w-14 h-14 rounded-2xl border border-white/90 dark:border-white/15 bg-gradient-to-br from-white/90 via-royal-50/60 to-royal-100/40 dark:from-royal-950/70 dark:via-ink-900/80 dark:to-ink-950 backdrop-blur-md shadow-sm flex items-center justify-center font-serif font-black text-xl text-royal-600 dark:text-royal-300 tracking-wider">
                        {mentor.initials}
                      </div>
                      
                      {/* Active green ping status dot */}
                      <span 
                        className="absolute -bottom-1 -right-1 flex h-4 w-4"
                        title={`Active Mentor • ${mentor.availability}`}
                      >
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white dark:border-ink-950" />
                      </span>
                    </div>

                    {/* Category pill */}
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-royal-50 dark:bg-royal-950/60 text-royal-700 dark:text-royal-300 border border-royal-200/80 dark:border-royal-800/60">
                      {mentor.categoryLabel}
                    </span>
                  </div>

                  {/* Name & Credentials */}
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1.5">
                      <h3 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 tracking-tight leading-snug group-hover:text-royal-600 dark:group-hover:text-royal-400 transition-colors">
                        {mentor.name}
                      </h3>
                      <span title="Verified Lex Minds Faculty Mentor">
                        <ShieldCheck className="w-4 h-4 text-royal-500 dark:text-royal-400 shrink-0" />
                      </span>
                    </div>
                    
                    <p className="text-xs font-medium text-ink-700 dark:text-ink-300">
                      {mentor.title}
                    </p>
                    <p className="text-xs text-ink-500 dark:text-ink-400 font-mono flex items-center space-x-1">
                      <Briefcase className="w-3 h-3 text-royal-500 shrink-0" />
                      <span className="truncate">{mentor.organization}</span>
                    </p>
                  </div>
                </div>

                {/* Metadata badges: Alma Mater & Experience */}
                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-ink-900/10 dark:border-white/5 text-[11px]">
                  <div className="flex items-center space-x-1.5 text-ink-600 dark:text-ink-300">
                    <GraduationCap className="w-3.5 h-3.5 text-royal-500 shrink-0" />
                    <span className="truncate font-medium">{mentor.almaMater.split('(')[0]}</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-ink-600 dark:text-ink-300 justify-end">
                    <Award className="w-3.5 h-3.5 text-royal-500 shrink-0" />
                    <span className="font-mono font-semibold">{mentor.experienceYears}+ Years Bar/Exp</span>
                  </div>
                </div>

                {/* Bio Excerpt */}
                <p className="text-xs text-ink-600 dark:text-ink-300 line-clamp-3 leading-relaxed font-normal">
                  {mentor.bio}
                </p>

                {/* Key Focus & Mentorship Areas */}
                <div className="space-y-2 pt-2 border-t border-ink-900/10 dark:border-white/5">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-ink-500 dark:text-ink-400">
                    Key Mentorship Focus
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {mentor.mentorshipTopics.slice(0, 3).map((topic, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-ink-50 dark:bg-[#181a28] text-ink-700 dark:text-ink-300 border border-ink-900/10 dark:border-white/5"
                      >
                        {topic}
                      </span>
                    ))}
                    {mentor.mentorshipTopics.length > 3 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-md text-royal-600 dark:text-royal-400 font-mono font-semibold">
                        +{mentor.mentorshipTopics.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="pt-3 border-t border-ink-900/10 dark:border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-ink-500 dark:text-ink-400 pb-1">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3 text-emerald-500" />
                      <span>{mentor.availability}</span>
                    </span>
                    <button
                      onClick={() => setDetailsModalMentor(mentor)}
                      className="text-royal-600 dark:text-royal-400 hover:underline font-semibold flex items-center space-x-0.5"
                    >
                      <span>Full Bio</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => handleOpenRequest(mentor)}
                    className="w-full py-2.5 px-4 rounded-lg bg-royal-600 hover:bg-royal-700 active:bg-royal-800 text-white text-xs font-semibold tracking-tight transition-all duration-200 flex items-center justify-center space-x-2 shadow-sm hover:shadow-md group-hover:ring-2 group-hover:ring-royal-400/30"
                  >
                    <span>Request 1:1 Guidance</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

      {/* How Mentorship Works Section */}
      <div className="p-8 sm:p-10 rounded-2xl backdrop-blur-xl bg-white/60 dark:bg-[#12141F]/60 border border-white/70 dark:border-white/10 shadow-lg space-y-6">
        <div className="border-b border-ink-900/10 dark:border-ink-800 pb-3">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-royal-600 dark:text-royal-400">
            Structured Clinical Pathway
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink-950 dark:text-ink-50 mt-0.5">
            How Lex Minds Mentorship Works
          </h2>
          <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-400 mt-1 max-w-2xl">
            A selective, clinical guidance bridge connecting serious law students with practicing Senior Advocates, Tier-1 Partners, and Academic Scholars.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-5 rounded-xl bg-white/50 dark:bg-ink-900/40 border border-ink-900/10 dark:border-white/5 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-royal-100 dark:bg-royal-950 text-royal-600 dark:text-royal-400 font-mono font-bold text-sm flex items-center justify-center">
              01
            </div>
            <h3 className="text-base font-serif font-bold text-ink-950 dark:text-ink-50">
              Select Practice Focus
            </h3>
            <p className="text-xs text-ink-600 dark:text-ink-400 leading-relaxed">
              Choose a mentor aligned with your target domain: Appellate Litigation, Corporate Transactional Drafting, DPDP Tech Law, or Criminal Jurisprudence.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white/50 dark:bg-ink-900/40 border border-ink-900/10 dark:border-white/5 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-royal-100 dark:bg-royal-950 text-royal-600 dark:text-royal-400 font-mono font-bold text-sm flex items-center justify-center">
              02
            </div>
            <h3 className="text-base font-serif font-bold text-ink-950 dark:text-ink-50">
              Submit Clinical Brief
            </h3>
            <p className="text-xs text-ink-600 dark:text-ink-400 leading-relaxed">
              Submit your specific dilemma: manuscript draft for law review publication, judicial clerkship SOP, or moot court oral argument strategy.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white/50 dark:bg-ink-900/40 border border-ink-900/10 dark:border-white/5 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-royal-100 dark:bg-royal-950 text-royal-600 dark:text-royal-400 font-mono font-bold text-sm flex items-center justify-center">
              03
            </div>
            <h3 className="text-base font-serif font-bold text-ink-950 dark:text-ink-50">
              Dedicated 1:1 Advisory
            </h3>
            <p className="text-xs text-ink-600 dark:text-ink-400 leading-relaxed">
              Receive structured feedback, chamber insights, citation corrections, and strategic career guidance tailored to competitive benchmarks.
            </p>
          </div>

        </div>
      </div>

      {/* Become a Mentor Callout */}
      <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-royal-900/10 via-royal-950/20 to-surface-dark border border-royal-500/20 dark:border-royal-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center space-x-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-royal-600 dark:text-royal-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Advisory Council Invitation</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-ink-950 dark:text-ink-50">
            Are You a Practicing Advocate, Partner, or Legal Academic?
          </h3>
          <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-300 max-w-xl">
            Join the Lex Minds Mentorship Council to support the next generation of researchers, student authors, and advocates through clinical masterclasses.
          </p>
        </div>

        <Link
          href="/contact?subject=Join+Mentorship+Council"
          className="shrink-0 px-6 py-3 rounded-lg bg-ink-950 dark:bg-ink-50 hover:bg-ink-900 dark:hover:bg-white text-white dark:text-ink-950 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 shadow-md hover:scale-105"
        >
          Join Advisory Panel
        </Link>
      </div>

      {/* Request Mentorship Modal */}
      {activeModalMentor && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/70 backdrop-blur-md animate-fadeIn"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveModalMentor(null)}
        >
          <div 
            className="relative w-full max-w-lg rounded-2xl bg-paper dark:bg-ink-900 border border-ink-900/20 dark:border-ink-700 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModalMentor(null)}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-ink-400 hover:text-ink-950 dark:hover:text-ink-50 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2 border-b border-ink-900/10 dark:border-ink-800 pb-4 pr-6">
              <div className="inline-flex items-center space-x-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-royal-600 dark:text-royal-400">
                <Scale className="w-3.5 h-3.5" />
                <span>Mentorship Application</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50">
                Request Guidance from {activeModalMentor.name}
              </h3>
              <p className="text-xs text-ink-600 dark:text-ink-400">
                {activeModalMentor.title} &bull; {activeModalMentor.organization}
              </p>
            </div>

            {formSubmitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-serif font-bold text-ink-950 dark:text-ink-50">
                  Request Successfully Registered
                </h4>
                <p className="text-xs text-ink-600 dark:text-ink-300 max-w-sm mx-auto leading-relaxed">
                  Your mentorship request for <strong className="font-semibold text-ink-900 dark:text-ink-100">{activeModalMentor.name}</strong> has been transmitted to the Lex Minds Advisory Council. Our team will review credentials and reach out via email within 48 business hours.
                </p>
                <button
                  onClick={() => setActiveModalMentor(null)}
                  className="mt-4 px-6 py-2.5 rounded-lg bg-royal-600 text-white text-xs font-semibold hover:bg-royal-700 transition-colors"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-ink-700 dark:text-ink-300">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Adv. / Student Name"
                      className="w-full px-3.5 py-2 rounded-lg text-xs bg-white dark:bg-ink-950 border border-ink-900/15 dark:border-ink-700 text-ink-900 dark:text-ink-50 focus:outline-none focus:ring-2 focus:ring-royal-500/40 focus:border-royal-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-ink-700 dark:text-ink-300">
                      Verified Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="student@university.edu"
                      className="w-full px-3.5 py-2 rounded-lg text-xs bg-white dark:bg-ink-950 border border-ink-900/15 dark:border-ink-700 text-ink-900 dark:text-ink-50 focus:outline-none focus:ring-2 focus:ring-royal-500/40 focus:border-royal-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-ink-700 dark:text-ink-300">
                      Law School / University *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.institution}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                      placeholder="e.g. NLSIU Bangalore / NLU Delhi"
                      className="w-full px-3.5 py-2 rounded-lg text-xs bg-white dark:bg-ink-950 border border-ink-900/15 dark:border-ink-700 text-ink-900 dark:text-ink-50 focus:outline-none focus:ring-2 focus:ring-royal-500/40 focus:border-royal-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-ink-700 dark:text-ink-300">
                      Current Year of Study *
                    </label>
                    <select
                      value={formData.yearOfStudy}
                      onChange={(e) => setFormData({ ...formData, yearOfStudy: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg text-xs bg-white dark:bg-ink-950 border border-ink-900/15 dark:border-ink-700 text-ink-900 dark:text-ink-50 focus:outline-none focus:ring-2 focus:ring-royal-500/40 focus:border-royal-500"
                    >
                      <option value="1st Year">1st Year (3-Yr / 5-Yr)</option>
                      <option value="2nd Year">2nd Year (3-Yr / 5-Yr)</option>
                      <option value="3rd Year">3rd Year (3-Yr / 5-Yr)</option>
                      <option value="4th Year">4th Year (5-Yr)</option>
                      <option value="5th Year">5th Year (Final Year)</option>
                      <option value="LL.M. / Research Scholar">LL.M. / Research Scholar</option>
                      <option value="Young Advocate / Trainee">Young Advocate / Trainee</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-ink-700 dark:text-ink-300">
                    Primary Area of Guidance *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.guidanceArea}
                    onChange={(e) => setFormData({ ...formData, guidanceArea: e.target.value })}
                    placeholder="e.g. SLP Drafting / M&A Due Diligence / Publication Review"
                    className="w-full px-3.5 py-2 rounded-lg text-xs bg-white dark:bg-ink-950 border border-ink-900/15 dark:border-ink-700 text-ink-900 dark:text-ink-50 focus:outline-none focus:ring-2 focus:ring-royal-500/40 focus:border-royal-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-ink-700 dark:text-ink-300">
                    Statement / Key Query (Brief) *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Outline your specific question, manuscript topic, or goal for this mentorship session..."
                    className="w-full px-3.5 py-2 rounded-lg text-xs bg-white dark:bg-ink-950 border border-ink-900/15 dark:border-ink-700 text-ink-900 dark:text-ink-50 focus:outline-none focus:ring-2 focus:ring-royal-500/40 focus:border-royal-500"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end space-x-3 border-t border-ink-900/10 dark:border-ink-800">
                  <button
                    type="button"
                    onClick={() => setActiveModalMentor(null)}
                    className="px-4 py-2 rounded-lg text-xs font-semibold text-ink-600 dark:text-ink-400 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-royal-600 hover:bg-royal-700 text-white text-xs font-semibold transition-colors flex items-center space-x-1.5 shadow-sm"
                  >
                    <span>Submit Mentorship Request</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Mentor Full Bio & Dossier Modal */}
      {detailsModalMentor && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/70 backdrop-blur-md animate-fadeIn"
          role="dialog"
          aria-modal="true"
          onClick={() => setDetailsModalMentor(null)}
        >
          <div 
            className="relative w-full max-w-2xl rounded-2xl bg-paper dark:bg-ink-900 border border-ink-900/20 dark:border-ink-700 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setDetailsModalMentor(null)}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-ink-400 hover:text-ink-950 dark:hover:text-ink-50 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Dossier Header */}
            <div className="flex items-start space-x-4 border-b border-ink-900/10 dark:border-ink-800 pb-5 pr-8">
              <div className="w-16 h-16 rounded-2xl border border-white/90 dark:border-white/15 bg-gradient-to-br from-royal-50 to-royal-100 dark:from-royal-950 dark:to-ink-950 flex items-center justify-center font-serif font-black text-2xl text-royal-600 dark:text-royal-300 shrink-0 shadow-inner">
                {detailsModalMentor.initials}
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h3 className="text-2xl font-serif font-bold text-ink-950 dark:text-ink-50">
                    {detailsModalMentor.name}
                  </h3>
                  <ShieldCheck className="w-5 h-5 text-royal-500" />
                </div>
                <p className="text-xs font-medium text-ink-700 dark:text-ink-300">
                  {detailsModalMentor.title} &bull; {detailsModalMentor.organization}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-ink-500 dark:text-ink-400 pt-1">
                  <span>{detailsModalMentor.almaMater}</span>
                  <span>&bull;</span>
                  <span>{detailsModalMentor.experienceYears}+ Years Bar/Practice</span>
                  <span>&bull;</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{detailsModalMentor.availability}</span>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-500 dark:text-ink-400">
                Professional Profile &amp; Background
              </h4>
              <p className="text-sm text-ink-700 dark:text-ink-300 leading-relaxed font-normal">
                {detailsModalMentor.bio}
              </p>
            </div>

            {/* Notable Achievements */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-500 dark:text-ink-400">
                Select Career Benchmarks &amp; Milestones
              </h4>
              <ul className="space-y-1.5 text-xs text-ink-700 dark:text-ink-300">
                {detailsModalMentor.achievements.map((ach, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-royal-500 shrink-0 mt-0.5" />
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mentorship Focus Topics */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-500 dark:text-ink-400">
                Mentorship &amp; Clinical Topics Covered
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {detailsModalMentor.mentorshipTopics.map((topic, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-surface-light dark:bg-surface-dark border border-ink-900/10 dark:border-ink-800 text-xs text-ink-700 dark:text-ink-300 flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-royal-500 shrink-0" />
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-ink-900/10 dark:border-ink-800 flex items-center justify-between">
              <button
                onClick={() => setDetailsModalMentor(null)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-ink-600 dark:text-ink-400 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors"
              >
                Back to Mentors
              </button>
              <button
                onClick={() => {
                  const m = detailsModalMentor;
                  setDetailsModalMentor(null);
                  handleOpenRequest(m);
                }}
                className="px-5 py-2 rounded-lg bg-royal-600 hover:bg-royal-700 text-white text-xs font-semibold transition-colors flex items-center space-x-1.5 shadow-sm"
              >
                <span>Request 1:1 Guidance</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
