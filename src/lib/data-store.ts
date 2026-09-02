import { Internship, Article, InternshipApplication, ArticleSubmission, PlatformMetric } from './types';

// Initial High-Value Real Seed Data for Legal Internships
export const INITIAL_INTERNSHIPS: Internship[] = [
  {
    id: 'int-1',
    slug: 'legal-research-editorial-fellowship',
    title: 'Legal Research & Editorial Fellowship',
    organization: 'LexMinds Editorial & Research Wing',
    orgType: 'Legal Tech & Research',
    practiceArea: 'Criminal & Constitutional Law',
    location: 'Remote (Pan-India)',
    mode: 'Remote',
    duration: '8 Weeks',
    stipend: 'Honorarium & Research Publication Grant',
    applicationFee: 299,
    seats: 5,
    deadline: '2026-10-15',
    featured: true,
    description: 'A selective research fellowship designed for motivated law students to work on cutting-edge statutory analyses, case digests, and double-blind peer-reviewed journal editing.',
    responsibilities: [
      'Conduct analytical legal research on contemporary landmark judgments and legislative amendments.',
      'Assist the editorial board in manuscript screening, citations review (Bluebook/OSCOLA), and preliminary peer evaluations.',
      'Author high-impact legal commentary and case briefs for publication in the LexMinds Law Review.',
      'Participate in weekly research roundtables on emerging jurisprudence in corporate, tech, and constitutional law.'
    ],
    eligibility: [
      'Enrolled in an undergraduate or postgraduate law program (3-year LL.B or 5-year Integrated LL.B).',
      'Strong analytical reasoning, academic writing, and legal drafting capabilities.',
      'Demonstrated interest in legal scholarship, constitutional analysis, or commercial laws.',
      'Commitment of 10-12 hours per week for 8 weeks.'
    ],
    learningOutcomes: [
      'Direct editorial mentorship from experienced legal academics and practitioners.',
      'Guaranteed fast-track peer-review and publication opportunity for top-rated research papers.',
      'Official Certificate of Completion with verifiable credentials.',
      'Networking with student researchers and legal scholars across top institutions.'
    ],
    selectionProcess: [
      'Stage 1: Statement of Purpose (SOP) & Academic CV screening.',
      'Stage 2: Short Legal Research & Case Analysis assessment.',
      'Stage 3: Virtual discussion with the Editorial Council.'
    ],
    postedDate: '2026-09-01'
  }
];

