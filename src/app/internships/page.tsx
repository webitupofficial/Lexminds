'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Briefcase, 
  Search, 
  Building, 
  MapPin, 
  Clock, 
  Sparkles, 
  ArrowRight,
  GraduationCap,
  Calendar,
  CheckCircle2,
  X
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { INITIAL_INTERNSHIPS } from '@/lib/data-store';

export default function InternshipsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const internship = INITIAL_INTERNSHIPS[0];

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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Breadcrumbs & Header */}
      <div className="space-y-4">
        <Breadcrumbs items={[{ name: 'Research Fellowships' }]} />
        
        <div className="border-b border-slate-200 dark:border-white/10 pb-6 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-600 dark:text-gold-400 bg-gold-50 dark:bg-gold-950/80 px-3 py-1 rounded-full border border-gold-500/20">
            Selective Scholar Program
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 dark:text-white">
            Legal Research Fellowships
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            Gain academic drafting mentorship, landmark case analysis experience, and guaranteed peer-review consideration for your legal writing.
          </p>
        </div>
      </div>

      {/* Search Input */}
      <div className="clay-card rounded-2xl p-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search fellowship keywords, practice areas, or requirements..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-gold-500 neumorph-inset"
          />
        </div>
      </div>

      {/* Fellowship Listing Card */}
      <div className="space-y-6">
        {filteredInternships.length > 0 ? (
          filteredInternships.map((item) => (
            <div
              key={item.id}
              className="clay-card rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-gold-500/30 space-y-6 transition-all"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-lg bg-gold-50 dark:bg-gold-950/80 text-gold-700 dark:text-gold-400 border border-gold-500/30">
                    {item.practiceArea}
                  </span>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {item.mode} &bull; {item.duration}
                  </span>
                </div>
                <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 px-2.5 py-1 rounded-lg border border-rose-500/20">
                  Closes {item.deadline}
                </span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">
                  {item.title}
                </h2>
                <p className="text-xs sm:text-sm text-gold-700 dark:text-gold-400 font-semibold mt-1">
                  {item.organization} &bull; {item.location}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
                {item.description}
              </p>

              {/* Responsibilities list */}
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-white/5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  Fellowship Responsibilities:
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
                  {item.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400 shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action row */}
              <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  <span>Evaluation &amp; Processing Fee: </span>
                  <strong className="text-slate-900 dark:text-gold-400 font-serif text-base">₹{item.applicationFee}.00</strong>
                </div>

                <Link
                  href={`/internships/${item.slug}`}
                  className="px-6 py-3 rounded-xl bg-slate-900 dark:bg-gold-400 text-white dark:text-slate-950 font-bold text-xs uppercase tracking-wider text-center shadow-md hover:opacity-90 transition-all flex items-center justify-center space-x-1.5"
                >
                  <span>Apply for Fellowship</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 clay-card rounded-3xl space-y-3">
            <p className="text-sm text-slate-500">No openings matched &ldquo;{searchQuery}&rdquo;</p>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-gold-600 dark:text-gold-400 underline font-semibold"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
