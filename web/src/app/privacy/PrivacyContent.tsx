'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  FileText, 
  UserCheck, 
  Award, 
  Users, 
  Cookie, 
  Globe, 
  CreditCard, 
  Clock, 
  AlertCircle, 
  Mail, 
  ExternalLink, 
  CheckCircle2,
  Scale,
  SlidersHorizontal,
  ChevronRight,
  Database,
  UserX,
  FileCheck,
  Building2,
  PhoneCall
} from 'lucide-react';

export default function PrivacyContent() {
  const [activeLang, setActiveLang] = useState<'en' | 'hi'>('en');

  const handleOpenConsentSettings = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('dpdp-open-consent-settings'));
    }
  };

  return (
    <div className="space-y-10">
      
      {/* Statutory DPDP Compliance Hero Callout */}
      <div className="p-6 sm:p-8 bg-paper-100 dark:bg-ink-900 border-2 border-royal-700/40 dark:border-royal-500/40 shadow-brutal space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-royal-100 dark:bg-royal-950 border border-royal-300 dark:border-royal-800 text-royal-800 dark:text-royal-300 text-xs font-mono font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-royal-600 dark:text-royal-400" />
            <span>Digital Personal Data Protection Act, 2023 (DPDP Act) Compliant</span>
          </div>

          {/* Multilingual Schedule 8 Toggle */}
          <div className="flex items-center space-x-2 text-xs font-mono">
            <span className="text-ink-500 dark:text-ink-400">Notice Language:</span>
            <button
              type="button"
              onClick={() => setActiveLang('en')}
              className={`px-2.5 py-1 border transition-colors ${
                activeLang === 'en'
                  ? 'bg-royal-600 text-white border-royal-600 font-bold'
                  : 'bg-paper dark:bg-ink-800 text-ink-700 dark:text-ink-300 border-ink-300 dark:border-ink-700'
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setActiveLang('hi')}
              className={`px-2.5 py-1 border transition-colors ${
                activeLang === 'hi'
                  ? 'bg-royal-600 text-white border-royal-600 font-bold'
                  : 'bg-paper dark:bg-ink-800 text-ink-700 dark:text-ink-300 border-ink-300 dark:border-ink-700'
              }`}
            >
              हिन्दी (Hindi)
            </button>
          </div>
        </div>

        {activeLang === 'en' ? (
          <div className="space-y-3 text-xs sm:text-sm text-ink-800 dark:text-ink-200 leading-relaxed">
            <p>
              Lex Minds operates as a <strong>Data Fiduciary</strong> in full alignment with the provisions of India&apos;s <strong>Digital Personal Data Protection Act, 2023 (Act No. 22 of 2023)</strong> and its notified rules. This policy provides statutory notice under <strong>Section 5</strong>, details lawful grounds of processing under <strong>Section 4 and Section 6</strong>, outlines children&apos;s protections under <strong>Section 9</strong>, and provides transparent mechanisms for Data Principals to exercise their rights under <strong>Sections 11–14</strong>.
            </p>
          </div>
        ) : (
          <div className="space-y-3 text-xs sm:text-sm text-ink-800 dark:text-ink-200 leading-relaxed font-sans">
            <p>
              लेक्स माइंड्स भारत के <strong>डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम, 2023 (DPDP Act)</strong> के तहत एक <strong>डेटा फिड्यूशरी</strong> के रूप में कार्य करता है। यह नीति धारा 5 के अंतर्गत वैधानिक सूचना प्रदान करती है, धारा 6 के तहत स्वतंत्र सहमति के प्रावधान स्पष्ट करती है, धारा 9 के अंतर्गत नाबालिगों के डेटा की सुरक्षा सुनिश्चित करती है और धारा 11–14 के तहत उपयोगकर्ताओं (डेटा प्रिंसिपल्स) को अपने अधिकारों का प्रयोग करने की सुविधा देती है।
            </p>
          </div>
        )}

        {/* Quick Statutory Action Strip */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <Link
            href="/privacy/rights"
            className="px-4 py-2 bg-royal-700 hover:bg-royal-800 text-white text-xs font-mono font-bold inline-flex items-center space-x-1.5 shadow-brutal-sm"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Exercise Data Principal Rights (Access / Erasure) &rarr;</span>
          </Link>

          <button
            type="button"
            onClick={handleOpenConsentSettings}
            className="px-4 py-2 border border-ink-950 dark:border-ink-400 hover:bg-paper-200 dark:hover:bg-ink-800 text-xs font-mono font-medium inline-flex items-center space-x-1.5"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Manage Cookie &amp; Tracking Consent</span>
          </button>

          <a
            href="#grievance-officer"
            className="px-3 py-2 text-xs font-mono text-royal-600 dark:text-royal-400 hover:underline inline-flex items-center space-x-1"
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Jump to Grievance Redressal Desk &darr;</span>
          </a>
        </div>
      </div>

      {/* Main Legal Content */}
      <div className="p-6 sm:p-12 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 space-y-12 text-sm text-ink-700 dark:text-ink-300 leading-relaxed shadow-brutal">
        
        {/* 1. Definitions & Framework */}
        <section className="space-y-4">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">01.</span>
            <span>Statutory Framework &amp; Definitions (DPDP Act, 2023)</span>
          </h2>
          <p>
            Under India&apos;s Digital Personal Data Protection Act, 2023, the terms used herein carry specific statutory meanings:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-3.5 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 space-y-1">
              <strong className="text-royal-600 dark:text-royal-400 block text-sm">Data Fiduciary:</strong>
              <p className="font-sans text-ink-700 dark:text-ink-300">
                Lex Minds (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;), which determines the purpose and means of processing personal data.
              </p>
            </div>
            <div className="p-3.5 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 space-y-1">
              <strong className="text-royal-600 dark:text-royal-400 block text-sm">Data Principal:</strong>
              <p className="font-sans text-ink-700 dark:text-ink-300">
                You (&ldquo;user&rdquo;, &ldquo;applicant&rdquo;, &ldquo;contributor&rdquo;), the individual to whom the personal data relates.
              </p>
            </div>
            <div className="p-3.5 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 space-y-1">
              <strong className="text-royal-600 dark:text-royal-400 block text-sm">Personal Data:</strong>
              <p className="font-sans text-ink-700 dark:text-ink-300">
                Any data about an individual who is identifiable by or in relation to such data.
              </p>
            </div>
            <div className="p-3.5 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 space-y-1">
              <strong className="text-royal-600 dark:text-royal-400 block text-sm">Data Processor:</strong>
              <p className="font-sans text-ink-700 dark:text-ink-300">
                Any person or entity who processes personal data on behalf of the Data Fiduciary (e.g. cloud hosting, payment gateways).
              </p>
            </div>
          </div>
        </section>

        {/* 2. Notice Under Section 5 */}
        <section className="space-y-4">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">02.</span>
            <span>Notice of Personal Data Collection &amp; Purpose Specification (Section 5)</span>
          </h2>
          <p>
            In accordance with <strong>Section 5(1) of the DPDP Act</strong>, every request for consent is accompanied by this itemized notice detailing the specific categories of personal data collected, specific purposes of processing, and lawful grounds:
          </p>

          {/* Section 5 Statutory Notice Table */}
          <div className="overflow-x-auto border border-ink-900/20 dark:border-ink-700">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-paper-100 dark:bg-ink-850 border-b border-ink-900/20 dark:border-ink-700 font-mono text-[11px] uppercase tracking-wider text-ink-900 dark:text-ink-100">
                  <th className="p-3 border-r border-ink-900/10 dark:border-ink-800">Data Category</th>
                  <th className="p-3 border-r border-ink-900/10 dark:border-ink-800">Specific Purpose</th>
                  <th className="p-3 border-r border-ink-900/10 dark:border-ink-800">Lawful Basis</th>
                  <th className="p-3">Retention Schedule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-900/10 dark:divide-ink-800">
                <tr className="hover:bg-paper-50 dark:hover:bg-ink-900/50">
                  <td className="p-3 font-semibold text-ink-950 dark:text-ink-50 border-r border-ink-900/10 dark:border-ink-800">
                    Internship Applicant Data (Name, Email, Phone, College, Study Year, SOP)
                  </td>
                  <td className="p-3 border-r border-ink-900/10 dark:border-ink-800">
                    Evaluating applications, cohort onboarding, task assignments, issuing completion letters and verifiable digital certificates.
                  </td>
                  <td className="p-3 border-r border-ink-900/10 dark:border-ink-800 font-mono text-[11px]">
                    Consent (Section 6)
                  </td>
                  <td className="p-3 font-mono text-[11px]">
                    Active cohort period + 3 years for academic verification, or until erasure requested.
                  </td>
                </tr>
                <tr className="hover:bg-paper-50 dark:hover:bg-ink-900/50">
                  <td className="p-3 font-semibold text-ink-950 dark:text-ink-50 border-r border-ink-900/10 dark:border-ink-800">
                    Author &amp; Manuscript Data (Author Name, Bio, Designation, Legal Content)
                  </td>
                  <td className="p-3 border-r border-ink-900/10 dark:border-ink-800">
                    Editorial peer review, author attribution, citation indexing, open-access legal publication.
                  </td>
                  <td className="p-3 border-r border-ink-900/10 dark:border-ink-800 font-mono text-[11px]">
                    Consent (Section 6)
                  </td>
                  <td className="p-3 font-mono text-[11px]">
                    Retained as persistent academic scholarly record with open-access attribution.
                  </td>
                </tr>
                <tr className="hover:bg-paper-50 dark:hover:bg-ink-900/50">
                  <td className="p-3 font-semibold text-ink-950 dark:text-ink-50 border-r border-ink-900/10 dark:border-ink-800">
                    Contact &amp; Grievance Inquiries (Name, Email, Query specifics)
                  </td>
                  <td className="p-3 border-r border-ink-900/10 dark:border-ink-800">
                    Responding to inquiries, grievance resolution, tracking tickets, statutory compliance audit trail.
                  </td>
                  <td className="p-3 border-r border-ink-900/10 dark:border-ink-800 font-mono text-[11px]">
                    Consent (Section 6) &amp; Legitimate Uses (Section 7)
                  </td>
                  <td className="p-3 font-mono text-[11px]">
                    180 days following ticket resolution, or statutory audit window.
                  </td>
                </tr>
                <tr className="hover:bg-paper-50 dark:hover:bg-ink-900/50">
                  <td className="p-3 font-semibold text-ink-950 dark:text-ink-50 border-r border-ink-900/10 dark:border-ink-800">
                    Technical &amp; Telemetry Data (IP Masked, Browser Type, Page Visits)
                  </td>
                  <td className="p-3 border-r border-ink-900/10 dark:border-ink-800">
                    Traffic analytics, security logging, DDoS defense, bot filtration.
                  </td>
                  <td className="p-3 border-r border-ink-900/10 dark:border-ink-800 font-mono text-[11px]">
                    Affirmative Consent (Google Consent Mode v2)
                  </td>
                  <td className="p-3 font-mono text-[11px]">
                    Up to 14 months (GA4 standard retention).
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-3.5 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 text-xs space-y-1">
            <strong className="text-ink-950 dark:text-ink-50 font-serif font-bold block">
              Strict Principle of Data Minimisation: No Sensitive Personal Records Collected
            </strong>
            <p className="text-ink-600 dark:text-ink-400 leading-relaxed">
              Lex Minds adheres strictly to data minimisation. We do <strong>NOT</strong> request, process, or store government identity documents (Aadhaar, PAN, Passport), biometric information, financial bank account passwords, or complete credit/debit card numbers. All payments are processed through Razorpay in encrypted PCI-DSS compliant sessions.
            </p>
          </div>
        </section>

        {/* 3. Consent & Withdrawal under Section 6 */}
        <section className="space-y-4">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">03.</span>
            <span>Consent Architecture &amp; Statutory Ease of Withdrawal (Section 6)</span>
          </h2>
          <p>
            Under <strong>Section 6(1) of the DPDP Act</strong>, consent provided by a Data Principal must be <strong>free, specific, informed, unconditional, and unambiguous</strong> with a clear affirmative action. Lex Minds enforces:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-xs text-ink-700 dark:text-ink-300 pl-2">
            <li><strong>No Pre-Ticked Boxes:</strong> All consent checkboxes across application forms, contact desks, and paper submissions are un-ticked by default.</li>
            <li><strong>Unbundled Approvals:</strong> Acceptance of editorial Terms &amp; Conditions is kept separate from consent to process marketing or auxiliary communication.</li>
            <li>
              <strong>Ease of Withdrawal (Section 6(4)):</strong> You have the absolute statutory right to withdraw your consent at any time. In accordance with the Act, the ease of withdrawing consent is comparable to giving it. You can modify your tracking choices instantly via our <button type="button" onClick={handleOpenConsentSettings} className="text-royal-600 dark:text-royal-400 underline font-semibold cursor-pointer">Cookie &amp; Consent Manager</button> or withdraw data processing consent by filing a ticket on our <Link href="/privacy/rights" className="text-royal-600 dark:text-royal-400 underline font-semibold">Data Principal Rights Portal</Link>.
            </li>
          </ul>
        </section>

        {/* 4. Protection of Children's Data under Section 9 */}
        <section className="space-y-4">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">04.</span>
            <span>Additional Obligations Regarding Children&apos;s Personal Data (Section 9)</span>
          </h2>
          <p>
            Lex Minds takes the protection of minors seriously. Under <strong>Section 9 of the DPDP Act</strong>, a &ldquo;child&rdquo; is defined as an individual who has not completed 18 years of age:
          </p>
          <div className="space-y-2 text-xs">
            <div className="p-3.5 bg-paper dark:bg-ink-900 border-l-4 border-royal-600 space-y-1">
              <strong className="text-ink-950 dark:text-ink-50 font-bold block">1. Verifiable Parental Consent:</strong>
              <p className="text-ink-600 dark:text-ink-400">
                Before processing any personal data of an individual under 18 years of age, Lex Minds obtains verifiable consent from the parent or lawful guardian.
              </p>
            </div>
            <div className="p-3.5 bg-paper dark:bg-ink-900 border-l-4 border-royal-600 space-y-1">
              <strong className="text-ink-950 dark:text-ink-50 font-bold block">2. Strict Prohibition on Behavioral Tracking &amp; Profiling:</strong>
              <p className="text-ink-600 dark:text-ink-400">
                In strict compliance with Section 9(2) and Section 9(3), Lex Minds shall <strong>never</strong> undertake tracking or behavioral monitoring of children, nor direct targeted advertisements at child users.
              </p>
            </div>
          </div>
        </section>

        {/* 5. Statutory Rights under Sections 11–14 */}
        <section className="space-y-4">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">05.</span>
            <span>Data Principal Statutory Rights (Sections 11, 12, 13 &amp; 14)</span>
          </h2>
          <p>
            As an Indian Data Principal, you enjoy legally enforceable rights under Chapter III of the DPDP Act:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 space-y-2">
              <div className="flex items-center space-x-2 text-royal-600 dark:text-royal-400 font-bold font-mono">
                <UserCheck className="w-4 h-4" />
                <span>Section 11: Right to Access Summary</span>
              </div>
              <p className="text-ink-600 dark:text-ink-400">
                Request a comprehensive summary of your personal data processed by Lex Minds, identities of third-party processors, and operational activities.
              </p>
            </div>

            <div className="p-4 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 space-y-2">
              <div className="flex items-center space-x-2 text-royal-600 dark:text-royal-400 font-bold font-mono">
                <FileCheck className="w-4 h-4" />
                <span>Section 12: Right to Correction &amp; Completion</span>
              </div>
              <p className="text-ink-600 dark:text-ink-400">
                Rectify misleading, inaccurate, or outdated records in your academic profile or internship docket.
              </p>
            </div>

            <div className="p-4 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 space-y-2">
              <div className="flex items-center space-x-2 text-coral-600 font-bold font-mono">
                <UserX className="w-4 h-4" />
                <span>Section 12: Right to Erasure (&ldquo;Right to be Forgotten&rdquo;)</span>
              </div>
              <p className="text-ink-600 dark:text-ink-400">
                Demand permanent erasure of your personal data once the purpose of collection is completed, subject to statutory certificate record retention.
              </p>
            </div>

            <div className="p-4 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 space-y-2">
              <div className="flex items-center space-x-2 text-royal-600 dark:text-royal-400 font-bold font-mono">
                <Scale className="w-4 h-4" />
                <span>Section 14: Right to Nominate</span>
              </div>
              <p className="text-ink-600 dark:text-ink-400">
                Nominate an individual who shall exercise your statutory rights in the unfortunate event of death or legal incapacity.
              </p>
            </div>
          </div>

          <div className="p-4 bg-royal-50/50 dark:bg-royal-950/20 border border-royal-200/60 dark:border-royal-800/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <strong className="text-ink-950 dark:text-ink-50 font-serif font-bold text-sm block">
                Exercise Any Statutory Right via Self-Service Portal
              </strong>
              <p className="text-xs text-ink-600 dark:text-ink-400">
                Requests are processed with an encrypted docket ID and audited under DPDP rules.
              </p>
            </div>
            <Link
              href="/privacy/rights"
              className="px-4 py-2 bg-royal-700 hover:bg-royal-800 text-white font-mono text-xs font-bold shrink-0 shadow-brutal-sm"
            >
              Open Rights Portal &rarr;
            </Link>
          </div>
        </section>

        {/* 6. Security Safeguards under Section 8 */}
        <section className="space-y-4">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">06.</span>
            <span>Security Safeguards &amp; Breach Protocol (Section 8)</span>
          </h2>
          <p>
            Under <strong>Section 8(5) of the DPDP Act</strong>, a Data Fiduciary is mandated to implement reasonable security safeguards to prevent personal data breaches:
          </p>
          <ul className="list-disc list-inside space-y-1 text-xs text-ink-700 dark:text-ink-300 pl-2">
            <li><strong>Transport Encryption:</strong> 100% of network traffic operates over HTTPS with TLS 1.3 encryption.</li>
            <li><strong>Access Controls:</strong> Editorial dossiers and applicant personal details are restricted to designated coordinators under strict role-based access.</li>
            <li><strong>Automated Breach Notification:</strong> In the unlikely event of a personal data breach, Lex Minds is prepared to notify the <strong>Data Protection Board of India (DPBI)</strong> and affected Data Principals in accordance with Section 8(6) of the Act and prescribed rules.</li>
          </ul>
        </section>

        {/* 7. Grievance Redressal Officer under Section 13 */}
        <section id="grievance-officer" className="space-y-4 p-6 bg-royal-50/50 dark:bg-royal-950/20 border-2 border-royal-700/30 dark:border-royal-500/30">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5">
            <Scale className="w-5 h-5 text-royal-600 dark:text-royal-400" />
            <span>07. Grievance Redressal Mechanism &amp; Officer Details (Section 13)</span>
          </h2>
          <p className="text-xs text-ink-700 dark:text-ink-300 leading-relaxed">
            In compliance with Section 8(9) and Section 13 of the DPDP Act, Lex Minds has designated an official <strong>Grievance Redressal Officer</strong> to address concerns regarding the processing of personal data:
          </p>

          <div className="p-4 bg-paper dark:bg-ink-900 border border-royal-200 dark:border-royal-800 text-xs font-mono space-y-1.5">
            <p><strong>Designation:</strong> Grievance Redressal Officer (DPDP Compliance Desk)</p>
            <p><strong>Organization:</strong> Lex Minds India</p>
            <p>
              <strong>Official Email:</strong>{' '}
              <a href="mailto:lexmindsindia@gmail.com" className="text-royal-600 dark:text-royal-400 underline font-bold">
                lexmindsindia@gmail.com
              </a>
            </p>
            <p><strong>Initial Acknowledgement SLA:</strong> Within 48 hours of electronic receipt.</p>
            <p><strong>Statutory Determination SLA:</strong> Within thirty (30) days as stipulated under DPDP Rules.</p>
          </div>

          {/* Section 13(3) Appellate Recourse to Data Protection Board */}
          <div id="grievance-escalation" className="p-4 bg-paper dark:bg-ink-900 border border-ink-900/10 dark:border-ink-800 space-y-2 text-xs">
            <div className="flex items-center space-x-2 text-ink-950 dark:text-ink-50 font-serif font-bold">
              <Building2 className="w-4 h-4 text-royal-600" />
              <span>Escalation to the Data Protection Board of India (DPBI)</span>
            </div>
            <p className="text-ink-600 dark:text-ink-400 leading-relaxed font-sans">
              As provided under <strong>Section 13(3) of the Digital Personal Data Protection Act, 2023</strong>: If a Data Principal does not receive a response from the Grievance Redressal Officer within the prescribed thirty (30) days, or is aggrieved by the determination or response provided by Lex Minds, the Data Principal may file a formal electronic complaint with the <strong>Data Protection Board of India (DPB)</strong> in the manner prescribed under the Act.
            </p>
          </div>
        </section>

        {/* 8. Multilingual Availability Notice */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">08.</span>
            <span>Multilingual Notice Availability (Constitution Eighth Schedule)</span>
          </h2>
          <p className="text-xs text-ink-700 dark:text-ink-300 leading-relaxed">
            In accordance with <strong>Section 5(3) of the DPDP Act</strong>, Data Principals have the option to access the summary notice of personal data processing in English or in any of the languages specified in the Eighth Schedule to the Constitution of India. You can switch between English and हिन्दी (Hindi) using the toggle at the top of this document or within the interactive consent manager.
          </p>
        </section>

        {/* 9. Disclaimer */}
        <section className="space-y-3 p-5 rounded-sm bg-amber-500/10 dark:bg-amber-500/5 border border-amber-500/20 text-xs">
          <div className="flex items-center space-x-2 text-amber-900 dark:text-amber-300 font-serif font-bold">
            <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>09. Academic &amp; Legal Disclaimer</span>
          </div>
          <p className="text-ink-700 dark:text-ink-300 leading-relaxed font-sans">
            Lex Minds is an academic learning, research fellowship, and student publishing platform. Information published across our website, articles, and commentaries is intended solely for legal scholarship and academic discourse. It does not constitute legal counsel, advocate solicitation, or an advocate-client relationship.
          </p>
        </section>

        <div className="pt-6 border-t border-ink-900/10 dark:border-ink-800 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-ink-500 dark:text-ink-400 gap-2">
          <span>&copy; 2026 Lex Minds India. All rights reserved.</span>
          <span>DPDP Act (Act No. 22 of 2023) Alignment Active</span>
        </div>

      </div>
    </div>
  );
}