// Seed Data for Peer-Reviewed Published Legal Articles
export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-1',
    slug: 'digital-personal-data-protection-act-2023-compliance-framework',
    title: 'Architecting Compliance Under India’s DPDP Act 2023: A Critical Examination of Significant Data Fiduciaries',
    author: {
      name: 'Adv. Ishaan Sen',
      title: 'Principal Associate, Tech & Regulatory Practice',
      institution: 'National Law School of India University (NLSIU), Bengaluru',
      bio: 'Ishaan specializes in technology jurisprudence, privacy governance, and cross-border digital economy regulation.'
    },
    category: 'Data Privacy & Tech Law',
    abstract: 'This treatise dissects the statutory duties imposed upon Significant Data Fiduciaries (SDFs) under Section 10 of the Digital Personal Data Protection Act, 2023. By scrutinizing mandatory Data Protection Officers, Data Auditors, and cross-border transfer limitations, the author evaluates the operational readiness of Indian enterprises against the penal regime of up to ₹250 Crores.',
    content: `## 1. Introduction: The Dawn of Codified Privacy in India

The enactment of the **Digital Personal Data Protection Act, 2023 (DPDP Act)** marks a historic departure from the stopgap framework of Section 43A of the Information Technology Act, 2000. Codifying the fundamental right to privacy recognized in *Justice K.S. Puttaswamy (Retd.) v. Union of India (2017)*, the statute introduces a principles-based regime tailored for an economy approaching one billion connected citizens.

At the epicenter of this regulatory paradigm lies the classification of entities as **Data Fiduciaries** and the heightened category of **Significant Data Fiduciaries (SDFs)** under Section 10.

---

## 2. Thresholds for Designation as a Significant Data Fiduciary

Under Section 10(1), the Central Government exercises wide statutory discretion to notify any Data Fiduciary or class thereof as an SDF based on:

1. **Volume and Sensitivity of Personal Data Processed** (e.g., healthcare diagnostics, biometric authentication).
2. **Risk to Rights of Data Principals**, specifically vulnerable populations including minors.
3. **Potential Impact on the Sovereignty and Integrity of India**.
4. **Risk to Electoral Democracy and Public Order**.

\`\`\`
[Data Principal] ---> (Consent Manager / Notice) ---> [Data Fiduciary]
                                                             |
                                      +----------------------+----------------------+
                                      |                                             |
                              [Standard Fiduciary]                         [Significant Fiduciary (SDF)]
                              - Notice & Consent                           - Mandatory Resident DPO
                              - Reasonable Security Safeguards             - Independent Data Auditor
                              - Grievance Redressal (30 Days)              - Periodic DPIA Audits
\`\`\`

---

## 3. Mandatory Governance Obligations for SDFs

Entities designated as SDFs face four non-negotiable statutory mandates:

### 3.1 Appointment of a Resident Data Protection Officer (DPO)
Unlike standard compliance officers, the DPO under Section 10(2)(a) must be based in India, represent the point of contact for grievance redressal, and report directly to the Board of Directors.

### 3.2 Appointment of an Independent Data Auditor
SDFs must retain external certified auditors to evaluate compliance posture, cryptographic safeguards, and consent lifecycle integrity annually.

### 3.3 Data Protection Impact Assessments (DPIA)
Prior to initiating high-risk algorithmic processing or LLM model fine-tuning on personal datasets, SDFs must document risk mitigation strategies.

---

## 4. Penalties and Enforcement Mechanisms

The Data Protection Board of India (DPBI) is vested with civil court powers under Section 28. The penalty matrix set forth in the First Schedule is punitive:

| Violation | Maximum Statutory Penalty |
| :--- | :--- |
| Failure to adopt reasonable security safeguards to prevent data breach | Up to ₹250 Crores |
| Failure to notify Data Protection Board and Data Principal of breach | Up to ₹200 Crores |
| Non-compliance with additional obligations regarding Children's Data | Up to ₹200 Crores |
| Failure to observe duties of Significant Data Fiduciaries | Up to ₹150 Crores |

---

## 5. Conclusion & Forward-Looking Roadmap

The DPDP Act transforms corporate privacy from a tick-box legal exercise into a board-level fiduciary discipline. Indian enterprises must prioritize data mapping, automated consent revocation pipelines, and vendor risk assessments before the enforcement rules are formally gazetted.`,
    readTime: '7 min read',
    publishedAt: '2026-08-28',
    views: 3420,
    citationsCount: 18,
    status: 'published',
    citationFormat: {
      bluebook: 'Ishaan Sen, Architecting Compliance Under India’s DPDP Act 2023, 4 LEXMINDS L. REV. 112 (2026).',
      oscola: 'Ishaan Sen, ‘Architecting Compliance Under India’s DPDP Act 2023’ (2026) 4 LexMinds Law Review 112.',
      indian: 'Ishaan Sen, Architecting Compliance Under India’s DPDP Act 2023, (2026) 4 LMLR 112.'
    },
    keywords: ['DPDP Act 2023', 'Data Privacy', 'Data Protection Officer', 'Significant Data Fiduciary', 'MeitY', 'Tech Law']
  },
  {
    id: 'art-2',
    slug: 'bharatiya-nyaya-sanhita-criminal-jurisprudence-transition',
    title: 'Decolonizing the Penal Code: Analyzing the Bharatiya Nyaya Sanhita (BNS) and its Impact on Criminal Justice',
    author: {
      name: 'Prof. Ananya Mukherjee',
      title: 'Professor of Criminal Law & Constitutional Studies',
      institution: 'National Law University, Delhi (NLUD)',
      bio: 'Author of three treatises on penal reform and comparative criminal jurisprudence in South Asia.'
    },
    category: 'Constitutional & Criminal',
    abstract: 'A structural comparison between the Indian Penal Code, 1860 and the Bharatiya Nyaya Sanhita, 2023. The paper explores the codification of community service, organized crime, terrorism provisions, and procedural safeguards under the Bharatiya Nagarik Suraksha Sanhita (BNSS).',
    content: `## 1. Contextualizing the Legislative Overhaul

The replacement of the 164-year-old Indian Penal Code with the **Bharatiya Nyaya Sanhita, 2023 (BNS)** represents the most sweeping criminal law transition in post-independence India. Designed to prioritize justice (*Nyaya*) over colonial punishment (*Danda*), the new statutory framework reshapes offenses against the human body, the state, and financial systems.

---

## 2. Key Structural Innovations in BNS

### 2.1 Introduction of Community Service as a Punishment
Under Section 4(f) of the BNS, community service is formally introduced as an alternative to incarceration for minor offenses (such as small thefts, non-violent defamation, and suicide attempt to deter public servant).

### 2.2 Codification of Organized Crime (Section 111)
For decades, states relied on fragmented state legislations (MCOCA, KCOCA). Section 111 creates a unified federal penal definition for organized crime syndicates, contract killing, and illicit cyber syndicates.

### 2.3 Offenses Against the State & Replacement of Sedition
Section 124A (Sedition) of the old IPC has been replaced by Section 152 of the BNS, which punishes acts endangering the sovereignty, unity, and integrity of India with stringent mens rea requirements.

---

## 3. Practical Challenges for the Bar and Trial Courts

1. **Retrospective Applicability**: Offenses committed prior to the commencement date remain governed by IPC under Article 20(1) of the Constitution.
2. **Dual-Docket Burden**: Trial courts will manage simultaneous trial proceedings under IPC and BNS for the next decade.
3. **Forensic Digital Evidence (BSA)**: Mandatory videography of search and seizure under Bharatiya Sakshya Adhiniyam requires massive infrastructure upgrades.`,
    readTime: '9 min read',
    publishedAt: '2026-08-24',
    views: 4190,
    citationsCount: 27,
    status: 'published',
    citationFormat: {
      bluebook: 'Ananya Mukherjee, Decolonizing the Penal Code: Analyzing the Bharatiya Nyaya Sanhita, 4 LEXMINDS L. REV. 145 (2026).',
      oscola: 'Ananya Mukherjee, ‘Decolonizing the Penal Code: Analyzing the Bharatiya Nyaya Sanhita’ (2026) 4 LexMinds Law Review 145.',
      indian: 'Ananya Mukherjee, Decolonizing the Penal Code, (2026) 4 LMLR 145.'
    },
    keywords: ['BNS 2023', 'Criminal Law', 'IPC vs BNS', 'BNSS', 'Legal Reforms', 'Constitutional Law']
  },
  {
    id: 'art-3',
    slug: 'generative-ai-copyright-infringement-fair-use-india',
    title: 'Generative AI and Copyright Infringement: Deconstructing Fair Dealing Under Section 52 of the Indian Copyright Act',
    author: {
      name: 'Rohan Vashisht',
      title: 'Partner, Intellectual Property & TMT',
      institution: 'West Bengal National University of Juridical Sciences (WBNUJS)',
      bio: 'Rohan represents leading AI research labs and media studios in high-stakes patent and copyright litigations.'
    },
    category: 'Intellectual Property',
    abstract: 'Does scraping publicly accessible copyrighted works for LLM pre-training constitute fair dealing under Indian law? This paper examines Section 52(1)(a) of the Copyright Act, 1957, juxtaposing US fair use doctrines against India’s closed-list statutory exemptions.',
    content: `## 1. The Conflict Between Algorithmic Ingestion and Authorial Rights

The exponential growth of Generative Artificial Intelligence (GenAI) models rests upon massive computational scraping of literary, artistic, and musical works. While US courts grapple with *New York Times v. OpenAI* and *Andersen v. Stability AI*, Indian courts face unique statutory constraints under the **Copyright Act, 1957**.

---

## 2. The Narrow Scope of Indian Fair Dealing

Unlike Section 107 of the US Copyright Act—which provides an open-ended 4-factor test—Section 52 of the Indian Copyright Act is a **closed-list statutory exemption** (*exhaustively defined*).

Under Section 52(1)(a), fair dealing is only permitted for:
1. Private or personal use, including research;
2. Criticism or review, whether of that work or of any other work;
3. The reporting of current events and current affairs.

Commercial machine learning training datasets do **not** neatly qualify as private research or review. Therefore, without a legislative Text and Data Mining (TDM) exception, commercial LLM scraping without licensing creates prima facie copyright infringement exposure under Section 51.

---

## 3. Recommended Policy Reforms for India

1. **Introduction of an Express TDM Statutory Exception** with opt-out mechanisms for creative artists.
2. **Collective Management Organizations (CMOs)** for automated AI licensing royalty distribution.
3. **Watermarking and Provenance Mandates** for AI-generated synthetic outputs.`,
    readTime: '6 min read',
    publishedAt: '2026-08-20',
    views: 2840,
    citationsCount: 14,
    status: 'published',
    citationFormat: {
      bluebook: 'Rohan Vashisht, Generative AI and Copyright Infringement Under Indian Law, 4 LEXMINDS L. REV. 180 (2026).',
      oscola: 'Rohan Vashisht, ‘Generative AI and Copyright Infringement Under Indian Law’ (2026) 4 LexMinds Law Review 180.',
      indian: 'Rohan Vashisht, Generative AI and Copyright Infringement, (2026) 4 LMLR 180.'
    },
    keywords: ['Generative AI', 'Copyright Act 1957', 'Fair Dealing', 'Text and Data Mining', 'IPR', 'AI Ethics']
  },
  {
    id: 'art-4',
    slug: 'cross-border-ma-antitrust-regulations-cci',
    title: 'The Deal Value Threshold Paradigm: Scrutinizing the Competition (Amendment) Act 2023 on Big Tech M&A',
    author: {
      name: 'Kavita Menon',
      title: 'Senior Associate, Competition & Antitrust',
      institution: 'Faculty of Law, University of Delhi',
      bio: 'Kavita advises sovereign wealth funds and multinational tech corporations on merger control before the Competition Commission of India (CCI).'
    },
    category: 'Corporate & M&A',
    abstract: 'An in-depth analysis of the Deal Value Threshold (DVT) of ₹2,000 Crore introduced by the Competition (Amendment) Act 2023. We examine how non-asset digital startups with substantial business operations in India are now captured in CCI’s mandatory merger notification dragnet.',
    content: `## 1. The Killer Acquisition Conundrum

Historically, Section 5 of the Competition Act, 2002 evaluated merger notifications exclusively on the basis of **Asset** and **Turnover** thresholds. Digital market leaders routinely bypassed merger scrutiny by acquiring nascent startups with negligible immediate turnover but immense user-data dominance (the classic "killer acquisition" playbook).

---

## 2. Deciphering the Deal Value Threshold (DVT)

The Competition (Amendment) Act, 2023 introduced Section 5(d):
- Any transaction where the total **deal value exceeds ₹2,000 Crore (~$240M USD)** AND
- The target enterprise has **Substantial Business Operations in India (SBOI)**.

Under the CCI (Combinations) Regulations 2024, SBOI is triggered if:
- The target has 10% or more of its global active users/subscribers in India; or
- Gross Merchandise Value (GMV) from Indian transactions exceeds ₹500 Crore.

---

## 3. Practical Implications for Deal Timelines

Dealmakers must now build in 150-day regulatory clearance buffers and Gun-Jumping indemnity provisions in Definitive Transaction Documents.`,
    readTime: '8 min read',
    publishedAt: '2026-08-15',
    views: 3110,
    citationsCount: 19,
    status: 'published',
    citationFormat: {
      bluebook: 'Kavita Menon, The Deal Value Threshold Paradigm in Indian Antitrust, 4 LEXMINDS L. REV. 205 (2026).',
      oscola: 'Kavita Menon, ‘The Deal Value Threshold Paradigm in Indian Antitrust’ (2026) 4 LexMinds Law Review 205.',
      indian: 'Kavita Menon, The Deal Value Threshold Paradigm, (2026) 4 LMLR 205.'
    },
    keywords: ['Competition Commission of India', 'M&A', 'Deal Value Threshold', 'Antitrust', 'Big Tech', 'Corporate Law']
  }
];

