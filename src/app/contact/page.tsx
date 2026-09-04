'use client';

import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Shield, 
  ChevronDown, 
  ChevronUp, 
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
      q: 'How does LexMinds structure and evaluate fellowship cohorts?',
      a: 'Fellowships are structured by the student-led Editorial Council. Fellows receive directed mentorship in statutory interpretation, case digest drafting, and citation standardization under OSCOLA and Bluebook rules.'
    },
    {
      q: 'What is the standard turnaround time for article submissions?',
      a: 'Initial manuscript screening and originality triage take 3-5 business days. Detailed evaluation by the editorial board takes 7-10 business days, after which authors receive written editorial notes and publication decisions.'
    },
    {
      q: 'Are certificates of publication and fellowship credentials verifiable by universities?',
      a: 'Yes. Every publication docket and fellowship completion letter issued via LexMinds contains a unique, tamper-evident alphanumeric reference code verifiable with our academic desk.'
    },
    {
      q: 'How are evaluation and application fees processed?',
      a: 'All fees are securely processed via Razorpay with instant support for UPI (Google Pay, PhonePe, Paytm), Debit/Credit Cards, and Net Banking with immediate receipt generation.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 sm:space-y-10">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ name: 'Academic Desk & Inquiries', href: '/contact' }]} />

      {/* Header */}
      <div className="border-b border-ink-900/15 dark:border-ink-700 pb-6 space-y-2">
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-vermilion">
          Academic Secretariat &bull; Inquiries
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-ink-900 dark:text-ink-100 tracking-tight">
          Academic Correspondence Desk
        </h1>
        <p className="text-xs sm:text-sm text-ink-700 dark:text-ink-300 max-w-2xl leading-relaxed">
          Reach our student editorial council, fellowship coordinators, or academic ethics desk. Official inquiries submitted below are logged directly in our academic registry.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
        
        {/* Left: Embedded Google Form (7 Cols) */}
        <div className="lg:col-span-7 neo-card p-4 sm:p-6 space-y-4 bg-white dark:bg-ink-900">
          
          <div className="flex items-center justify-between px-2 pt-1 border-b border-ink-900/10 dark:border-ink-800 pb-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-ink-900 dark:text-ink-100 flex items-center space-x-2">
              <Mail className="w-4 h-4 text-vermilion" />
              <span>Official Academic Registry Form</span>
            </h2>
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLScTtf9fSfKdgnXOwDvx-8SN96FrYMvnuI_SmKNYmclkKMrorw/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-mono text-ink-500 hover:text-vermilion dark:text-ink-400 flex items-center space-x-1"
            >
              <span>Open in new tab</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Embedded Google Form Container */}
          <div className="relative w-full overflow-hidden border border-ink-900/15 dark:border-ink-700 bg-white shadow-sm min-h-[950px]">
            {iframeLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-paper-100 dark:bg-ink-900 text-ink-500 text-xs space-y-2 z-10">
                <Loader2 className="w-5 h-5 animate-spin text-vermilion" />
                <span className="font-mono">Loading Inquiry Registry...</span>
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
          
          {/* Editorial Secretariat Desk Info */}
          <div className="neo-card p-6 space-y-4 text-xs bg-white dark:bg-ink-900">
            <h3 className="text-base font-serif font-bold text-ink-900 dark:text-ink-100 flex items-center space-x-2">
              <Building className="w-4 h-4 text-vermilion" />
              <span>Secretariat &amp; Communications</span>
            </h3>

            <div className="space-y-3 text-ink-700 dark:text-ink-300">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-vermilion shrink-0 mt-0.5" />
                <div>
                  <strong className="text-ink-900 dark:text-ink-100 block font-mono text-[11px] uppercase">Secretariat:</strong>
                  <span>Digital Editorial Secretariat &bull; Online Operations (Pan-India)</span>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <Mail className="w-4 h-4 text-vermilion shrink-0 mt-0.5" />
                <div>
                  <strong className="text-ink-900 dark:text-ink-100 block font-mono text-[11px] uppercase">Electronic Desks:</strong>
                  <span className="block font-mono text-[11px]">editorial@lexminds.in (Treatises &amp; Law Journal)</span>
                  <span className="block font-mono text-[11px]">fellowships@lexminds.in (Research Fellowships)</span>
                  <span className="block font-mono text-[11px]">contact@lexminds.in (General Communications)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Academic Ethics & Errata Notice */}
          <div className="neo-card p-6 space-y-3 text-xs text-ink-700 dark:text-ink-300 bg-white dark:bg-ink-900">
            <h4 className="font-serif font-bold text-ink-900 dark:text-ink-100 flex items-center space-x-2 text-sm">
              <Shield className="w-4 h-4 text-vermilion" />
              <span>Academic Integrity &amp; Errata Desk</span>
            </h4>
            <p className="text-[11px] text-ink-600 dark:text-ink-400 leading-relaxed font-normal">
              Authors and readers wishing to submit citation corrections, academic errata, or ethical clarifications may write directly to the Editorial Council:
            </p>
            <div className="p-3 bg-paper-100 dark:bg-ink-850 border border-ink-900/15 dark:border-ink-700 space-y-1 text-[11px] font-mono">
              <div className="font-semibold text-vermilion">Editorial Council &bull; Academic Oversight</div>
              <div className="text-ink-600 dark:text-ink-400">Email: editorial@lexminds.in</div>
            </div>
          </div>

          {/* Response Standards */}
          <div className="p-4 bg-paper-100 dark:bg-ink-850 border border-ink-900/15 dark:border-ink-700 text-xs space-y-1.5">
            <span className="font-serif font-bold text-ink-900 dark:text-ink-100 text-xs block">
              Response Standards
            </span>
            <p className="text-[11px] text-ink-600 dark:text-ink-400 leading-relaxed font-normal">
              Inquiries submitted through this registry are reviewed during editorial office hours. Editorial responses are typically issued within 2 to 3 business days.
            </p>
          </div>

        </div>

      </div>

      {/* FAQ Accordion Section */}
      <div className="neo-card p-6 sm:p-8 space-y-6 bg-white dark:bg-ink-900">
        <div className="border-b border-ink-900/15 dark:border-ink-700 pb-3">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-vermilion">
            Common Inquiries
          </span>
          <h2 className="text-2xl font-serif font-bold text-ink-900 dark:text-ink-100 mt-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-2.5">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-paper-100 dark:bg-ink-850 border border-ink-900/15 dark:border-ink-700 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-serif font-bold text-ink-900 dark:text-ink-100 hover:text-vermilion transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-vermilion shrink-0 ml-2" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-ink-400 shrink-0 ml-2" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-ink-700 dark:text-ink-300 leading-relaxed border-t border-ink-900/10 dark:border-ink-800 pt-3 font-normal">
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
