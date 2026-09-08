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
  User, 
  Phone, 
  GraduationCap, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check,
  FileText,
  Tag
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

const INQUIRY_CATEGORIES = [
  'Internship & Research Fellowship',
  'Article Submission & Peer Review',
  'Certificate & Credential Verification',
  'Academic Partnership & Campus Outreach',
  'General Inquiry & Support',
];

export default function ContactClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    institution: '',
    category: 'Internship & Research Fellowship',
    subject: '',
    message: '',
    hp_website: '', // Honeypot field for bot suppression
  });

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedTicket, setSubmittedTicket] = useState<{
    ticketId: string;
    email: string;
    subject: string;
    createdAt: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Client-side quick validations
    if (!formData.name.trim()) {
      setErrorMessage('Please provide your full name.');
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!formData.subject.trim()) {
      setErrorMessage('Please enter a subject line for your inquiry.');
      return;
    }

    if (formData.message.trim().length < 10) {
      setErrorMessage('Please enter an inquiry message with at least 10 characters.');
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to register inquiry ticket. Please try again.');
      }

      setSubmittedTicket({
        ticketId: data.ticketId,
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        createdAt: data.createdAt || new Date().toISOString(),
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        institution: '',
        category: 'Internship & Research Fellowship',
        subject: '',
        message: '',
        hp_website: '',
      });
    } catch (err: any) {
      console.error('[Contact Form Submission Error]:', err);
      setErrorMessage(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopyTicket = () => {
    if (!submittedTicket) return;
    navigator.clipboard.writeText(submittedTicket.ticketId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    {
      q: 'How does Lex Minds structure and evaluate fellowship cohorts?',
      a: 'Fellowships are structured by senior student editors. Fellows receive directed guidance in statutory interpretation, case digest drafting, and citation standardization under OSCOLA and Bluebook rules.',
    },
    {
      q: 'What is the standard turnaround time for article submissions?',
      a: 'Initial manuscript intake screening takes 3-5 business days. Evaluation by the student editorial board takes 7-10 business days, after which authors receive written editorial notes and publication decisions.',
    },
    {
      q: 'Are certificates of publication and fellowship credentials verifiable by universities?',
      a: 'Yes. Every publication docket and fellowship completion letter issued via Lex Minds contains a unique, tamper-evident alphanumeric reference code verifiable with our academic desk.',
    },
    {
      q: 'How are evaluation and application fees processed?',
      a: 'All fees are securely processed via Razorpay with instant support for UPI (Google Pay, PhonePe, Paytm), Debit/Credit Cards, and Net Banking with immediate receipt generation.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ name: 'Academic Desk & Inquiries', href: '/contact' }]} />

      {/* Header */}
      <div className="border-b border-ink-900/15 dark:border-ink-700 pb-8 space-y-3">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-royal-500 dark:text-royal-400">
          Editorial &amp; Student Operations &bull; Inquiries
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-ink-950 dark:text-ink-50 tracking-tight">
          Academic Correspondence Desk
        </h1>
        <p className="text-base text-ink-600 dark:text-ink-300 max-w-2xl leading-relaxed font-normal">
          Reach our student editorial council and fellowship coordinators. Inquiries submitted below are logged directly into our ContactTickets registry.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
        
        {/* Left: Native Contact Form or Success Confirmation (7 Cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 shadow-brutal">
          
          {submittedTicket ? (
            /* Success State Docket Card */
            <div className="space-y-6 animate-editorial-reveal">
              <div className="flex items-center space-x-3 text-emerald-700 dark:text-emerald-400 pb-4 border-b border-ink-900/10 dark:border-ink-800">
                <CheckCircle2 className="w-6 h-6 shrink-0" />
                <div>
                  <h2 className="text-base font-serif font-bold text-ink-950 dark:text-ink-50">
                    Docket Transmitted Successfully
                  </h2>
                  <p className="text-xs font-mono text-ink-500 dark:text-ink-400">
                    Your inquiry has been logged into the Lex Minds Academic Communications Desk.
                  </p>
                </div>
              </div>

              {/* Docket Metadata Box */}
              <div className="p-4 rounded-sm bg-paper-100 dark:bg-ink-900/60 border border-ink-900/10 dark:border-ink-800 space-y-2.5 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-ink-500 dark:text-ink-400">TICKET IDENTIFIER:</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-royal-600 dark:text-royal-400 select-all">
                      {submittedTicket.ticketId}
                    </span>
                    <button
                      onClick={handleCopyTicket}
                      className="p-1 hover:bg-paper-200 dark:hover:bg-ink-800 rounded transition-colors text-ink-600 dark:text-ink-300"
                      title="Copy Ticket ID"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-ink-500 dark:text-ink-400">REGISTRATION EMAIL:</span>
                  <span className="text-ink-900 dark:text-ink-100 font-semibold">{submittedTicket.email}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-ink-500 dark:text-ink-400">TIMESTAMP:</span>
                  <span className="text-ink-700 dark:text-ink-300">
                    {new Date(submittedTicket.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-xs text-ink-700 dark:text-ink-300 leading-relaxed font-normal">
                <p>
                  A member of our editorial or student operations team will review your inquiry and follow up at{' '}
                  <strong className="text-ink-950 dark:text-ink-50 font-semibold">{submittedTicket.email}</strong>{' '}
                  within 24–48 business hours.
                </p>
                <p className="font-mono text-[11px] text-ink-500 dark:text-ink-400">
                  Please quote docket reference <strong>{submittedTicket.ticketId}</strong> in all follow-up correspondence.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setSubmittedTicket(null)}
                  className="px-4 py-2.5 text-xs font-mono tactile-control rounded-sm text-ink-800 dark:text-ink-200 hover:text-royal-500 transition-colors"
                >
                  &larr; Submit Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            /* Inquiry Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {errorMessage && (
                <div className="p-3.5 rounded-sm bg-crimson-50 dark:bg-crimson-950/40 border border-crimson-500/30 text-xs text-crimson-700 dark:text-crimson-400 flex items-center space-x-2 font-mono">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Honeypot hidden input */}
              <input
                type="text"
                name="hp_website"
                tabIndex={-1}
                autoComplete="off"
                value={formData.hp_website}
                onChange={handleInputChange}
                className="hidden"
                aria-hidden="true"
              />

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label 
                    htmlFor="contact-name" 
                    className="block text-xs font-mono font-bold uppercase tracking-wider text-ink-800 dark:text-ink-200"
                  >
                    Full Name <span className="text-crimson-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-ink-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      placeholder="e.g., Adv. Aarav Sharma"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm tactile-control rounded-sm bg-paper-50 dark:bg-ink-900 border border-ink-900/20 dark:border-ink-700 text-ink-950 dark:text-ink-50 placeholder-ink-400 focus:outline-none focus:border-royal-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label 
                    htmlFor="contact-email" 
                    className="block text-xs font-mono font-bold uppercase tracking-wider text-ink-800 dark:text-ink-200"
                  >
                    Email Address <span className="text-crimson-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-ink-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      placeholder="aarav.sharma@nlu.ac.in"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm tactile-control rounded-sm bg-paper-50 dark:bg-ink-900 border border-ink-900/20 dark:border-ink-700 text-ink-950 dark:text-ink-50 placeholder-ink-400 focus:outline-none focus:border-royal-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Phone & Institution */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label 
                    htmlFor="contact-phone" 
                    className="block text-xs font-mono font-bold uppercase tracking-wider text-ink-800 dark:text-ink-200"
                  >
                    Phone / WhatsApp <span className="text-[10px] text-ink-400 lowercase font-normal">(optional)</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-ink-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm tactile-control rounded-sm bg-paper-50 dark:bg-ink-900 border border-ink-900/20 dark:border-ink-700 text-ink-950 dark:text-ink-50 placeholder-ink-400 focus:outline-none focus:border-royal-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label 
                    htmlFor="contact-institution" 
                    className="block text-xs font-mono font-bold uppercase tracking-wider text-ink-800 dark:text-ink-200"
                  >
                    Law School / Organization <span className="text-[10px] text-ink-400 lowercase font-normal">(optional)</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-ink-400">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <input
                      id="contact-institution"
                      type="text"
                      name="institution"
                      placeholder="e.g., NLSIU Bangalore / High Court Chamber"
                      value={formData.institution}
                      onChange={handleInputChange}
                      className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm tactile-control rounded-sm bg-paper-50 dark:bg-ink-900 border border-ink-900/20 dark:border-ink-700 text-ink-950 dark:text-ink-50 placeholder-ink-400 focus:outline-none focus:border-royal-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Inquiry Category */}
              <div className="space-y-1.5">
                <label 
                  htmlFor="contact-category" 
                  className="block text-xs font-mono font-bold uppercase tracking-wider text-ink-800 dark:text-ink-200"
                >
                  Inquiry Category <span className="text-crimson-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-ink-400">
                    <Tag className="w-4 h-4" />
                  </div>
                  <select
                    id="contact-category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full pl-9 pr-8 py-2.5 text-xs sm:text-sm tactile-control rounded-sm bg-paper-50 dark:bg-ink-900 border border-ink-900/20 dark:border-ink-700 text-ink-950 dark:text-ink-50 focus:outline-none focus:border-royal-500 transition-colors cursor-pointer appearance-none"
                  >
                    {INQUIRY_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-ink-400">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Subject Line */}
              <div className="space-y-1.5">
                <label 
                  htmlFor="contact-subject" 
                  className="block text-xs font-mono font-bold uppercase tracking-wider text-ink-800 dark:text-ink-200"
                >
                  Subject Line <span className="text-crimson-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-ink-400">
                    <FileText className="w-4 h-4" />
                  </div>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    required
                    placeholder="e.g., Query regarding eligibility criteria for Spring 2026 fellowship"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm tactile-control rounded-sm bg-paper-50 dark:bg-ink-900 border border-ink-900/20 dark:border-ink-700 text-ink-950 dark:text-ink-50 placeholder-ink-400 focus:outline-none focus:border-royal-500 transition-colors"
                  />
                </div>
              </div>

              {/* Detailed Message */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label 
                    htmlFor="contact-message" 
                    className="block text-xs font-mono font-bold uppercase tracking-wider text-ink-800 dark:text-ink-200"
                  >
                    Detailed Inquiry Message <span className="text-crimson-500">*</span>
                  </label>
                  <span className="text-[11px] font-mono text-ink-400">
                    {formData.message.length} characters
                  </span>
                </div>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Please provide complete context regarding your inquiry, application reference (if applicable), or institutional proposition..."
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full p-3 text-xs sm:text-sm tactile-control rounded-sm bg-paper-50 dark:bg-ink-900 border border-ink-900/20 dark:border-ink-700 text-ink-950 dark:text-ink-50 placeholder-ink-400 focus:outline-none focus:border-royal-500 transition-colors leading-relaxed"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-6 py-3 text-xs sm:text-sm font-semibold btn-brand-primary inline-flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting Docket to Sheets...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Inquiry</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

        {/* Right Info (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Operations & Communications Desk Info */}
          <div className="p-6 sm:p-8 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 space-y-4 text-xs shadow-brutal">
            <h3 className="text-lg font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2">
              <Building className="w-4 h-4 text-royal-500" />
              <span>Operations &amp; Communications</span>
            </h3>

            <div className="space-y-3 text-ink-700 dark:text-ink-300">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-royal-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-ink-950 dark:text-ink-50 block font-mono text-[11px] uppercase">Operations:</strong>
                  <span>Digital Editorial &bull; Online Operations (Pan-India)</span>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <Mail className="w-4 h-4 text-royal-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-ink-950 dark:text-ink-50 block font-mono text-[11px] uppercase">Primary Email:</strong>
                  <a 
                    href="mailto:lexmindsindia@gmail.com" 
                    className="block font-mono text-xs mt-0.5 text-royal-600 dark:text-royal-400 font-bold hover:underline"
                  >
                    lexmindsindia@gmail.com
                  </a>
                  <span className="block text-[11px] text-ink-500 dark:text-ink-400 mt-0.5">
                    For fellowship programmes, manuscript submissions, and general inquiries.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Academic Integrity & Feedback */}
          <div className="p-6 sm:p-8 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 space-y-3 text-xs text-ink-700 dark:text-ink-300 shadow-brutal">
            <h4 className="font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2 text-base">
              <Shield className="w-4 h-4 text-royal-500" />
              <span>Integrity &amp; Editorial Desk</span>
            </h4>
            <p className="text-xs text-ink-600 dark:text-ink-400 leading-relaxed font-normal">
              Authors and readers wishing to submit citation corrections, academic feedback, or inquiries may write directly to:
            </p>
            <div className="p-3.5 bg-paper dark:bg-ink-850 border border-ink-900/15 dark:border-ink-700 space-y-1 text-xs font-mono rounded-sm">
              <div className="font-semibold text-royal-600 dark:text-royal-400">Lex Minds &bull; Student Editorial Team</div>
              <div className="text-ink-600 dark:text-ink-400">
                Email:{' '}
                <a href="mailto:lexmindsindia@gmail.com" className="text-royal-600 dark:text-royal-400 underline">
                  lexmindsindia@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Response Standards */}
          <div className="p-5 bg-paper dark:bg-ink-850 border border-ink-900/15 dark:border-ink-700 text-xs space-y-1.5 rounded-sm">
            <span className="font-serif font-bold text-ink-950 dark:text-ink-50 text-sm block">
              Response Standards
            </span>
            <p className="text-xs text-ink-600 dark:text-ink-400 leading-relaxed font-normal">
              Inquiries submitted through this registry are logged into our Google Sheets registry and reviewed during regular academic desk hours. Editorial responses are typically issued within 24 to 48 business hours.
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
