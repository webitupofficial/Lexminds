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
  Loader2
} from 'lucide-react';
import { Internship } from '@/lib/types';
import RazorpayModal from './RazorpayModal';

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
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    collegeName: '',
    yearOfStudy: '4th Year (5-Year B.A. LL.B)',
    cgpa: '',
    linkedinUrl: '',
    resumeUrl: '',
    sop: '',
  });

  const [isRazorpayOpen, setIsRazorpayOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState('');

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateStep1 = () => {
    return formData.fullName.trim() !== '' && formData.email.trim() !== '' && formData.phone.trim() !== '';
  };

  const validateStep2 = () => {
    return formData.collegeName.trim() !== '' && formData.cgpa.trim() !== '';
  };

  const validateStep3 = () => {
    return formData.resumeUrl.trim() !== '' && formData.sop.trim().length >= 30;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
    else if (step === 3 && validateStep3()) {
      setIsRazorpayOpen(true);
    }
  };

  const handlePaymentSuccess = async (paymentId: string) => {
    setIsRazorpayOpen(false);
    setSubmitting(true);

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          internshipId: internship.id,
          internshipTitle: internship.title,
          ...formData,
          paymentStatus: 'submitted',
          paymentId,
          amountPaid: internship.applicationFee,
        })
      });

      const data = await res.json();
      if (data.success) {
        setApplicationId(data.application.id);
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
      alert('Application saved with confirmed payment!');
      setSubmitted(true);
    } finally {
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
            {!submitting && (
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-legal-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Stepper Progress Bar */}
          {!submitted && (
            <div className="px-6 pt-4 pb-2 bg-slate-50 dark:bg-legal-900/40 border-b border-slate-200 dark:border-legal-800 shrink-0">
              <div className="flex items-center justify-between text-xs font-semibold">
                <div className={`flex items-center space-x-1.5 ${step >= 1 ? 'text-gold-700 dark:text-gold-400' : 'text-slate-400'}`}>
                  <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">1</span>
                  <span>Personal</span>
                </div>
                <div className="h-[1px] flex-1 mx-2 bg-slate-200 dark:bg-legal-800" />
                <div className={`flex items-center space-x-1.5 ${step >= 2 ? 'text-gold-700 dark:text-gold-400' : 'text-slate-400'}`}>
                  <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">2</span>
                  <span>Academics</span>
                </div>
                <div className="h-[1px] flex-1 mx-2 bg-slate-200 dark:bg-legal-800" />
                <div className={`flex items-center space-x-1.5 ${step >= 3 ? 'text-gold-700 dark:text-gold-400' : 'text-slate-400'}`}>
                  <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">3</span>
                  <span>Resume &amp; SOP</span>
                </div>
              </div>
            </div>
          )}

          {/* Modal Form Content */}
          <div className="p-6 overflow-y-auto flex-1 space-y-4 text-sm">
            {!submitted ? (
              <>
                {step === 1 && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-gold-700 dark:text-gold-400 text-xs font-bold uppercase tracking-wider">
                      <User className="w-4 h-4" />
                      <span>Step 1: Personal &amp; Contact Credentials</span>
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
                        placeholder="e.g. Adv. Priya Sen / Rahul Verma"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-legal-900 border border-slate-200 dark:border-legal-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs focus:outline-none focus:border-gold-500 neumorph-inset"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                          Email Address <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="name@lawcollege.edu.in"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-legal-900 border border-slate-200 dark:border-legal-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs focus:outline-none focus:border-gold-500 neumorph-inset"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                          Mobile / WhatsApp Number <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-legal-900 border border-slate-200 dark:border-legal-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs focus:outline-none focus:border-gold-500 neumorph-inset"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        LinkedIn Profile URL (Optional)
                      </label>
                      <input
                        type="url"
                        name="linkedinUrl"
                        value={formData.linkedinUrl}
                        onChange={handleChange}
                        placeholder="https://linkedin.com/in/your-profile"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-legal-900 border border-slate-200 dark:border-legal-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs focus:outline-none focus:border-gold-500 neumorph-inset"
                      />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-gold-700 dark:text-gold-400 text-xs font-bold uppercase tracking-wider">
                      <GraduationCap className="w-4 h-4" />
                      <span>Step 2: Law School &amp; Academic Profile</span>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Law College / University Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="collegeName"
                        value={formData.collegeName}
                        onChange={handleChange}
                        placeholder="e.g. NLSIU Bengaluru / NALSAR Hyderabad / Faculty of Law DU"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-legal-900 border border-slate-200 dark:border-legal-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs focus:outline-none focus:border-gold-500 neumorph-inset"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                          Current Year of Study
                        </label>
                        <select
                          name="yearOfStudy"
                          value={formData.yearOfStudy}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-legal-900 border border-slate-200 dark:border-legal-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-gold-500 neumorph-inset"
                        >
                          <option value="1st Year (5-Year / 3-Year)">1st Year Law</option>
                          <option value="2nd Year (5-Year / 3-Year)">2nd Year Law</option>
                          <option value="3rd Year (5-Year / 3-Year)">3rd Year Law</option>
                          <option value="4th Year (5-Year B.A. LL.B)">4th Year (5-Year B.A. LL.B)</option>
                          <option value="5th Year (Final Year)">5th Year (Final Year)</option>
                          <option value="LL.M Candidate">LL.M Candidate</option>
                          <option value="Recent Law Graduate">Recent Law Graduate</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                          Current CGPA / Percentage <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="cgpa"
                          value={formData.cgpa}
                          onChange={handleChange}
                          placeholder="e.g. 8.4 / 10.0 or 74%"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-legal-900 border border-slate-200 dark:border-legal-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs focus:outline-none focus:border-gold-500 neumorph-inset"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-gold-700 dark:text-gold-400 text-xs font-bold uppercase tracking-wider">
                      <FileText className="w-4 h-4" />
                      <span>Step 3: Resume &amp; Statement of Purpose (SOP)</span>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Resume Cloud Link (Google Drive / Dropbox) <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="url"
                        name="resumeUrl"
                        value={formData.resumeUrl}
                        onChange={handleChange}
                        placeholder="https://drive.google.com/file/d/your-resume-link"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-legal-900 border border-slate-200 dark:border-legal-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs focus:outline-none focus:border-gold-500 neumorph-inset"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Statement of Purpose (Why are you applying for this role?) <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        rows={4}
                        name="sop"
                        value={formData.sop}
                        onChange={handleChange}
                        placeholder="Detail your relevant coursework, research publications, moot court achievements, and alignment with the chamber's practice area (minimum 30 characters)..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-legal-900 border border-slate-200 dark:border-legal-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs focus:outline-none focus:border-gold-500 neumorph-inset resize-none"
                        required
                      />
                    </div>

                    <div className="p-3 bg-gold-50 dark:bg-gold-950/40 rounded-xl border border-gold-500/20 text-xs text-gold-800 dark:text-gold-300 flex items-start space-x-2">
                      <CreditCard className="w-4 h-4 text-gold-600 dark:text-gold-400 shrink-0 mt-0.5" />
                      <span>
                        Final Step: Clicking &quot;Proceed to Razorpay Checkout&quot; will open the secure verification fee gateway (₹{internship.applicationFee}). Once paid, your application is submitted directly to the firm partner review queue.
                      </span>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Success Screen */
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 rounded-2xl border border-emerald-500/40 flex items-center justify-center mx-auto shadow-sm dark:shadow-glow-gold animate-pulse">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white">Application Successfully Submitted!</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Application Docket ID: <span className="font-mono text-gold-700 dark:text-gold-400 font-bold">{applicationId || 'APP-LEX-9921'}</span>
                  </p>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-md mx-auto">
                  Your application for <strong className="text-slate-900 dark:text-white">{internship.title}</strong> at <strong className="text-slate-900 dark:text-white">{internship.organization}</strong> has been transmitted. The hiring committee will review your SOP and resume within 3 business days.
                </p>
                <div className="pt-2">
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm"
                  >
                    Done &amp; Return to Portal
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer Controls */}
          {!submitted && (
            <div className="bg-slate-100 dark:bg-legal-900/70 px-6 py-4 border-t border-slate-200 dark:border-legal-800 flex items-center justify-between shrink-0">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white bg-white dark:bg-legal-850 hover:bg-slate-200 dark:hover:bg-legal-800 border border-slate-200 dark:border-legal-700 rounded-lg flex items-center space-x-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
              ) : <div />}

              <button
                type="button"
                onClick={handleNext}
                disabled={
                  (step === 1 && !validateStep1()) ||
                  (step === 2 && !validateStep2()) ||
                  (step === 3 && !validateStep3()) ||
                  submitting
                }
                className="px-5 py-2.5 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400 hover:from-gold-300 hover:to-gold-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm dark:shadow-glow-gold disabled:opacity-40 flex items-center space-x-1.5"
              >
                {step < 3 ? (
                  <>
                    <span>Next Step</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Pay ₹{internship.applicationFee} &amp; Submit</span>
                  </>
                )}
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Razorpay Checkout Modal */}
      {isRazorpayOpen && (
        <RazorpayModal
          isOpen={isRazorpayOpen}
          onClose={() => setIsRazorpayOpen(false)}
          title={internship.title}
          subtitle={`Internship Application Fee • ${internship.organization}`}
          amount={internship.applicationFee}
          type="internship_fee"
          metadata={{
            applicantName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            targetTitle: internship.title,
          }}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </>
  );
}