// Seed Applications for Admin ATS view
export const INITIAL_APPLICATIONS: InternshipApplication[] = [
  {
    id: 'app-101',
    internshipId: 'int-1',
    internshipTitle: 'Corporate Mergers & Acquisitions Research Fellow',
    fullName: 'Aarav Sharma',
    email: 'aarav.sharma@nls.ac.in',
    phone: '+91 98112 44521',
    collegeName: 'National Law School of India University (NLSIU), Bengaluru',
    yearOfStudy: '4th Year (5-Year B.A. LL.B Hons.)',
    cgpa: '8.4 / 10.0',
    linkedinUrl: 'https://linkedin.com/in/aarav-sharma-law',
    resumeUrl: 'https://drive.google.com/file/d/sample-aarav-resume/view',
    sop: 'Having published on SEBI Takeover Regulations and represented NLSIU in the Willem C. Vis International Moot, I wish to contribute to SAM’s M&A team during the upcoming winter term.',
    paymentStatus: 'submitted',
    paymentId: 'pay_NzK8912Ja90Lmx',
    amountPaid: 299,
    createdAt: '2026-08-31T14:22:00Z'
  },
  {
    id: 'app-102',
    internshipId: 'int-2',
    internshipTitle: 'Supreme Court Appellate & Constitutional Law Clerkship',
    fullName: 'Pooja Raghavan',
    email: 'pooja.raghavan@nludelhi.ac.in',
    phone: '+91 98765 12340',
    collegeName: 'National Law University, Delhi',
    yearOfStudy: '5th Year (5-Year B.A. LL.B Hons.)',
    cgpa: '8.9 / 10.0',
    linkedinUrl: 'https://linkedin.com/in/pooja-raghavan-sc',
    resumeUrl: 'https://drive.google.com/file/d/sample-pooja-resume/view',
    sop: 'Keen to assist Senior Advocate Datar in Special Leave Petitions and Constitutional Bench matters. I have previously interned with the High Court of Delhi and authored articles on Article 21 rights.',
    paymentStatus: 'under_review',
    paymentId: 'pay_PLm9921Kh00Wqa',
    amountPaid: 299,
    createdAt: '2026-08-30T10:15:00Z'
  },
  {
    id: 'app-103',
    internshipId: 'int-3',
    internshipTitle: 'Data Privacy & AI Governance Legal Analyst',
    fullName: 'Siddharth Roy',
    email: 'siddharth.roy@symbiosis.ac.in',
    phone: '+91 91234 56789',
    collegeName: 'Symbiosis Law School, Pune',
    yearOfStudy: '3rd Year (B.B.A. LL.B)',
    cgpa: '7.8 / 10.0',
    linkedinUrl: 'https://linkedin.com/in/siddharth-roy-tmt',
    resumeUrl: 'https://drive.google.com/file/d/sample-siddharth-resume/view',
    sop: 'Active tech law researcher with expertise in DPDP Act 2023 and open-source licensing compliance. Excited to support Trilegal’s TMT client advisories.',
    paymentStatus: 'shortlisted',
    paymentId: 'pay_Qwe4561Op88Zxc',
    amountPaid: 249,
    createdAt: '2026-08-29T18:40:00Z'
  }
];

