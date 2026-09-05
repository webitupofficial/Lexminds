export interface Mentor {
  id: string;
  name: string;
  designation: string;
  organization?: string;
  expertise: string[];
  imageUrl?: string;
  bio?: string;
  linkedinUrl?: string;
}

export const MENTORS_DATA: Mentor[] = [
  {
    id: 'mentor-1',
    name: 'Adv. Mentor Name',
    designation: 'Senior Advocate / Legal Counsel',
    organization: 'Supreme Court & High Courts',
    expertise: ['Constitutional Law', 'Appellate Litigation', 'Public Law'],
    imageUrl: '', // Add mentor photo URL here
  },
  {
    id: 'mentor-2',
    name: 'Mentor Name',
    designation: 'Partner / Corporate Counsel',
    organization: 'Corporate & Commercial Practice',
    expertise: ['Corporate Law & M&A', 'Regulatory Compliance', 'Commercial Arbitration'],
    imageUrl: '',
  },
  {
    id: 'mentor-3',
    name: 'Dr. Mentor Name',
    designation: 'Professor & Academic Scholar',
    organization: 'Faculty of Law',
    expertise: ['Criminal Jurisprudence', 'Procedural Law', 'Legal Research & Writing'],
    imageUrl: '',
  },
  {
    id: 'mentor-4',
    name: 'Mentor Name',
    designation: 'Technology & Privacy Counsel',
    organization: 'IP & Data Governance Practice',
    expertise: ['Data Privacy (DPDP Act)', 'Intellectual Property', 'Cyber Jurisprudence'],
    imageUrl: '',
  },
];
