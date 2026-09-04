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
      a: 'Fellowships are structured by senior student editors. Fellows receive directed guidance in statutory interpretation, case digest drafting, and citation standardization under OSCOLA and Bluebook rules.'
    },
    {
      q: 'What is the standard turnaround time for article submissions?',
      a: 'Initial manuscript intake screening takes 3-5 business days. Evaluation by the student editorial board takes 7-10 business days, after which authors receive written editorial notes and publication decisions.'
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ name: 'Academic Desk & Inquiries', href: '/contact' }]} />

      {/* Header */}
      <div className="border-b border-ink-900/15 dark:border-ink-700 pb-8 space-y-3">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-royal-500 dark:text-royal-400">
          Academic Secretariat &bull; Inquiries
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-ink-950 dark:text-ink-50 tracking-tight">
          Academic Correspondence Desk
        </h1>
        <p className="text-base text-ink-600 dark:text-ink-300 max-w-2xl leading-relaxed font-normal">
          Reach our student editorial council, fellowship coordinators, or academic ethics desk. Inquiries submitted below are logged directly in our editorial registry.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
        
        {/* Left: Embedded Google Form (7 Cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 shadow-brutal space-y-5">
          
          <div className="flex items-center justify-between pb-3 border-b border-ink-900/10 dark:border-ink-800">
            <h2 className="text-lg font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2">
              <Mail className="w-4 h-4 text-royal-500" />
              <span>Official Academic Registry Form</span>
            </h2>
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLScTtf9fSfKdgnXOwDvx-8SN96FrYMvnuI_SmKNYmclkKMrorw/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-ink-500 hover:text-royal-500 dark:text-ink-400 flex items-center space-x-1"
            >
              <span>Open in new tab</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Embedded Google Form Container */}
          <div className="relative w-full overflow-hidden border border-ink-900/15 dark:border-ink-700 bg-white rounded-sm shadow-sm min-h-[950px]">
            {iframeLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-paper dark:bg-ink-900 text-ink-500 text-xs space-y-2 z-10">
                <Loader2 className="w-5 h-5 animate-spin text-royal-500" />
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
          <div className="p-6 sm:p-8 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 space-y-4 text-xs shadow-brutal">
            <h3 className="text-lg font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2">
              <Building className="w-4 h-4 text-royal-500" />
              <span>Secretariat &amp; Communications</span>
            </h3>

            <div className="space-y-3 text-ink-700 dark:text-ink-300">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-royal-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-ink-950 dark:text-ink-50 block font-mono text-[11px] uppercase">Secretariat:</strong>
                  <span>Digital Editorial Secretariat &bull; Online Operations (Pan-India)</span>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <Mail className="w-4 h-4 text-royal-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-ink-950 dark:text-ink-50 block font-mono text-[11px] uppercase">Electronic Desks:</strong>
                  <span className="block font-mono text-xs mt-0.5">editorial@lexminds.in (Treatises &amp; Law Journal)</span>
                  <span className="block font-mono text-xs">fellowships@lexminds.in (Research Fellowships)</span>
                  <span className="block font-mono text-xs">contact@lexminds.in (General Communications)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Academic Ethics & Errata Notice */}
          <div className="p-6 sm:p-8 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 space-y-3 text-xs text-ink-700 dark:text-ink-300 shadow-brutal">
            <h4 className="font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2 text-base">
              <Shield className="w-4 h-4 text-royal-500" />
              <span>Academic Integrity &amp; Errata Desk</span>
            </h4>
            <p className="text-xs text-ink-600 dark:text-ink-400 leading-relaxed font-normal">
              Authors and readers wishing to submit citation corrections, academic errata, or ethical clarifications may write directly to the Editorial Council:
            </p>
            <div className="p-3.5 bg-paper dark:bg-ink-850 border border-ink-900/15 dark:border-ink-700 space-y-1 text-xs font-mono rounded-sm">
              <div className="font-semibold text-royal-600 dark:text-royal-400">Editorial Council &bull; Academic Oversight</div>
              <div className="text-ink-600 dark:text-ink-400">Email: editorial@lexminds.in</div>
            </div>
          </div>

          {/* Response Standards */}
          <div className="p-5 bg-paper dark:bg-ink-850 border border-ink-900/15 dark:border-ink-700 text-xs space-y-1.5 rounded-sm">
            <span className="font-serif font-bold text-ink-950 dark:text-ink-50 text-sm block">
              Response Standards
            </span>
            <p className="text-xs text-ink-600 dark:text-ink-400 leading-relaxed font-normal">
              Inquiries submitted through this registry are reviewed during regular academic desk hours. Editorial responses are typically issued within 2 to 3 business days.
            </p>
          </div>

        </div>

      </div>

      {/* FAQ Accordion Section */}
      <div className="p-8 sm:p-12 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 space-y-6 shadow-brutal">
        <div className="border-b border-ink-900/15 dark:border-ink-700 pb-4">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-royal-500 dark:text-royal-400">
            Common Inquiries
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink-950 dark:text-ink-50 mt-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-paper dark:bg-ink-850 border border-ink-900/15 dark:border-ink-700 rounded-sm overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between text-sm sm:text-base font-serif font-bold text-ink-950 dark:text-ink-50 hover:text-royal-500 dark:hover:text-royal-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-royal-500 shrink-0 ml-2" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-ink-400 shrink-0 ml-2" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-sm text-ink-600 dark:text-ink-300 leading-relaxed border-t border-ink-900/10 dark:border-ink-800 pt-3 font-normal">
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