// Seed User Submissions for Admin Moderation Queue
export const INITIAL_SUBMISSIONS: ArticleSubmission[] = [
  {
    id: 'sub-201',
    authorName: 'Meera Nambiar',
    authorEmail: 'meera.n@gnlu.ac.in',
    authorPhone: '+91 99887 66554',
    authorInstitution: 'Gujarat National Law University (GNLU)',
    authorDesignation: 'LL.M Candidate in Intellectual Property Law',
    title: 'Biotech Patenting in India: Navigating Section 3(d) and 3(j) of the Patents Act',
    category: 'Intellectual Property',
    abstract: 'This article explores the stringent standards applied by the Indian Patent Office against evergreening of pharmaceutical drugs and patentability of biological processes under Sections 3(d) and 3(j).',
    content: `## Abstract
Section 3(d) of the Indian Patents Act, 1970 represents India's pivotal safeguard against pharmaceutical evergreening. This paper examines the jurisprudence post *Novartis AG v. Union of India (2013)*, evaluating patent revocation cases in oncology formulations.

## Key Arguments
1. Enhanced therapeutic efficacy standards are non-negotiable in Indian patent law.
2. Section 3(j) exclusions for plants and animals protect agricultural sovereignty.
3. The intersection with the Biological Diversity Act 2002 creates mandatory NBA clearance bottlenecks.`,
    keywords: ['Patents Act 1970', 'Section 3(d)', 'Novartis Ruling', 'Biotechnology', 'Pharma IP'],
    paymentStatus: 'paid',
    paymentId: 'pay_Sub778811Nmb',
    amountPaid: 499,
    status: 'under_review',
    editorialFeedback: 'Plagiarism check cleared (3%). Passed preliminary review. Awaiting senior peer-editor signoff.',
    submittedAt: '2026-08-31T11:05:00Z'
  },
  {
    id: 'sub-202',
    authorName: 'Vikramaditya Rao',
    authorEmail: 'v.rao@nujs.edu',
    authorPhone: '+91 97654 32109',
    authorInstitution: 'WBNUJS Kolkata',
    authorDesignation: '5th Year Law Student',
    title: 'Insolvency Resolution of Real Estate Companies: Protecting Homebuyers as Financial Creditors',
    category: 'Corporate & M&A',
    abstract: 'An evaluation of Section 5(8)(f) of the Insolvency and Bankruptcy Code (IBC) 2016 and the Supreme Court ruling in Pioneer Urban Land and Infrastructure.',
    content: `## Introduction
Homebuyers were formally recognized as Financial Creditors through the 2018 amendment to the IBC. However, project-wise insolvency resolution remains an evolving judicial standard under NCLAT rulings.`,
    keywords: ['IBC 2016', 'Homebuyers', 'NCLT', 'Insolvency', 'Real Estate Law'],
    paymentStatus: 'paid',
    paymentId: 'pay_Sub992211Rao',
    amountPaid: 499,
    status: 'draft',
    editorialFeedback: 'New submission received. Ready for peer assignment.',
    submittedAt: '2026-09-01T08:30:00Z'
  }
];

