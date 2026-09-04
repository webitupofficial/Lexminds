'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Briefcase, 
  Search, 
  Building, 
  MapPin, 
  Clock, 
  ArrowRight,
  CheckCircle2,
  Calendar,
  Scale
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { INITIAL_INTERNSHIPS } from '@/lib/data-store';

export default function InternshipsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredInternships = useMemo(() => {
    if (!searchQuery) return INITIAL_INTERNSHIPS;
    return INITIAL_INTERNSHIPS.filter((item) => {
      return (
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Breadcrumbs & Editorial Header */}
      <div className="space-y-4">
        <Breadcrumbs items={[{ name: 'Research Fellowships' }]} />
        
        <div className="border-b border-ink-300 dark:border-ink-700 pb-6 space-y-2">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-oxblood-700 dark:text-oxblood-400">
            Admissions Docket &bull; 2026 Academic Term
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-ink-950 dark:text-white">
            Legal Research &amp; Editorial Fellowships
          </h1>
          <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-300 max-w-2xl leading-relaxed">
            Gain academic drafting mentorship, landmark case analysis experience, and editorial evaluation for scholarly writing within the student-led review.
          </p>
        </div>
      </div>

      {/* Search Input */}
      <div className="editorial-card rounded-sm p-4 bg-white dark:bg-ink-850 border border-ink-200 dark:border-ink-800">
        <div className="relative">
          <Search className="w-4 h-4 text-ink-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search fellowship keywords, practice areas, or requirements..."
            className="w-full pl-10 pr-4 py-2.5 rounded-sm bg-ivory-50 dark:bg-ink-900 border border-ink-200 dark:border-ink-700 text-ink-950 dark:text-white placeholder-ink-400 text-xs sm:text-sm focus:outline-none focus:border-oxblood-700"
          />
        </div>
      </div>

      {/* Fellowship Listing Dossier */}
      <div className="space-y-6">
        <div className="flex items-center justify-between text-xs font-mono text-ink-500 border-b border-ink-200 dark:border-ink-800 pb-2">
          <span>{filteredInternships.length} Fellowship Opening Active</span>
          <span>Merit-Based Evaluation</span>
        </div>

        {filteredInternships.length > 0 ? (
          filteredInternships.map((item) => (
            <div
              key={item.id}
              className="editorial-card rounded-sm p-6 sm:p-10 border border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-850 space-y-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-sm bg-ivory-200 dark:bg-ink-800 text-oxblood-700 dark:text-oxblood-400 font-semibold uppercase tracking-wider text-[10px]">
                    {item.practiceArea}
                  </span>
                  <span className="text-ink-400">&bull;</span>
                  <span className="text-ink-600 dark:text-ink-300">
                    {item.mode} &bull; {item.duration}
                  </span>
                </div>
                <span className="text-rose-700 dark:text-rose-400 font-semibold">
                  Deadline: {item.deadline}
                </span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink-950 dark:text-white">
                  {item.title}
                </h2>
                <p className="text-xs font-mono text-oxblood-700 dark:text-oxblood-400 mt-1 uppercase tracking-wider">
                  {item.organization} &bull; {item.location}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-300 leading-relaxed max-w-4xl">
                {item.description}
              </p>

              {/* Responsibilities Preview */}
              <div className="space-y-2 pt-1">
                <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-ink-900 dark:text-white">
                  Key Fellowship Responsibilities:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-ink-600 dark:text-ink-300">
                  {item.responsibilities.slice(0, 4).map((resp, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-oxblood-700 dark:text-oxblood-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{resp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dossier Bottom Strip */}
              <div className="pt-4 border-t border-ink-200 dark:border-ink-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-6 text-xs font-mono text-ink-600 dark:text-ink-300">
                  <div>
                    <span className="text-ink-400 block text-[10px] uppercase">Cohort Seats</span>
                    <strong className="text-ink-950 dark:text-white">{item.seats} Fellows</strong>
                  </div>
                  <div>
                    <span className="text-ink-400 block text-[10px] uppercase">Evaluation Fee</span>
                    <strong className="text-ink-950 dark:text-white">₹{item.applicationFee}</strong>
                  </div>
                  <div>
                    <span className="text-ink-400 block text-[10px] uppercase">Stipend / Honorarium</span>
                    <strong className="text-oxblood-700 dark:text-oxblood-400">{item.stipend}</strong>
                  </div>
                </div>

                <Link
                  href={`/internships/${item.slug}`}
                  className="px-6 py-3 bg-oxblood-700 hover:bg-oxblood-800 dark:bg-oxblood-600 dark:hover:bg-oxblood-500 text-white font-serif text-xs font-semibold uppercase tracking-wider rounded-sm text-center shadow-sm transition-all"
                >
                  Examine Dossier &amp; Apply &rarr;
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="editorial-card rounded-sm p-12 text-center space-y-3 bg-white dark:bg-ink-850">
            <Briefcase className="w-8 h-8 text-ink-400 mx-auto" />
            <h3 className="text-base font-serif font-bold text-ink-950 dark:text-white">
              No matching fellowship openings found
            </h3>
            <p className="text-xs text-ink-500 max-w-sm mx-auto">
              Please adjust your search terms to view active fellowship dossiers.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
