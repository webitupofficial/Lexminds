import { Internship, Article, PlatformMetric } from './types';

// ==============================================================================
// Seed Data for Legal Internships & Research Fellowships (Sanity CMS Seed)
// ==============================================================================
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
    description: 'A selective research fellowship designed for motivated law students to work on cutting-edge statutory analyses, case digests, and student-led law journal editing.',
    responsibilities: [
      'Conduct analytical legal research on contemporary landmark judgments and legislative amendments.',
      'Assist the editorial board in manuscript screening, citations review (Bluebook/OSCOLA), and preliminary manuscript evaluations.',
      'Author high-impact legal commentary and case briefs for publication in the LexMinds Law Review.',
      'Participate in weekly research roundtables on emerging jurisprudence in corporate, tech, and constitutional law.',
    ],
    eligibility: [
      'Enrolled in an undergraduate or postgraduate law program (3-year LL.B or 5-year Integrated LL.B).',
      'Strong analytical reasoning, academic writing, and legal drafting capabilities.',
      'Demonstrated interest in legal scholarship, constitutional analysis, or commercial laws.',
      'Commitment of 10-12 hours per week for 8 weeks.',
    ],
    learningOutcomes: [
      'Direct editorial mentorship from experienced senior student editors and academic advisors.',
      'Priority editorial consideration and publication pathway for top-rated research papers.',
      'Official Certificate of Completion with verifiable credentials.',
      'Networking with student researchers and legal scholars across top institutions.',
    ],
    selectionProcess: [
      'Stage 1: Statement of Purpose (SOP) & Academic screening.',
      'Stage 2: Short Legal Research & Case Analysis assessment.',
      'Stage 3: Virtual discussion with the Editorial Council.',
    ],
    postedDate: '2026-09-01',
  },
];

