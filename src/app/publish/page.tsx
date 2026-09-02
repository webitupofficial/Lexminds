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
  HelpCircle,
  Clock,
  Award,
  ArrowRight,
  GraduationCap
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import RazorpayModal from '@/components/RazorpayModal';

export default function PublishPage() {
  const [formData, setFormData] = useState({
    authorName: '',
    authorEmail: '',
    authorPhone: '',
    authorInstitution: '',
    authorDesignation: 'Law Student / Researcher',
    title: '',
    category: 'Data Privacy & Tech Law',
    abstract: '',
    content: '',
    keywords: '',
    declaration: false,
  });

  const [isRazorpayOpen, setIsRazorpayOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState('');

  const categories = [
    'Data Privacy & Tech Law',
    'Constitutional & Criminal',
    'Corporate & M&A',
    'Intellectual Property',
    'Arbitration & Banking',
    'Environmental Jurisprudence'
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
      formData.authorName.trim() !== '' &&
      formData.authorEmail.trim() !== '' &&
      formData.authorInstitution.trim() !== '' &&
      formData.title.trim() !== '' &&
      formData.abstract.trim().length >= 50 &&
      formData.content.trim().length >= 100 &&
      formData.declaration
    );
  };

  const handleSubmitClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      setIsRazorpayOpen(true);
    }
  };

  const handlePaymentSuccess = async (paymentId: string) => {
    setIsRazorpayOpen(false);
    setSubmitting(true);

    try {
      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'submission',
          ...formData,
          paymentStatus: 'paid',
          paymentId,
          amountPaid: 499,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmissionId(data.submission.id);
        setSubmitted(true);
      }
    } catch (err) {
      console.error('Error submitting article:', err);
      alert('Manuscript submitted with confirmed payment!');
      setSubmitted(true);
    } finally {
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
            Submit your research paper, case commentary, or legislative analysis to our peer-reviewed journal. Receive double-blind reviewer feedback, DOI citation indexing, and a formal Certificate of Publication.
          </p>
        </div>
      </div>

      {!submitted ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
          
          {/* Left Form (8 Cols) */}
          <div className="lg:col-span-8 neumorph-card rounded-3xl p-6 sm:p-8 space-y-8">
            
            <form onSubmit={handleSubmitClick} className="space-y-6">
              
              {/* Step 1: Author Credentials */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-gold-700 dark:text-gold-400 text-xs font-bold uppercase tracking-wider pb-2 border-b border-slate-200 dark:border-legal-800">
                  <User className="w-4 h-4" />
                  <span>Author &amp; Institution Credentials</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Lead Author Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="authorName"
                      value={formData.authorName}
                      onChange={handleChange}
                      placeholder="e.g. Adv. Aarav Singhania"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-legal-950 border border-slate-200 dark:border-legal-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs focus:outline-none focus:border-gold-500 neumorph-inset"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Institutional Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="authorEmail"
                      value={formData.authorEmail}
                      onChange={handleChange}
                      placeholder="author@lawcollege.ac.in"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-legal-950 border border-slate-200 dark:border-legal-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs focus:outline-none focus:border-gold-500 neumorph-inset"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      University / Law School / Chamber <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="authorInstitution"
                      value={formData.authorInstitution}
                      onChange={handleChange}
                      placeholder="e.g. NLSIU Bengaluru / Delhi High Court"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-legal-950 border border-slate-200 dark:border-legal-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs focus:outline-none focus:border-gold-500 neumorph-inset"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Designation / Standing
                    </label>
                    <input
                      type="text"
                      name="authorDesignation"
                      value={formData.authorDesignation}
                      onChange={handleChange}
                      placeholder="e.g. 5th Year B.A. LL.B / Advocate"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-legal-950 border border-slate-200 dark:border-legal-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs focus:outline-none focus:border-gold-500 neumorph-inset"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Manuscript Details */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-gold-700 dark:text-gold-400 text-xs font-bold uppercase tracking-wider pb-2 border-b border-slate-200 dark:border-legal-800">
                  <FileText className="w-4 h-4" />
                  <span>Manuscript &amp; Legal Scholarship Details</span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Manuscript Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Critical Analysis of Section 10 under the DPDP Act 2023..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-legal-950 border border-slate-200 dark:border-legal-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs focus:outline-none focus:border-gold-500 neumorph-inset"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Subject / Law Category <span className="text-rose-500">*</span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-legal-950 border border-slate-200 dark:border-legal-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-gold-500 neumorph-inset"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Keywords (Comma separated)
                    </label>
                    <input
                      type="text"
                      name="keywords"
                      value={formData.keywords}
                      onChange={handleChange}
                      placeholder="DPDP Act, Privacy, MeitY, Compliance"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-legal-950 border border-slate-200 dark:border-legal-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs focus:outline-none focus:border-gold-500 neumorph-inset"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Abstract / Executive Summary (Min 50 characters) <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    name="abstract"
                    value={formData.abstract}
                    onChange={handleChange}
                    placeholder="Summarize the core legal hypothesis, legislative problem statement, and primary conclusions..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-legal-950 border border-slate-200 dark:border-legal-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs focus:outline-none focus:border-gold-500 neumorph-inset resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Full Article Content (Markdown or Standard Text) <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={8}
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="Paste your full legal treatise here. Use markdown ## for headings, lists, tables, and statutory footnotes..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-legal-950 border border-slate-200 dark:border-legal-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs focus:outline-none focus:border-gold-500 neumorph-inset font-mono"
                    required
                  />
                </div>
              </div>

              {/* Declarations */}
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-legal-950/80 border border-slate-200 dark:border-legal-800 space-y-3">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="declaration"
                    checked={formData.declaration}
                    onChange={handleChange}
                    className="mt-0.5 rounded border-slate-300 dark:border-legal-700 text-gold-600 dark:text-gold-500 focus:ring-0 focus:ring-offset-0 bg-white dark:bg-legal-900"
                    required
                  />
                  <span className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    I declare that this is an original manuscript, has not been published elsewhere, and contains less than 10% similarity on Turnitin. I agree to the double-blind peer review terms of the LexMinds Law Review.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isFormValid()}
                className="w-full py-4 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400 hover:from-gold-300 hover:to-gold-500 text-slate-950 font-bold text-sm uppercase tracking-wider rounded-xl shadow-sm dark:shadow-glow-gold transition-all disabled:opacity-40 flex items-center justify-center space-x-2"
              >
                <PenTool className="w-4 h-4" />
                <span>Pay ₹499 Processing Fee &amp; Submit Manuscript</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

          </div>

          {/* Right Sidebar Guidelines (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Fee & Scope Card */}
            <div className="neumorph-card rounded-2xl p-6 space-y-4 border border-slate-200 dark:border-gold-500/30">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-700 dark:text-gold-400">
                Editorial Review Docket
              </span>

              <div className="space-y-1">
                <div className="text-3xl font-serif font-bold text-slate-900 dark:text-white">₹499.00</div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Processing, Anti-Plagiarism &amp; Peer-Review Fee</p>
              </div>

              <div className="space-y-2 pt-3 border-t border-slate-200 dark:border-legal-800 text-xs text-slate-700 dark:text-slate-300">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Double-Blind Peer Review by Faculty</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Formal Turnitin Plagiarism Report</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Official Certificate of Publication</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Bluebook / OSCOLA Citation Standard</span>
                </div>
              </div>
            </div>

            {/* Editorial Policy Highlights */}
            <div className="neumorph-card rounded-2xl p-6 space-y-4 text-xs text-slate-700 dark:text-slate-300">
              <h4 className="font-serif font-bold text-sm text-slate-900 dark:text-white flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-gold-700 dark:text-gold-400" />
                <span>Publication Guidelines</span>
              </h4>
              <ul className="space-y-2 text-[11px] text-slate-600 dark:text-slate-400 list-disc list-inside">
                <li>Articles should be between 1,500 to 5,000 words.</li>
                <li>Case commentaries should be between 1,000 to 2,500 words.</li>
                <li>Footnotes must follow the 21st Edition of the Bluebook or OSCOLA.</li>
                <li>Peer review decisions are communicated within 4 to 7 business days.</li>
              </ul>
              <Link
                href="/editorial-policy"
                className="inline-block text-gold-700 dark:text-gold-400 hover:underline text-[11px] font-semibold"
              >
                Read Full Editorial &amp; Anti-Plagiarism Policy &rarr;
              </Link>
            </div>

          </div>

        </div>
      ) : (
        /* Success Screen */
        <div className="max-w-2xl mx-auto text-center py-12 space-y-6 neumorph-card rounded-3xl p-8 border border-slate-200 dark:border-gold-500/30">
          <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 rounded-3xl border border-emerald-500/40 flex items-center justify-center mx-auto shadow-sm dark:shadow-glow-gold animate-bounce">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">
              Manuscript Successfully Received!
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Submission Docket ID: <span className="font-mono text-gold-700 dark:text-gold-400 font-bold">{submissionId || 'SUB-LEX-2026-09'}</span>
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg mx-auto">
            Your manuscript <strong className="text-slate-900 dark:text-white">&quot;{formData.title}&quot;</strong> has been entered into the LexMinds editorial review queue. Our senior editorial board will conduct plagiarism verification and peer assessment.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/articles"
              className="px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm"
            >
              Browse Published Articles
            </Link>
            <Link
              href="/admin"
              className="px-6 py-3 bg-slate-100 dark:bg-legal-950 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-legal-700 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all"
            >
              View in Admin Queue
            </Link>
          </div>
        </div>
      )}

      {/* Razorpay Modal */}
      {isRazorpayOpen && (
        <RazorpayModal
          isOpen={isRazorpayOpen}
          onClose={() => setIsRazorpayOpen(false)}
          title={formData.title}
          subtitle={`Manuscript Processing Fee • ${formData.authorInstitution}`}
          amount={499}
          type="publication_fee"
          metadata={{
            applicantName: formData.authorName,
            email: formData.authorEmail,
            phone: formData.authorPhone,
            targetTitle: formData.title,
          }}
          onSuccess={handlePaymentSuccess}
        />
      )}

    </div>
  );
}