export const INITIAL_METRICS: PlatformMetric = {
  totalPublishedArticles: 48,
  totalInternshipApplicants: 1420,
  activeInternshipListings: 12,
  partnerLawFirms: 36,
  collegesRepresented: 84,
  totalRevenueCollected: 492600
};

// Persistent in-memory global state (survives client/server actions during runtime)
class LegalDataStore {
  private internships: Internship[] = [...INITIAL_INTERNSHIPS];
  private articles: Article[] = [...INITIAL_ARTICLES];
  private applications: InternshipApplication[] = [...INITIAL_APPLICATIONS];
  private submissions: ArticleSubmission[] = [...INITIAL_SUBMISSIONS];
  private metrics: PlatformMetric = { ...INITIAL_METRICS };

  // Internships
  getInternships(): Internship[] {
    return this.internships;
  }

  getInternshipBySlug(slug: string): Internship | undefined {
    return this.internships.find(i => i.slug === slug);
  }

  addInternship(internship: Internship): void {
    this.internships.unshift(internship);
    this.metrics.activeInternshipListings += 1;
  }

  // Articles
  getArticles(): Article[] {
    return this.articles.filter(a => a.status === 'published');
  }

  getAllArticles(): Article[] {
    return this.articles;
  }

  getArticleBySlug(slug: string): Article | undefined {
    return this.articles.find(a => a.slug === slug && a.status === 'published');
  }

