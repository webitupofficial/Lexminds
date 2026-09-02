export interface Internship {
  id: string;
  slug: string;
  title: string;
  organization: string;
  orgType: 'Tier-1 Law Firm' | 'Senior Advocate Chambers' | 'Corporate In-House' | 'Legal Tech & Research' | 'Think Tank';
  practiceArea: 'Corporate & M&A' | 'Litigation & Dispute Resolution' | 'IPR & Tech Law' | 'Cyber & AI Governance' | 'Criminal & Constitutional Law' | 'Arbitration & Banking';
  location: string;
  mode: 'Remote' | 'On-site' | 'Hybrid';
  duration: string;
  stipend: string;
  applicationFee: number;
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

export interface InternshipApplication {
  id: string;
  internshipId: string;
  internshipTitle: string;
  fullName: string;
  email: string;
  phone: string;
  collegeName: string;
  yearOfStudy: string;
  cgpa: string;
  linkedinUrl: string;
  resumeUrl: string;
  sop: string;
  paymentStatus: 'pending_payment' | 'submitted' | 'under_review' | 'shortlisted' | 'accepted' | 'rejected';
  paymentId?: string;
  amountPaid: number;
  createdAt: string;
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
  category: 'Data Privacy & Tech Law' | 'Constitutional & Criminal' | 'Corporate & M&A' | 'Intellectual Property' | 'Arbitration' | 'Environmental Jurisprudence';
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

export interface ArticleSubmission {
  id: string;
  authorName: string;
  authorEmail: string;
  authorPhone: string;
  authorInstitution: string;
  authorDesignation: string;
  title: string;
  category: string;
  abstract: string;
  content: string;
  keywords: string[];
  paymentStatus: 'pending_payment' | 'paid';
  paymentId?: string;
  amountPaid: number;
  status: 'draft' | 'under_review' | 'published' | 'rejected';
  editorialFeedback?: string;
  submittedAt: string;
}

export interface PlatformMetric {
  totalPublishedArticles: number;
  totalInternshipApplicants: number;
  activeInternshipListings: number;
  partnerLawFirms: number;
  collegesRepresented: number;
  totalRevenueCollected: number;
}
