'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  BookOpen, 
  Briefcase, 
  Users, 
  DollarSign, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ExternalLink, 
  FileText, 
  Plus, 
  Sparkles, 
  Search, 
  Filter, 
  Eye, 
  AlertCircle,
  RefreshCw,
  Building,
  GraduationCap
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { ArticleSubmission, InternshipApplication, Internship } from '@/lib/types';
import { INITIAL_SUBMISSIONS, INITIAL_APPLICATIONS, INITIAL_INTERNSHIPS, INITIAL_METRICS } from '@/lib/data-store';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'submissions' | 'applications' | 'new_internship'>('submissions');
  const [submissions, setSubmissions] = useState<ArticleSubmission[]>(INITIAL_SUBMISSIONS);
  const [applications, setApplications] = useState<InternshipApplication[]>(INITIAL_APPLICATIONS);
  const [selectedSubmission, setSelectedSubmission] = useState<ArticleSubmission | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<InternshipApplication | null>(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [loading, setLoading] = useState(false);
  const [actionSuccess, setActionSuccess] = useState('');

  // Fetch latest state on mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const artRes = await fetch('/api/articles?all=true');
      const artData = await artRes.json();
      if (artData.submissions) setSubmissions(artData.submissions);

      const appRes = await fetch('/api/applications');
      const appData = await appRes.json();
      if (appData.applications) setApplications(appData.applications);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSubmission = async (id: string, status: 'published' | 'under_review' | 'rejected') => {
    try {
      const res = await fetch('/api/articles', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionId: id,
          status,
          feedback: feedbackText || (status === 'published' ? 'Approved & Published Live to LexMinds Law Review.' : 'Status updated.')
        })
      });
      const data = await res.json();
      if (data.success) {
        setSubmissions(data.submissions);
        setActionSuccess(`Submission marked as ${status.toUpperCase()}! ${status === 'published' ? 'It is now live on the website.' : ''}`);
        setSelectedSubmission(null);
        setFeedbackText('');
        setTimeout(() => setActionSuccess(''), 4000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateApplicantStatus = async (id: string, status: any) => {
    try {
      const res = await fetch('/api/applications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicationId: id,
          status
        })
      });
      const data = await res.json();
      if (data.success) {
        setApplications(data.applications);
        setActionSuccess(`Applicant status updated to ${status.toUpperCase()}`);
        setTimeout(() => setActionSuccess(''), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const totalRevenue = 
    applications.reduce((sum, a) => sum + (a.amountPaid || 0), 0) + 
    submissions.reduce((sum, s) => sum + (s.amountPaid || 0), 0) + 
    492000;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Breadcrumbs & Header */}
      <div className="space-y-3">
        <Breadcrumbs items={[{ name: 'Editorial & Admin Portal', href: '/admin' }]} />
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-legal-800 pb-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-gold-400">
              <ShieldCheck className="w-4 h-4" />
              <span>LexMinds Editorial & ATS Command Center</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-1">
              Admin & Content Moderation Dashboard
            </h1>
          </div>

          <button
            onClick={fetchData}
            disabled={loading}
            className="px-4 py-2 bg-legal-850 hover:bg-legal-800 text-slate-300 hover:text-white border border-legal-700 text-xs font-semibold rounded-xl flex items-center space-x-1.5 shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Live Data</span>
          </button>
        </div>
      </div>

      {/* Success Notification Alert */}
      {actionSuccess && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center space-x-2 animate-fade-in shadow-lg">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* KPI Metrics Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-legal-900/60 border border-legal-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase">Pending Articles</span>
            <BookOpen className="w-4 h-4 text-gold-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-white">
            {submissions.filter(s => s.status !== 'published').length}
          </div>
          <div className="text-[11px] text-gold-400">Awaiting peer review</div>
        </div>

        <div className="p-5 rounded-2xl bg-legal-900/60 border border-legal-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase">Intern Applicants</span>
            <Users className="w-4 h-4 text-gold-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-white">
            {applications.length + 1420}
          </div>
          <div className="text-[11px] text-emerald-400">Active across 36 firms</div>
        </div>

        <div className="p-5 rounded-2xl bg-legal-900/60 border border-legal-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase">Active Openings</span>
            <Briefcase className="w-4 h-4 text-gold-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-white">
            {INITIAL_INTERNSHIPS.length}
          </div>
          <div className="text-[11px] text-slate-400">Tier-1 & SC Chambers</div>
        </div>

        <div className="p-5 rounded-2xl bg-legal-900/60 border border-gold-500/30 bg-gradient-to-br from-gold-950/40 to-legal-900 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gold-400 font-semibold uppercase">Total Revenue (INR)</span>
            <DollarSign className="w-4 h-4 text-gold-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-gold-300">
            ₹{totalRevenue.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-emerald-400">Processed via Razorpay</div>
        </div>

      </div>

      {/* Tabs Switcher */}
      <div className="flex space-x-2 border-b border-legal-800 pb-2">
        <button
          onClick={() => setActiveTab('submissions')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-2 ${
            activeTab === 'submissions'
              ? 'bg-gold-500 text-legal-950 shadow-glow-gold'
              : 'bg-legal-900 text-slate-400 hover:text-white border border-legal-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Article Moderation Queue ({submissions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('applications')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-2 ${
            activeTab === 'applications'
              ? 'bg-gold-500 text-legal-950 shadow-glow-gold'
              : 'bg-legal-900 text-slate-400 hover:text-white border border-legal-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Internship ATS ({applications.length})</span>
        </button>
      </div>

      {/* TAB 1: ARTICLE MODERATION QUEUE */}
      {activeTab === 'submissions' && (
        <div className="space-y-6">
          <div className="rounded-2xl bg-legal-900/50 border border-legal-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-legal-950 text-gold-400 font-bold uppercase tracking-wider border-b border-legal-800">
                  <tr>
                    <th className="p-4">Submission Docket</th>
                    <th className="p-4">Author & College</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Payment</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-legal-800/60">
                  {submissions.map((sub) => (
                    <tr key={sub.id} className="hover:bg-legal-850/50 transition-colors">
                      <td className="p-4 font-mono font-bold text-white max-w-xs">
                        <div className="line-clamp-1">{sub.title}</div>
                        <span className="text-[10px] text-slate-500 font-normal">{sub.id}</span>
                      </td>
                      <td className="p-4">
                        <div className="font-semibold text-slate-200">{sub.authorName}</div>
                        <div className="text-[10px] text-slate-400 line-clamp-1">{sub.authorInstitution}</div>
                      </td>
                      <td className="p-4 text-gold-400 font-medium">{sub.category}</td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase">
                          Paid ₹{sub.amountPaid || 499}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                            sub.status === 'published'
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                              : sub.status === 'under_review'
                              ? 'bg-amber-950 text-amber-400 border border-amber-500/30'
                              : 'bg-legal-800 text-slate-300'
                          }`}
                        >
                          {sub.status}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => setSelectedSubmission(sub)}
                          className="px-3 py-1.5 rounded-lg bg-legal-800 hover:bg-gold-500 text-slate-200 hover:text-legal-950 font-bold transition-all text-[11px]"
                        >
                          Inspect & Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INTERNSHIP APPLICANT TRACKING SYSTEM (ATS) */}
      {activeTab === 'applications' && (
        <div className="space-y-6">
          <div className="rounded-2xl bg-legal-900/50 border border-legal-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-legal-950 text-gold-400 font-bold uppercase tracking-wider border-b border-legal-800">
                  <tr>
                    <th className="p-4">Applicant</th>
                    <th className="p-4">Internship Role</th>
                    <th className="p-4">Law School & Year</th>
                    <th className="p-4">CGPA</th>
                    <th className="p-4">Status & Stage</th>
                    <th className="p-4 text-right">Resume & Review</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-legal-800/60">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-legal-850/50 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-white">{app.fullName}</div>
                        <div className="text-[10px] text-slate-400">{app.email}</div>
                        <div className="text-[10px] text-slate-500">{app.phone}</div>
                      </td>
                      <td className="p-4 font-semibold text-slate-200 max-w-xs">
                        <div className="line-clamp-2">{app.internshipTitle}</div>
                        <span className="text-[10px] text-gold-400">Fee: ₹{app.amountPaid} (Paid)</span>
                      </td>
                      <td className="p-4 text-slate-300">
                        <div className="font-medium">{app.collegeName}</div>
                        <div className="text-[10px] text-slate-400">{app.yearOfStudy}</div>
                      </td>
                      <td className="p-4 font-bold text-gold-300">{app.cgpa}</td>
                      <td className="p-4">
                        <select
                          value={app.paymentStatus}
                          onChange={(e) => handleUpdateApplicantStatus(app.id, e.target.value)}
                          className="bg-legal-950 border border-legal-700 text-xs text-gold-400 rounded-lg p-1.5 focus:outline-none"
                        >
                          <option value="submitted">Submitted</option>
                          <option value="under_review">Under Review</option>
                          <option value="shortlisted">Shortlisted</option>
                          <option value="accepted">Accepted (Offer)</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => setSelectedApplication(app)}
                          className="px-3 py-1.5 rounded-lg bg-legal-800 hover:bg-gold-500 text-slate-200 hover:text-legal-950 font-bold transition-all text-[11px]"
                        >
                          View SOP
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* INSPECT SUBMISSION MODAL */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-3xl rounded-3xl bg-legal-950 border border-gold-500/40 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6">
            
            <div className="flex items-center justify-between border-b border-legal-800 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400 px-2.5 py-0.5 rounded bg-legal-900 border border-gold-500/20">
                  {selectedSubmission.category}
                </span>
                <h3 className="text-xl font-serif font-bold text-white mt-1">
                  {selectedSubmission.title}
                </h3>
                <p className="text-xs text-slate-400">
                  By <strong>{selectedSubmission.authorName}</strong> ({selectedSubmission.authorInstitution})
                </p>
              </div>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="text-slate-400 hover:text-white p-2"
              >
                &times;
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="p-4 rounded-xl bg-legal-900/60 border border-legal-800">
                <h4 className="font-bold text-gold-400 uppercase text-[10px] mb-1">Abstract:</h4>
                <p className="leading-relaxed">{selectedSubmission.abstract}</p>
              </div>

              <div className="p-4 rounded-xl bg-legal-900/60 border border-legal-800">
                <h4 className="font-bold text-gold-400 uppercase text-[10px] mb-1">Full Content Preview:</h4>
                <div className="max-h-60 overflow-y-auto font-mono text-[11px] whitespace-pre-wrap leading-relaxed text-slate-300">
                  {selectedSubmission.content}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Editorial Feedback / Revisions:
                </label>
                <input
                  type="text"
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="e.g. Plagiarism check passed (3%). Approved for Volume IV publication."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-legal-900 border border-legal-700 text-white placeholder-slate-500 text-xs"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-legal-800">
              <div className="text-xs text-slate-400">
                Current Status: <strong className="text-gold-400 uppercase">{selectedSubmission.status}</strong>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleUpdateSubmission(selectedSubmission.id, 'rejected')}
                  className="px-4 py-2 rounded-xl bg-rose-950 text-rose-300 hover:bg-rose-900 text-xs font-bold uppercase transition-all"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleUpdateSubmission(selectedSubmission.id, 'under_review')}
                  className="px-4 py-2 rounded-xl bg-amber-950 text-amber-300 hover:bg-amber-900 text-xs font-bold uppercase transition-all"
                >
                  Mark Under Review
                </button>
                <button
                  onClick={() => handleUpdateSubmission(selectedSubmission.id, 'published')}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400 text-legal-950 font-bold text-xs uppercase tracking-wider shadow-glow-gold hover:from-gold-300 transition-all flex items-center space-x-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Approve & Publish Live</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* INSPECT APPLICANT SOP MODAL */}
      {selectedApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-3xl bg-legal-950 border border-gold-500/40 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6">
            
            <div className="flex items-center justify-between border-b border-legal-800 pb-4">
              <div>
                <h3 className="text-xl font-serif font-bold text-white">
                  {selectedApplication.fullName}
                </h3>
                <p className="text-xs text-gold-400">
                  {selectedApplication.collegeName} &bull; CGPA: {selectedApplication.cgpa}
                </p>
              </div>
              <button
                onClick={() => setSelectedApplication(null)}
                className="text-slate-400 hover:text-white p-2"
              >
                &times;
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-300">
              <div>
                <span className="text-slate-400 block mb-1">Applying for:</span>
                <span className="font-bold text-white text-sm">{selectedApplication.internshipTitle}</span>
              </div>

              <div className="p-4 rounded-xl bg-legal-900/60 border border-legal-800 space-y-2">
                <span className="font-bold text-gold-400 uppercase text-[10px]">Statement of Purpose (SOP):</span>
                <p className="leading-relaxed text-slate-200">{selectedApplication.sop}</p>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-legal-900 border border-legal-800">
                <span className="text-slate-400">Resume Cloud Link:</span>
                <a
                  href={selectedApplication.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-400 hover:text-gold-300 font-semibold flex items-center space-x-1"
                >
                  <span>Open Resume Document</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-legal-800">
              <button
                onClick={() => setSelectedApplication(null)}
                className="px-5 py-2 bg-legal-800 hover:bg-legal-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
