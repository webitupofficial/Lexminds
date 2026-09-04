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
      <div className="neo-card p-6 sm:p-10 bg-white dark:bg-ink-900">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 bg-paper-200 dark:bg-ink-800 border border-ink-900/15 dark:border-ink-700 text-vermilion text-[10px] font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3 h-3" />
            <span>Call For Papers &bull; Volume IV</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-ink-900 dark:text-ink-100 tracking-tight">
            Publish Your Legal Research With <span className="text-vermilion">LexMinds</span>
          </h1>

          <p className="text-xs sm:text-sm text-ink-700 dark:text-ink-300 leading-relaxed max-w-2xl font-normal">
            Submit your research paper, case commentary, or statutory analysis to the LexMinds Law Journal. Receive structured student editorial evaluation, citation verification, and an archival publication docket upon acceptance.
          </p>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
          
          {/* Main Submission Form (8 Cols) */}
          <div className="lg:col-span-8 neo-card p-6 sm:p-8 space-y-8 bg-white dark:bg-ink-900">
            
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
                <form onSubmit={handleSubmitClick} className="space-y-6 pt-4 border-t border-ink-900/15 dark:border-ink-700">

              
              {/* Author Information */}
              <div className="space-y-4">
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-vermilion border-b border-ink-900/10 dark:border-ink-800 pb-2">
                  2. Author Credentials &amp; Credit Line
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-ink-700 dark:text-ink-300 mb-1 uppercase tracking-wider">
                      Lead Author Full Name <span className="text-vermilion">*</span>
                    </label>
                    <input
                      type="text"
                      name="authorName"
                      required
                      value={formData.authorName}
                      onChange={handleChange}
                      placeholder="e.g. Adv. Devansh Kothari"
                      className="w-full px-3.5 py-2.5 tactile-control text-ink-900 dark:text-ink-100 placeholder-ink-400 text-xs rounded-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-ink-700 dark:text-ink-300 mb-1 uppercase tracking-wider">
                      Designation / Role <span className="text-vermilion">*</span>
                    </label>
                    <input
                      type="text"
                      name="authorDesignation"
                      required
                      value={formData.authorDesignation}
                      onChange={handleChange}
                      placeholder="e.g. Advocate / 4th Year B.A. LL.B Scholar"
                      className="w-full px-3.5 py-2.5 tactile-control text-ink-900 dark:text-ink-100 placeholder-ink-400 text-xs rounded-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-ink-700 dark:text-ink-300 mb-1 uppercase tracking-wider">
                      Affiliated Law School / Chamber <span className="text-vermilion">*</span>
                    </label>
                    <input
                      type="text"
                      name="authorInstitution"
                      required
                      value={formData.authorInstitution}
                      onChange={handleChange}
                      placeholder="e.g. National Law School of India University"
                      className="w-full px-3.5 py-2.5 tactile-control text-ink-900 dark:text-ink-100 placeholder-ink-400 text-xs rounded-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-ink-700 dark:text-ink-300 mb-1 uppercase tracking-wider">
                      Preferred Byline / Signature Credit <span className="text-vermilion">*</span>
                    </label>
                    <input
                      type="text"
                      name="signatureLine"
                      required
                      value={formData.signatureLine}
                      onChange={handleChange}
                      placeholder="e.g. Adv. Devansh Kothari, High Court of Delhi"
                      className="w-full px-3.5 py-2.5 tactile-control text-ink-900 dark:text-ink-100 placeholder-ink-400 text-xs rounded-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-ink-700 dark:text-ink-300 mb-1 uppercase tracking-wider">
                    Short Author Bio (2-3 lines)
                  </label>
                  <textarea
                    name="authorBio"
                    rows={2}
                    value={formData.authorBio}
                    onChange={handleChange}
                    placeholder="Brief background on your research focus, past publications, or professional practice area..."
                    className="w-full px-3.5 py-2.5 tactile-control text-ink-900 dark:text-ink-100 placeholder-ink-400 text-xs rounded-none"
                  />
                </div>
              </div>

              {/* Manuscript Details */}
              <div className="space-y-4">
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-vermilion border-b border-ink-900/10 dark:border-ink-800 pb-2">
                  3. Manuscript Details
                </h2>

                <div>
                  <label className="block text-xs font-mono text-ink-700 dark:text-ink-300 mb-1 uppercase tracking-wider">
                    Manuscript Title <span className="text-vermilion">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Interplay Between DPDP Act 2023 and the Right to Information Act"
                    className="w-full px-3.5 py-2.5 tactile-control text-ink-900 dark:text-ink-100 placeholder-ink-400 text-xs rounded-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-ink-700 dark:text-ink-300 mb-1 uppercase tracking-wider">
                      Jurisprudential Track <span className="text-vermilion">*</span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 tactile-control text-ink-900 dark:text-ink-100 text-xs rounded-none"
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-ink-700 dark:text-ink-300 mb-1 uppercase tracking-wider">
                      Keywords (comma separated)
                    </label>
                    <input
                      type="text"
                      name="keywords"
                      value={formData.keywords}
                      onChange={handleChange}
                      placeholder="e.g. DPDP Act, Section 44(3), RTI Act, Privacy"
                      className="w-full px-3.5 py-2.5 tactile-control text-ink-900 dark:text-ink-100 placeholder-ink-400 text-xs rounded-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-ink-700 dark:text-ink-300 mb-1 uppercase tracking-wider">
                    Structured Abstract (Min 50 chars) <span className="text-vermilion">*</span>
                  </label>
                  <textarea
                    name="abstract"
                    rows={3}
                    required
                    value={formData.abstract}
                    onChange={handleChange}
                    placeholder="Summarize your central thesis, statutory provisions analyzed, and primary conclusions..."
                    className="w-full px-3.5 py-2.5 tactile-control text-ink-900 dark:text-ink-100 placeholder-ink-400 text-xs rounded-none"
                  />
                  <p className="text-[10px] text-ink-400 font-mono text-right mt-0.5">
                    {formData.abstract.length}/50 characters minimum
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-mono text-ink-700 dark:text-ink-300 uppercase tracking-wider">
                      Article Content OR Reviewer Document URL <span className="text-vermilion">*</span>
                    </label>
                  </div>
                  <textarea
                    name="content"
                    rows={6}
                    required
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="Paste the full text of your article in Markdown / clean text, OR enter a restricted Google Docs link (ensure link sharing allows reviewer access)..."
                    className="w-full px-3.5 py-2.5 tactile-control text-ink-900 dark:text-ink-100 placeholder-ink-400 text-xs font-mono rounded-none"
                  />
                  <p className="text-[10px] text-ink-400 font-mono text-right mt-0.5">
                    {formData.content.length}/80 characters minimum
                  </p>
                </div>
              </div>

              {/* Declarations & Consents */}
              <div className="p-4 bg-paper-100 dark:bg-ink-850 border border-ink-900/15 dark:border-ink-700 space-y-3 text-xs">
                <label className="flex items-start space-x-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    name="originalityDeclaration"
                    checked={formData.originalityDeclaration}
                    onChange={handleChange}
                    className="mt-0.5 text-vermilion focus:ring-vermilion rounded-none"
                  />
                  <span className="text-ink-700 dark:text-ink-300 leading-relaxed font-normal">
                    <strong>Originality Declaration:</strong> I declare that this manuscript is my original scholarly work and has not been submitted or published elsewhere.
                  </span>
                </label>

                <label className="flex items-start space-x-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    name="aiReviewConsent"
                    checked={formData.aiReviewConsent}
                    onChange={handleChange}
                    className="mt-0.5 text-vermilion focus:ring-vermilion rounded-none"
                  />
                  <span className="text-ink-700 dark:text-ink-300 leading-relaxed font-normal">
                    <strong>Editorial Screening Consent:</strong> I consent to plagiarism screening and editorial review by the LexMinds Student Editorial Board.
                  </span>
                </label>

                <label className="flex items-start space-x-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    name="consentToPublish"
                    checked={formData.consentToPublish}
                    onChange={handleChange}
                    className="mt-0.5 text-vermilion focus:ring-vermilion rounded-none"
                  />
                  <span className="text-ink-700 dark:text-ink-300 leading-relaxed font-normal">
                    <strong>Publication Terms:</strong> I understand that paying the ₹499 fee initiates editorial evaluation. Articles are published only after editorial approval.
                  </span>
                </label>
              </div>

              {submitError && (
                <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-500/30 text-xs text-rose-600 dark:text-rose-400 flex items-center space-x-2 font-mono">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Submission CTA */}
              <button
                type="submit"
                disabled={submitting || !isFormValid()}
                className="w-full py-3.5 px-6 btn-neo-primary text-xs uppercase tracking-wider flex items-center justify-center space-x-2 disabled:opacity-50"
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
        <div className="neo-card p-6 bg-white dark:bg-ink-900 space-y-4">
          <div className="flex items-center space-x-2.5 text-vermilion">
            <Scale className="w-4 h-4" />
            <h3 className="font-serif font-bold text-ink-900 dark:text-ink-100 text-base">Editorial Policy</h3>
          </div>

          <div className="space-y-3 text-xs text-ink-700 dark:text-ink-300 font-normal leading-relaxed">
            <p>
              <strong>Desk Screening:</strong> Manuscripts undergo editorial evaluation and academic originality triage upon queue intake.
            </p>
            <p>
              <strong>Strict Standards:</strong> Only approved manuscripts that meet originality thresholds are published live in the journal.
            </p>
            <p>
              <strong>Author Credit:</strong> Published articles prominently display author byline, institution, bio, and standardized Bluebook / OSCOLA citations.
            </p>
          </div>

          <div className="pt-3 border-t border-ink-900/10 dark:border-ink-800 text-[11px] font-mono text-ink-500 dark:text-ink-400 flex items-center justify-between">
            <span>Article Processing Fee:</span>
            <span className="font-bold text-ink-900 dark:text-ink-100">₹499.00 INR</span>
          </div>
        </div>

        <div className="p-4 bg-paper-100 dark:bg-ink-850 border border-ink-900/15 dark:border-ink-700 text-xs text-ink-600 dark:text-ink-400 space-y-2">
          <div className="flex items-center space-x-2 text-vermilion font-semibold">
            <Lock className="w-3.5 h-3.5" />
            <span>Author Security &amp; Records</span>
          </div>
          <p className="text-[11px] leading-relaxed font-normal">
            All submissions are logged in our editorial registry. Authors do not need account dashboards; official decision notices and reviewer notes are sent directly to your registered email.
          </p>
        </div>
      </div>
    </div>
    </div>
  );
}

