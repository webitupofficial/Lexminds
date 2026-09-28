'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Trophy, 
  ShieldCheck, 
  HelpCircle, 
  User, 
  Phone, 
  Building2, 
  GraduationCap, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Lock, 
  ArrowRight, 
  Sparkles,
  Award,
  Globe,
  Check
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import GoogleAuthGate from '@/components/GoogleAuthGate';
import { User as FirebaseUser } from 'firebase/auth';

export default function QuizClient() {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    collegeName: '',
    yearOfStudy: '1st Year (5-Year Integrated)',
    declaration: false,
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const yearOptions = [
    '1st Year (5-Year Integrated)',
    '2nd Year (5-Year Integrated)',
    '3rd Year (5-Year Integrated)',
    '4th Year (5-Year Integrated)',
    '5th Year (5-Year Integrated)',
    '1st Year (3-Year LL.B)',
    '2nd Year (3-Year LL.B)',
    '3rd Year (3-Year LL.B)',
    'LL.M Candidate',
    'Law Aspirant / Student Interested in Law',
    'Recent Graduate / Other',
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const isPhoneValid = formData.phone.trim().replace(/\D/g, '').length >= 10;

  const isFormValid = () => {
    return (
      Boolean(currentUser) &&
      Boolean(authToken) &&
      formData.fullName.trim().length > 0 &&
      isPhoneValid &&
      formData.collegeName.trim().length > 0 &&
      formData.yearOfStudy.trim().length > 0 &&
      formData.declaration
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid() || !authToken) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          phone: formData.phone.trim(),
          collegeName: formData.collegeName.trim(),
          yearOfStudy: formData.yearOfStudy.trim(),
          declaration: formData.declaration,
          quizKey: 'lexminds-virtual-quiz-2026',
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setSubmitError(data.error || 'Failed to submit quiz registration. Please try again.');
        setSubmitting(false);
        return;
      }

      // Redirect directly to the authoritative Razorpay checkout page
      window.location.href = data.paymentUrl;
    } catch (err: any) {
      setSubmitError(err.message || 'Error communicating with server.');
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ name: 'Virtual Quiz', href: '/quiz' }]} />

      {/* Header Banner */}
      <div className="p-6 sm:p-10 md:p-12 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 shadow-brutal space-y-6">
        
        {/* Category & Status Pill */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-sm bg-royal-50 dark:bg-royal-950/40 border border-royal-200 dark:border-royal-800 text-royal-600 dark:text-royal-400 font-bold uppercase tracking-wider text-[11px]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Virtual Competition &bull; 2026 Edition</span>
          </div>

          <div className="flex items-center space-x-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Registrations Open</span>
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-ink-950 dark:text-ink-50 tracking-tight leading-tight">
            Register for the <span className="text-royal-500 dark:text-royal-400">LexMinds Virtual Quiz</span>
          </h1>
          <p className="text-sm sm:text-base text-ink-600 dark:text-ink-300 leading-relaxed max-w-2xl font-normal">
            Complete your registration and pay the <strong className="text-royal-600 dark:text-royal-400 font-bold">₹19</strong> registration fee to participate in the quiz. Test your knowledge, compete with fellow legal scholars, and earn official recognition.
          </p>
        </div>

        {/* Quick Facts Ledger Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-ink-900/10 dark:border-ink-800 text-xs font-mono">
          <div className="p-3 sm:p-4 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700">
            <span className="text-ink-500 dark:text-ink-400 block text-[10px] uppercase">Format</span>
            <span className="font-semibold text-ink-950 dark:text-ink-50 mt-1 block flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-royal-500" />
              Online Quiz
            </span>
          </div>
          <div className="p-3 sm:p-4 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700">
            <span className="text-ink-500 dark:text-ink-400 block text-[10px] uppercase">Eligibility</span>
            <span className="font-semibold text-ink-950 dark:text-ink-50 mt-1 block">All Students</span>
          </div>
          <div className="p-3 sm:p-4 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700">
            <span className="text-ink-500 dark:text-ink-400 block text-[10px] uppercase">Registration Fee</span>
            <div className="flex items-baseline space-x-1.5 mt-1">
              <span className="font-bold text-royal-600 dark:text-royal-400 text-sm">₹19.00</span>
              <span className="line-through text-ink-400 text-[11px]">₹99</span>
            </div>
          </div>
          <div className="p-3 sm:p-4 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700">
            <span className="text-ink-500 dark:text-ink-400 block text-[10px] uppercase">Recognition</span>
            <span className="font-semibold text-ink-950 dark:text-ink-50 mt-1 block flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              Certificates
            </span>
          </div>
        </div>

      </div>

      {/* Main Registration Form Card */}
      <div className="p-6 sm:p-10 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 shadow-brutal space-y-6">
        
        <div className="border-b border-ink-900/15 dark:border-ink-700 pb-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-sm bg-royal-50 dark:bg-royal-950/50 border border-royal-200 dark:border-royal-800 flex items-center justify-center text-royal-600 dark:text-royal-400 shrink-0">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-ink-950 dark:text-ink-50">
                Participant Registration
              </h2>
              <p className="text-xs text-ink-500 dark:text-ink-400 font-mono">
                Fill in your details below. Google verification is required to generate your participant docket.
              </p>
            </div>
          </div>
        </div>

        <GoogleAuthGate
          requireAuthBeforeRender={true}
          title="Google Account Verification Required"
          description="Sign in with your verified Google account to authenticate your quiz entry and receive your participation access link."
          onAuthStateChange={(user, token) => {
            setCurrentUser(user);
            setAuthToken(token);
            if (user?.displayName && !formData.fullName) {
              setFormData((prev) => ({ ...prev, fullName: user.displayName || '' }));
            }
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-6 animate-editorial-reveal">
            
            {/* Field 1: Verified Google Email (Read-Only) */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-ink-700 dark:text-ink-300 uppercase tracking-wider">
                Verified Google Email <span className="text-emerald-600 dark:text-emerald-400 font-bold">(Authoritative)</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  disabled
                  value={currentUser?.email || ''}
                  className="w-full px-3.5 py-3 bg-paper-200 dark:bg-ink-900 border border-ink-900/20 dark:border-ink-700 text-ink-600 dark:text-ink-400 text-xs font-mono cursor-not-allowed select-none pl-9"
                />
                <Lock className="w-4 h-4 text-ink-400 absolute left-3 top-3.5" />
              </div>
              <p className="text-[11px] text-ink-500 dark:text-ink-400 font-mono">
                Your quiz link and results docket will be dispatched to this authenticated address.
              </p>
            </div>

            {/* Field 2: Full Legal Name */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-ink-700 dark:text-ink-300 uppercase tracking-wider">
                Full Legal Name <span className="text-coral-500 font-bold">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Adv. Rhea Chakraborty"
                  className="w-full px-3.5 py-3 tactile-control text-ink-900 dark:text-ink-100 placeholder-ink-400 text-xs rounded-none pl-9"
                />
                <User className="w-4 h-4 text-ink-400 absolute left-3 top-3.5" />
              </div>
              {formData.fullName.trim().length === 0 && (
                <p className="text-[11px] text-ink-400 font-mono">
                  Name as it should appear on your Certificate of Participation.
                </p>
              )}
            </div>

            {/* Field 3: Phone Number */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-ink-700 dark:text-ink-300 uppercase tracking-wider">
                Phone Number (WhatsApp for updates) <span className="text-coral-500 font-bold">*</span>
              </label>
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98300 12345"
                  className="w-full px-3.5 py-3 tactile-control text-ink-900 dark:text-ink-100 placeholder-ink-400 text-xs rounded-none pl-9"
                />
                <Phone className="w-4 h-4 text-ink-400 absolute left-3 top-3.5" />
              </div>
              {!isPhoneValid && formData.phone.length > 0 ? (
                <p className="text-[11px] text-rose-600 dark:text-rose-400 font-mono">
                  Please provide a valid 10-digit phone number.
                </p>
              ) : (
                <p className="text-[11px] text-ink-400 font-mono">
                  Quiz timing reminders will be communicated via WhatsApp/SMS.
                </p>
              )}
            </div>

            {/* Field 4: College / Institution */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-ink-700 dark:text-ink-300 uppercase tracking-wider">
                College / Institution Name <span className="text-coral-500 font-bold">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="collegeName"
                  required
                  value={formData.collegeName}
                  onChange={handleChange}
                  placeholder="e.g. National Law University Odisha (NLUO)"
                  className="w-full px-3.5 py-3 tactile-control text-ink-900 dark:text-ink-100 placeholder-ink-400 text-xs rounded-none pl-9"
                />
                <Building2 className="w-4 h-4 text-ink-400 absolute left-3 top-3.5" />
              </div>
            </div>

            {/* Field 5: Year of Study / Eligibility */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-ink-700 dark:text-ink-300 uppercase tracking-wider">
                Year of Study / Academic Eligibility <span className="text-coral-500 font-bold">*</span>
              </label>
              <div className="relative">
                <select
                  name="yearOfStudy"
                  value={formData.yearOfStudy}
                  onChange={handleChange}
                  className="w-full px-3.5 py-3 tactile-control text-ink-900 dark:text-ink-100 text-xs rounded-none bg-paper dark:bg-ink-800 pl-9"
                >
                  {yearOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <GraduationCap className="w-4 h-4 text-ink-400 absolute left-3 top-3.5" />
              </div>
            </div>

            {/* Field 6: Required Quiz Declaration */}
            <div className="p-4 bg-paper-100 dark:bg-ink-850 border border-ink-900/15 dark:border-ink-700 space-y-3">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="declaration"
                  checked={formData.declaration}
                  onChange={handleChange}
                  className="mt-0.5 w-4 h-4 text-coral-500 focus:ring-vermilion rounded-none cursor-pointer"
                />
                <span className="text-xs text-ink-700 dark:text-ink-300 leading-relaxed font-normal">
                  <strong>I confirm that the information provided is correct and agree to follow the quiz rules announced by LexMinds.</strong> I have also read and agree to the{' '}
                  <Link href="/terms" target="_blank" className="text-royal-600 dark:text-royal-400 underline font-semibold">
                    Terms &amp; Conditions
                  </Link>,{' '}
                  <Link href="/privacy" target="_blank" className="text-royal-600 dark:text-royal-400 underline font-semibold">
                    Privacy Policy
                  </Link>, and{' '}
                  <Link href="/cancellation-refund-policy" target="_blank" className="text-royal-600 dark:text-royal-400 underline font-semibold">
                    Cancellation &amp; Refund Policy
                  </Link>.
                </span>
              </label>
            </div>

            {/* Error Display */}
            {submitError && (
              <div className="p-3.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-500/30 text-xs text-rose-600 dark:text-rose-400 flex items-center space-x-2.5 font-mono">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            {/* Submission CTA */}
            <div className="pt-2 space-y-3">
              <button
                type="submit"
                disabled={submitting || !isFormValid()}
                className="w-full py-4 px-6 btn-brand-primary text-sm uppercase font-semibold tracking-wider flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Redirecting to Payment...</span>
                  </>
                ) : (
                  <>
                    <span>Pay ₹19 &amp; Complete Registration</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs font-mono text-ink-500 dark:text-ink-400 text-center">
                <div className="flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Razorpay Secure 256-bit SSL</span>
                </div>
                <span>&bull;</span>
                <span>Immediate Registration Receipt</span>
              </div>
            </div>

          </form>
        </GoogleAuthGate>

      </div>

      {/* Quiz Rules & Highlights Section */}
      <div className="p-6 sm:p-8 rounded-sm bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 space-y-4">
        <h3 className="font-serif font-bold text-base text-ink-950 dark:text-ink-50 flex items-center space-x-2">
          <HelpCircle className="w-4 h-4 text-royal-500" />
          <span>Competition Guidelines &amp; Highlights</span>
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-ink-600 dark:text-ink-300 font-normal leading-relaxed">
          <li className="flex items-start space-x-2">
            <Check className="w-3.5 h-3.5 text-royal-500 shrink-0 mt-0.5" />
            <span>Virtual online format accessible from phone or laptop.</span>
          </li>
          <li className="flex items-start space-x-2">
            <Check className="w-3.5 h-3.5 text-royal-500 shrink-0 mt-0.5" />
            <span>Covers constitutional law, landmark judgments, and contemporary jurisprudence.</span>
          </li>
          <li className="flex items-start space-x-2">
            <Check className="w-3.5 h-3.5 text-royal-500 shrink-0 mt-0.5" />
            <span>E-Certificates of Participation for all verified participants.</span>
          </li>
          <li className="flex items-start space-x-2">
            <Check className="w-3.5 h-3.5 text-royal-500 shrink-0 mt-0.5" />
            <span>Merit recognition for top performers on LexMinds platforms.</span>
          </li>
        </ul>
      </div>

    </div>
  );
}
