import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { 
  RotateCcw, 
  ShieldCheck, 
  CreditCard, 
  Clock, 
  Mail, 
  AlertTriangle, 
  CheckCircle2,
  Scale,
  Calendar,
  Layers,
  FileSpreadsheet,
  AlertCircle,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cancellation & Refund Policy | Lex Minds',
  description:
    'Official Cancellation & Refund Policy of Lex Minds governing cohort capacity fees, duplicate payment remedies, platform rescheduling, peer-review evaluation standards, and claim adjudication timelines.',
  alternates: {
    canonical: 'https://lexminds.in/cancellation-refund-policy',
  },
};

export default function CancellationRefundPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ name: 'Cancellation & Refund Policy', href: '/cancellation-refund-policy' }]} />

      {/* Header Banner */}
      <div className="p-8 sm:p-12 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 shadow-brutal space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-sm bg-royal-50 dark:bg-royal-950/40 border border-royal-200 dark:border-royal-800 text-royal-700 dark:text-royal-300 text-[11px] font-mono font-bold uppercase tracking-wider">
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Institutional Consumer &amp; Fee Governance</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-ink-950 dark:text-ink-50 tracking-tight">
          Cancellation &amp; Refund Policy
        </h1>

        <p className="text-sm sm:text-base text-ink-600 dark:text-ink-300 leading-relaxed max-w-2xl font-normal">
          This Cancellation &amp; Refund Policy sets out the terms governing fees paid for specialized legal education programs, practical internships, drafting workshops, and academic publishing services on <strong>Lex Minds</strong> (<a href="https://www.lexminds.in" className="text-royal-600 dark:text-royal-400 underline font-medium">www.lexminds.in</a>).
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-ink-500 dark:text-ink-400 border-t border-ink-900/10 dark:border-ink-800">
          <span className="flex items-center space-x-1.5 font-semibold text-ink-900 dark:text-ink-100">
            <Calendar className="w-3.5 h-3.5 text-royal-600 dark:text-royal-400" />
            <span>Effective Date: September 6, 2026</span>
          </span>
          <span>&bull;</span>
          <span>Platform: Lex Minds</span>
          <span>&bull;</span>
          <span>Grievance Desk: <a href="mailto:lexmindsindia@gmail.com" className="text-royal-600 dark:text-royal-400 hover:underline">lexmindsindia@gmail.com</a></span>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="p-6 sm:p-12 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 space-y-12 text-sm text-ink-700 dark:text-ink-300 leading-relaxed shadow-brutal">

        {/* 1. General Policy: Strict Non-Refundability */}
        <section id="section-1" className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">01.</span>
            <span>General Policy: Strict Non-Refundability</span>
          </h2>

          <p>
            Lex Minds delivers specialized legal education programs, practical internships, drafting workshops, and academic publishing services. All transactions executed on <a href="https://www.lexminds.in" className="text-royal-600 dark:text-royal-400 underline font-medium">www.lexminds.in</a> represent fees paid for reserved cohort capacity, intellectual property access, curriculum delivery, and professional editorial review.
          </p>

          <div className="p-4 rounded-sm bg-paper dark:bg-ink-900 border-l-4 border-royal-600 dark:border-royal-500 border border-ink-900/15 dark:border-ink-700 space-y-1.5">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-royal-700 dark:text-royal-300 flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Core Principle</span>
            </div>
            <p className="font-serif font-semibold text-ink-950 dark:text-ink-50 text-sm sm:text-base">
              Except as explicitly provided in this Policy, all sales, payments, and fees paid to Lex Minds are strictly non-refundable and non-transferable.
            </p>
          </div>
        </section>

        {/* 2. Duplicate Transactions & Technical Gateway Failures */}
        <section id="section-2" className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">02.</span>
            <span>Duplicate Transactions &amp; Technical Gateway Failures</span>
          </h2>

          <p>
            If an electronic transaction error occurs due to payment gateway, banking server, or network communication latency resulting in:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-sm bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 space-y-2">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-coral-600 dark:text-coral-400 flex items-center space-x-1.5">
                <CreditCard className="w-4 h-4" />
                <span>Scenario A</span>
              </div>
              <h3 className="font-serif font-bold text-base text-ink-950 dark:text-ink-50">
                Duplicate Deductions
              </h3>
              <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-400 leading-relaxed">
                The user is billed multiple times for a single enrollment or service.
              </p>
            </div>

            <div className="p-4 rounded-sm bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 space-y-2">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center space-x-1.5">
                <AlertCircle className="w-4 h-4" />
                <span>Scenario B</span>
              </div>
              <h3 className="font-serif font-bold text-base text-ink-950 dark:text-ink-50">
                Debited Without Access
              </h3>
              <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-400 leading-relaxed">
                Funds are deducted from the user’s account, but the payment gateway fails to notify our platform and access is not provisioned.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-sm bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-500/40 space-y-1.5">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Prescribed Remedy</span>
            </div>
            <p className="text-emerald-950 dark:text-emerald-100 font-medium text-xs sm:text-sm leading-relaxed">
              <strong>Remedy:</strong> Upon receipt and verification of transaction records, Lex Minds will issue a <strong>100% refund</strong> of the duplicate or unprovisioned charge back to the original funding source.
            </p>
          </div>
        </section>

        {/* 3. Live Sessions, Masterclasses & Internship Cohorts */}
        <section id="section-3" className="space-y-6">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">03.</span>
            <span>Live Sessions, Masterclasses &amp; Internship Cohorts</span>
          </h2>

          {/* 3.1 Platform-Side Cancellations & Urgent Unavailability */}
          <div className="space-y-3 pl-0 sm:pl-2">
            <h3 className="text-lg font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2">
              <span className="font-mono text-royal-600 dark:text-royal-400 text-sm">3.1</span>
              <span>Platform-Side Cancellations &amp; Urgent Unavailability</span>
            </h3>
            <p>
              We mandate high standards of punctuality and schedule adherence for all instructors and facilitators. In the exceptional event that:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-ink-700 dark:text-ink-300 pl-2 text-xs sm:text-sm">
              <li>A session is urgently cancelled by Lex Minds without an alternative schedule; or</li>
              <li>A designated mentor/instructor fails to appear (&ldquo;no-show&rdquo;) without prior communication:</li>
            </ul>

            <div className="p-4 rounded-sm bg-royal-50 dark:bg-royal-950/30 border border-royal-300 dark:border-royal-800 text-ink-900 dark:text-ink-100 text-xs sm:text-sm space-y-1">
              <strong className="text-royal-700 dark:text-royal-300 font-mono uppercase tracking-wider block text-xs">Remedy:</strong>
              <p className="leading-relaxed">
                Enrolled participants will be entitled to a <strong>50% pro-rata refund</strong> corresponding to that specific session’s assigned fee component. In addition, Lex Minds may, at its sole discretion, grant supplementary compensatory academic benefits (e.g., access to supplementary learning archives or specialized reference materials).
              </p>
            </div>
          </div>

          {/* 3.2 Rescheduling & Timetable Adjustments */}
          <div className="space-y-3 pl-0 sm:pl-2">
            <h3 className="text-lg font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2">
              <span className="font-mono text-royal-600 dark:text-royal-400 text-sm">3.2</span>
              <span>Rescheduling &amp; Timetable Adjustments</span>
            </h3>
            <p>
              Lex Minds reserves the unilateral right to reschedule, postpone, or adjust the date, timing, or format of any live session or internship module due to operational necessities or speaker availability. Postponements, schedule changes, or curriculum re-sequencing do not constitute grounds for a refund, chargeback, or credit.
            </p>
          </div>

          {/* 3.3 Participant-Side Cancellations */}
          <div className="space-y-4 pl-0 sm:pl-2">
            <h3 className="text-lg font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2">
              <span className="font-mono text-royal-600 dark:text-royal-400 text-sm">3.3</span>
              <span>Participant-Side Cancellations</span>
            </h3>

            <div className="space-y-3">
              <div className="p-3.5 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700">
                <strong className="text-ink-950 dark:text-ink-50 font-semibold block text-sm mb-1">
                  Pre-Commencement Withdrawals:
                </strong>
                <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-400">
                  If an enrolled participant withdraws, cancels, or intimates an inability to attend prior to or following program commencement, no cash refunds or store credits will be provided.
                </p>
              </div>

              <div className="p-3.5 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700">
                <strong className="text-ink-950 dark:text-ink-50 font-semibold block text-sm mb-1">
                  Compensatory Benefits:
                </strong>
                <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-400">
                  Solely at its discretion, and determined on a case-by-case basis relative to the fee paid, Lex Minds may grant equivalent compensatory digital benefits (e.g., curated drafting templates, research dossiers, or access to asynchronous learning assets).
                </p>
              </div>

              <div className="p-3.5 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700">
                <strong className="text-ink-950 dark:text-ink-50 font-semibold block text-sm mb-1">
                  Participant Absences &amp; No-Shows:
                </strong>
                <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-400">
                  Failure by a participant to attend scheduled live classes, submit assignments, or participate in internship evaluations results in forfeiture of that portion of the program without compensation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Article Submission, Peer Review & Publication Standards */}
        <section id="section-4" className="space-y-6">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">04.</span>
            <span>Article Submission, Peer Review &amp; Publication Standards</span>
          </h2>

          <p>
            Lex Minds operates an academic and legal journalism portal subject to institutional quality control. Prior to submission, authors are furnished with our institutional publication guidelines, formatting criteria, and benchmark standards.
          </p>

          {/* 4.1 Nature of Submission and Evaluation Fees */}
          <div className="space-y-2 pl-0 sm:pl-2">
            <h3 className="text-lg font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2">
              <span className="font-mono text-royal-600 dark:text-royal-400 text-sm">4.1</span>
              <span>Nature of Submission and Evaluation Fees</span>
            </h3>
            <p>
              Any processing or submission fee charged for article evaluation covers the operational overhead of the Editorial Panel of Experts who conduct plagiarism checks, thematic verification, substantive legal vetting, and editorial critique. Once an article is submitted to the editorial desk, this evaluation service is deemed fully rendered, and fees are strictly non-refundable.
            </p>
          </div>

          {/* 4.2 Editorial Benchmarks & Determination Tiers */}
          <div className="space-y-3 pl-0 sm:pl-2">
            <h3 className="text-lg font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2">
              <span className="font-mono text-royal-600 dark:text-royal-400 text-sm">4.2</span>
              <span>Editorial Benchmarks &amp; Determination Tiers</span>
            </h3>
            <p>
              Submissions are evaluated against our institutional rubric:
            </p>

            <div className="space-y-3 pt-2">
              {/* Near-Miss Tier */}
              <div className="p-4 rounded-sm bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-royal-600 dark:text-royal-400">
                    Tier 01 &bull; Conditional Resubmission
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-royal-100 dark:bg-royal-950 text-royal-800 dark:text-royal-200 border border-royal-300 dark:border-royal-800">
                    No Additional Fee
                  </span>
                </div>
                <h4 className="font-serif font-bold text-base text-ink-950 dark:text-ink-50">
                  Near-Miss Tier (Marginally Below Benchmark)
                </h4>
                <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-400 leading-relaxed">
                  Articles that show strong legal research but fail minor analytical or formatting thresholds will be issued a Detailed Assessment Report identifying precise areas for improvement. The author will be granted <strong>one conditional re-submission opportunity</strong> within the same cycle to revise and resubmit without incurring an additional evaluation fee.
                </p>
              </div>

              {/* Substantive Deficit Tier */}
              <div className="p-4 rounded-sm bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    Tier 02 &bull; Comprehensive Critique
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-800">
                    Academic Feedback Included
                  </span>
                </div>
                <h4 className="font-serif font-bold text-base text-ink-950 dark:text-ink-50">
                  Substantive Deficit Tier (Significantly Below Benchmark)
                </h4>
                <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-400 leading-relaxed">
                  Articles that fundamentally fail our legal analysis, ethical, or academic standards will be rejected. Authors in this tier will receive a <strong>Comprehensive Evaluation &amp; Critique Report</strong> detailing the structural failures and research gaps to aid their academic development. No fee refund or free resubmission is provided for articles rejected under this tier.
                </p>
              </div>

              {/* Plagiarism & Academic Dishonesty */}
              <div className="p-4 rounded-sm bg-paper dark:bg-ink-900 border-l-4 border-coral-600 dark:border-coral-500 border border-ink-900/15 dark:border-ink-700 space-y-2">
                <div className="flex items-center space-x-1.5 text-xs font-mono font-bold uppercase tracking-wider text-coral-600 dark:text-coral-400">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Strict Disqualification</span>
                </div>
                <h4 className="font-serif font-bold text-base text-ink-950 dark:text-ink-50">
                  Plagiarism &amp; Academic Dishonesty
                </h4>
                <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-400 leading-relaxed">
                  Submissions found to contain unoriginal content, uncredited citations, or unauthorized AI-generated fabrications are <strong>rejected outright without any right to resubmission, feedback reports, or refund</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Force Majeure & Platform Availability */}
        <section id="section-5" className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">05.</span>
            <span>Force Majeure &amp; Platform Availability</span>
          </h2>

          <p>
            Lex Minds shall not be held liable, nor will any refunds, rebates, or credits be issued, for failure, suspension, disruption, or delay in delivering services, live streams, website availability, or access credentials arising out of circumstances beyond its reasonable control (Force Majeure).
          </p>

          <p className="font-medium text-ink-950 dark:text-ink-50">
            Such events include, but are not limited to:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="p-3 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 text-xs text-ink-700 dark:text-ink-300 space-y-1">
              <strong className="block font-semibold text-ink-950 dark:text-ink-50">Connectivity Disruptions:</strong>
              <span>Regional or national internet disruptions, telecommunications failures, or state-ordered network shutdowns.</span>
            </div>
            <div className="p-3 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 text-xs text-ink-700 dark:text-ink-300 space-y-1">
              <strong className="block font-semibold text-ink-950 dark:text-ink-50">Infrastructure Failures:</strong>
              <span>Grid failure, cloud server outages, third-party software/hosting disruptions, or cyberattacks (DDoS).</span>
            </div>
            <div className="p-3 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 text-xs text-ink-700 dark:text-ink-300 space-y-1">
              <strong className="block font-semibold text-ink-950 dark:text-ink-50">Disasters &amp; Regulations:</strong>
              <span>Natural disasters, epidemics, pandemics, strikes, civil commotion, or state regulatory orders.</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-400 pt-1">
            In the event of a Force Majeure disruption, Lex Minds will make commercially reasonable efforts to restore services or reschedule affected sessions within a practical timeframe once normal operations resume.
          </p>
        </section>

        {/* 6. Formal Claim Submission Procedure */}
        <section id="section-6" className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">06.</span>
            <span>Formal Claim Submission Procedure</span>
          </h2>

          <p>
            To initiate a review for duplicate deductions or session-cancellation remedies, customers must submit a formal written claim. <strong>Disclosures through public social media comments, unofficial messengers, or phone calls will not be acknowledged.</strong>
          </p>

          <div className="p-4 rounded-sm bg-royal-50 dark:bg-royal-950/30 border border-royal-200 dark:border-royal-800 space-y-2">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-royal-700 dark:text-royal-300 flex items-center space-x-1.5">
              <Mail className="w-4 h-4" />
              <span>Official Filing Channel</span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-ink-900 dark:text-ink-100">
              Use the official <Link href="/contact" className="text-royal-600 dark:text-royal-400 font-semibold underline">&ldquo;Contact Us&rdquo; form</Link> on <a href="https://www.lexminds.in" className="text-royal-600 dark:text-royal-400 underline font-medium">www.lexminds.in</a> or email directly to <a href="mailto:lexmindsindia@gmail.com" className="text-royal-600 dark:text-royal-400 font-bold underline">lexmindsindia@gmail.com</a> with the subject line:
            </p>
            <div className="p-2.5 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 font-mono text-xs font-bold text-royal-700 dark:text-royal-300 break-all select-all">
              REFUND CLAIM - [TRANSACTION ID] - [FULL NAME]
            </div>
          </div>

          <div className="space-y-2 pt-1">
            <h3 className="font-serif font-bold text-base text-ink-950 dark:text-ink-50 flex items-center space-x-2">
              <FileSpreadsheet className="w-4 h-4 text-royal-600 dark:text-royal-400" />
              <span>Mandatory Evidentiary Documentation</span>
            </h3>
            <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-400">
              The claim must contain the following required information:
            </p>

            <ul className="space-y-2 pt-1">
              {[
                'Transaction ID / Bank Reference Number (UTR).',
                'Registered Email Address and mobile number linked to the registration.',
                'Screenshot of bank/gateway debit confirmation.',
                'Specific description of the operational failure or technical error.',
                'The specific relief claimed under this Policy.'
              ].map((doc, idx) => (
                <li key={idx} className="p-2.5 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 flex items-start space-x-2.5 text-xs sm:text-sm">
                  <span className="font-mono text-royal-600 dark:text-royal-400 font-bold">{idx + 1}.</span>
                  <span className="text-ink-800 dark:text-ink-200">{doc}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 7. Adjudication & Settlement Timelines */}
        <section id="section-7" className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">07.</span>
            <span>Adjudication &amp; Settlement Timelines</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-sm bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 space-y-2">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-royal-600 dark:text-royal-400 flex items-center space-x-1.5">
                <Clock className="w-4 h-4" />
                <span>Stage 1: Verification</span>
              </div>
              <h3 className="font-serif font-bold text-base text-ink-950 dark:text-ink-50">
                Internal Review &amp; Verification
              </h3>
              <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-400 leading-relaxed">
                Lex Minds’ compliance and audit team will investigate the claim against server records, gateway logs, and editorial timestamps. A formal response accepting or rejecting the claim will be delivered within <strong>7 to 10 business days</strong> of receipt of complete documentation.
              </p>
            </div>

            <div className="p-4 rounded-sm bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 space-y-2">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-royal-600 dark:text-royal-400 flex items-center space-x-1.5">
                <CreditCard className="w-4 h-4" />
                <span>Stage 2 &amp; 3: Payout</span>
              </div>
              <h3 className="font-serif font-bold text-base text-ink-950 dark:text-ink-50">
                Remittance of Approved Claims
              </h3>
              <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-400 leading-relaxed">
                Where a refund is approved, the transaction reversal instruction will be dispatched to our payment aggregator within <strong>7 to 10 business days</strong>. Actual credit to the user’s account is governed by banking network clearing cycles and typically takes <strong>5 to 7 additional business days</strong> depending on the card issuer or issuing bank.
              </p>
            </div>
          </div>
        </section>

        {/* 8. Governing Law & Dispute Resolution */}
        <section id="section-8" className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">08.</span>
            <span>Governing Law &amp; Dispute Resolution</span>
          </h2>

          <p>
            This Policy forms an integral part of the contractual agreement between you and Lex Minds. This agreement is governed by, and shall be construed in accordance with, the substantive laws of India.
          </p>

          <div className="p-4 rounded-sm bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 flex items-start space-x-3">
            <Scale className="w-5 h-5 text-royal-600 dark:text-royal-400 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs sm:text-sm">
              <strong className="text-ink-950 dark:text-ink-50 font-semibold block">Exclusive Judicial Forum</strong>
              <p className="text-ink-600 dark:text-ink-400 leading-relaxed">
                Any dispute, claim, or controversy arising out of, or in connection with, payments, chargebacks, service delivery, or this Policy shall be subject to the exclusive jurisdiction of the competent courts of civil and supervisory jurisdiction situated in <strong>Jammu, Union Territory of Jammu and Kashmir, India</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* 9. Policy Amendments */}
        <section id="section-9" className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">09.</span>
            <span>Policy Amendments</span>
          </h2>

          <p>
            Lex Minds reserves the right to modify, amend, or update this Cancellation &amp; Refund Policy at any time without prior individual notice. Changes become effective immediately upon posting to <a href="https://www.lexminds.in" className="text-royal-600 dark:text-royal-400 underline font-medium">www.lexminds.in</a>.
          </p>

          <p className="text-xs sm:text-sm font-medium text-ink-900 dark:text-ink-100">
            Continued use of our portal or enrollment in our programs following such updates signifies irrevocable acceptance of the modified terms.
          </p>
        </section>

        {/* Support & Contact Footer Block */}
        <div className="pt-6 border-t border-ink-900/15 dark:border-ink-800 space-y-3">
          <h3 className="font-serif font-bold text-base text-ink-950 dark:text-ink-50">
            Assistance &amp; Administrative Helpdesk
          </h3>
          <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-400">
            For questions regarding this Cancellation &amp; Refund Policy or to lodge a verified claim, reach out via our monitored channels:
          </p>
          <div className="p-4 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900/15 dark:border-ink-700 text-xs font-mono space-y-1.5">
            <div><strong className="text-ink-950 dark:text-ink-50">Entity:</strong> Lex Minds</div>
            <div><strong className="text-ink-950 dark:text-ink-50">Portal:</strong> <a href="https://www.lexminds.in" className="text-royal-600 dark:text-royal-400 underline">https://www.lexminds.in</a></div>
            <div><strong className="text-ink-950 dark:text-ink-50">Official Email:</strong> <a href="mailto:lexmindsindia@gmail.com" className="text-royal-600 dark:text-royal-400 underline">lexmindsindia@gmail.com</a></div>
            <div><strong className="text-ink-950 dark:text-ink-50">Contact Form:</strong> <Link href="/contact" className="text-royal-600 dark:text-royal-400 underline">lexminds.in/contact</Link></div>
          </div>
        </div>

      </div>
    </div>
  );
}
