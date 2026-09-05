'use client';

import React, { useState } from 'react';
import { 
  Building, 
  CheckCircle2, 
  ShieldCheck, 
  Share2, 
  Scale, 
  Award, 
  Briefcase, 
  Check,
  GraduationCap 
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
          <div className="p-8 sm:p-10 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 space-y-6 shadow-brutal">
            
            {/* Badges & Share */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-royal-50 dark:bg-royal-950/40 text-royal-600 dark:text-royal-400 font-bold uppercase tracking-wider text-[11px] border border-royal-200 dark:border-royal-800">
                  {internship.practiceArea}
                </span>
                <span className="text-ink-400">&bull;</span>
                <span className="text-ink-700 dark:text-ink-300">
                  {internship.orgType}
                </span>
              </div>

              <button
                onClick={handleShare}
                className="tactile-control p-2 px-3 text-ink-700 dark:text-ink-300 hover:text-royal-500 flex items-center space-x-1.5 text-xs font-mono rounded-sm"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Link Copied' : 'Share'}</span>
              </button>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl font-serif font-bold text-ink-950 dark:text-ink-50 tracking-tight leading-tight">
                {internship.title}
              </h1>
              <p className="text-sm text-coral font-mono uppercase tracking-wider flex items-center space-x-2 font-semibold">
                <Building className="w-4 h-4 shrink-0" />
                <span>{internship.organization} &bull; {internship.location}</span>
              </p>
            </div>

            {/* Quick Facts Ledger Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-ink-900/10 dark:border-ink-800 text-xs font-mono">
              <div className="p-4 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700">
                <span className="text-ink-500 dark:text-ink-400 block text-[10px] uppercase">Location</span>
                <span className="font-semibold text-ink-950 dark:text-ink-50 mt-1 block">{internship.location}</span>
              </div>
              <div className="p-4 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700">
                <span className="text-ink-500 dark:text-ink-400 block text-[10px] uppercase">Nature / Stipend</span>
                <span className="font-bold text-royal-600 dark:text-royal-400 mt-1 block">{internship.stipend}</span>
              </div>
              <div className="p-4 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700">
                <span className="text-ink-500 dark:text-ink-400 block text-[10px] uppercase">Term</span>
                <span className="font-semibold text-ink-950 dark:text-ink-50 mt-1 block">{internship.duration}</span>
              </div>
              <div className="p-4 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700">
                <span className="text-ink-500 dark:text-ink-400 block text-[10px] uppercase">Deadline</span>
                <span className="font-bold text-coral mt-1 block">{internship.deadline}</span>
              </div>
            </div>

          </div>

          {/* Role Overview */}
          <div className="p-8 sm:p-10 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 space-y-4 shadow-brutal">
            <h2 className="text-2xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5">
              <Scale className="w-5 h-5 text-royal-500 dark:text-royal-400" />
              <span>Chamber &amp; Role Overview</span>
            </h2>
            <p className="text-ink-600 dark:text-ink-300 text-sm leading-relaxed font-normal">
              {internship.description}
            </p>
          </div>

          {/* Responsibilities */}
          <div className="p-8 sm:p-10 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 space-y-5 shadow-brutal">
            <h2 className="text-2xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5">
              <Briefcase className="w-5 h-5 text-royal-500 dark:text-royal-400" />
              <span>Core Research Responsibilities</span>
            </h2>
            <ul className="space-y-3 text-sm text-ink-700 dark:text-ink-300">
              {internship.responsibilities.map((resp, i) => (
                <li key={i} className="flex items-start space-x-3.5">
                  <span className="w-6 h-6 bg-paper dark:bg-ink-800 border border-ink-900/20 dark:border-ink-700 flex items-center justify-center text-xs font-mono font-bold text-royal-600 dark:text-royal-400 shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Eligibility */}
          <div className="p-8 sm:p-10 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 space-y-5 shadow-brutal">
            <h2 className="text-2xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5">
              <GraduationCap className="w-5 h-5 text-royal-500 dark:text-royal-400" />
              <span>Eligibility &amp; Academic Criteria</span>
            </h2>
            <ul className="space-y-3 text-sm text-ink-700 dark:text-ink-300">
              {internship.eligibility.map((el, i) => (
                <li key={i} className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-royal-500 dark:text-royal-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{el}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Learning Outcomes */}
          <div className="p-8 sm:p-10 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 space-y-5 shadow-brutal">
            <h2 className="text-2xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5">
              <Award className="w-5 h-5 text-royal-500 dark:text-royal-400" />
              <span>Learning Outcomes &amp; Academic Output</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {internship.learningOutcomes.map((out, i) => (
                <div key={i} className="p-4 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 text-xs text-ink-700 dark:text-ink-300 leading-relaxed flex items-start space-x-2.5">
                  <span className="font-mono text-royal-500 font-bold">&bull;</span>
                  <span>{out}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Selection Stages */}
          <div className="p-8 sm:p-10 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 space-y-4 shadow-brutal">
            <h2 className="text-2xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5">
              <ShieldCheck className="w-5 h-5 text-royal-500 dark:text-royal-400" />
              <span>Evaluation &amp; Selection Process</span>
            </h2>
            <div className="space-y-3 font-mono text-xs">
              {internship.selectionProcess.map((proc, i) => (
                <div key={i} className="p-4 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 text-ink-800 dark:text-ink-200">
                  {proc}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Sidebar Sticky Apply Box (4 Cols) */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
          
          <div className="p-8 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 space-y-6 shadow-brutal">
            
            <div className="space-y-1.5">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="uppercase text-ink-500 dark:text-ink-400">Evaluation Fee</span>
                <span className="text-[11px] text-royal-600 dark:text-royal-400 font-semibold">
                  Inclusive of All Taxes
                </span>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-4xl font-serif font-bold text-ink-950 dark:text-ink-50">
                  ₹{internship.applicationFee}.00
                </span>
                <span className="text-base line-through text-ink-400">₹299.00</span>
              </div>
              <p className="text-xs text-ink-500 dark:text-ink-400 font-mono">
                Covers intake assessment and Statement of Purpose evaluation. Payment does not guarantee selection.
              </p>
            </div>

            <div className="border-t border-ink-900/10 dark:border-ink-800 pt-4 space-y-3 text-xs font-mono">
              <div className="flex justify-between items-center text-ink-700 dark:text-ink-300">
                <span>Available Seats:</span>
                <strong className="text-ink-950 dark:text-ink-50 font-semibold">{internship.seats} Fellows</strong>
              </div>
              <div className="flex justify-between items-center text-ink-700 dark:text-ink-300">
                <span>Mode:</span>
                <strong className="text-ink-950 dark:text-ink-50 font-semibold">{internship.mode}</strong>
              </div>
              <div className="flex justify-between items-center text-ink-700 dark:text-ink-300">
                <span>Deadline:</span>
                <strong className="text-coral font-bold">{internship.deadline}</strong>
              </div>
            </div>

            {/* Single Primary CTA */}
            <button
              onClick={() => setIsApplyModalOpen(true)}
              className="w-full py-4 px-4 btn-brand-primary text-xs font-semibold uppercase tracking-wider text-center block"
            >
              Submit Application
            </button>

            <div className="text-center text-[11px] font-mono text-ink-500 dark:text-ink-400 space-y-1">
              <div>Verified Google Authentication required at submission.</div>
              <div>
                Subject to{' '}
                <a href="/terms" target="_blank" className="text-royal-600 dark:text-royal-400 underline">Terms</a>,{' '}
                <a href="/privacy" target="_blank" className="text-royal-600 dark:text-royal-400 underline">Privacy</a>, and{' '}
                <a href="/cancellation-refund-policy" target="_blank" className="text-royal-600 dark:text-royal-400 underline">Cancellation &amp; Refund Policy</a>.
              </div>
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
