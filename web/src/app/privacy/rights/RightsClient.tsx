'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Send, 
  UserCheck, 
  Trash2, 
  Edit3, 
  UserPlus, 
  Clock, 
  Mail, 
  ExternalLink,
  SlidersHorizontal,
  ChevronRight,
  Info,
  Scale
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

const REQUEST_TYPES = [
  {
    id: 'access',
    label: 'Right to Access Summary (Section 11)',
    description: 'Request a summary of your personal data processed by Lex Minds and the identities of third-party processors.',
  },
  {
    id: 'correction',
    label: 'Right to Correction / Completion (Section 12)',
    description: 'Request update, rectification, or completion of inaccurate or outdated personal data.',
  },
  {
    id: 'erasure',
    label: 'Right to Erasure / Deletion (Section 12)',
    description: 'Request deletion ("Right to be Forgotten") of personal data no longer necessary for its initial purpose.',
  },
  {
    id: 'withdraw_consent',
    label: 'Right to Withdraw Consent (Section 6(4))',
    description: 'Revoke previously granted consent for processing personal or communication details.',
  },
  {
    id: 'nomination',
    label: 'Right to Nominate (Section 14)',
    description: 'Designate a nominee to exercise your statutory rights in the event of death or incapacity.',
  },
  {
    id: 'grievance',
    label: 'Grievance / Privacy Complaint (Section 13)',
    description: 'Lodge an official grievance regarding data handling before appealing to the Data Protection Board of India.',
  },
];

