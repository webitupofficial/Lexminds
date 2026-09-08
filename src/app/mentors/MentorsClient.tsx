'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, X, User, ExternalLink, GraduationCap, Sparkles } from 'lucide-react';
import { Mentor, MENTORS_DATA } from '@/lib/mentors-data';

interface MentorsClientProps {
  initialMentors?: Mentor[];
}

export default function MentorsClient({ initialMentors = MENTORS_DATA }: MentorsClientProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMentors = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return initialMentors;
    return initialMentors.filter((mentor) => {
      return (
        mentor.name.toLowerCase().includes(query) ||
        mentor.designation.toLowerCase().includes(query) ||
        (mentor.organization && mentor.organization.toLowerCase().includes(query)) ||
        (mentor.qualifications && mentor.qualifications.toLowerCase().includes(query)) ||
        mentor.expertise.some((e) => e.toLowerCase().includes(query))
      );
    });
  }, [initialMentors, searchQuery]);

  return (
    <div className="space-y-10">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by mentor name, designation, or expertise topic..."
            className="w-full pl-10 pr-10 py-2.5 rounded-sm text-xs sm:text-sm bg-surface-light dark:bg-surface-dark border border-ink-900/15 dark:border-ink-700 text-ink-900 dark:text-ink-50 placeholder:text-ink-400 dark:placeholder:text-ink-500 focus:outline-none focus:ring-1 focus:ring-royal-500 transition-all shadow-sm"
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

        <div className="text-xs font-mono text-ink-500 dark:text-ink-400">
          Showing <span className="font-bold text-ink-950 dark:text-ink-50">{filteredMentors.length}</span> {filteredMentors.length === 1 ? 'Mentor' : 'Mentors'}
        </div>
      </div>

      {/* Clean Cards Grid */}
      {filteredMentors.length === 0 ? (
        <div className="p-12 text-center rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900/15 dark:border-ink-700 space-y-2 shadow-brutal">
          <p className="text-sm font-medium text-ink-900 dark:text-ink-100">
            No mentors found matching &ldquo;{searchQuery}&rdquo;
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="text-xs font-mono text-royal-600 dark:text-royal-400 hover:underline"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredMentors.map((mentor) => (
            <div
              key={mentor.id}
              className="p-6 sm:p-8 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 shadow-brutal flex flex-col justify-between space-y-6 transition-all duration-200 hover:-translate-y-0.5"
            >
              <div className="space-y-4">
                {/* Photo & Identity Header */}
                <div className="flex items-start space-x-5">
                  {/* Photo / Avatar */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-sm bg-paper-200 dark:bg-ink-850 border border-ink-900/20 dark:border-ink-700 shrink-0 overflow-hidden flex items-center justify-center relative shadow-sm">
                    {mentor.imageUrl ? (
                      <Image
                        src={mentor.imageUrl}
                        alt={mentor.name}
                        width={96}
                        height={96}
                        unoptimized
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-ink-400 dark:text-ink-600">
                        <User className="w-8 h-8 stroke-[1.5]" />
                      </div>
                    )}
                  </div>

                  {/* Name, Designation & Organization */}
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg sm:text-xl font-serif font-bold text-ink-950 dark:text-ink-50 leading-snug">
                        {mentor.name}
                      </h3>
                      {mentor.linkedinUrl && (
                        <a
                          href={mentor.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-ink-400 hover:text-royal-600 dark:hover:text-royal-400 transition-colors shrink-0 p-1"
                          title="LinkedIn Profile"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>

                    <p className="text-xs font-mono font-bold text-royal-600 dark:text-royal-400 uppercase tracking-wider">
                      {mentor.designation}
                    </p>

                    {mentor.organization && (
                      <p className="text-xs text-ink-600 dark:text-ink-300 font-medium leading-tight">
                        {mentor.organization}
                      </p>
                    )}

                    {/* Academic Credentials & Qualifications Badge */}
                    {mentor.qualifications && (
                      <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-sm bg-amber-50 dark:bg-amber-950/40 border border-amber-300/80 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 text-[11px] font-mono font-semibold max-w-full">
                        <GraduationCap className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                        <span className="truncate">{mentor.qualifications}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Detailed Bio */}
                {mentor.bio && (
                  <p className="text-xs sm:text-sm text-ink-700 dark:text-ink-300 leading-relaxed font-normal pt-1">
                    {mentor.bio}
                  </p>
                )}
              </div>

              {/* Expertise in Specific Topics */}
              <div className="pt-4 border-t border-ink-900/10 dark:border-ink-800 space-y-2">
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-ink-500 dark:text-ink-400">
                  Areas of Practice &amp; Mentorship
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {mentor.expertise.map((topic, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-sm text-[11px] font-mono bg-royal-50 dark:bg-royal-950/40 border border-royal-200/80 dark:border-royal-800/80 text-royal-700 dark:text-royal-300"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Institutional Advisory Invitation Banner */}
      <div className="p-6 sm:p-8 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 shadow-brutal flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-2xl">
          <div className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold uppercase tracking-wider text-royal-600 dark:text-royal-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Faculty &amp; Practice Outreach</span>
          </div>
          <h4 className="font-serif font-bold text-base sm:text-lg text-ink-950 dark:text-ink-50">
            Join the Lex Minds Mentorship &amp; Advisory Council
          </h4>
          <p className="text-xs text-ink-600 dark:text-ink-300 leading-relaxed">
            Are you a practicing advocate, legal academic, or industry specialist passionate about guiding law students through analytical research, legal drafting, and courtroom jurisprudence? Connect with our Academic Desk.
          </p>
        </div>
        <Link
          href="/contact"
          className="px-5 py-3 btn-brand-primary text-xs font-semibold uppercase tracking-wider shrink-0 self-start sm:self-auto"
        >
          Express Interest
        </Link>
      </div>
    </div>
  );
}
