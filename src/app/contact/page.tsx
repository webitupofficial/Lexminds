'use client';

import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Phone, 
  Shield, 
  Send, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp,
  Sparkles,
  Building
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Internship Placement Query',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
          Reach our editorial desk, placement coordination team, or statutory grievance officer.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
        
        {/* Left Form (7 Cols) */}
        <div className="lg:col-span-7 neumorph-card rounded-3xl p-6 sm:p-8 space-y-6">
          
          <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <Mail className="w-5 h-5 text-gold-700 dark:text-gold-400" />
            <span>Send Us an Inquiry</span>
          </h2>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Adv. / Student Name"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-legal-950 border border-slate-200 dark:border-legal-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs focus:outline-none focus:border-gold-500 neumorph-inset"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@college.edu.in"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-legal-950 border border-slate-200 dark:border-legal-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs focus:outline-none focus:border-gold-500 neumorph-inset"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Query Nature / Category
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-legal-950 border border-slate-200 dark:border-legal-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-gold-500 neumorph-inset"
                >
                  <option value="Internship Placement Query">Internship Placement &amp; Chamber Query</option>
                  <option value="Editorial & Journal Query">Editorial &amp; Journal Publication Query</option>
                  <option value="Campus Ambassador Program">Campus Ambassador / Law Society Partnership</option>
                  <option value="Grievance Redressal">Statutory Grievance Redressal</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Message / Details <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Detail your query or institutional request..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-legal-950 border border-slate-200 dark:border-legal-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs focus:outline-none focus:border-gold-500 neumorph-inset resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm dark:shadow-glow-gold transition-all flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          ) : (
            <div className="text-center py-8 space-y-3 neumorph-card rounded-2xl p-6 border border-emerald-500/30">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto" />
              <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-white">Inquiry Transmitted</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Our support desk has received your request. A designated desk associate will respond to <strong>{formData.email}</strong> within 24 business hours.
              </p>
            </div>
          )}

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