export default function RightsClient() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    requestType: 'Right to Access Summary (Section 11)',
    identifierRef: '',
    description: '',
    nomineeName: '',
    nomineeContact: '',
    affirmation: false,
    hp_field: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedDocket, setSubmittedDocket] = useState<{
    docketId: string;
    timestamp: string;
    message: string;
    slaNotice: string;
  } | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (errorMessage) setErrorMessage(null);
  };

  const handleOpenConsentSettings = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('dpdp-open-consent-settings'));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.fullName.trim()) {
      setErrorMessage('Please enter your full name as the Data Principal.');
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    if (formData.description.trim().length < 15) {
      setErrorMessage('Please provide specific details regarding your request (at least 15 characters).');
      return;
    }

    if (!formData.affirmation) {
      setErrorMessage('Please affirm the statutory declaration before submitting.');
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/privacy/rights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit rights request.');
      }

      setSubmittedDocket(data);
    } catch (err: any) {
      setErrorMessage(err.message || 'Network error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      <Breadcrumbs items={[{ name: 'Privacy Policy', href: '/privacy' }, { name: 'Data Principal Rights' }]} />

      {/* Header Banner */}
      <div className="space-y-4 border-b border-ink-900/15 dark:border-ink-700 pb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-royal-100 dark:bg-royal-950/60 border border-royal-300 dark:border-royal-800 text-royal-800 dark:text-royal-300 text-xs font-mono font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-royal-600 dark:text-royal-400" />
          <span>India DPDP Act 2023 &bull; Statutory Rights Portal</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-ink-950 dark:text-ink-50 tracking-tight">
          Data Principal Rights &amp; Redressal Center
        </h1>
        <p className="text-sm sm:text-base text-ink-700 dark:text-ink-300 max-w-3xl leading-relaxed">
          Under Sections 11, 12, 13, and 14 of India&apos;s <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong>, you as a Data Principal hold fundamental statutory rights over how Lex Minds processes, retains, or erases your personal data.
        </p>
      </div>

      {/* Interactive Quick Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-surface-light dark:bg-surface-dark border border-ink-900/15 dark:border-ink-700 flex flex-col justify-between space-y-3">
          <div>
            <span className="text-[11px] font-mono uppercase text-royal-600 dark:text-royal-400 font-bold">Withdraw Consent</span>
            <h3 className="font-serif font-bold text-sm text-ink-950 dark:text-ink-50 mt-1">Cookie &amp; Tracking Settings</h3>
            <p className="text-xs text-ink-600 dark:text-ink-400 mt-1">
              Instantly toggle analytics, performance, and functional permissions.
            </p>
          </div>
          <button
            type="button"
            onClick={handleOpenConsentSettings}
            className="inline-flex items-center space-x-1.5 text-xs font-mono font-semibold text-royal-600 dark:text-royal-400 hover:underline pt-2"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Launch Consent Manager &rarr;</span>
          </button>
        </div>

        <div className="p-4 bg-surface-light dark:bg-surface-dark border border-ink-900/15 dark:border-ink-700 flex flex-col justify-between space-y-3">
          <div>
            <span className="text-[11px] font-mono uppercase text-royal-600 dark:text-royal-400 font-bold">Section 13 Grievance</span>
            <h3 className="font-serif font-bold text-sm text-ink-950 dark:text-ink-50 mt-1">Grievance Redressal Desk</h3>
            <p className="text-xs text-ink-600 dark:text-ink-400 mt-1">
              Statutory acknowledgement within 48h; final determination within 30 days.
            </p>
          </div>
          <a
            href="mailto:lexmindsindia@gmail.com"
            className="inline-flex items-center space-x-1.5 text-xs font-mono font-semibold text-royal-600 dark:text-royal-400 hover:underline pt-2"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>lexmindsindia@gmail.com &rarr;</span>
          </a>
        </div>

        <div className="p-4 bg-surface-light dark:bg-surface-dark border border-ink-900/15 dark:border-ink-700 flex flex-col justify-between space-y-3">
          <div>
            <span className="text-[11px] font-mono uppercase text-royal-600 dark:text-royal-400 font-bold">Appellate Body</span>
            <h3 className="font-serif font-bold text-sm text-ink-950 dark:text-ink-50 mt-1">Data Protection Board of India</h3>
            <p className="text-xs text-ink-600 dark:text-ink-400 mt-1">
              Statutory recourse under Section 13(3) if your grievance is not resolved.
            </p>
          </div>
          <Link
            href="/privacy#grievance-escalation"
            className="inline-flex items-center space-x-1.5 text-xs font-mono font-semibold text-royal-600 dark:text-royal-400 hover:underline pt-2"
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Read DPBI Escalation Rules &rarr;</span>
          </Link>
        </div>
      </div>

      {/* Main Grid: Form (7 cols) + Overview Info (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Container (7 cols) */}
        <div className="lg:col-span-7 bg-surface-light dark:bg-surface-dark border-2 border-ink-950 dark:border-ink-700 p-6 sm:p-8 shadow-brutal space-y-6">
          <div className="border-b border-ink-900/10 dark:border-ink-800 pb-4">
            <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50">
              Submit Statutory Rights Request
            </h2>
            <p className="text-xs text-ink-600 dark:text-ink-400 mt-1">
              Fill out this docket form. An encrypted verification record will be generated.
            </p>
          </div>

          {submittedDocket ? (
            <div className="p-6 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 space-y-4 animate-in fade-in">
              <div className="flex items-center space-x-3 text-emerald-800 dark:text-emerald-200">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <h3 className="text-base font-serif font-bold">Request Docket Created Successfully</h3>
              </div>
              <div className="p-3 bg-paper dark:bg-ink-900 border border-emerald-300 dark:border-emerald-800 font-mono text-xs space-y-1">
                <p><strong>Docket Reference:</strong> <span className="text-royal-600 dark:text-royal-400">{submittedDocket.docketId}</span></p>
                <p><strong>Registered At:</strong> {submittedDocket.timestamp}</p>
                <p><strong>Status:</strong> Under Statutory Review</p>
              </div>
              <p className="text-xs text-ink-700 dark:text-ink-300 leading-relaxed">
                {submittedDocket.message}
              </p>
              <div className="p-3 bg-paper dark:bg-ink-900 border border-ink-900/10 text-[11px] font-mono text-ink-600 dark:text-ink-400">
                {submittedDocket.slaNotice}
              </div>
              <button
                type="button"
                onClick={() => setSubmittedDocket(null)}
                className="px-4 py-2 text-xs font-mono font-semibold border border-ink-950 dark:border-ink-400 hover:bg-paper-200 dark:hover:bg-ink-800"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Anti-spam honeypot */}
              <input 
                type="text" 
                name="hp_field" 
                value={formData.hp_field} 
                onChange={handleInputChange} 
                className="hidden" 
                tabIndex={-1} 
                autoComplete="off" 
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-ink-700 dark:text-ink-300 uppercase tracking-wider mb-1">
                    Data Principal Full Name <span className="text-coral-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Aditi Sharma"
                    className="w-full px-3 py-2.5 tactile-control text-ink-900 dark:text-ink-100 rounded-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-ink-700 dark:text-ink-300 uppercase tracking-wider mb-1">
                    Email Address <span className="text-coral-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="aditi@example.com"
                    className="w-full px-3 py-2.5 tactile-control text-ink-900 dark:text-ink-100 rounded-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-ink-700 dark:text-ink-300 uppercase tracking-wider mb-1">
                    Phone (Optional for verification)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2.5 tactile-control text-ink-900 dark:text-ink-100 rounded-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-ink-700 dark:text-ink-300 uppercase tracking-wider mb-1">
                    Reference ID (If applicable)
                  </label>
                  <input
                    type="text"
                    name="identifierRef"
                    value={formData.identifierRef}
                    onChange={handleInputChange}
                    placeholder="e.g. APP-..., PUB-..., or Ticket ID"
                    className="w-full px-3 py-2.5 tactile-control text-ink-900 dark:text-ink-100 rounded-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-ink-700 dark:text-ink-300 uppercase tracking-wider mb-1">
                  Statutory Right Exercised <span className="text-coral-500">*</span>
                </label>
                <select
                  name="requestType"
                  value={formData.requestType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 tactile-control text-ink-900 dark:text-ink-100 rounded-none bg-paper dark:bg-ink-800"
                >
                  {REQUEST_TYPES.map((rt) => (
                    <option key={rt.id} value={rt.label}>
                      {rt.label}
                    </option>
                  ))}
                </select>
              </div>

              {formData.requestType.includes('Nominate') && (
                <div className="p-3 bg-paper-100 dark:bg-ink-850 border border-ink-900/15 dark:border-ink-700 space-y-3">
                  <span className="font-mono font-bold text-[11px] text-royal-600 dark:text-royal-400 block">
                    Section 14 Nominee Details
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      name="nomineeName"
                      value={formData.nomineeName}
                      onChange={handleInputChange}
                      placeholder="Nominee Full Name"
                      className="px-3 py-2 tactile-control text-ink-900 dark:text-ink-100 text-xs rounded-none"
                    />
                    <input
                      type="text"
                      name="nomineeContact"
                      value={formData.nomineeContact}
                      onChange={handleInputChange}
                      placeholder="Nominee Email or Phone"
                      className="px-3 py-2 tactile-control text-ink-900 dark:text-ink-100 text-xs rounded-none"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block font-mono text-ink-700 dark:text-ink-300 uppercase tracking-wider mb-1">
                  Detailed Specifics of Request <span className="text-coral-500">*</span>
                </label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Clearly explain what data you wish to access, correct, or erase, or describe your grievance (min 15 characters)..."
                  className="w-full px-3 py-2.5 tactile-control text-ink-900 dark:text-ink-100 placeholder-ink-400 rounded-none"
                />
              </div>

              {/* Affirmation Checkbox */}
              <div className="p-3 bg-paper-100 dark:bg-ink-850 border border-ink-900/15 dark:border-ink-700">
                <label className="flex items-start space-x-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    name="affirmation"
                    checked={formData.affirmation}
                    onChange={handleInputChange}
                    className="mt-0.5 text-royal-600 focus:ring-royal-500 rounded-none"
                  />
                  <span className="text-[11px] text-ink-700 dark:text-ink-300 leading-relaxed">
                    I affirm that I am the Data Principal (or lawfully authorized representative) to whom this request relates. I understand that Lex Minds may undertake reasonable identity verification prior to fulfilling requests to prevent unauthorized disclosure under Section 8 of the DPDP Act.
                  </span>
                </label>
              </div>

              {errorMessage && (
                <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-500/30 text-rose-600 dark:text-rose-400 flex items-center space-x-2 font-mono">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 px-5 btn-brand-primary text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting Rights Docket...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Statutory Request</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Informational Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 space-y-4">
            <h3 className="font-serif font-bold text-base text-ink-950 dark:text-ink-50">
              Your Statutory Rights Under DPDP Act 2023
            </h3>
            
            <ul className="space-y-3 text-xs text-ink-700 dark:text-ink-300">
              <li className="flex items-start space-x-2.5">
                <UserCheck className="w-4 h-4 text-royal-600 dark:text-royal-400 shrink-0 mt-0.5" />
                <div>
                  <strong>Right to Access (Section 11):</strong> Request an itemized summary of your personal data processed, identities of sharing parties, and lawful purposes.
                </div>
              </li>
              <li className="flex items-start space-x-2.5">
                <Edit3 className="w-4 h-4 text-royal-600 dark:text-royal-400 shrink-0 mt-0.5" />
                <div>
                  <strong>Right to Correction (Section 12):</strong> Ensure that misleading, outdated, or incomplete academic or personal records are rectified.
                </div>
              </li>
              <li className="flex items-start space-x-2.5">
                <Trash2 className="w-4 h-4 text-coral-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Right to Erasure (Section 12):</strong> Request permanent deletion of your data once your internship cohort or query has concluded, unless statutory retention is required.
                </div>
              </li>
              <li className="flex items-start space-x-2.5">
                <UserPlus className="w-4 h-4 text-royal-600 dark:text-royal-400 shrink-0 mt-0.5" />
                <div>
                  <strong>Right to Nominate (Section 14):</strong> Designate another person to manage your rights and credentials in the event of incapacity.
                </div>
              </li>
            </ul>
          </div>

          {/* Grievance & Escalation Notice */}
          <div className="p-5 bg-royal-50/50 dark:bg-royal-950/20 border border-royal-200/60 dark:border-royal-800/40 text-xs space-y-2.5 font-mono">
            <div className="flex items-center space-x-2 text-royal-700 dark:text-royal-300 font-bold">
              <Scale className="w-4 h-4" />
              <span>Grievance Officer Information</span>
            </div>
            <p className="text-ink-700 dark:text-ink-300 leading-relaxed font-sans">
              <strong>Designated Officer:</strong> Grievance Redressal Officer (DPDP Compliance Desk), Lex Minds India.
            </p>
            <p className="text-ink-700 dark:text-ink-300 leading-relaxed font-sans">
              <strong>Official Email:</strong>{' '}
              <a href="mailto:lexmindsindia@gmail.com" className="text-royal-600 dark:text-royal-400 underline font-mono">
                lexmindsindia@gmail.com
              </a>
            </p>
            <p className="text-ink-600 dark:text-ink-400 leading-relaxed text-[11px] font-sans">
              <strong>Escalation to Data Protection Board:</strong> In the event you do not receive a resolution within thirty (30) days or are dissatisfied with the determination, you may register an electronic complaint with the Data Protection Board of India (DPB) as provided under Section 13(3) of the Act.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
