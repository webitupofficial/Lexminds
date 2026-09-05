// ==============================================================================
// Lex Minds Domain Data Models (Strict Types)
// ==============================================================================

/**
 * Finite explicit statuses for Internship Applications.
 */
export type InternshipApplicationStatus =
  | 'payment_pending'
  | 'paid'
  | 'under_review'
  | 'accepted'
  | 'waitlisted'
  | 'rejected'
  | 'completed'
  | 'certificate_issued'
  | 'cancelled';

/**
 * Internship Application Entity.
 * Strictly adheres to MVP specification: NO resume fields collected or processed.
 */
export interface InternshipApplication {
  applicationId: string;
  firebaseUid: string;
  verifiedEmail: string;
  applicantName: string;
  phone: string;
  institution: string;
  yearOfStudy: string;
  academicScore?: string;
  internshipKey: string;
  status: InternshipApplicationStatus;
  paymentRecordId: string;
  adminNotes?: string;
  createdAt: string; // ISO
  updatedAt: string; // ISO
}

/**
 * Finite explicit statuses for Article Submissions.
 */
export type ArticleSubmissionStatus =
  | 'payment_pending'
  | 'paid_submitted'
  | 'under_review'
  | 'revision_requested'
  | 'approved'
  | 'published'
  | 'rejected'
  | 'refunded'
  | 'withdrawn';

/**
 * Article Submission Entity.
 * Represents an author manuscript entering the peer-review queue.
 */
export interface ArticleSubmission {
  submissionId: string;
  firebaseUid: string;
  verifiedEmail: string;
  authorName: string;
  designation: string;
  institution: string;
  authorBio: string;
  signatureLine: string; // Author's preferred credit / byline
  title: string;
  category: string;
  keywords: string[];
  abstract: string;
  content: string; // Full text or restricted reviewer document URL
  originalityDeclaration: boolean;
  consentToPublish: boolean;
  paymentRecordId: string;
  status: ArticleSubmissionStatus;
  reviewerNotes?: string;
  plagiarismNotes?: string;
  aiReviewNotes?: string;
  publicationUrl?: string;
  createdAt: string; // ISO
  reviewedAt?: string; // ISO
  publishedAt?: string; // ISO
  reviewerEmail?: string;
}

/**
 * Finite statuses for Payment Records.
 */
export type PaymentStatus = 'created' | 'verified' | 'failed' | 'refunded';

/**
 * Payment Record Entity.
 * Never stores card numbers, CVVs, or sensitive instrument data.
 */
export interface PaymentRecord {
  paymentRecordId: string;
  productKey: 'internship_enrollment' | 'article_submission' | string;
  internalReference: string; // Linked applicationId or submissionId
  firebaseUid: string;
  verifiedEmail: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  amountPaise: number; // Stored in paise (e.g. 29900 for ₹299)
  currency: string; // Usually 'INR'
  status: PaymentStatus;
  linkedEntityId: string;
  receipt: string;
  createdAt: string; // ISO
  verifiedAt?: string; // ISO
  webhookAt?: string; // ISO
  refundStatus?: 'none' | 'partial' | 'full';
  rawPayloadHash?: string;
}

/**
 * Certificate Record Entity.
 * Issued ONLY after verified completion of defined internship requirements.
 */
export interface CertificateRecord {
  certificateId: string;
  linkedApplicationId: string;
  studentName: string;
  internshipTitle: string;
  mentor: string;
  completionDate: string;
  verificationUrl: string;
  issuedStatus: 'issued' | 'revoked';
  issuedAt: string; // ISO
}

/**
 * Free Contact / Support / Grievance Enquiry Record.
 */
export interface ContactTicket {
  ticketId: string;
  verifiedEmail: string;
  name: string;
  phone: string;
  institution?: string;
  subject: string;
  message: string;
  status: 'received' | 'in_progress' | 'resolved';
  createdAt: string; // ISO
}

// ==============================================================================
// Content & Editorial Types (Sanity CMS Boundary)
// ==============================================================================

export interface Internship {
  id: string;
  slug: string;
  title: string;
  organization: string;
  orgType:
    | 'Tier-1 Law Firm'
    | 'Senior Advocate Chambers'
    | 'Corporate In-House'
    | 'Legal Tech & Research'
    | 'Think Tank'
    | 'Legal Education & Research';
  practiceArea:
    | 'Corporate & M&A'
    | 'Litigation & Dispute Resolution'
    | 'IPR & Tech Law'
    | 'Cyber & AI Governance'
    | 'Criminal & Constitutional Law'
    | 'Arbitration & Banking';
  location: string;
  mode: 'Remote' | 'On-site' | 'Hybrid';
  duration: string;
  stipend: string;
  applicationFee: number; // in INR
  seats: number;
  deadline: string;
  featured: boolean;
  description: string;
  responsibilities: string[];
  eligibility: string[];
  learningOutcomes: string[];
  selectionProcess: string[];
  postedDate: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  author: {
    name: string;
    title: string;
    institution: string;
    avatarUrl?: string;
    bio: string;
  };
  category:
    | 'Data Privacy & Tech Law'
    | 'Constitutional & Criminal'
    | 'Corporate & M&A'
    | 'Intellectual Property'
    | 'Arbitration'
    | 'Environmental Jurisprudence'
    | string;
  abstract: string;
  content: string;
  readTime: string;
  publishedAt: string;
  views: number;
  citationsCount: number;
  status: 'published' | 'draft' | 'under_review' | 'rejected';
  citationFormat: {
    bluebook: string;
    oscola: string;
    indian: string;
  };
  keywords: string[];
}

export interface PlatformMetric {
  totalPublishedArticles: number;
  totalInternshipApplicants: number;
  activeInternshipListings: number;
  totalRevenueCollectedINR: number;
}
