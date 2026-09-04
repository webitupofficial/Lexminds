'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Briefcase, 
  Search, 
  Clock, 
  ArrowUpRight,
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
        <Breadcrumbs items={[{ name: 'Fellowship Open Calls' }]} />
        
        <div className="border-b border-ink-900/15 dark:border-ink-700 pb-6 space-y-2">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-vermilion">
            Admissions Docket &bull; 2026 Academic Term
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-ink-900 dark:text-ink-100">
            Legal Research &amp; Editorial Fellowships
          </h1>
          <p className="text-xs sm:text-sm text-ink-700 dark:text-ink-300 max-w-2xl leading-relaxed">
            Curated scholarly writing mentorship, statutory analysis experience, and editorial evaluation within our student-led legal journal.
          </p>
        </div>
      </div>

      {/* Search Input with Tactile Neumorphic Feel */}
      <div className="neo-card p-4 bg-paper-50 dark:bg-ink-900">
        <div className="relative">
          <Search className="w-4 h-4 text-ink-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search fellowship keywords, practice areas, or focus topics..."
            className="w-full pl-10 pr-4 py-2.5 tactile-control text-ink-900 dark:text-ink-100 placeholder-ink-400 text-xs sm:text-sm rounded-none"
          />
        </div>
      </div>

      {/* Fellowship Listing Dossier */}
      <div className="space-y-6">
        <div className="flex items-center justify-between text-xs font-mono text-ink-500 dark:text-ink-400 border-b border-ink-900/15 dark:border-ink-700 pb-2">
          <span>{filteredInternships.length} Fellowship Dossier Open</span>
          <span>Merit-Based Editorial Evaluation</span>
        </div>

        {filteredInternships.length > 0 ? (
          filteredInternships.map((item) => (
            <div
              key={item.id}
              className="neo-card p-6 sm:p-10 bg-white dark:bg-ink-900 space-y-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 bg-paper-200 dark:bg-ink-800 text-vermilion font-semibold uppercase tracking-wider text-[10px] border border-ink-900/15 dark:border-ink-700">
                    {item.practiceArea}
                  </span>
                  <span className="text-ink-400">&bull;</span>
                  <span className="text-ink-700 dark:text-ink-300">
                    {item.mode} &bull; {item.duration}
                  </span>
                </div>
                <span className="text-vermilion font-bold">
                  Deadline: {item.deadline}
                </span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink-900 dark:text-ink-100">
                  {item.title}
                </h2>
                <p className="text-xs font-mono text-vermilion mt-1 uppercase tracking-wider font-semibold">
                  {item.organization} &bull; {item.location}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-ink-700 dark:text-ink-300 leading-relaxed max-w-4xl">
                {item.description}
              </p>

              {/* Responsibilities Preview */}
              <div className="space-y-2 pt-1">
                <h3 className="text-[11px] font-mono font-bold uppercase tracking-wider text-ink-900 dark:text-ink-100">
                  Key Fellowship Responsibilities:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-ink-700 dark:text-ink-300">
                  {item.responsibilities.slice(0, 4).map((resp, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-vermilion shrink-0 mt-0.5" />
                      <span className="leading-snug">{resp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dossier Bottom Strip */}
              <div className="pt-4 border-t border-ink-900/10 dark:border-ink-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-ink-700 dark:text-ink-300">
                  <div>
                    <span className="text-ink-500 dark:text-ink-400 block text-[10px] uppercase">Cohort Seats</span>
                    <strong className="text-ink-900 dark:text-ink-100 font-semibold">{item.seats} Fellows</strong>
                  </div>
                  <div>
                    <span className="text-ink-500 dark:text-ink-400 block text-[10px] uppercase">Evaluation Fee</span>
                    <strong className="text-ink-900 dark:text-ink-100 font-semibold">₹{item.applicationFee}</strong>
                  </div>
                  <div>
                    <span className="text-ink-500 dark:text-ink-400 block text-[10px] uppercase">Stipend / Honorarium</span>
                    <strong className="text-vermilion font-bold">{item.stipend}</strong>
                  </div>
                </div>

                <Link
                  href={`/internships/${item.slug}`}
                  className="px-6 py-3 btn-neo-primary text-xs uppercase tracking-wider text-center self-start sm:self-auto flex items-center space-x-1.5"
                >
                  <span>Examine Dossier &amp; Apply</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="neo-card p-12 text-center space-y-3 bg-white dark:bg-ink-900">
            <Briefcase className="w-8 h-8 text-ink-400 mx-auto" />
            <h3 className="text-base font-serif font-bold text-ink-900 dark:text-ink-100">
              No matching fellowship openings found
            </h3>
            <p className="text-xs text-ink-600 dark:text-ink-400 max-w-sm mx-auto font-normal">
              No active fellowship dossiers match your search. Try resetting your query or contact the Academic Desk.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