// ==============================================================================
// Seed Data for Peer-Reviewed Published Legal Articles (Sanity CMS Seed)
// ==============================================================================
export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-1',
    slug: 'digital-personal-data-protection-act-2023-compliance-framework',
    title: 'Architecting Compliance Under India’s DPDP Act 2023: A Critical Examination of Significant Data Fiduciaries',
    author: {
      name: 'Adv. Ishaan Sen',
      title: 'Principal Associate, Tech & Regulatory Practice',
      institution: 'National Law School of India University (NLSIU), Bengaluru',
      bio: 'Ishaan specializes in technology jurisprudence, privacy governance, and cross-border digital economy regulation.',
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
      indian: 'Ishaan Sen, Architecting Compliance Under India’s DPDP Act 2023, (2026) 4 LMLR 112.',
    },
    keywords: ['DPDP Act 2023', 'Data Privacy', 'Data Protection Officer', 'Significant Data Fiduciary', 'MeitY', 'Tech Law'],
  },
  {
    id: 'art-2',
    slug: 'bharatiya-nyaya-sanhita-criminal-jurisprudence-transition',
    title: 'Decolonizing the Penal Code: Analyzing the Bharatiya Nyaya Sanhita (BNS) and its Impact on Criminal Justice',
    author: {
      name: 'Prof. Ananya Mukherjee',
      title: 'Professor of Criminal Law & Constitutional Studies',
      institution: 'National Law University, Delhi (NLUD)',
      bio: 'Author of three treatises on penal reform and comparative criminal jurisprudence in South Asia.',
    },
    category: 'Constitutional & Criminal',
    abstract: 'A structural comparison between the Indian Penal Code, 1860 and the Bharatiya Nyaya Sanhita, 2023. The paper explores the codification of community service, organized crime, terrorism provisions, and procedural safeguards under the Bharatiya Nagarik Suraksha Sanhita (BNSS).',
    content: `## 1. Contextualizing the Legislative Overhaul

The replacement of the 164-year-old Indian Penal Code with the **Bharatiya Nyaya Sanhita, 2023 (BNS)** represents the most sweeping criminal law transition in post-independence India. Designed to prioritize justice (*Nyaya*) over colonial punishment (*Danda*), the new statutory framework reshapes offenses against the human body, the state, and financial systems.

---

## 2. Key Structural Innovations in BNS

### 2.1 Introduction of Community Service as a Punishment
Under Section 4(f) of the BNS, community service is formally introduced as an alternative to incarceration for minor offenses.

### 2.2 Codification of Organized Crime (Section 111)
For decades, states relied on fragmented state legislations (MCOCA, KCOCA). Section 111 creates a unified federal penal definition for organized crime syndicates, contract killing, and illicit cyber syndicates.

### 2.3 Offenses Against the State & Replacement of Sedition
Section 124A (Sedition) of the old IPC has been replaced by Section 152 of the BNS, which punishes acts endangering the sovereignty, unity, and integrity of India with stringent mens rea requirements.`,
    readTime: '9 min read',
    publishedAt: '2026-08-24',
    views: 4190,
    citationsCount: 27,
    status: 'published',
    citationFormat: {
      bluebook: 'Ananya Mukherjee, Decolonizing the Penal Code: Analyzing the Bharatiya Nyaya Sanhita, 4 LEXMINDS L. REV. 145 (2026).',
      oscola: 'Ananya Mukherjee, ‘Decolonizing the Penal Code: Analyzing the Bharatiya Nyaya Sanhita’ (2026) 4 LexMinds Law Review 145.',
      indian: 'Ananya Mukherjee, Decolonizing the Penal Code, (2026) 4 LMLR 145.',
    },
    keywords: ['BNS 2023', 'Criminal Law', 'IPC vs BNS', 'BNSS', 'Legal Reforms', 'Constitutional Law'],
  },
  {
    id: 'art-3',
    slug: 'generative-ai-copyright-infringement-fair-use-india',
    title: 'Generative AI and Copyright Infringement: Deconstructing Fair Dealing Under Section 52 of the Indian Copyright Act',
    author: {
      name: 'Rohan Vashisht',
      title: 'Partner, Intellectual Property & TMT',
      institution: 'West Bengal National University of Juridical Sciences (WBNUJS)',
      bio: 'Rohan represents leading AI research labs and media studios in high-stakes patent and copyright litigations.',
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

Commercial machine learning training datasets do **not** neatly qualify as private research or review. Therefore, without a legislative Text and Data Mining (TDM) exception, commercial LLM scraping without licensing creates prima facie copyright infringement exposure under Section 51.`,
    readTime: '6 min read',
    publishedAt: '2026-08-20',
    views: 2840,
    citationsCount: 14,
    status: 'published',
    citationFormat: {
      bluebook: 'Rohan Vashisht, Generative AI and Copyright Infringement Under Indian Law, 4 LEXMINDS L. REV. 180 (2026).',
      oscola: 'Rohan Vashisht, ‘Generative AI and Copyright Infringement Under Indian Law’ (2026) 4 LexMinds Law Review 180.',
      indian: 'Rohan Vashisht, Generative AI and Copyright Infringement, (2026) 4 LMLR 180.',
    },
    keywords: ['Generative AI', 'Copyright Act 1957', 'Fair Dealing', 'Text and Data Mining', 'IPR', 'AI Ethics'],
  },
  {
    id: 'art-4',
    slug: 'cross-border-ma-antitrust-regulations-cci',
    title: 'The Deal Value Threshold Paradigm: Scrutinizing the Competition (Amendment) Act 2023 on Big Tech M&A',
    author: {
      name: 'Kavita Menon',
      title: 'Senior Associate, Competition & Antitrust',
      institution: 'Faculty of Law, University of Delhi',
      bio: 'Kavita advises sovereign wealth funds and multinational tech corporations on merger control before the Competition Commission of India (CCI).',
    },
    category: 'Corporate & M&A',
    abstract: 'An in-depth analysis of the Deal Value Threshold (DVT) of ₹2,000 Crore introduced by the Competition (Amendment) Act 2023. We examine how non-asset digital startups with substantial business operations in India are now captured in CCI’s mandatory merger notification dragnet.',
    content: `## 1. The Killer Acquisition Conundrum

Historically, Section 5 of the Competition Act, 2002 evaluated merger notifications exclusively on the basis of **Asset** and **Turnover** thresholds. Digital market leaders routinely bypassed merger scrutiny by acquiring nascent startups with negligible immediate turnover but immense user-data dominance.

---

## 2. Deciphering the Deal Value Threshold (DVT)

The Competition (Amendment) Act, 2023 introduced Section 5(d):
- Any transaction where the total **deal value exceeds ₹2,000 Crore (~$240M USD)** AND
- The target enterprise has **Substantial Business Operations in India (SBOI)**.

Under the CCI (Combinations) Regulations 2024, SBOI is triggered if:
- The target has 10% or more of its global active users/subscribers in India; or
- Gross Merchandise Value (GMV) from Indian transactions exceeds ₹500 Crore.`,
    readTime: '8 min read',
    publishedAt: '2026-08-15',
    views: 3110,
    citationsCount: 19,
    status: 'published',
    citationFormat: {
      bluebook: 'Kavita Menon, The Deal Value Threshold Paradigm in Indian Antitrust, 4 LEXMINDS L. REV. 205 (2026).',
      oscola: 'Kavita Menon, ‘The Deal Value Threshold Paradigm in Indian Antitrust’ (2026) 4 LexMinds Law Review 205.',
      indian: 'Kavita Menon, The Deal Value Threshold Paradigm, (2026) 4 LMLR 205.',
    },
    keywords: ['Competition Commission of India', 'M&A', 'Deal Value Threshold', 'Antitrust', 'Big Tech', 'Corporate Law'],
  },
];

// In-memory published articles adapter (allows admin approval to publish without server restart in dev)
import {
  fetchSanityArticles,
  fetchSanityArticleBySlug,
  fetchSanityInternships,
  fetchSanityInternshipBySlug,
} from './sanity';

// In-memory published articles adapter (allows immediate updates and safe offline/test execution)
let livePublishedArticles: Article[] = [...INITIAL_ARTICLES];

/**
 * Editorial Content Service Adapter.
 * Serves as the clean abstraction layer for Sanity Headless CMS.
 */
export async function fetchArticlesFromCMS(): Promise<Article[]> {
  const sanityArticles = await fetchSanityArticles();
  if (sanityArticles && sanityArticles.length > 0) {
    return sanityArticles;
  }
  return livePublishedArticles.filter((a) => a.status === 'published');
}

export async function fetchArticleBySlugFromCMS(slug: string): Promise<Article | undefined> {
  const sanityArticle = await fetchSanityArticleBySlug(slug);
  if (sanityArticle) {
    return sanityArticle;
  }
  return livePublishedArticles.find((a) => a.slug === slug && a.status === 'published');
}

export async function fetchInternshipsFromCMS(): Promise<Internship[]> {
  const sanityInternships = await fetchSanityInternships();
  if (sanityInternships && sanityInternships.length > 0) {
    return sanityInternships;
  }
  return INITIAL_INTERNSHIPS;
}

export async function fetchInternshipBySlugFromCMS(slug: string): Promise<Internship | undefined> {
  const sanityInternship = await fetchSanityInternshipBySlug(slug);
  if (sanityInternship) {
    return sanityInternship;
  }
  return INITIAL_INTERNSHIPS.find((i) => i.slug === slug);
}

export function getPublishedArticles(): Article[] {
  return livePublishedArticles.filter((a) => a.status === 'published');
}

export function getArticleBySlug(slug: string): Article | undefined {
  return livePublishedArticles.find((a) => a.slug === slug && a.status === 'published');
}

export function addPublishedArticle(article: Article): void {
  const existingIdx = livePublishedArticles.findIndex((a) => a.slug === article.slug);
  if (existingIdx >= 0) {
    livePublishedArticles[existingIdx] = article;
  } else {
    livePublishedArticles.unshift(article);
  }
}

export function getInternships(): Internship[] {
  return INITIAL_INTERNSHIPS;
}

export function getInternshipBySlug(slug: string): Internship | undefined {
  return INITIAL_INTERNSHIPS.find((i) => i.slug === slug);
}

// Backward-compatible read helper
export const dataStore = {
  getArticles: getPublishedArticles,
  getAllArticles: () => livePublishedArticles,
  getArticleBySlug,
  addArticle: addPublishedArticle,
  getInternships,
  getInternshipBySlug,
  fetchArticlesFromCMS,
  fetchArticleBySlugFromCMS,
  fetchInternshipsFromCMS,
  fetchInternshipBySlugFromCMS,
};

