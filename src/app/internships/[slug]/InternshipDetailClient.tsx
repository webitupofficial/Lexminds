'use client';

import React, { useState } from 'react';
import { 
  Building, 
  MapPin, 
  Clock, 
  Calendar, 
  GraduationCap, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowUpRight, 
  Share2, 
  Scale, 
  Award, 
  Briefcase, 
  Check 
} from 'lucide-react';
import { Internship } from '@/lib/types';
import ApplicationModal from '@/components/ApplicationModal';

interface Props {
  internship: Internship;
}

export default function InternshipDetailClient({ internship }: Props) {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${internship.title} at ${internship.organization}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Main Content Column (8 Cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Header Dossier Card */}
          <div className="neo-card p-6 sm:p-8 space-y-6 bg-white dark:bg-ink-900">
            
            {/* Badges & Share */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 bg-paper-200 dark:bg-ink-800 text-vermilion font-semibold uppercase tracking-wider text-[10px] border border-ink-900/15 dark:border-ink-700">
                  {internship.practiceArea}
                </span>
                <span className="text-ink-400">&bull;</span>
                <span className="text-ink-700 dark:text-ink-300">
                  {internship.orgType}
                </span>
              </div>

              <button
                onClick={handleShare}
                className="tactile-control p-1.5 px-2.5 text-ink-700 dark:text-ink-300 hover:text-vermilion flex items-center space-x-1.5 text-xs font-mono"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Copied' : 'Share'}</span>
              </button>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-2xl sm:text-4xl font-serif font-bold text-ink-900 dark:text-ink-100 tracking-tight leading-tight">
                {internship.title}
              </h1>
              <p className="text-xs sm:text-sm text-vermilion font-mono uppercase tracking-wider mt-2 flex items-center space-x-2 font-semibold">
                <Building className="w-4 h-4 shrink-0" />
                <span>{internship.organization}</span>
              </p>
            </div>

            {/* Quick Facts Ledger Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-ink-900/10 dark:border-ink-800 text-xs font-mono">
              <div className="p-3 bg-paper-100 dark:bg-ink-850 border border-ink-900/15 dark:border-ink-700">
                <span className="text-ink-500 dark:text-ink-400 block text-[10px] uppercase">Location</span>
                <span className="font-semibold text-ink-900 dark:text-ink-100 mt-0.5 block">{internship.location}</span>
              </div>
              <div className="p-3 bg-paper-100 dark:bg-ink-850 border border-ink-900/15 dark:border-ink-700">
                <span className="text-ink-500 dark:text-ink-400 block text-[10px] uppercase">Honorarium</span>
                <span className="font-bold text-vermilion mt-0.5 block">{internship.stipend}</span>
              </div>
              <div className="p-3 bg-paper-100 dark:bg-ink-850 border border-ink-900/15 dark:border-ink-700">
                <span className="text-ink-500 dark:text-ink-400 block text-[10px] uppercase">Term</span>
                <span className="font-semibold text-ink-900 dark:text-ink-100 mt-0.5 block">{internship.duration}</span>
              </div>
              <div className="p-3 bg-paper-100 dark:bg-ink-850 border border-ink-900/15 dark:border-ink-700">
                <span className="text-ink-500 dark:text-ink-400 block text-[10px] uppercase">Deadline</span>
                <span className="font-bold text-vermilion mt-0.5 block">{internship.deadline}</span>
              </div>
            </div>

          </div>

          {/* Role Overview */}
          <div className="neo-card p-6 sm:p-8 space-y-3 bg-white dark:bg-ink-900">
            <h2 className="text-xl font-serif font-bold text-ink-900 dark:text-ink-100 flex items-center space-x-2">
              <Scale className="w-4 h-4 text-vermilion" />
              <span>Chamber &amp; Role Overview</span>
            </h2>
            <p className="text-ink-700 dark:text-ink-300 text-xs sm:text-sm leading-relaxed font-normal">
              {internship.description}
            </p>
          </div>

          {/* Responsibilities */}
          <div className="neo-card p-6 sm:p-8 space-y-4 bg-white dark:bg-ink-900">
            <h2 className="text-xl font-serif font-bold text-ink-900 dark:text-ink-100 flex items-center space-x-2">
              <Briefcase className="w-4 h-4 text-vermilion" />
              <span>Core Research Responsibilities</span>
            </h2>
            <ul className="space-y-2.5 text-xs sm:text-sm text-ink-700 dark:text-ink-300">
              {internship.responsibilities.map((resp, i) => (
                <li key={i} className="flex items-start space-x-3">
                  <span className="w-5 h-5 bg-paper-200 dark:bg-ink-800 border border-ink-900/20 dark:border-ink-700 flex items-center justify-center text-[10px] font-mono font-bold text-vermilion shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Eligibility */}
          <div className="neo-card p-6 sm:p-8 space-y-4 bg-white dark:bg-ink-900">
            <h2 className="text-xl font-serif font-bold text-ink-900 dark:text-ink-100 flex items-center space-x-2">
              <GraduationCap className="w-4 h-4 text-vermilion" />
              <span>Eligibility &amp; Academic Criteria</span>
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm text-ink-700 dark:text-ink-300">
              {internship.eligibility.map((el, i) => (
                <li key={i} className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-vermilion shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{el}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Learning Outcomes */}
          <div className="neo-card p-6 sm:p-8 space-y-4 bg-white dark:bg-ink-900">
            <h2 className="text-xl font-serif font-bold text-ink-900 dark:text-ink-100 flex items-center space-x-2">
              <Award className="w-4 h-4 text-vermilion" />
              <span>Learning Outcomes &amp; Academic Advantages</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {internship.learningOutcomes.map((out, i) => (
                <div key={i} className="p-3.5 bg-paper-100 dark:bg-ink-850 border border-ink-900/15 dark:border-ink-700 text-xs text-ink-700 dark:text-ink-300 leading-relaxed flex items-start space-x-2">
                  <span className="font-mono text-vermilion font-bold">&bull;</span>
                  <span>{out}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Selection Stages */}
          <div className="neo-card p-6 sm:p-8 space-y-3 bg-white dark:bg-ink-900">
            <h2 className="text-xl font-serif font-bold text-ink-900 dark:text-ink-100 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-vermilion" />
              <span>Evaluation &amp; Selection Stages</span>
            </h2>
            <div className="space-y-2 font-mono text-xs">
              {internship.selectionProcess.map((proc, i) => (
                <div key={i} className="p-3 bg-paper-100 dark:bg-ink-850 border border-ink-900/15 dark:border-ink-700 text-ink-800 dark:text-ink-200">
                  {proc}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Sidebar Sticky Apply Box (4 Cols) */}
        <div className="lg:col-span-4 lg:sticky lg:top-20 space-y-6">
          
          <div className="neo-card p-6 space-y-5 bg-white dark:bg-ink-900">
            
            <div className="space-y-1">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="uppercase text-ink-500 dark:text-ink-400">Evaluation Fee</span>
                <span className="text-[10px] text-vermilion font-semibold">
                  Inclusive of All Taxes
                </span>
              </div>
              <div className="text-3xl font-serif font-bold text-ink-900 dark:text-ink-100">
                ₹{internship.applicationFee}.00
              </div>
              <p className="text-[11px] text-ink-500 dark:text-ink-400 font-mono">
                Standard student evaluation fee for review of writing sample and statement of purpose.
              </p>
            </div>

            <div className="border-t border-ink-900/10 dark:border-ink-800 pt-4 space-y-2 text-xs font-mono">
              <div className="flex justify-between items-center text-ink-700 dark:text-ink-300">
                <span>Available Seats:</span>
                <strong className="text-ink-900 dark:text-ink-100 font-semibold">{internship.seats} Fellows</strong>
              </div>
              <div className="flex justify-between items-center text-ink-700 dark:text-ink-300">
                <span>Mode:</span>
                <strong className="text-ink-900 dark:text-ink-100 font-semibold">{internship.mode}</strong>
              </div>
              <div className="flex justify-between items-center text-ink-700 dark:text-ink-300">
                <span>Deadline:</span>
                <strong className="text-vermilion font-bold">{internship.deadline}</strong>
              </div>
            </div>

            {/* Single Primary CTA */}
            <button
              onClick={() => setIsApplyModalOpen(true)}
              className="w-full py-3.5 px-4 btn-neo-primary text-xs uppercase tracking-wider text-center block"
            >
              Submit Application
            </button>

            <div className="pt-2 text-center text-[10px] font-mono text-ink-500 dark:text-ink-400">
              Verified Google Authentication required at submission.
            </div>

          </div>

        </div>

      </div>

      {/* Application Modal Popup */}
      <ApplicationModal
        internship={internship}
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
      />
    </>
  );
}
