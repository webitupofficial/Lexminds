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
  ArrowRight, 
  Share2, 
  Scale, 
  Award, 
  Sparkles, 
  Users, 
  Briefcase, 
  Copy, 
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
          
          {/* Header Card */}
          <div className="neumorph-card rounded-3xl p-6 sm:p-8 space-y-6">
            
            {/* Badges */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md bg-gold-50 dark:bg-gold-950/80 text-gold-700 dark:text-gold-400 border border-gold-500/30">
                  {internship.practiceArea}
                </span>
                <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-100 dark:bg-legal-800 text-slate-700 dark:text-slate-300">
                  {internship.orgType}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleShare}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-legal-850 hover:bg-slate-200 dark:hover:bg-legal-800 text-slate-700 dark:text-slate-300 hover:text-gold-600 dark:hover:text-gold-400 border border-slate-200 dark:border-legal-700 transition-colors flex items-center space-x-1.5 text-xs font-medium"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                  <span>{copiedLink ? 'Link Copied' : 'Share Role'}</span>
                </button>
              </div>
            </div>

            {/* Single Page H1 */}
            <div>
              <h1 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
                {internship.title}
              </h1>
              <p className="text-sm sm:text-base text-gold-700 dark:text-gold-300 font-semibold mt-2 flex items-center space-x-2">
                <Building className="w-4 h-4 text-gold-600 dark:text-gold-400 shrink-0" />
                <span>{internship.organization}</span>
              </p>
            </div>

            {/* Key Quick Facts Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100 dark:border-legal-800 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-legal-950/60 border border-slate-200 dark:border-legal-800">
                <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase">Location &amp; Mode</span>
                <span className="font-semibold text-slate-900 dark:text-white mt-0.5 block">{internship.location} ({internship.mode})</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-legal-950/60 border border-slate-200 dark:border-legal-800">
                <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase">Monthly Stipend</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 block">{internship.stipend}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-legal-950/60 border border-slate-200 dark:border-legal-800">
                <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase">Duration</span>
                <span className="font-semibold text-slate-900 dark:text-white mt-0.5 block">{internship.duration}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-legal-950/60 border border-slate-200 dark:border-legal-800">
                <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase">Deadline</span>
                <span className="font-bold text-rose-600 dark:text-rose-400 mt-0.5 block">{internship.deadline}</span>
              </div>
            </div>

          </div>

          {/* Section: Role Overview */}
          <div className="neumorph-card rounded-3xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <Scale className="w-5 h-5 text-gold-700 dark:text-gold-400" />
              <span>Chamber &amp; Role Overview</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              {internship.description}
            </p>
          </div>

          {/* Section: Key Responsibilities */}
          <div className="neumorph-card rounded-3xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <Briefcase className="w-5 h-5 text-gold-700 dark:text-gold-400" />
              <span>Core Responsibilities</span>
            </h2>
            <ul className="space-y-2.5 text-sm text-slate-700 dark:text-slate-300">
              {internship.responsibilities.map((resp, i) => (
                <li key={i} className="flex items-start space-x-3">
                  <span className="w-5 h-5 rounded-full bg-gold-100 dark:bg-gold-950 border border-gold-500/30 flex items-center justify-center text-[10px] font-bold text-gold-700 dark:text-gold-400 shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section: Eligibility Requirements */}
          <div className="neumorph-card rounded-3xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <GraduationCap className="w-5 h-5 text-gold-700 dark:text-gold-400" />
              <span>Eligibility &amp; Academic Criteria</span>
            </h2>
            <ul className="space-y-2.5 text-sm text-slate-700 dark:text-slate-300">
              {internship.eligibility.map((el, i) => (
                <li key={i} className="flex items-start space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{el}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section: Learning Outcomes */}
          <div className="neumorph-card rounded-3xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <Award className="w-5 h-5 text-gold-700 dark:text-gold-400" />
              <span>Learning Outcomes &amp; Career Advantages</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {internship.learningOutcomes.map((out, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-legal-950/70 border border-slate-200 dark:border-legal-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed flex items-start space-x-2">
                  <Sparkles className="w-4 h-4 text-gold-600 dark:text-gold-400 shrink-0 mt-0.5" />
                  <span>{out}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Selection Process */}
          <div className="neumorph-card rounded-3xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-gold-700 dark:text-gold-400" />
              <span>Evaluation &amp; Selection Stages</span>
            </h2>
            <div className="space-y-3">
              {internship.selectionProcess.map((proc, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-50 dark:bg-legal-950/60 border border-slate-200 dark:border-legal-800 text-xs text-slate-700 dark:text-slate-300 font-medium">
                  {proc}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Sidebar Sticky Apply Box (4 Cols) */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
          
          <div className="neumorph-card rounded-3xl p-6 space-y-6 border border-slate-200 dark:border-gold-500/40">
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Application Fee</span>
                <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                  GST Included
                </span>
              </div>
              <div className="text-3xl font-serif font-bold text-gold-700 dark:text-gold-400">
                ₹{internship.applicationFee}.00
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                Direct submission to the hiring partner committee with automated status tracking.
              </p>
            </div>

            {/* Quick Stats in Box */}
            <div className="space-y-2.5 pt-4 border-t border-slate-200 dark:border-legal-800 text-xs text-slate-700 dark:text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Available Seats:</span>
                <span className="font-bold text-gold-700 dark:text-gold-300">{internship.seats} Selected Candidates</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Application Closes:</span>
                <span className="font-bold text-rose-600 dark:text-rose-400">{internship.deadline}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Payment Gateway:</span>
                <span className="font-bold text-slate-900 dark:text-slate-200">Razorpay (Cards/UPI/Netbanking)</span>
              </div>
            </div>

            {/* Apply Button */}
            <button
              onClick={() => setIsApplyModalOpen(true)}
              className="w-full py-4 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400 hover:from-gold-300 hover:to-gold-500 text-slate-950 font-bold text-sm uppercase tracking-wider rounded-xl shadow-sm dark:shadow-glow-gold transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
            >
              <Briefcase className="w-4 h-4" />
              <span>Apply Now (₹{internship.applicationFee})</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Security Note */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-legal-950/70 border border-slate-200 dark:border-legal-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-start space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>
                Standardized LexMinds guarantee: All candidates receive verified receipt and formal review feedback within 72 hours.
              </span>
            </div>

          </div>

          {/* Assistance Box */}
          <div className="neumorph-card rounded-2xl p-5 text-xs text-slate-600 dark:text-slate-400 space-y-2">
            <h4 className="font-semibold text-slate-900 dark:text-white">Need Application Support?</h4>
            <p className="text-[11px] leading-relaxed">
              If you have queries regarding eligibility or chamber accommodation, reach out to our placement desk at <strong className="text-gold-700 dark:text-gold-400">internships@lexminds.in</strong>.
            </p>
          </div>

        </div>

      </div>

      {/* Application Multi-step Modal */}
      {isApplyModalOpen && (
        <ApplicationModal
          internship={internship}
          isOpen={isApplyModalOpen}
          onClose={() => setIsApplyModalOpen(false)}
        />
      )}
    </>
  );
}
