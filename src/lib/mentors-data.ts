export interface Mentor {
  id: string;
  name: string;
  designation: string;
  organization?: string;
  qualifications?: string;
  expertise: string[];
  imageUrl?: string;
  bio?: string;
  linkedinUrl?: string;
}

export const MENTORS_DATA: Mentor[] = [
  {
    id: 'mentor-trisha-duggal',
    name: 'Adv. Trisha Duggal',
    designation: 'Advocate & Legal Educator',
    organization: 'Punjab & Haryana High Court | Kanoonshala | Ostello',
    qualifications: 'LL.M., LL.B., B.Sc. (Med) • UGC-NET (Law) Qualified',
    expertise: [
      'High Court Litigation',
      'Legal Research & Drafting',
      'Academic Writing & Publications',
      'Case Handling & Court Advocacy',
      'Legal Education & Mentorship',
    ],
    imageUrl: '/mentors/adv-trisha-duggal.jpeg',
    bio: 'Advocate practicing before the Punjab and Haryana High Court with extensive experience in litigation, case handling, and academic research. UGC-NET (Law) qualified scholar and legal educator associated with Kanoonshala and Ostello, dedicated to mentoring law students in practical litigation and legal writing.',
  },
  {
    id: 'mentor-drishti-naqab',
    name: 'Adv. Drishti Naqab',
    designation: 'Legal Associate',
    organization: 'Law Firm Practice (Mohali, Punjab)',
    qualifications: 'B.A. LL.B, LL.M. (Criminology)',
    expertise: [
      'Criminal Jurisprudence',
      'Criminology',
      'Legal Research & Writing',
      'Procedural Drafting',
      'Case Analysis',
    ],
    imageUrl: '/mentors/adv-drishti-naqab.jpeg',
    bio: 'Legal Associate based in Mohali, Punjab with advanced academic credentials in Criminal Jurisprudence and Criminology. Specializes in procedural drafting, case handling, and guiding students in structured legal analysis and practical research.',
    linkedinUrl: 'https://www.linkedin.com/in/drishti-naqab-87a48a289',
  },
];
