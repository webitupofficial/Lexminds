'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Briefcase, 
  Search, 
  ArrowRight,
  CheckCircle2,
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Breadcrumbs & Editorial Header */}
      <div className="space-y-6">
        <Breadcrumbs items={[{ name: 'Fellowship Open Calls' }]} />
        
        <div className="border-b border-ink-900/15 dark:border-ink-700 pb-8 space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-royal-500 dark:text-royal-400">
            Open Call &bull; Academic Dockets
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-ink-950 dark:text-ink-50 tracking-tight">
            Research Fellowships
          </h1>
          <p className="text-base text-ink-600 dark:text-ink-300 max-w-2xl leading-relaxed font-normal">
            Structured 8-week cohorts combining statutory analysis, research mentorship, and editorial publication. Evaluated on merit and writing clarity.
          </p>
        </div>
      </div>

      {/* Search Input with Tactile Neumorphic Feel */}
      <div className="p-4 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 shadow-brutal-sm">
        <div className="relative">
          <Search className="w-4 h-4 text-ink-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter by focus area, practice field, or keywords..."
            className="w-full pl-11 pr-4 py-3 tactile-control text-ink-900 dark:text-ink-100 placeholder-ink-400 text-sm rounded-sm"
          />
        </div>
      </div>

      {/* Fellowship Listing Dossier */}
      <div className="space-y-8">
        <div className="flex items-center justify-between text-xs font-mono text-ink-500 dark:text-ink-400 border-b border-ink-900/10 dark:border-ink-800 pb-2">
          <span>{filteredInternships.length} Opportunity Available</span>
          <span>Merit-Based Student Evaluation</span>
        </div>

        {filteredInternships.length > 0 ? (
          filteredInternships.map((item) => (
            <div
              key={item.id}
              className="p-8 sm:p-12 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 space-y-8 shadow-brutal"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 bg-royal-50 dark:bg-royal-950/40 text-royal-600 dark:text-royal-400 font-bold uppercase tracking-wider text-[11px] border border-royal-200 dark:border-royal-800">
                    {item.practiceArea}
                  </span>
                  <span className="text-ink-400">&bull;</span>
                  <span className="text-ink-700 dark:text-ink-300">
                    {item.mode} &bull; {item.duration}
                  </span>
                </div>
                <span className="text-coral font-bold">
                  Deadline: {item.deadline}
                </span>
              </div>

              <div>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-ink-950 dark:text-ink-50 tracking-tight">
                  {item.title}
                </h2>
                <p className="text-sm font-mono text-coral mt-1.5 uppercase tracking-wider font-semibold">
                  {item.organization} &bull; {item.location}
                </p>
              </div>

              <p className="text-sm sm:text-base text-ink-600 dark:text-ink-300 leading-relaxed max-w-4xl font-normal">
                {item.description}
              </p>

              {/* Responsibilities Preview */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-900 dark:text-ink-100">
                  Key Research Deliverables:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-ink-700 dark:text-ink-300">
                  {item.responsibilities.slice(0, 4).map((resp, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5">
                      <CheckCircle2 className="w-4 h-4 text-royal-500 dark:text-royal-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{resp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dossier Bottom Strip */}
              <div className="pt-6 border-t border-ink-900/10 dark:border-ink-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex flex-wrap items-center gap-8 text-xs font-mono text-ink-700 dark:text-ink-300">
                  <div>
                    <span className="text-ink-500 dark:text-ink-400 block text-[10px] uppercase">Cohort Seats</span>
                    <strong className="text-ink-950 dark:text-ink-50 font-semibold text-sm">{item.seats} Fellows</strong>
                  </div>
                  <div>
                    <span className="text-ink-500 dark:text-ink-400 block text-[10px] uppercase">Evaluation Fee</span>
                    <strong className="text-ink-950 dark:text-ink-50 font-semibold text-sm">₹{item.applicationFee}.00</strong>
                  </div>
                  <div>
                    <span className="text-ink-500 dark:text-ink-400 block text-[10px] uppercase">Stipend / Honorarium</span>
                    <strong className="text-royal-600 dark:text-royal-400 font-bold text-sm">{item.stipend}</strong>
                  </div>
                </div>

                <Link
                  href={`/internships/${item.slug}`}
                  className="px-6 py-3.5 btn-brand-primary text-xs font-semibold uppercase tracking-wider text-center self-start sm:self-auto flex items-center space-x-2"
                >
                  <span>Examine Docket &amp; Apply</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="p-16 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 text-center space-y-3 shadow-brutal">
            <Briefcase className="w-8 h-8 text-ink-400 mx-auto" />
            <h3 className="text-lg font-serif font-bold text-ink-950 dark:text-ink-50">
              No matching fellowship openings found
            </h3>
            <p className="text-sm text-ink-600 dark:text-ink-400 max-w-sm mx-auto font-normal">
              No active fellowship dossiers match your search. Try resetting your query or contact the Academic Desk.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
