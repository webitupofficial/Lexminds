'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Search, X, User, ExternalLink } from 'lucide-react';
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
        mentor.expertise.some((e) => e.toLowerCase().includes(query))
      );
    });
  }, [initialMentors, searchQuery]);

  return (
    <div className="space-y-8">
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
        <div className="p-12 text-center rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900/15 dark:border-ink-700 space-y-2">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor) => (
            <div
              key={mentor.id}
              className="p-6 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 shadow-brutal flex flex-col justify-between space-y-5 transition-all duration-200 hover:-translate-y-0.5"
            >
              <div className="space-y-4">
                {/* Photo & Identity Header */}
                <div className="flex items-start space-x-4">
                  {/* Photo / Avatar Placeholder */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-sm bg-paper-200 dark:bg-ink-850 border border-ink-900/15 dark:border-ink-700 shrink-0 overflow-hidden flex items-center justify-center relative">
                    {mentor.imageUrl ? (
                      <Image
                        src={mentor.imageUrl}
                        alt={mentor.name}
                        width={80}
                        height={80}
                        unoptimized
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-ink-400 dark:text-ink-600">
                        <User className="w-8 h-8 stroke-[1.5]" />
                      </div>
                    )}
                  </div>

                  {/* Name, Designation & Organization */}
                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base sm:text-lg font-serif font-bold text-ink-950 dark:text-ink-50 leading-snug truncate">
                        {mentor.name}
                      </h3>
                      {mentor.linkedinUrl && (
                        <a
                          href={mentor.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-ink-400 hover:text-royal-600 dark:hover:text-royal-400 transition-colors ml-1 shrink-0"
                          title="LinkedIn Profile"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>

                    <p className="text-xs font-mono font-medium text-royal-600 dark:text-royal-400">
                      {mentor.designation}
                    </p>
                    {mentor.organization && (
                      <p className="text-xs text-ink-500 dark:text-ink-400 leading-tight truncate">
                        {mentor.organization}
                      </p>
                    )}
                  </div>
                </div>

                {/* Bio (if provided) */}
                {mentor.bio && (
                  <p className="text-xs text-ink-600 dark:text-ink-300 leading-relaxed line-clamp-3">
                    {mentor.bio}
                  </p>
                )}
              </div>

              {/* Expertise in Specific Topics */}
              <div className="pt-3 border-t border-ink-900/10 dark:border-ink-800 space-y-2">
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-ink-500 dark:text-ink-400">
                  Expertise
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
    </div>
  );
}
