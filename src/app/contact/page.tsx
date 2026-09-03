'use client';

import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Phone, 
  Shield, 
  ChevronDown, 
  ChevronUp,
  Sparkles,
  Building,
  Loader2,
  ExternalLink
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [iframeLoading, setIframeLoading] = useState<boolean>(true);

  const faqs = [
    {
      q: 'How does LexMinds verify internship openings at Tier-1 law firms?',
      a: 'We work directly with talent acquisition partners and senior advocates. Every role listed on LexMinds is authenticated with confirmed seat allocations and explicit stipend structures before going live.'
    },
    {
      q: 'What is the standard turnaround time for peer-reviewed article submissions?',
      a: 'Initial desk triage and Turnitin plagiarism screening take 24-48 hours. Double-blind review by our academic panel takes 4-7 business days, after which authors receive formal feedback and decision notices.'
    },
    {
      q: 'Are certificates of publication and internships verifiable by universities?',
      a: 'Yes. Every certificate and placement letter issued via LexMinds comes with a unique tamper-proof alphanumeric Verification Code verifiable on lexminds.in.'
    },
    {
      q: 'How does the Razorpay payment integration work for students?',
      a: 'All application and peer review fees are processed via Razorpay with support for UPI (Google Pay, PhonePe, Paytm), Debit/Credit Cards, and Net Banking with instant automated receipt generation.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10 sm:space-y-12">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ name: 'Contact & Grievance Redressal', href: '/contact' }]} />

      {/* Header */}
      <div className="border-b border-slate-200 dark:border-legal-800 pb-6 space-y-3">
        <span className="text-[11px] font-bold uppercase tracking-widest text-gold-700 dark:text-gold-400 bg-gold-50 dark:bg-gold-950/80 px-3 py-1 rounded border border-gold-500/20">
          Support &amp; Institutional Desk
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">
          Contact LexMinds &amp; Grievance Redressal
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
          Reach our editorial desk, placement coordination team, or statutory grievance redressal officer. Inquiries submitted below are automatically captured in our official registry.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
        
        {/* Left: Embedded Google Form (7 Cols) */}
        <div className="lg:col-span-7 neumorph-card rounded-3xl p-4 sm:p-6 space-y-4">
          
          <div className="flex items-center justify-between px-2 pt-1 border-b border-slate-200 dark:border-legal-800 pb-3">
            <h2 className="text-lg sm:text-xl font-serif font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <Mail className="w-5 h-5 text-gold-700 dark:text-gold-400" />
              <span>Official Inquiry Registry</span>
            </h2>
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLScTtf9fSfKdgnXOwDvx-8SN96FrYMvnuI_SmKNYmclkKMrorw/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-slate-500 hover:text-gold-600 dark:text-slate-400 dark:hover:text-gold-400 flex items-center space-x-1"
            >
              <span>Open in new tab</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Embedded Google Form Container */}
          <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-legal-800 bg-white shadow-sm min-h-[950px]">
            {iframeLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 dark:bg-legal-950 text-slate-500 text-xs space-y-2 z-10">
                <Loader2 className="w-6 h-6 animate-spin text-gold-500" />
                <span>Loading Official LexMinds Inquiry Form...</span>
              </div>
            )}
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLScTtf9fSfKdgnXOwDvx-8SN96FrYMvnuI_SmKNYmclkKMrorw/viewform?embedded=true"
              width="100%"
              height="1183"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              className="w-full min-h-[1100px] border-0"
              onLoad={() => setIframeLoading(false)}
            >
              Loading…
            </iframe>
          </div>

        </div>

        {/* Right Info (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Office & Statutory Info */}
          <div className="neumorph-card rounded-2xl p-6 space-y-4 text-xs">
            <h3 className="text-base font-serif font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <Building className="w-4 h-4 text-gold-700 dark:text-gold-400" />
              <span>Headquarters &amp; Contact</span>
            </h3>

            <div className="space-y-3 text-slate-600 dark:text-slate-300">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-gold-700 dark:text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white block">Central Office:</strong>
                  <span>Barakhamba Road, Connaught Place, New Delhi, 110001, India</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-gold-700 dark:text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white block">Official Communications:</strong>
                  <span>editorial@lexminds.in (Law Review)</span>
                  <br />
                  <span>internships@lexminds.in (Placement Wings)</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-gold-700 dark:text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white block">Desk Phone:</strong>
                  <span>+91 (011) 4982-1000 (Mon - Fri, 10 AM - 6 PM IST)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Grievance Redressal Box */}
          <div className="neumorph-card rounded-2xl p-6 space-y-3 text-xs text-slate-600 dark:text-slate-300">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Grievance Redressal Officer</span>
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              As required under Rule 3(2) of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021:
            </p>
            <div className="p-3 bg-slate-100 dark:bg-legal-950 rounded-xl border border-slate-200 dark:border-legal-800 space-y-1 text-[11px]">
              <div className="font-semibold text-gold-700 dark:text-gold-400">Adv. Manav Tandon</div>
              <div className="text-slate-500 dark:text-slate-400">Designated Grievance &amp; Compliance Officer</div>
              <div className="text-slate-500 dark:text-slate-400 font-mono">Email: grievance@lexminds.in</div>
            </div>
          </div>

          {/* Security / Response Guarantee Box */}
          <div className="p-5 rounded-2xl bg-gold-500/5 border border-gold-500/20 text-xs space-y-2">
            <div className="flex items-center space-x-2 text-gold-700 dark:text-gold-400 font-bold">
              <Sparkles className="w-4 h-4" />
              <span>Direct Registry Logging</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              Inquiries submitted through this official desk are delivered directly to the LexMinds administration database. A case associate will respond to your specified email within 24 business hours.
            </p>
          </div>

        </div>

      </div>

      {/* FAQ Accordion Section */}
      <div className="neumorph-card rounded-3xl p-6 sm:p-10 space-y-6">
        <div className="border-b border-slate-200 dark:border-legal-800 pb-4">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-700 dark:text-gold-400">
            Common Inquiries
          </span>
          <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mt-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-50 dark:bg-legal-950/70 border border-slate-200 dark:border-legal-800/80 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-900 dark:text-white hover:text-gold-600 dark:hover:text-gold-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-gold-700 dark:text-gold-400 shrink-0 ml-2" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200 dark:border-legal-900 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