  addArticle(article: Article): void {
    this.articles.unshift(article);
    this.metrics.totalPublishedArticles += 1;
  }

  // Applications
  getApplications(): InternshipApplication[] {
    return this.applications;
  }

  addApplication(app: InternshipApplication): void {
    this.applications.unshift(app);
    this.metrics.totalInternshipApplicants += 1;
    this.metrics.totalRevenueCollected += app.amountPaid;
  }

  updateApplicationStatus(id: string, status: InternshipApplication['paymentStatus']): boolean {
    const app = this.applications.find(a => a.id === id);
    if (app) {
      app.paymentStatus = status;
      return true;
    }
    return false;
  }

  // Submissions
  getSubmissions(): ArticleSubmission[] {
    return this.submissions;
  }

  addSubmission(sub: ArticleSubmission): void {
    this.submissions.unshift(sub);
    this.metrics.totalRevenueCollected += sub.amountPaid;
  }

  updateSubmissionStatus(id: string, status: ArticleSubmission['status'], feedback?: string): boolean {
    const sub = this.submissions.find(s => s.id === id);
    if (!sub) return false;
    sub.status = status;
    if (feedback) sub.editorialFeedback = feedback;

    // If approved and published, convert submission into a live published article!
    if (status === 'published') {
      const slug = sub.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      const newArticle: Article = {
        id: `art-pub-${Date.now()}`,
        slug,
        title: sub.title,
        author: {
          name: sub.authorName,
          title: sub.authorDesignation || 'Legal Author & Scholar',
          institution: sub.authorInstitution,
          bio: `Published scholar on LexMinds platform from ${sub.authorInstitution}.`
        },
        category: (sub.category as any) || 'Corporate & M&A',
        abstract: sub.abstract,
        content: sub.content,
        readTime: '6 min read',
        publishedAt: new Date().toISOString().split('T')[0],
        views: 1,
        citationsCount: 0,
        status: 'published',
        citationFormat: {
          bluebook: `${sub.authorName}, ${sub.title}, 4 LEXMINDS L. REV. (2026).`,
          oscola: `${sub.authorName}, ‘${sub.title}’ (2026) 4 LexMinds Law Review.`,
          indian: `${sub.authorName}, ${sub.title}, (2026) 4 LMLR.`
        },
        keywords: sub.keywords.length > 0 ? sub.keywords : ['Legal Research', 'LexMinds Law Review']
      };

      this.addArticle(newArticle);
    }
    return true;
  }

  getMetrics(): PlatformMetric {
    return {
      ...this.metrics,
      totalPublishedArticles: this.articles.filter(a => a.status === 'published').length,
      activeInternshipListings: this.internships.length,
      totalInternshipApplicants: this.applications.length + 1420
    };
  }
}

// Global singleton instance
const globalForStore = globalThis as unknown as { __lexmindsStore?: LegalDataStore };
export const dataStore = globalForStore.__lexmindsStore ?? new LegalDataStore();
if (process.env.NODE_ENV !== 'production') globalForStore.__lexmindsStore = dataStore;
