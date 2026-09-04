'use client';

import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Briefcase, 
  User, 
  GraduationCap, 
  FileText, 
  CreditCard,
  Building2,
  Sparkles,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { Internship } from '@/lib/types';
import GoogleAuthGate from './GoogleAuthGate';
import { User as FirebaseUser } from 'firebase/auth';

interface ApplicationModalProps {
  internship: Internship;
  isOpen: boolean;
  onClose: () => void;
}

export default function ApplicationModal({
  internship,
  isOpen,
  onClose
}: ApplicationModalProps) {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    collegeName: '',
    yearOfStudy: '4th Year (5-Year B.A. LL.B)',
    academicScore: '',
    sop: '',
    declaration: false,
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  if (!isOpen) return null;

  // Deadline check
  const isDeadlinePassed = new Date(internship.deadline) < new Date(new Date().toDateString());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateStep1 = () => {
    return formData.fullName.trim() !== '' && formData.phone.trim().length >= 10;
  };

  const validateStep2 = () => {
    return formData.collegeName.trim() !== '' && formData.academicScore.trim() !== '';
  };

  const validateStep3 = () => {
    return formData.sop.trim().length >= 30 && formData.declaration;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
    else if (step === 3 && validateStep3()) {
      handleSubmitAndPay();
    }
  };

  const handleSubmitAndPay = async () => {
    if (!validateStep3() || !authToken) return;
    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch('/api/applications/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          phone: formData.phone,
          collegeName: formData.collegeName,
          yearOfStudy: formData.yearOfStudy,
          academicScore: formData.academicScore,
          sop: formData.sop,
          declaration: formData.declaration,
          internshipKey: internship.slug || internship.id,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setSubmitError(data.error || 'Failed to submit application. Please try again.');
        setSubmitting(false);
        return;
      }

      window.location.href = data.paymentUrl;
    } catch (err: any) {
      setSubmitError(err.message || 'Error communicating with server.');
      setSubmitting(false);
    }
  };


  return (
    <>
      <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-slate-950/75 dark:bg-black/85 backdrop-blur-md animate-fade-in">
        <div className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-legal-950 border border-slate-200 dark:border-gold-500/30 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col transition-colors">
          
          {/* Header */}
          <div className="bg-slate-100 dark:bg-legal-900/80 px-6 py-4 border-b border-slate-200 dark:border-legal-800 flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gold-100 dark:bg-gold-950/80 border border-gold-500/40 flex items-center justify-center text-gold-700 dark:text-gold-400">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-serif font-bold text-slate-900 dark:text-white line-clamp-1">
                  {internship.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center space-x-1.5">
                  <Building2 className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400" />
                  <span>{internship.organization}</span>
                  <span>&bull;</span>
                  <span className="text-gold-700 dark:text-gold-300 font-semibold">Fee: ₹{internship.applicationFee}</span>
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-legal-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            {isDeadlinePassed ? (
              <div className="p-6 text-center space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-500/30 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-serif font-bold text-slate-900 dark:text-white">
                  Applications Closed
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                  The application deadline for this research fellowship closed on {internship.deadline}. Please explore our other upcoming cohorts.
                </p>
              </div>
            ) : (
              <GoogleAuthGate
                requireAuthBeforeRender={true}
                title="Google Account Verification Required"
                description="Sign in with your verified Google account. This links your official payment receipt to your enrollment record."
                onAuthStateChange={(user, token) => {
                  setCurrentUser(user);
                  setAuthToken(token);
                  if (user?.displayName && !formData.fullName) {
                    setFormData(prev => ({ ...prev, fullName: user.displayName || '' }));
                  }
                }}
              >
                {/* Step Indicators */}
                <div className="grid grid-cols-3 gap-2 border-b border-slate-200 dark:border-legal-800 pb-4 text-xs font-semibold">
                  <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-gold-700 dark:text-gold-400' : 'text-slate-400'}`}>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-gold-500 text-slate-950 font-bold' : 'bg-slate-200 dark:bg-legal-800'}`}>1</span>
                    <span>Applicant</span>
                  </div>
                  <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-gold-700 dark:text-gold-400' : 'text-slate-400'}`}>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-gold-500 text-slate-950 font-bold' : 'bg-slate-200 dark:bg-legal-800'}`}>2</span>
                    <span>Academics</span>
                  </div>
                  <div className={`flex items-center space-x-2 ${step >= 3 ? 'text-gold-700 dark:text-gold-400' : 'text-slate-400'}`}>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 3 ? 'bg-gold-500 text-slate-950 font-bold' : 'bg-slate-200 dark:bg-legal-800'}`}>3</span>
                    <span>Rationale &amp; Pay</span>
                  </div>
                </div>

                {/* Step 1: Applicant Details */}
                {step === 1 && (
                  <div className="space-y-4 animate-fade-in">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Verified Google Account
                      </label>
                      <input
                        type="text"
                        disabled
                        value={currentUser?.email || ''}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-legal-900 border border-slate-300 dark:border-legal-700 text-slate-500 text-xs font-mono cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Full Legal Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Adv. Rhea Chakraborty"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-legal-900 border border-slate-300 dark:border-legal-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-gold-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Phone Number (WhatsApp for updates) <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98300 12345"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-legal-900 border border-slate-300 dark:border-legal-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-gold-500"
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Academic Profile */}
                {step === 2 && (
                  <div className="space-y-4 animate-fade-in">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Law College / University <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="collegeName"
                        value={formData.collegeName}
                        onChange={handleChange}
                        placeholder="e.g. National Law University Odisha (NLUO)"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-legal-900 border border-slate-300 dark:border-legal-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-gold-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                          Current Year of Study <span className="text-rose-500">*</span>
                        </label>
                        <select
                          name="yearOfStudy"
                          value={formData.yearOfStudy}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-legal-900 border border-slate-300 dark:border-legal-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-gold-500"
                        >
                          <option>1st Year (5-Year B.A. LL.B / B.B.A. LL.B)</option>
                          <option>2nd Year (5-Year B.A. LL.B / B.B.A. LL.B)</option>
                          <option>3rd Year (3-Year or 5-Year LL.B)</option>
                          <option>4th Year (5-Year Integrated LL.B)</option>
                          <option>5th Year (Final Year Scholar)</option>
                          <option>LL.M / Postgraduate Scholar</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                          Academic Score / CGPA / Grade <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="academicScore"
                          value={formData.academicScore}
                          onChange={handleChange}
                          placeholder="e.g. 8.4 / 10.0 or 74%"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-legal-900 border border-slate-300 dark:border-legal-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-gold-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Rationale & Declaration */}
                {step === 3 && (
                  <div className="space-y-4 animate-fade-in">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Statement of Purpose &amp; Research Interest (Min 30 chars) <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        name="sop"
                        rows={4}
                        value={formData.sop}
                        onChange={handleChange}
                        placeholder="Detail your research focus, prior academic publications, or areas of jurisprudence you wish to specialize in during this fellowship..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-legal-900 border border-slate-300 dark:border-legal-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-gold-500"
                      />
                      <p className="text-[10px] text-slate-400 text-right mt-0.5">
                        {formData.sop.length}/30 characters minimum
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-legal-900/60 border border-slate-200 dark:border-legal-800 space-y-2">
                      <label className="flex items-start space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="declaration"
                          checked={formData.declaration}
                          onChange={handleChange}
                          className="mt-0.5 rounded border-slate-300 text-gold-500 focus:ring-gold-500"
                        />
                        <span className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                          I confirm that all details provided are accurate. I understand that completion certificates are issued strictly upon verified completion of assigned research milestones, and this enrollment fee covers processing and editorial coordination.
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                {submitError && (
                  <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-500/30 text-xs text-rose-600 dark:text-rose-400 flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-legal-800">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      disabled={submitting}
                      className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center space-x-1 disabled:opacity-50"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                  ) : <div />}

                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={
                      submitting ||
                      (step === 1 && !validateStep1()) ||
                      (step === 2 && !validateStep2()) ||
                      (step === 3 && !validateStep3())
                    }
                    className="px-6 py-2.5 bg-slate-900 dark:bg-gold-500 hover:bg-slate-800 dark:hover:bg-gold-400 text-white dark:text-slate-950 text-xs font-bold uppercase tracking-wider rounded-xl transition-all disabled:opacity-50 flex items-center space-x-1.5 shadow-md"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Redirecting to Payment...</span>
                      </>
                    ) : (
                      <>
                        <span>{step === 3 ? `Pay ₹${internship.applicationFee} & Submit` : 'Continue'}</span>
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </GoogleAuthGate>
            )}
          </div>

        </div>
      </div>
    </>
  );
}

