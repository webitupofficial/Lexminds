'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  PenTool, 
  BookOpen, 
  ShieldCheck, 
  FileText, 
  User, 
  CreditCard, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  ArrowRight,
  Lock,
  Scale,
  Loader2
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import GoogleAuthGate from '@/components/GoogleAuthGate';
import { User as FirebaseUser } from 'firebase/auth';

export default function PublishPage() {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    authorName: '',
    authorDesignation: 'Law Scholar',
    authorInstitution: '',
    authorBio: '',
    signatureLine: '',
    title: '',
    category: 'Data Privacy & Tech Law',
    abstract: '',
    content: '',
    keywords: '',
    originalityDeclaration: false,
    aiReviewConsent: false,
    consentToPublish: false,
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const categories = [
    'Data Privacy & Tech Law',
    'Constitutional & Criminal',
    'Corporate & M&A',
    'Intellectual Property',
    'Arbitration & Banking',
    'Environmental Jurisprudence',
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const isFormValid = () => {
    return (
      Boolean(currentUser) &&
      Boolean(authToken) &&
      formData.authorName.trim() !== '' &&
      formData.authorInstitution.trim() !== '' &&
      formData.signatureLine.trim() !== '' &&
      formData.title.trim() !== '' &&
      formData.abstract.trim().length >= 50 &&
      formData.content.trim().length >= 80 &&
      formData.originalityDeclaration &&
      formData.aiReviewConsent &&
      formData.consentToPublish
    );
  };

  const handleSubmitClick = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid() || !authToken) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch('/api/publish/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          authorName: formData.authorName,
          designation: formData.authorDesignation,
          institution: formData.authorInstitution,
          authorBio: formData.authorBio,
          signatureLine: formData.signatureLine,
          title: formData.title,
          category: formData.category,
          keywords: formData.keywords.split(',').map((k) => k.trim()).filter(Boolean),
          abstract: formData.abstract,
          content: formData.content,
          originalityDeclaration: formData.originalityDeclaration,
          consentToPublish: formData.consentToPublish,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setSubmitError(data.error || 'Failed to submit manuscript. Please try again.');
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 sm:space-y-10">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ name: 'Publish With Us', href: '/publish' }]} />

      {/* Header Banner */}
      <div className="neumorph-card rounded-3xl p-6 sm:p-10 relative overflow-hidden border border-slate-200 dark:border-gold-500/30">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold-50 dark:bg-gold-950/80 border border-gold-500/30 text-gold-700 dark:text-gold-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Call For Papers &bull; Volume IV</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">
            Publish Your Legal Research With <span className="gold-gradient-text">LexMinds</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            Submit your research paper, case commentary, or legislative analysis to our peer-reviewed journal. Receive double-blind reviewer feedback and a formal publication docket upon acceptance.
          </p>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
          
          {/* Main Submission Form (8 Cols) */}
          <div className="lg:col-span-8 neumorph-card rounded-3xl p-6 sm:p-8 space-y-8 border border-slate-200 dark:border-gold-500/30">
            
            {/* Google Authentication Gate First */}
            <div>
              <GoogleAuthGate
                requireAuthBeforeRender={true}
                title="Author Google Verification Required"
                description="Sign in with your verified Google account before filling out the manuscript submission form. This ensures verified contact association and protects the editorial review queue from automated submissions."
                onAuthStateChange={(user, token) => {
                  setCurrentUser(user);
                  setAuthToken(token);
                  if (user?.displayName && !formData.authorName) {
                    setFormData((prev) => ({
                      ...prev,
                      authorName: user.displayName || '',
                      signatureLine: `${user.displayName || 'Scholar'}, Author`,
                    }));
                  }
                }}
              >
                <form onSubmit={handleSubmitClick} className="space-y-6 pt-4 border-t border-slate-200 dark:border-legal-800">

              
              {/* Author Information */}
              <div className="space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-gold-700 dark:text-gold-400 border-b border-slate-200 dark:border-legal-800 pb-2">
                  2. Author Credentials &amp; Credit Line
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Lead Author Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="authorName"
                      required
                      value={formData.authorName}
                      onChange={handleChange}
                      placeholder="e.g. Adv. Devansh Kothari"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-legal-900 border border-slate-300 dark:border-legal-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Designation / Role <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="authorDesignation"
                      required
                      value={formData.authorDesignation}
                      onChange={handleChange}
                      placeholder="e.g. Advocate / 4th Year B.A. LL.B Scholar"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-legal-900 border border-slate-300 dark:border-legal-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-gold-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Affiliated Law School / Chamber <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="authorInstitution"
                      required
                      value={formData.authorInstitution}
                      onChange={handleChange}
                      placeholder="e.g. National Law School of India University"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-legal-900 border border-slate-300 dark:border-legal-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Preferred Byline / Signature Credit <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="signatureLine"
                      required
                      value={formData.signatureLine}
                      onChange={handleChange}
                      placeholder="e.g. Adv. Devansh Kothari, High Court of Delhi"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-legal-900 border border-slate-300 dark:border-legal-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-gold-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Short Author Bio (2-3 lines)
                  </label>
                  <textarea
                    name="authorBio"
                    rows={2}
                    value={formData.authorBio}
                    onChange={handleChange}
                    placeholder="Brief background on your research focus, past publications, or professional practice area..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-legal-900 border border-slate-300 dark:border-legal-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              {/* Manuscript Details */}
              <div className="space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-gold-700 dark:text-gold-400 border-b border-slate-200 dark:border-legal-800 pb-2">
                  3. Manuscript Details
                </h2>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Manuscript Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Interplay Between DPDP Act 2023 and the Right to Information Act"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-legal-900 border border-slate-300 dark:border-legal-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Jurisprudential Track <span className="text-rose-500">*</span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-legal-900 border border-slate-300 dark:border-legal-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-gold-500"
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Keywords (comma separated)
                    </label>
                    <input
                      type="text"
                      name="keywords"
                      value={formData.keywords}
                      onChange={handleChange}
                      placeholder="e.g. DPDP Act, Section 44(3), RTI Act, Privacy"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-legal-900 border border-slate-300 dark:border-legal-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-gold-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Structured Abstract (Min 50 chars) <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    name="abstract"
                    rows={3}
                    required
                    value={formData.abstract}
                    onChange={handleChange}
                    placeholder="Summarize your central thesis, statutory provisions analyzed, and primary conclusions..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-legal-900 border border-slate-300 dark:border-legal-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-gold-500"
                  />
                  <p className="text-[10px] text-slate-400 text-right mt-0.5">
                    {formData.abstract.length}/50 characters minimum
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                      Article Content OR Restricted Reviewer Document URL <span className="text-rose-500">*</span>
                    </label>
                  </div>
                  <textarea
                    name="content"
                    rows={6}
                    required
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="Paste the full text of your article in Markdown / clean text, OR enter a restricted Google Docs link (ensure link sharing allows reviewer access)..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-legal-900 border border-slate-300 dark:border-legal-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-gold-500 font-mono"
                  />
                  <p className="text-[10px] text-slate-400 text-right mt-0.5">
                    {formData.content.length}/80 characters minimum
                  </p>
                </div>
              </div>

              {/* Declarations & Consents */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-legal-900/60 border border-slate-200 dark:border-legal-800 space-y-3 text-xs">
                <label className="flex items-start space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="originalityDeclaration"
                    checked={formData.originalityDeclaration}
                    onChange={handleChange}
                    className="mt-0.5 rounded border-slate-300 text-gold-500 focus:ring-gold-500"
                  />
                  <span className="text-slate-600 dark:text-slate-300">
                    <strong>Originality Declaration:</strong> I declare that this manuscript is my original scholarly work and has not been submitted or published elsewhere.
                  </span>
                </label>

                <label className="flex items-start space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="aiReviewConsent"
                    checked={formData.aiReviewConsent}
                    onChange={handleChange}
                    className="mt-0.5 rounded border-slate-300 text-gold-500 focus:ring-gold-500"
                  />
                  <span className="text-slate-600 dark:text-slate-300">
                    <strong>Editorial Screening Consent:</strong> I consent to plagiarism screening (Turnitin) and editorial review by the LexMinds Editorial Board.
                  </span>
                </label>

                <label className="flex items-start space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="consentToPublish"
                    checked={formData.consentToPublish}
                    onChange={handleChange}
                    className="mt-0.5 rounded border-slate-300 text-gold-500 focus:ring-gold-500"
                  />
                  <span className="text-slate-600 dark:text-slate-300">
                    <strong>Publication Terms:</strong> I understand that paying the ₹499 fee initiates the double-blind review process. Articles are published only after reviewer approval.
                  </span>
                </label>
              </div>

              {submitError && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-500/30 text-xs text-rose-600 dark:text-rose-400 flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Submission CTA */}
              <button
                type="submit"
                disabled={submitting || !isFormValid()}
                className="w-full py-4 px-6 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400 hover:from-gold-300 hover:to-gold-500 text-slate-950 font-bold text-xs uppercase tracking-widest rounded-2xl shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Redirecting to Payment...</span>
                  </>
                ) : (
                  <>
                    <span>Proceed to Payment (₹499) &amp; Submit</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </GoogleAuthGate>
        </div>
      </div>

      {/* Right Sidebar: Policy & Fee Information (4 Cols) */}
      <div className="lg:col-span-4 space-y-6">
        <div className="neumorph-card rounded-3xl p-6 border border-slate-200 dark:border-gold-500/30 space-y-4">
          <div className="flex items-center space-x-3 text-gold-700 dark:text-gold-400">
            <Scale className="w-5 h-5" />
            <h3 className="font-serif font-bold text-slate-900 dark:text-white text-base">Editorial Policy</h3>
          </div>

          <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
            <p>
              <strong>Desk Screening:</strong> Manuscripts undergo double-blind plagiarism triage within 48 hours.
            </p>
            <p>
              <strong>Strict Standards:</strong> Only approved manuscripts that meet originality thresholds are published live.
            </p>
            <p>
              <strong>Author Credit:</strong> Published articles prominently display author byline, institution, bio, and standardized Bluebook / OSCOLA citations.
            </p>
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-legal-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>Article Processing Fee:</span>
            <span className="font-bold text-slate-900 dark:text-white">₹499.00 INR</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-legal-900/40 border border-slate-200 dark:border-legal-800 text-xs text-slate-500 space-y-2">
          <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400">
            <Lock className="w-4 h-4" />
            <span className="font-semibold">Author Security</span>
          </div>
          <p>
            All submissions are securely logged in our private registry. Authors do not need account dashboards; official decision notices and reviewer notes are sent directly to your registered email.
          </p>
        </div>
      </div>
    </div>
    </div>
  );
}

