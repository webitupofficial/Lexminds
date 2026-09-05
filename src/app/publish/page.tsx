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
  Loader2,
  Link2
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
      formData.content.trim().length >= 10 &&
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
          authorDesignation: formData.authorDesignation,
          authorInstitution: formData.authorInstitution,
          authorBio: formData.authorBio,
          signatureLine: formData.signatureLine,
          title: formData.title,
          category: formData.category,
          abstract: formData.abstract,
          content: formData.content,
          keywords: formData.keywords,
          originalityDeclaration: formData.originalityDeclaration,
          aiReviewConsent: formData.aiReviewConsent,
          consentToPublish: formData.consentToPublish,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setSubmitError(data.error || 'Failed to submit article for publication.');
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ name: 'Publish With Us', href: '/publish' }]} />

      {/* Header Banner */}
      <div className="p-8 sm:p-12 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 shadow-brutal">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-sm bg-royal-50 dark:bg-royal-950/40 border border-royal-200 dark:border-royal-800 text-royal-600 dark:text-royal-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Call For Papers &bull; Volume IV</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-ink-950 dark:text-ink-50 tracking-tight">
            Publish Your Legal Research With <span className="text-royal-500 dark:text-royal-400">Lex Minds</span>
          </h1>

          <p className="text-base text-ink-600 dark:text-ink-300 leading-relaxed max-w-2xl font-normal">
            Submit your research paper, case commentary, or statutory analysis to the Lex Minds Law Journal. Receive structured student editorial evaluation, citation verification, and an archival publication docket upon acceptance.
          </p>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          
          {/* Main Submission Form (8 Cols) */}
          <div className="lg:col-span-8 p-8 sm:p-10 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 space-y-8 shadow-brutal">
            
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
                <form onSubmit={handleSubmitClick} className="space-y-8 pt-6 border-t border-ink-900/15 dark:border-ink-700">

              
              {/* Author Information */}
              <div className="space-y-4">
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-royal-600 dark:text-royal-400 border-b border-ink-900/10 dark:border-ink-800 pb-2">
                  1. Author Credentials &amp; Credit Line
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-ink-700 dark:text-ink-300 mb-1.5 uppercase tracking-wider">
                      Lead Author Full Name <span className="text-coral">*</span>
                    </label>
                    <input
                      type="text"
                      name="authorName"
                      required
                      value={formData.authorName}
                      onChange={handleChange}
                      placeholder="e.g. Adv. Devansh Kothari"
                      className="w-full px-4 py-3 tactile-control text-ink-900 dark:text-ink-100 placeholder-ink-400 text-sm rounded-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-ink-700 dark:text-ink-300 mb-1.5 uppercase tracking-wider">
                      Designation / Role <span className="text-coral">*</span>
                    </label>
                    <input
                      type="text"
                      name="authorDesignation"
                      required
                      value={formData.authorDesignation}
                      onChange={handleChange}
                      placeholder="e.g. 4th Year B.A. LL.B (Hons.)"
                      className="w-full px-4 py-3 tactile-control text-ink-900 dark:text-ink-100 placeholder-ink-400 text-sm rounded-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-ink-700 dark:text-ink-300 mb-1.5 uppercase tracking-wider">
                      Academic Institution / Chamber <span className="text-coral">*</span>
                    </label>
                    <input
                      type="text"
                      name="authorInstitution"
                      required
                      value={formData.authorInstitution}
                      onChange={handleChange}
                      placeholder="e.g. National Law School of India University (NLSIU)"
                      className="w-full px-4 py-3 tactile-control text-ink-900 dark:text-ink-100 placeholder-ink-400 text-sm rounded-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-ink-700 dark:text-ink-300 mb-1.5 uppercase tracking-wider">
                      Formal Byline Signature <span className="text-coral">*</span>
                    </label>
                    <input
                      type="text"
                      name="signatureLine"
                      required
                      value={formData.signatureLine}
                      onChange={handleChange}
                      placeholder="e.g. Devansh Kothari, Student Author"
                      className="w-full px-4 py-3 tactile-control text-ink-900 dark:text-ink-100 placeholder-ink-400 text-sm rounded-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-ink-700 dark:text-ink-300 mb-1.5 uppercase tracking-wider">
                    Author Biography / Research Profile (Optional)
                  </label>
                  <textarea
                    name="authorBio"
                    rows={2}
                    value={formData.authorBio}
                    onChange={handleChange}
                    placeholder="Brief 1-2 sentence bio highlighting primary areas of legal interest or previous publications..."
                    className="w-full px-4 py-3 tactile-control text-ink-900 dark:text-ink-100 placeholder-ink-400 text-sm rounded-sm"
                  />
                </div>
              </div>

              {/* Manuscript Details */}
              <div className="space-y-4">
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-royal-600 dark:text-royal-400 border-b border-ink-900/10 dark:border-ink-800 pb-2">
                  2. Manuscript Content &amp; Metadata
                </h2>

                <div>
                  <label className="block text-xs font-mono text-ink-700 dark:text-ink-300 mb-1.5 uppercase tracking-wider">
                    Treatise Title <span className="text-coral">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Regulatory Horizons: Algorithmic Price Fixing Under the Competition Act, 2002"
                    className="w-full px-4 py-3 tactile-control text-ink-900 dark:text-ink-100 placeholder-ink-400 text-sm rounded-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-ink-700 dark:text-ink-300 mb-1.5 uppercase tracking-wider">
                      Subject Category <span className="text-coral">*</span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 tactile-control text-ink-900 dark:text-ink-100 text-sm rounded-sm"
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-ink-700 dark:text-ink-300 mb-1.5 uppercase tracking-wider">
                      Keywords (Comma-Separated) <span className="text-coral">*</span>
                    </label>
                    <input
                      type="text"
                      name="keywords"
                      value={formData.keywords}
                      onChange={handleChange}
                      placeholder="e.g. Competition Law, Cartels, AI, Indian Antitrust"
                      className="w-full px-4 py-3 tactile-control text-ink-900 dark:text-ink-100 placeholder-ink-400 text-sm rounded-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-ink-700 dark:text-ink-300 mb-1.5 uppercase tracking-wider">
                    Abstract (Minimum 50 characters) <span className="text-coral">*</span>
                  </label>
                  <textarea
                    name="abstract"
                    rows={4}
                    required
                    value={formData.abstract}
                    onChange={handleChange}
                    placeholder="Summarize your research thesis, legal methodology, statutory questions examined, and principal conclusions..."
                    className="w-full px-4 py-3 tactile-control text-ink-900 dark:text-ink-100 placeholder-ink-400 text-sm rounded-sm"
                  />
                  <p className="text-[11px] text-ink-400 font-mono text-right mt-1">
                    {formData.abstract.length}/50 characters minimum
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-mono text-ink-700 dark:text-ink-300 uppercase tracking-wider">
                      Paste Drive Link (Google Drive / Docs) <span className="text-coral">*</span>
                    </label>
                    <span className="text-[10px] font-mono text-royal-600 dark:text-royal-400">
                      Cloud Document URL
                    </span>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink-400">
                      <Link2 className="w-4 h-4 text-royal-500" />
                    </div>
                    <input
                      type="url"
                      name="content"
                      required
                      value={formData.content}
                      onChange={handleChange}
                      placeholder="https://drive.google.com/file/d/... or https://docs.google.com/document/d/..."
                      className="w-full pl-10 pr-4 py-3 tactile-control text-ink-900 dark:text-ink-100 placeholder-ink-400 text-sm font-mono rounded-sm"
                    />
                  </div>

                  {/* Privacy, Storage & Work Ethics Guarantee Notice */}
                  <div className="mt-2.5 p-3.5 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 rounded-sm space-y-1.5 text-xs text-ink-600 dark:text-ink-400">
                    <div className="flex items-center space-x-1.5 text-ink-950 dark:text-ink-50 font-semibold font-mono text-[11px] uppercase tracking-wider">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>Data Privacy &amp; Publication Ethics</span>
                    </div>
                    <p className="leading-relaxed text-[11px] text-ink-700 dark:text-ink-300">
                      We do not store or retain your private documents, personal data, or file content on external servers. Your manuscript is accessed strictly by our Editorial Board for peer-review triage and will be published strictly according to our academic work ethics and institutional standards.
                    </p>
                    <p className="text-[10px] font-mono text-ink-500 dark:text-ink-400">
                      &bull; Please ensure link sharing permission is set to <strong>&ldquo;Anyone with the link can view&rdquo;</strong> (or <strong>&ldquo;Commenter&rdquo;</strong>) in Google Drive / Docs.
                    </p>
                  </div>
                </div>
              </div>

              {/* Declarations */}
              <div className="space-y-3.5 p-5 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 rounded-sm">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="originalityDeclaration"
                    checked={formData.originalityDeclaration}
                    onChange={handleChange}
                    className="mt-0.5 text-royal-600 focus:ring-royal-500 rounded-none"
                  />
                  <span className="text-xs text-ink-700 dark:text-ink-300 leading-relaxed font-normal">
                    <strong>Originality Affirmation:</strong> I affirm that this manuscript is my original scholarly work, has not been published elsewhere, and adheres to ethical citation guidelines.
                  </span>
                </label>

                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="aiReviewConsent"
                    checked={formData.aiReviewConsent}
                    onChange={handleChange}
                    className="mt-0.5 text-royal-600 focus:ring-royal-500 rounded-none"
                  />
                  <span className="text-xs text-ink-700 dark:text-ink-300 leading-relaxed font-normal">
                    <strong>Editorial Evaluation Agreement:</strong> I understand that this submission will undergo evaluation by the student Editorial Board for academic rigor, citation formatting, and topical depth.
                  </span>
                </label>

                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="consentToPublish"
                    checked={formData.consentToPublish}
                    onChange={handleChange}
                    className="mt-0.5 text-royal-600 focus:ring-royal-500 rounded-none"
                  />
                  <span className="text-xs text-ink-700 dark:text-ink-300 leading-relaxed font-normal">
                    <strong>Open-Access Consent &amp; Policy Acceptance:</strong> Upon editorial acceptance, I grant Lex Minds the non-exclusive right to publish this treatise in open-access format with author attribution. I understand that the editorial evaluation fee does not guarantee selection, enrollment, certification, publication, or any specific outcome. Lex Minds is an educational platform and not a law firm. I have read and agree to the{' '}
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

              {submitError && (
                <div className="p-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-500/30 text-xs text-rose-600 dark:text-rose-400 flex items-center space-x-2 font-mono rounded-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Submission CTA */}
              <button
                type="submit"
                disabled={submitting || !isFormValid()}
                className="w-full py-4 px-6 btn-brand-primary text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Redirecting to Payment...</span>
                  </>
                ) : (
                  <>
                    <span>Proceed to Payment (₹99.00) &amp; Submit</span>
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
        <div className="p-6 sm:p-8 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 space-y-5 shadow-brutal">
          <div className="flex items-center space-x-2.5 text-royal-600 dark:text-royal-400">
            <Scale className="w-4 h-4" />
            <h3 className="font-serif font-bold text-ink-950 dark:text-ink-50 text-base">Editorial Policy</h3>
          </div>

          <div className="space-y-3.5 text-xs text-ink-700 dark:text-ink-300 font-normal leading-relaxed">
            <p>
              <strong>Desk Screening:</strong> Manuscripts undergo editorial evaluation and academic originality triage upon queue intake.
            </p>
            <p>
              <strong>Strict Standards:</strong> Only approved manuscripts that meet originality thresholds are published live in the journal. Payment does not guarantee acceptance.
            </p>
            <p>
              <strong>Author Credit:</strong> Published articles prominently display author byline, institution, bio, and standardized Bluebook / OSCOLA citations.
            </p>
          </div>

          <div className="pt-4 border-t border-ink-900/10 dark:border-ink-800 text-xs font-mono text-ink-500 dark:text-ink-400 space-y-1">
            <div className="flex items-center justify-between">
              <span>Editorial Evaluation Fee:</span>
              <div className="text-right">
                <span className="font-bold text-ink-950 dark:text-ink-50 text-sm">₹99.00 INR</span>
                <span className="text-xs line-through text-ink-400 ml-1.5">₹399.00</span>
              </div>
            </div>
            <div className="text-[10px] text-ink-400 text-right">
              Inclusive of all applicable taxes
            </div>
          </div>
        </div>

        <div className="p-5 bg-paper dark:bg-ink-850 border border-ink-900/15 dark:border-ink-700 text-xs text-ink-600 dark:text-ink-400 space-y-2 rounded-sm">
          <div className="flex items-center space-x-2 text-royal-600 dark:text-royal-400 font-semibold">
            <Lock className="w-3.5 h-3.5" />
            <span>Author Security &amp; Records</span>
          </div>
          <p className="text-[11px] leading-relaxed font-normal">
            All submissions are logged in our editorial registry. Decision notices and reviewer notes are sent directly to your registered email.
          </p>
        </div>
      </div>
    </div>
    </div>
  );
}
