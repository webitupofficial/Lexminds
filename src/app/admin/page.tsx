'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  BookOpen, 
  Briefcase, 
  DollarSign, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ExternalLink, 
  FileText, 
  Sparkles, 
  Eye, 
  AlertCircle,
  RefreshCw,
  Award,
  Lock,
  MessageSquare
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import GoogleAuthGate from '@/components/GoogleAuthGate';
import { ArticleSubmission, InternshipApplication } from '@/lib/types';
import { User as FirebaseUser } from 'firebase/auth';

export default function AdminDashboardPage() {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(false);

  const [activeTab, setActiveTab] = useState<'submissions' | 'applications'>('submissions');
  const [submissions, setSubmissions] = useState<ArticleSubmission[]>([]);
  const [applications, setApplications] = useState<InternshipApplication[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<ArticleSubmission | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<InternshipApplication | null>(null);
  
  const [editorialNotes, setEditorialNotes] = useState('');
  const [plagiarismNotes, setPlagiarismNotes] = useState('');
  const [aiNotes, setAiNotes] = useState('');
  const [mentorName, setMentorName] = useState('LexMinds Senior Editorial Council');

  const [loading, setLoading] = useState(false);
  const [actionSuccess, setActionSuccess] = useState('');
  const [actionError, setActionError] = useState('');

  // When auth changes, verify admin permissions against server allowlist
  useEffect(() => {
    if (authToken) {
      verifyAdmin();
    } else {
      setIsAuthorized(null);
    }
  }, [authToken]);

  const verifyAdmin = async () => {
    setCheckingAuth(true);
    try {
      const res = await fetch('/api/admin/verify', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (res.ok) {
        setIsAuthorized(true);
        fetchData();
      } else {
        setIsAuthorized(false);
      }
    } catch {
      setIsAuthorized(false);
    } finally {
      setCheckingAuth(false);
    }
  };

  const fetchData = async () => {
    if (!authToken) return;
    setLoading(true);
    try {
      const [artRes, appRes] = await Promise.all([
        fetch('/api/admin/articles', {
          headers: { Authorization: `Bearer ${authToken}` },
        }),
        fetch('/api/admin/applications', {
          headers: { Authorization: `Bearer ${authToken}` },
        }),
      ]);

      if (artRes.ok) {
        const artData = await artRes.json();
        setSubmissions(artData.submissions || []);
      }
      if (appRes.ok) {
        const appData = await appRes.json();
        setApplications(appData.applications || []);
      }
    } catch (e: any) {
      console.error(e);
      setActionError('Failed to fetch admin data from server.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSubmissionStatus = async (
    submissionId: string,
    status: ArticleSubmission['status']
  ) => {
    setActionError('');
    setActionSuccess('');
    try {
      const res = await fetch('/api/admin/articles', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          submissionId,
          status,
          reviewerNotes: editorialNotes || `Status updated to ${status} by editorial desk.`,
          plagiarismNotes,
          aiReviewNotes: aiNotes,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setActionSuccess(`Article status updated to "${status.toUpperCase()}". ${status === 'published' ? 'It is now live on LexMinds Law Review.' : ''}`);
        setSelectedSubmission(null);
        setEditorialNotes('');
        setPlagiarismNotes('');
        setAiNotes('');
        fetchData();
      } else {
        setActionError(data.error || 'Failed to update article.');
      }
    } catch (e: any) {
      setActionError(e.message || 'Error executing action.');
    }
  };

  const handleUpdateApplicantStatus = async (
    applicationId: string,
    status: InternshipApplication['status']
  ) => {
    setActionError('');
    setActionSuccess('');
    try {
      const res = await fetch('/api/admin/applications', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          applicationId,
          status,
          adminNotes: editorialNotes || `Status updated to ${status}.`,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setActionSuccess(`Application status updated to "${status.toUpperCase()}".`);
        setSelectedApplication(null);
        setEditorialNotes('');
        fetchData();
      } else {
        setActionError(data.error || 'Failed to update application.');
      }
    } catch (e: any) {
      setActionError(e.message || 'Error updating application.');
    }
  };

  const handleIssueCertificate = async (applicationId: string) => {
    setActionError('');
    setActionSuccess('');
    try {
      const res = await fetch('/api/admin/certificates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          applicationId,
          mentor: mentorName,
          completionDate: new Date().toISOString().split('T')[0],
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setActionSuccess(`Certificate issued successfully! ID: ${data.certificate.certificateId}`);
        setSelectedApplication(null);
        fetchData();
      } else {
        setActionError(data.error || 'Failed to issue certificate.');
      }
    } catch (e: any) {
      setActionError(e.message || 'Error issuing certificate.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <Breadcrumbs items={[{ name: 'Editorial & Moderation Portal', href: '/admin' }]} />

      {/* Admin Auth Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-legal-800 pb-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-gold-700 dark:text-gold-400 bg-gold-50 dark:bg-gold-950/80 px-3 py-1 rounded border border-gold-500/20">
              Restricted Access &bull; 2-Admin Allowlist
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 dark:text-white mt-2">
            LexMinds Editorial Moderation Desk
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Official dashboard for manuscript peer evaluation, research fellow administration, and verified certificate generation.
          </p>
        </div>

        {isAuthorized && (
          <button
            onClick={fetchData}
            disabled={loading}
            className="px-4 py-2 bg-slate-100 dark:bg-legal-900 border border-slate-300 dark:border-legal-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center space-x-1.5 transition-colors self-start md:self-auto"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Sync Records</span>
          </button>
        )}
      </div>

      {/* Authentication & Authorization Gate */}
      <GoogleAuthGate
        requireAuthBeforeRender={true}
        title="LexMinds Administrator Sign-In"
        description="Sign in with an authorized Google account listed in the server-side administrator allowlist."
        onAuthStateChange={(user, token) => {
          setCurrentUser(user);
          setAuthToken(token);
        }}
      >
        {checkingAuth ? (
          <div className="p-12 text-center text-xs text-slate-500 space-y-3">
            <RefreshCw className="w-6 h-6 animate-spin text-gold-500 mx-auto" />
            <p>Verifying server administrator allowlist...</p>
          </div>
        ) : isAuthorized === false ? (
          <div className="p-8 rounded-3xl bg-rose-50 dark:bg-rose-950/20 border border-rose-500/30 text-center space-y-3 max-w-lg mx-auto">
            <Lock className="w-8 h-8 text-rose-600 dark:text-rose-400 mx-auto" />
            <h3 className="text-lg font-serif font-bold text-rose-700 dark:text-rose-400">
              Access Denied (403 Forbidden)
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Your Google account (<strong className="font-mono text-slate-900 dark:text-white">{currentUser?.email}</strong>) is not listed in the server&apos;s <code className="font-mono text-gold-600">ADMIN_EMAILS</code> allowlist.
            </p>
            <p className="text-[11px] text-slate-400">
              Contact the platform owner if you believe your account should have review access.
            </p>
          </div>
        ) : isAuthorized === true ? (
          <div className="space-y-8 animate-fade-in">
            
            {/* Feedback Banners */}
            {actionSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 text-xs flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{actionSuccess}</span>
              </div>
            )}
            {actionError && (
              <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-500/40 text-rose-700 dark:text-rose-300 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{actionError}</span>
              </div>
            )}

            {/* Real Platform Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-legal-900/60 border border-slate-200 dark:border-legal-800 space-y-1">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-semibold">Manuscripts in Review</span>
                  <BookOpen className="w-4 h-4 text-gold-600" />
                </div>
                <div className="text-2xl font-serif font-bold text-slate-900 dark:text-white">
                  {submissions.length}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-legal-900/60 border border-slate-200 dark:border-legal-800 space-y-1">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-semibold">Fellowship Enrollees</span>
                  <Briefcase className="w-4 h-4 text-gold-600" />
                </div>
                <div className="text-2xl font-serif font-bold text-slate-900 dark:text-white">
                  {applications.length}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-legal-900/60 border border-slate-200 dark:border-legal-800 space-y-1">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-semibold">Published Treatises</span>
                  <Sparkles className="w-4 h-4 text-gold-600" />
                </div>
                <div className="text-2xl font-serif font-bold text-slate-900 dark:text-white">
                  {submissions.filter(s => s.status === 'published').length}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-200 dark:border-legal-800 text-xs font-semibold space-x-6">
              <button
                onClick={() => setActiveTab('submissions')}
                className={`pb-3 border-b-2 transition-all flex items-center space-x-2 ${activeTab === 'submissions' ? 'border-gold-500 text-gold-700 dark:text-gold-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Article Submissions ({submissions.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('applications')}
                className={`pb-3 border-b-2 transition-all flex items-center space-x-2 ${activeTab === 'applications' ? 'border-gold-500 text-gold-700 dark:text-gold-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Fellowship Enrollees ({applications.length})</span>
              </button>
            </div>

            {/* Tab 1: Submissions Queue */}
            {activeTab === 'submissions' && (
              <div className="space-y-4">
                {submissions.length === 0 ? (
                  <div className="p-8 text-center text-xs text-slate-400 bg-slate-50 dark:bg-legal-900/30 rounded-2xl">
                    No article submissions logged yet.
                  </div>
                ) : (
                  submissions.map((sub) => (
                    <div
                      key={sub.submissionId}
                      className="p-5 rounded-2xl bg-slate-50 dark:bg-legal-900/40 border border-slate-200 dark:border-legal-800 space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-xs font-bold text-gold-700 dark:text-gold-400">
                            {sub.submissionId}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded uppercase font-bold bg-slate-200 dark:bg-legal-800 text-slate-700 dark:text-slate-300">
                            {sub.status}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400">
                          {sub.createdAt.split('T')[0]}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-base font-serif font-bold text-slate-900 dark:text-white">
                          {sub.title}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          By <strong>{sub.authorName}</strong> ({sub.designation}, {sub.institution}) &bull; Byline: <em>{sub.signatureLine}</em>
                        </p>
                      </div>

                      <div className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                        <strong>Abstract:</strong> {sub.abstract}
                      </div>

                      <div className="pt-2 border-t border-slate-200 dark:border-legal-800 flex flex-wrap items-center justify-between gap-2">
                        <button
                          onClick={() => setSelectedSubmission(sub)}
                          className="text-xs text-gold-700 dark:text-gold-400 font-semibold hover:underline flex items-center space-x-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Review Full Manuscript &amp; Take Action</span>
                        </button>
                        {sub.publicationUrl && (
                          <Link
                            href={sub.publicationUrl}
                            target="_blank"
                            className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline flex items-center space-x-1"
                          >
                            <span>View Live Treatise</span>
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Tab 2: Applications Queue */}
            {activeTab === 'applications' && (
              <div className="space-y-4">
                {applications.length === 0 ? (
                  <div className="p-8 text-center text-xs text-slate-400 bg-slate-50 dark:bg-legal-900/30 rounded-2xl">
                    No fellowship applications registered yet.
                  </div>
                ) : (
                  applications.map((app) => (
                    <div
                      key={app.applicationId}
                      className="p-5 rounded-2xl bg-slate-50 dark:bg-legal-900/40 border border-slate-200 dark:border-legal-800 space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-xs font-bold text-gold-700 dark:text-gold-400">
                            {app.applicationId}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded uppercase font-bold bg-slate-200 dark:bg-legal-800 text-slate-700 dark:text-slate-300">
                            {app.status}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400">
                          {app.createdAt.split('T')[0]}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-base font-serif font-bold text-slate-900 dark:text-white">
                          {app.applicantName}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {app.institution} &bull; {app.yearOfStudy} &bull; Score: {app.academicScore || 'N/A'}
                        </p>
                        <p className="text-xs text-slate-400 font-mono mt-0.5">
                          Email: {app.verifiedEmail} &bull; Phone: {app.phone}
                        </p>
                      </div>

                      {app.adminNotes && (
                        <div className="text-xs text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-legal-900 p-2.5 rounded-xl">
                          <strong>SOP / Notes:</strong> {app.adminNotes}
                        </div>
                      )}

                      <div className="pt-2 border-t border-slate-200 dark:border-legal-800 flex flex-wrap items-center justify-between gap-2">
                        <button
                          onClick={() => setSelectedApplication(app)}
                          className="text-xs text-gold-700 dark:text-gold-400 font-semibold hover:underline flex items-center space-x-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Manage Fellow &amp; Certification</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Submission Detail Modal */}
            {selectedSubmission && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 dark:bg-black/80 backdrop-blur-sm">
                <div className="relative w-full max-w-3xl rounded-3xl bg-white dark:bg-legal-950 border border-slate-200 dark:border-gold-500/30 p-6 space-y-5 max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center border-b border-slate-200 dark:border-legal-800 pb-3">
                    <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-white">
                      Review Manuscript: {selectedSubmission.title}
                    </h3>
                    <button onClick={() => setSelectedSubmission(null)} className="text-slate-400 hover:text-white">
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                    <p><strong>Author:</strong> {selectedSubmission.authorName} ({selectedSubmission.designation}, {selectedSubmission.institution})</p>
                    <p><strong>Verified Email:</strong> {selectedSubmission.verifiedEmail}</p>
                    <p><strong>Credit Line:</strong> {selectedSubmission.signatureLine}</p>
                    <p><strong>Bio:</strong> {selectedSubmission.authorBio}</p>
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-legal-900 border border-slate-200 dark:border-legal-800 space-y-2">
                      <strong className="block text-slate-900 dark:text-white">Abstract:</strong>
                      <p>{selectedSubmission.abstract}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-legal-900 border border-slate-200 dark:border-legal-800 space-y-2 max-h-60 overflow-y-auto font-mono text-[11px]">
                      <strong className="block text-slate-900 dark:text-white">Manuscript Content / Link:</strong>
                      <p className="whitespace-pre-wrap">{selectedSubmission.content}</p>
                    </div>
                  </div>

                  {/* Editorial Actions Input */}
                  <div className="space-y-3 pt-3 border-t border-slate-200 dark:border-legal-800">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Editorial Decision Feedback / Notes
                      </label>
                      <textarea
                        rows={2}
                        value={editorialNotes}
                        onChange={(e) => setEditorialNotes(e.target.value)}
                        placeholder="Notes for the review record and author notice..."
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-legal-900 border border-slate-300 dark:border-legal-700 text-xs text-slate-900 dark:text-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-medium text-slate-400 mb-1">Plagiarism Notes (Turnitin %)</label>
                        <input
                          type="text"
                          value={plagiarismNotes}
                          onChange={(e) => setPlagiarismNotes(e.target.value)}
                          placeholder="e.g. 3.2% similarity verified"
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-legal-900 border border-slate-300 dark:border-legal-700 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-slate-400 mb-1">AI-Content Screening Notes</label>
                        <input
                          type="text"
                          value={aiNotes}
                          onChange={(e) => setAiNotes(e.target.value)}
                          placeholder="e.g. Cleared human scholarship"
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-legal-900 border border-slate-300 dark:border-legal-700 text-xs"
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      <button
                        onClick={() => handleUpdateSubmissionStatus(selectedSubmission.submissionId, 'published')}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md"
                      >
                        Approve &amp; Publish Live
                      </button>
                      <button
                        onClick={() => handleUpdateSubmissionStatus(selectedSubmission.submissionId, 'revision_requested')}
                        className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs rounded-xl"
                      >
                        Request Revision
                      </button>
                      <button
                        onClick={() => handleUpdateSubmissionStatus(selectedSubmission.submissionId, 'rejected')}
                        className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs rounded-xl"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Application Detail Modal */}
            {selectedApplication && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 dark:bg-black/80 backdrop-blur-sm">
                <div className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-legal-950 border border-slate-200 dark:border-gold-500/30 p-6 space-y-5 max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center border-b border-slate-200 dark:border-legal-800 pb-3">
                    <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-white">
                      Manage Fellowship: {selectedApplication.applicantName}
                    </h3>
                    <button onClick={() => setSelectedApplication(null)} className="text-slate-400 hover:text-white">
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                    <p><strong>Application Docket:</strong> <span className="font-mono text-gold-600">{selectedApplication.applicationId}</span></p>
                    <p><strong>Institution:</strong> {selectedApplication.institution} &bull; {selectedApplication.yearOfStudy}</p>
                    <p><strong>Academic Score:</strong> {selectedApplication.academicScore || 'N/A'}</p>
                    <p><strong>Phone:</strong> {selectedApplication.phone}</p>
                    <p><strong>Email:</strong> {selectedApplication.verifiedEmail}</p>
                    <p><strong>Current Status:</strong> <span className="uppercase font-bold text-emerald-500">{selectedApplication.status}</span></p>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-legal-900 border border-slate-200 dark:border-legal-800">
                      <strong>Statement of Purpose:</strong>
                      <p className="mt-1">{selectedApplication.adminNotes || 'No SOP provided'}</p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-slate-200 dark:border-legal-800">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-400 mb-1">
                        Mentor Assigned (for certificate)
                      </label>
                      <input
                        type="text"
                        value={mentorName}
                        onChange={(e) => setMentorName(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-legal-900 border border-slate-300 dark:border-legal-700 text-xs"
                      />
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      <button
                        onClick={() => handleUpdateApplicantStatus(selectedApplication.applicationId, 'accepted')}
                        className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl"
                      >
                        Accept Application
                      </button>
                      <button
                        onClick={() => handleUpdateApplicantStatus(selectedApplication.applicationId, 'completed')}
                        className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl"
                      >
                        Mark Requirements Completed
                      </button>
                      <button
                        onClick={() => handleIssueCertificate(selectedApplication.applicationId)}
                        disabled={selectedApplication.status !== 'completed'}
                        className="px-3.5 py-2 bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold text-xs rounded-xl disabled:opacity-40 flex items-center space-x-1"
                      >
                        <Award className="w-3.5 h-3.5" />
                        <span>Issue Verifiable Certificate</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        ) : null}
      </GoogleAuthGate>

    </div>
  );
}
