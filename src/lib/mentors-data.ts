export interface Mentor {
  id: string;
  name: string;
  title: string;
  organization: string;
  category: 'litigation' | 'corporate' | 'tech-ip' | 'criminal' | 'academia';
  categoryLabel: string;
  experienceYears: number;
  almaMater: string;
  initials: string;
  accentGlow: string; // Tailwind/CSS color class for glass reflection
  bio: string;
  specializations: string[];
  mentorshipTopics: string[];
  achievements: string[];
  availability: string;
  linkedinUrl?: string;
}

export const MENTORS_DATA: Mentor[] = [
  {
    id: 'vikramaditya-singhania',
    name: 'Adv. Vikramaditya Singhania',
    title: 'Senior Advocate',
    organization: 'Supreme Court of India',
    category: 'litigation',
    categoryLabel: 'Constitutional & Appellate Advocacy',
    experienceYears: 24,
    almaMater: 'NLSIU Bangalore (B.A. LL.B Hons.)',
    initials: 'VS',
    accentGlow: 'from-purple-500/20 via-royal-500/10 to-transparent',
    bio: 'Designated Senior Advocate with over two decades of courtroom experience before the Supreme Court and various High Courts. Has argued landmark constitutional bench cases concerning regulatory federalism, privacy, and fundamental rights.',
    specializations: [
      'Constitutional Law',
      'Appellate Litigation',
      'Special Leave Petitions (SLPs)',
      'Public Interest Jurisprudence'
    ],
    mentorshipTopics: [
      'Art of Oral Courtroom Advocacy & Demeanor',
      'Special Leave Petition (SLP) Drafting Strategy',
      'Judicial Clerkship & Research Methodology',
      'Constitutional Bench Judgment Dissection'
    ],
    achievements: [
      'Argued in 14 reported Constitutional Bench judgments',
      'Chambers have trained over 60+ junior advocates across India',
      'Visiting Guest Lecturer at NLSIU Bangalore & NALSAR'
    ],
    availability: '2 Sessions / Month',
    linkedinUrl: 'https://linkedin.com/company/lexminds-in'
  },
  {
    id: 'dr-meenakshi-sundaram',
    name: 'Dr. Meenakshi Sundaram',
    title: 'Professor of Criminal Law & Senior Fellow',
    organization: 'Center for Criminal Jurisprudence & Judicial Studies',
    category: 'criminal',
    categoryLabel: 'Criminal Jurisprudence & BNS',
    experienceYears: 19,
    almaMater: 'NALSAR Hyderabad & Oxford University (BCL)',
    initials: 'MS',
    accentGlow: 'from-amber-500/20 via-orange-500/10 to-transparent',
    bio: 'Pioneering scholar and legislative consultant on substantive criminal law reform in India. Specializes in the transition to the Bharatiya Nyaya Sanhita (BNS), evidentiary standards for digital forensic trails, and criminal appellate drafting.',
    specializations: [
      'Bharatiya Nyaya Sanhita (BNS & BNSS)',
      'Criminal Trial Advocacy',
      'Forensic & Electronic Evidence',
      'Comparative Penal Reform'
    ],
    mentorshipTopics: [
      'Decolonizing Penal Codes: High-Impact Research',
      'Trial Court Pleadings, Charge Framing & Bail Petitions',
      'Bluebook (21st ed.) & OSCOLA Citation Rigor',
      'Publishing in Peer-Reviewed International Law Reviews'
    ],
    achievements: [
      'Author of 4 authoritative treatises on Indian penal reforms',
      'Consultant to statutory review bodies on procedural codification',
      'Senior Editorial Peer Reviewer for leading law journals'
    ],
    availability: '4 Sessions / Month',
    linkedinUrl: 'https://linkedin.com/company/lexminds-in'
  },
  {
    id: 'arjun-khurana',
    name: 'Arjun Khurana',
    title: 'Partner, Corporate Mergers & Acquisitions',
    organization: 'Leading Tier-1 National Law Firm',
    category: 'corporate',
    categoryLabel: 'Corporate M&A & Private Equity',
    experienceYears: 16,
    almaMater: 'WBNUJS Kolkata (B.A. LL.B Hons.)',
    initials: 'AK',
    accentGlow: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    bio: 'Transactional partner advising Fortune 500 multinationals, marquee private equity sponsors, and unicorn founders on cross-border buyouts, deal structuring, joint ventures, and Competition Commission of India (CCI) clearances.',
    specializations: [
      'Cross-Border Mergers & Acquisitions',
      'Private Equity & Venture Capital',
      'Antitrust & Competition Law (CCI)',
      'Joint Venture Structuring'
    ],
    mentorshipTopics: [
      'Due Diligence & Share Purchase Agreement (SPA) Drafting',
      'Deal Value Threshold Paradigm & Antitrust Strategy',
      'Tier-1 Law Firm Assessment Day & Interview Preparation',
      'Commercial Awareness & Transactional Problem Solving'
    ],
    achievements: [
      'Ranked Band 1 M&A Lawyer by Chambers Asia-Pacific',
      'Lead legal advisor on $3.2B inbound cross-border tech acquisition',
      'Directly mentored 120+ interns into full-time associate offers'
    ],
    availability: '3 Sessions / Month',
    linkedinUrl: 'https://linkedin.com/company/lexminds-in'
  },
  {
    id: 'dr-nandita-raman',
    name: 'Dr. Nandita Raman',
    title: 'Technology Counsel & AI Governance Fellow',
    organization: 'LexTech Policy Council & Advisory',
    category: 'tech-ip',
    categoryLabel: 'Tech Law, AI & Data Privacy',
    experienceYears: 14,
    almaMater: 'Harvard Law School (LL.M.) & NLU Delhi',
    initials: 'NR',
    accentGlow: 'from-cyan-500/20 via-blue-500/10 to-transparent',
    bio: 'Specialist in cyber jurisprudence, global artificial intelligence regulation, and compliance obligations under India’s Digital Personal Data Protection (DPDP) Act 2023. Advises digital economy startups and global policy think tanks.',
    specializations: [
      'DPDP Act 2023 Compliance Architecture',
      'Artificial Intelligence & Algorithmic Liability',
      'Cross-Border Data Flows & Sovereign Clouds',
      'FinTech Regulatory Sandbox Navigation'
    ],
    mentorshipTopics: [
      'Data Protection Impact Assessment (DPIA) Implementation',
      'Drafting SaaS, Cloud Infrastructure & AI Vendor Agreements',
      'Emerging Career Trajectories in Techno-Legal Advisory',
      'Authoring Analytical Policy Briefs for Legislative Committees'
    ],
    achievements: [
      'Drafted model compliance framework for Significant Data Fiduciaries',
      'Keynote Speaker at the Geneva Global Cyber Jurisprudence Forum',
      'Former Research Fellow at Harvard Berkman Klein Center'
    ],
    availability: '3 Sessions / Month',
    linkedinUrl: 'https://linkedin.com/company/lexminds-in'
  },
  {
    id: 'kabir-deshmukh',
    name: 'Kabir Deshmukh',
    title: 'Advocate-on-Record & Commercial Arbitrator',
    organization: 'Supreme Court of India | Chambers of Kabir Deshmukh',
    category: 'litigation',
    categoryLabel: 'Commercial Dispute Resolution & Arbitration',
    experienceYears: 15,
    almaMater: 'Faculty of Law, University of Delhi & Cambridge (LL.M.)',
    initials: 'KD',
    accentGlow: 'from-rose-500/20 via-royal-500/10 to-transparent',
    bio: 'Supreme Court Advocate-on-Record specializing in complex commercial arbitration, Section 9 interim measures, Section 34 set-aside petitions, and enforcement of foreign awards under the New York Convention. Fellow of CIArb.',
    specializations: [
      'Domestic & International Arbitration (SIAC, LCIA, MCIA)',
      'Enforcement of Arbitral Awards',
      'Insolvency & Bankruptcy Code (IBC)',
      'Complex Commercial Contract Litigation'
    ],
    mentorshipTopics: [
      'Drafting Dispute Resolution Clauses & Statement of Claims',
      'Supreme Court Practice & AoR Examination Roadmap',
      'International Moot Court Oralist Bench Preparation',
      'Tactical Cross-Examination & Document Discovery Strategies'
    ],
    achievements: [
      'Empanelled Arbitrator with the Delhi International Arbitration Centre',
      'Represented public infrastructure consortia in ₹1,800 Cr dispute',
      'Former Best Oralist at Willem C. Vis International Commercial Arbitration Moot'
    ],
    availability: '2 Sessions / Month',
    linkedinUrl: 'https://linkedin.com/company/lexminds-in'
  },
  {
    id: 'pooja-iyer',
    name: 'Pooja Iyer',
    title: 'Principal Associate & IPR Strategist',
    organization: 'Premier Intellectual Property Practice Group',
    category: 'tech-ip',
    categoryLabel: 'Intellectual Property Rights & Media Law',
    experienceYears: 12,
    almaMater: 'Symbiosis Law School Pune & King’s College London',
    initials: 'PI',
    accentGlow: 'from-violet-500/20 via-fuchsia-500/10 to-transparent',
    bio: 'IPR litigator and portfolio advisor with deep experience in patent prosecution, pharmaceutical patent linkages, trademark opposition trials, and digital copyright management for entertainment studios and creator platforms.',
    specializations: [
      'Patent Prosecution & Invalidation Trials',
      'Trademark Portfolio Strategy & Brand Protection',
      'Media, Entertainment & OTT Licensing',
      'Copyright in Generative AI Works'
    ],
    mentorshipTopics: [
      'Patent Drafting & Prior-Art Searches for Tech Inventions',
      'Trademark Opposition Hearings & Passing Off Injunctions',
      'Entertainment Law & Sync/Master Rights Licensing',
      'Building a Career as an IP Practitioner in India & Overseas'
    ],
    achievements: [
      'Argued over 150+ contested hearings before IPAB & High Court benches',
      'Legal counsel to leading digital OTT productions & music labels',
      'Convener of the Women in IP Mentorship Circle'
    ],
    availability: '4 Sessions / Month',
    linkedinUrl: 'https://linkedin.com/company/lexminds-in'
  }
];
