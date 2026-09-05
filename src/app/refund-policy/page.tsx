import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { 
  RotateCcw, 
  ShieldCheck, 
  CreditCard, 
  HelpCircle, 
  Clock, 
  Mail, 
  AlertTriangle, 
  FileText, 
  CheckCircle2,
  Scale
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cancellation & Refund Policy | Lex Minds',
  description:
    'Authoritative Cancellation and Refund Policy of Lex Minds governing evaluation fees, non-refundable administrative services, duplicate charge reversals, and processing timelines.',
  alternates: {
    canonical: 'https://lexminds.in/refund-policy',
  },
};

export default function RefundPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ name: 'Refund Policy', href: '/refund-policy' }]} />

      {/* Header Banner */}
      <div className="p-8 sm:p-12 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 shadow-brutal space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-sm bg-royal-50 dark:bg-royal-950/40 border border-royal-200 dark:border-royal-800 text-royal-700 dark:text-royal-300 text-[11px] font-mono font-bold uppercase tracking-wider">
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Consumer Protection &amp; Transaction Terms</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-ink-950 dark:text-ink-50 tracking-tight">
          Cancellation &amp; Refund Policy
        </h1>

        <p className="text-sm sm:text-base text-ink-600 dark:text-ink-300 leading-relaxed max-w-2xl font-normal">
          This Cancellation &amp; Refund Policy sets out the terms governing fees paid for administrative evaluation, editorial peer-review, and educational services provided through <strong>Lex Minds</strong> (<a href="https://lexminds.in" className="text-royal-600 dark:text-royal-400 underline">https://lexminds.in</a>).
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-ink-500 dark:text-ink-400 border-t border-ink-900/10 dark:border-ink-800">
          <span>Last Updated: September 2026</span>
          <span>&bull;</span>
          <span>Entity: Lex Minds</span>
          <span>&bull;</span>
          <span>Support: <a href="mailto:lexmindsindia@gmail.com" className="text-royal-600 dark:text-royal-400 hover:underline">lexmindsindia@gmail.com</a></span>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="p-6 sm:p-12 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 space-y-10 text-sm text-ink-700 dark:text-ink-300 leading-relaxed shadow-brutal">

        {/* 1. Overview & Business Model */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">01.</span>
            <span>Nature of Services &amp; Paid Products</span>
          </h2>
          <p>
            Lex Minds is an independent, student-led legal education, research, and publications platform. We provide law students and legal scholars with educational opportunities, academic publishing avenues, and practical learning programmes.
          </p>
          <p>
            To sustain digital infrastructure, anti-plagiarism screening, administrative docketing, and preliminary editorial review, Lex Minds charges one-time, non-recurring evaluation fees for the following specific digital services:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-sm bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 space-y-2">
              <div className="text-xs font-mono font-bold uppercase text-royal-600 dark:text-royal-400">
                Service 01
              </div>
              <h3 className="font-serif font-bold text-base text-ink-950 dark:text-ink-50">
                Internship / Fellowship Application Evaluation Fee
              </h3>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-serif font-black text-ink-950 dark:text-ink-50">₹39.00</span>
                <span className="text-sm line-through text-ink-400">₹299.00</span>
                <span className="text-[11px] font-mono text-ink-500">(Inclusive of all taxes)</span>
              </div>
              <p className="text-xs text-ink-600 dark:text-ink-400 leading-relaxed">
                Covers intake screening, Statement of Purpose (SOP) academic assessment, eligibility verification, and docket allocation by the student evaluation team.
              </p>
            </div>

            <div className="p-4 rounded-sm bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 space-y-2">
              <div className="text-xs font-mono font-bold uppercase text-royal-600 dark:text-royal-400">
                Service 02
              </div>
              <h3 className="font-serif font-bold text-base text-ink-950 dark:text-ink-50">
                Article Manuscript Editorial Evaluation Fee
              </h3>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-serif font-black text-ink-950 dark:text-ink-50">₹99.00</span>
                <span className="text-sm line-through text-ink-400">₹399.00</span>
                <span className="text-[11px] font-mono text-ink-500">(Inclusive of all taxes)</span>
              </div>
              <p className="text-xs text-ink-600 dark:text-ink-400 leading-relaxed">
                Covers manuscript intake, academic integrity and anti-plagiarism verification, double-blind peer-review coordination, and editorial formatting review.
              </p>
            </div>
          </div>
        </section>

        {/* 2. Non-Guarantee Disclosure */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">02.</span>
            <span>No Guarantee of Outcome, Selection, or Publication</span>
          </h2>
          <div className="p-4 rounded-sm bg-amber-50 dark:bg-amber-950/40 border border-amber-500/40 text-xs text-amber-900 dark:text-amber-200 space-y-2">
            <div className="flex items-center space-x-2 font-serif font-bold text-sm">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>Mandatory Disclosure</span>
            </div>
            <p className="leading-relaxed">
              Payment of an evaluation fee covers the cost of reviewing your submission. <strong>Payment does not guarantee selection for an internship, acceptance of an article, publication in the journal, issuance of a certificate, or any specific academic outcome.</strong>
            </p>
            <p className="leading-relaxed">
              Decisions are made independently based on academic merit, originality, adherence to submission guidelines, and seat or queue availability.
            </p>
          </div>
        </section>

        {/* 3. Not a Law Firm Disclaimer */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">03.</span>
            <span>Educational Platform &bull; Not a Law Firm</span>
          </h2>
          <p>
            <strong>Lex Minds is not a law firm.</strong> Lex Minds does not provide legal representation, legal advice, attorney-client representation, or professional legal consultancy of any nature.
          </p>
          <p>
            All content, commentary, case analyses, and learning sessions published or organized by Lex Minds are intended strictly for academic, informational, and educational purposes.
          </p>
        </section>

        {/* 4. Non-Refundable Nature of Evaluation Services */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">04.</span>
            <span>Non-Refundable Evaluation Services</span>
          </h2>
          <p>
            Because evaluation begins immediately upon receipt of a completed submission and resources are allocated to process the application docket or manuscript, <strong>evaluation fees are non-refundable</strong> once payment has been completed and the order confirmed, except under the specific circumstances outlined in Section 05 below.
          </p>
          <p>
            Specifically, refunds are <strong>not</strong> granted for:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-ink-600 dark:text-ink-400 pl-2 text-xs sm:text-sm">
            <li>Rejection of an internship application based on merit or cohort capacity.</li>
            <li>Rejection or editorial revision requests for a submitted article manuscript.</li>
            <li>Change of mind, voluntary withdrawal, or scheduling conflicts after submission.</li>
            <li>Failure to complete assigned internship tasks or milestones.</li>
            <li>Disqualification resulting from academic dishonesty, plagiarism, or breach of <Link href="/terms" className="text-royal-600 dark:text-royal-400 underline">Terms &amp; Conditions</Link>.</li>
          </ul>
        </section>

        {/* 5. Circumstances Eligible for Refund */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">05.</span>
            <span>Circumstances Eligible for Refund</span>
          </h2>
          <p>
            Lex Minds will process a full refund in the following verified circumstances:
          </p>

          <div className="space-y-3">
            <div className="p-3.5 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-ink-950 dark:text-ink-50 block font-semibold">1. Duplicate Transactions:</strong>
                <span className="text-xs text-ink-600 dark:text-ink-400">
                  If your account was charged more than once for the exact same application docket or manuscript submission due to a browser glitch or payment gateway retry.
                </span>
              </div>
            </div>

            <div className="p-3.5 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-ink-950 dark:text-ink-50 block font-semibold">2. Technical Processing Failure:</strong>
                <span className="text-xs text-ink-600 dark:text-ink-400">
                  If an amount was debited from your bank account or card but no order reference was generated by our server, and the transaction was not automatically reversed by Razorpay.
                </span>
              </div>
            </div>

            <div className="p-3.5 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-ink-950 dark:text-ink-50 block font-semibold">3. Documented Unauthorized Billing:</strong>
                <span className="text-xs text-ink-600 dark:text-ink-400">
                  If the payment was made fraudulently using your credentials without your consent, subject to verification with our payment gateway partner.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Refund Request Procedure & Timelines */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">06.</span>
            <span>How to Request a Refund &amp; Processing Timelines</span>
          </h2>
          <p>
            To request a refund under Section 05, you must submit a written request within <strong>7 calendar days</strong> from the transaction date.
          </p>

          <div className="p-4 rounded-sm bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 space-y-2 text-xs font-mono">
            <div className="font-bold text-ink-950 dark:text-ink-50 text-sm">Required Information:</div>
            <ul className="list-disc list-inside space-y-1 text-ink-600 dark:text-ink-400">
              <li>Applicant / Author Full Name</li>
              <li>Registered Email Address</li>
              <li>Razorpay Payment ID (e.g., pay_xxxxxxxxxxxx)</li>
              <li>Order Reference Code (e.g., APP-xxxx-xxxx or ART-xxxx-xxxx)</li>
              <li>Proof of duplicate deduction or transaction statement screenshot</li>
            </ul>
            <div className="pt-2 text-ink-700 dark:text-ink-300">
              Send your request to our monitored support address:{' '}
              <a href="mailto:lexmindsindia@gmail.com" className="text-royal-600 dark:text-royal-400 font-bold underline">
                lexmindsindia@gmail.com
              </a>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <h3 className="font-serif font-bold text-base text-ink-950 dark:text-ink-50 flex items-center space-x-2">
              <Clock className="w-4 h-4 text-royal-500" />
              <span>Turnaround &amp; Payout Timelines</span>
            </h3>
            <ul className="list-disc list-inside space-y-1.5 text-ink-600 dark:text-ink-400 pl-2 text-xs sm:text-sm">
              <li><strong>Review Window:</strong> Our team reviews refund requests within <strong>2 to 3 business days</strong> of receipt.</li>
              <li><strong>Gateway Processing:</strong> Upon approval, the refund is initiated directly via Razorpay to your original payment instrument (Credit/Debit Card, Net Banking, or UPI).</li>
              <li><strong>Credit to Bank Account:</strong> Funds typically reflect in your account within <strong>5 to 7 business days</strong>, subject to your issuing bank&apos;s settlement schedule.</li>
            </ul>
          </div>
        </section>

        {/* 7. Cancellation Policy */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">07.</span>
            <span>Cancellation Policy</span>
          </h2>
          <p>
            Users may withdraw an application or manuscript submission at any time by sending an email to <a href="mailto:lexmindsindia@gmail.com" className="text-royal-600 dark:text-royal-400 underline">lexmindsindia@gmail.com</a>. Upon receiving a withdrawal request, our team will close the docket and cease further evaluation.
          </p>
          <p className="text-xs text-ink-500">
            Note: As evaluation resources are committed upon submission, voluntary cancellation does not entitle the user to a fee refund once the docket has been opened.
          </p>
        </section>

        {/* 8. Contact & Grievance Support */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">08.</span>
            <span>Support &amp; Grievance Contact</span>
          </h2>
          <p>
            For inquiries regarding billing, payment reconciliation, or refund status, please contact our administrative team:
          </p>
          <div className="p-4 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900/15 dark:border-ink-700 text-xs space-y-1.5 font-mono">
            <div><strong className="text-ink-950 dark:text-ink-50">Business Name:</strong> Lex Minds</div>
            <div><strong className="text-ink-950 dark:text-ink-50">Website:</strong> <a href="https://lexminds.in" className="text-royal-600 dark:text-royal-400 underline">https://lexminds.in</a></div>
            <div><strong className="text-ink-950 dark:text-ink-50">Primary Monitored Email:</strong> <a href="mailto:lexmindsindia@gmail.com" className="text-royal-600 dark:text-royal-400 underline">lexmindsindia@gmail.com</a></div>
            <div><strong className="text-ink-950 dark:text-ink-50">Operating Hours:</strong> Monday – Friday, 10:00 AM – 6:00 PM IST</div>
          </div>
        </section>

      </div>
    </div>
  );
}
