import React from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { 
  Scale, 
  FileText, 
  AlertCircle, 
  Mail, 
  ShieldCheck, 
  CheckCircle2, 
  FileCheck, 
  Award, 
  QrCode, 
  Ban, 
  CreditCard, 
  RefreshCw, 
  Users, 
  Globe, 
  Lock, 
  ExternalLink 
} from 'lucide-react';

export const metadata = {
  title: 'Terms & Conditions | Lex Minds',
  description: 'Terms & Conditions governing access, internship programmes, publications, certificate verification, and user conduct on Lex Minds.',
  alternates: {
    canonical: 'https://lexminds.in/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <Breadcrumbs items={[{ name: 'Terms & Conditions' }]} />

      {/* Header */}
      <div className="space-y-3 border-b border-ink-900/15 dark:border-ink-700 pb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-sm bg-royal-50 dark:bg-royal-950/40 border border-royal-200 dark:border-royal-800 text-royal-700 dark:text-royal-300 text-[11px] font-mono font-bold uppercase tracking-wider">
          <Scale className="w-3.5 h-3.5" />
          <span>User Agreement &bull; Governance</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-ink-950 dark:text-ink-50 tracking-tight">
          Terms &amp; Conditions
        </h1>
        <div className="flex flex-wrap gap-y-1 gap-x-4 text-xs font-mono text-ink-500 dark:text-ink-400">
          <span><strong>Last Updated:</strong> 4 September 2026</span>
          <span>&bull;</span>
          <span><strong>Website:</strong> Lex Minds India</span>
          <span>&bull;</span>
          <span>
            <strong>Email:</strong>{' '}
            <a href="mailto:lexmindsindia@gmail.com" className="text-royal-600 dark:text-royal-400 hover:underline">
              lexmindsindia@gmail.com
            </a>
          </span>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="p-6 sm:p-12 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 space-y-10 text-sm text-ink-700 dark:text-ink-300 leading-relaxed shadow-brutal">

        {/* 1. Introduction */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">01.</span>
            <span>Introduction</span>
          </h2>
          <p>
            Welcome to Lex Minds India (&ldquo;Lex Minds India&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;).
          </p>
          <p>
            These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your access to and use of the Lex Minds India website, internship programmes, publications, legal educational content, certificate-verification services, events, and other services or activities offered through our platform.
          </p>
          <p>
            By accessing or using our website or registering for any Lex Minds India programme, you agree to comply with these Terms.
          </p>
          <p className="font-medium text-ink-900 dark:text-ink-100">
            If you do not agree with these Terms, please do not use the relevant service or register for our programmes.
          </p>
        </section>

        {/* 2. About Lex Minds India */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">02.</span>
            <span>About Lex Minds India</span>
          </h2>
          <p>
            Lex Minds India is a student-focused legal learning and development platform that may provide:
          </p>
          <ul className="list-disc list-inside space-y-1 text-ink-600 dark:text-ink-400 pl-2">
            <li>Legal internships</li>
            <li>Legal research activities</li>
            <li>Legal writing opportunities</li>
            <li>Student publications</li>
            <li>Legal educational content</li>
            <li>Legal awareness content</li>
            <li>Workshops and webinars</li>
            <li>Mentorship or guidance activities</li>
            <li>Certificates for eligible participants</li>
            <li>Certificate verification services</li>
            <li>Other educational and professional-development opportunities</li>
          </ul>
          <p className="text-xs text-ink-500">
            The specific services available may change from time to time.
          </p>
        </section>

        {/* 3. Eligibility */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">03.</span>
            <span>Eligibility</span>
          </h2>
          <p>
            Eligibility requirements may differ between programmes. Where an internship or programme has specific eligibility requirements, participants must satisfy those requirements before registration.
          </p>
          <p>
            Participants must provide accurate information during registration.
          </p>
          <p>
            Where a programme permits participation by persons under 18 years of age, appropriate consent or authorisation may be required from a parent or legal guardian where applicable.
          </p>
          <p className="text-xs text-coral-600 dark:text-coral-400 font-medium">
            Lex Minds India reserves the right to reject or cancel an application where eligibility requirements are not satisfied or where false or misleading information has been provided.
          </p>
        </section>

        {/* 4. Registration */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">04.</span>
            <span>Registration</span>
          </h2>
          <p>
            Registration may require users to provide information such as full name, email address, contact details, educational institution, course/year of study, areas of interest, and other information required for the particular programme.
          </p>
          <p>
            By registering, you agree that the information provided by you is accurate and complete. You must not:
          </p>
          <ul className="list-disc list-inside space-y-1 text-ink-600 dark:text-ink-400 pl-2">
            <li>Register using another person&apos;s identity</li>
            <li>Submit false information</li>
            <li>Create fraudulent registrations</li>
            <li>Misrepresent your educational or professional qualifications</li>
            <li>Register multiple times for the same programme for the purpose of gaining an unfair advantage</li>
          </ul>
          <p>
            Lex Minds India may cancel registrations that violate these requirements.
          </p>
        </section>

        {/* 5. Internship Programmes */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">05.</span>
            <span>Internship Programmes</span>
          </h2>
          <p>
            Lex Minds India may offer internships of different durations and formats. The exact duration, schedule, eligibility, tasks, learning activities, submission requirements, assessment process, and certificate requirements will be communicated through the relevant programme announcement or registration information.
          </p>
          <div className="p-3.5 rounded bg-paper dark:bg-ink-900 border border-ink-900/10 dark:border-ink-800 text-xs">
            Participation in an internship does not automatically guarantee a certificate, publication, recommendation, employment, admission, academic credit, or future opportunity. Certificates may be issued only to participants who satisfy the applicable programme requirements.
          </div>
        </section>

        {/* 6. Internship Tasks and Assignments */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">06.</span>
            <span>Internship Tasks and Assignments</span>
          </h2>
          <p>
            Interns may be required to complete educational or practical assignments, which may include:
          </p>
          <ul className="list-disc list-inside space-y-1 text-ink-600 dark:text-ink-400 pl-2">
            <li>Legal research</li>
            <li>Legal articles</li>
            <li>Case briefs</li>
            <li>Judgment analysis</li>
            <li>Legal awareness content</li>
            <li>Presentations</li>
            <li>Research summaries</li>
            <li>Social-media content</li>
            <li>Other tasks relevant to the programme</li>
          </ul>
          <p>
            Participants are expected to complete assigned work within the specified deadlines. Repeated failure to participate or submit required work may affect eligibility for a completion certificate.
          </p>
        </section>

        {/* 7. Originality and Plagiarism */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">07.</span>
            <span>Originality and Plagiarism</span>
          </h2>
          <p>
            All submissions must be the participant&apos;s own work or contain material used with appropriate permission and attribution. Participants must not:
          </p>
          <ul className="list-disc list-inside space-y-1 text-ink-600 dark:text-ink-400 pl-2">
            <li>Copy another person&apos;s work</li>
            <li>Submit plagiarised content</li>
            <li>Falsify research</li>
            <li>Fabricate citations or authorities</li>
            <li>Misrepresent another person&apos;s work as their own</li>
            <li>Submit AI-generated or externally prepared work where the programme specifically prohibits it</li>
          </ul>
          <p>
            Lex Minds India may review submissions for originality and may reject work that does not satisfy applicable academic or editorial standards. Where appropriate, serious violations may result in removal from the programme.
          </p>
        </section>

        {/* 8. Publications */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">08.</span>
            <span>Publications</span>
          </h2>
          <p>
            Lex Minds India may provide opportunities for students and contributors to submit legal articles, research work, case analyses, and other educational content for publication.
          </p>
          <p className="font-semibold text-ink-900 dark:text-ink-100">
            Submission does not guarantee publication.
          </p>
          <p>Lex Minds India may review submissions, request revisions, edit formatting or language, reject submissions, remove published material where appropriate, and apply editorial standards. Publication decisions are at the discretion of the Lex Minds India editorial team.</p>
        </section>

        {/* 9. Contributor Responsibility */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">09.</span>
            <span>Contributor Responsibility</span>
          </h2>
          <p>Contributors are responsible for ensuring that their submitted material:</p>
          <ul className="list-disc list-inside space-y-1 text-ink-600 dark:text-ink-400 pl-2">
            <li>Is substantially original</li>
            <li>Does not unlawfully infringe copyright</li>
            <li>Does not disclose confidential information</li>
            <li>Does not improperly reveal personal information</li>
            <li>Does not contain knowingly false information</li>
            <li>Contains appropriate citations where required</li>
            <li>Complies with applicable law</li>
          </ul>
          <p className="text-xs text-ink-500">
            Submitting an article does not give Lex Minds India permission to claim that the contributor is an employee, advocate, partner, or official representative of Lex Minds India unless such a relationship actually exists.
          </p>
        </section>

        {/* 10. Intellectual Property */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">10.</span>
            <span>Intellectual Property</span>
          </h2>
          <p>
            Unless otherwise agreed in writing, Lex Minds India retains ownership of its own logo, branding, website design, original website content, graphics, templates, programme materials, educational resources created by Lex Minds India, and other original intellectual property.
          </p>
          <p>
            Users must not reproduce, sell, modify, distribute, or commercially exploit Lex Minds India&apos;s intellectual property without appropriate permission.
          </p>
          <p>
            Where a user independently owns copyright in a submitted article or other work, publication or submission arrangements may be governed by the terms communicated for that particular publication.
          </p>
        </section>

        {/* 11. Certificates */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">11.</span>
            <span>Certificates</span>
          </h2>
          <p>
            Eligible participants may receive certificates based on the requirements of the relevant programme. A certificate may include:
          </p>
          <ul className="list-disc list-inside space-y-1 text-ink-600 dark:text-ink-400 pl-2">
            <li>Participant&apos;s name</li>
            <li>Programme name</li>
            <li>Duration</li>
            <li>Date of issue</li>
            <li>Unique certificate ID</li>
            <li>Authorised signature</li>
            <li>QR code or verification information</li>
          </ul>
          <p>
            A certificate is not guaranteed merely because a participant has registered. Participants must satisfy the applicable completion requirements. Lex Minds India reserves the right to correct certificates containing genuine administrative errors.
          </p>
        </section>

        {/* 12. Certificate Verification */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">12.</span>
            <span>Certificate Verification</span>
          </h2>
          <p>
            Lex Minds India may maintain an official certificate-verification system. Each certificate may have a unique certificate ID, such as:{' '}
            <code className="px-2 py-0.5 rounded bg-royal-50 dark:bg-royal-950/50 border border-royal-200 dark:border-royal-800 font-mono text-royal-700 dark:text-royal-300">
              LMI-INT-2026-0001
            </code>.
          </p>
          <p>
            A verification page may allow third parties to confirm whether a certificate was issued by Lex Minds India. Certificate holders must not:
          </p>
          <ul className="list-disc list-inside space-y-1 text-ink-600 dark:text-ink-400 pl-2">
            <li>Alter a certificate</li>
            <li>Change certificate details</li>
            <li>Create fake certificates</li>
            <li>Reproduce or manipulate verification pages</li>
            <li>Present an invalid or revoked certificate as valid</li>
            <li>Claim qualifications or accreditation that the certificate does not provide</li>
          </ul>
          <p className="text-xs text-coral-600 dark:text-coral-400">
            Fraudulent use of certificates may result in cancellation or revocation of the relevant certificate and may be reported where appropriate.
          </p>
        </section>

        {/* 13. No Guarantee of Employment or Professional Qualification */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">13.</span>
            <span>No Guarantee of Employment or Professional Qualification</span>
          </h2>
          <p>
            Participation in a Lex Minds India internship, publication, workshop, or programme does not guarantee:
          </p>
          <ul className="list-disc list-inside space-y-1 text-ink-600 dark:text-ink-400 pl-2">
            <li>Employment</li>
            <li>Internship placement elsewhere</li>
            <li>Admission to an educational institution</li>
            <li>Professional qualification</li>
            <li>Bar enrolment</li>
            <li>Government recognition</li>
            <li>University credit</li>
            <li>Professional licence</li>
            <li>Future employment or career advancement</li>
          </ul>
          <p className="font-medium text-ink-900 dark:text-ink-100">
            Unless expressly stated otherwise, Lex Minds India programmes are educational or developmental opportunities.
          </p>
        </section>

        {/* 14. Fees, Pricing and Paid Products */}
        <section className="space-y-4">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">14.</span>
            <span>Fees, Pricing and Paid Products</span>
          </h2>
          <p>
            Lex Minds charges one-time, non-recurring evaluation fees to cover the operational, anti-plagiarism, and administrative costs of processing student applications and manuscript submissions:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="p-4 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 space-y-1.5 rounded-sm">
              <div className="text-xs font-mono font-bold uppercase text-royal-600 dark:text-royal-400">Paid Product 01</div>
              <h4 className="font-serif font-bold text-ink-950 dark:text-ink-50 text-sm">Internship / Fellowship Application Evaluation Fee</h4>
              <div className="text-base font-serif font-bold text-ink-950 dark:text-ink-50">
                ₹39.00 INR <span className="text-xs line-through text-ink-400 font-normal">₹299.00</span>{' '}
                <span className="text-[11px] font-mono text-ink-500 font-normal">(Inclusive of all applicable taxes)</span>
              </div>
              <p className="text-xs text-ink-600 dark:text-ink-400">
                Covers administrative intake, academic eligibility screening, Statement of Purpose (SOP) evaluation, and docket creation.
              </p>
            </div>

            <div className="p-4 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 space-y-1.5 rounded-sm">
              <div className="text-xs font-mono font-bold uppercase text-royal-600 dark:text-royal-400">Paid Product 02</div>
              <h4 className="font-serif font-bold text-ink-950 dark:text-ink-50 text-sm">Article Manuscript Editorial Evaluation Fee</h4>
              <div className="text-base font-serif font-bold text-ink-950 dark:text-ink-50">
                ₹99.00 INR <span className="text-xs line-through text-ink-400 font-normal">₹399.00</span>{' '}
                <span className="text-[11px] font-mono text-ink-500 font-normal">(Inclusive of all applicable taxes)</span>
              </div>
              <p className="text-xs text-ink-600 dark:text-ink-400">
                Covers intake screening, originality/anti-plagiarism screening, peer-review coordination, and editorial formatting review.
              </p>
            </div>
          </div>

          <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-500/30 text-xs text-amber-900 dark:text-amber-200 rounded-sm space-y-1.5">
            <strong className="block font-serif text-sm">Non-Guarantee Disclosure:</strong>
            <p>
              Payment of an evaluation fee covers the cost of processing and evaluating your application or manuscript. <strong>Payment does not guarantee selection for an internship, acceptance of a paper, publication in the journal, issuance of a certificate, or any specific outcome.</strong> Selection and publication decisions are made independently based on academic quality and submission standards.
            </p>
          </div>
        </section>

        {/* 15. Refunds and Cancellations */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">15.</span>
            <span>Refunds and Cancellations</span>
          </h2>
          <p>
            Because evaluation begins immediately upon receipt of a submission, evaluation fees are generally non-refundable once payment is completed, except in verified cases of:
          </p>
          <ul className="list-disc list-inside space-y-1 text-ink-600 dark:text-ink-400 pl-2">
            <li>Accidental duplicate payments for the exact same submission.</li>
            <li>Technical processing errors where an account was debited without generating a docket reference.</li>
            <li>Documented unauthorized transactions.</li>
          </ul>
          <p>
            Refund requests must be sent within 7 calendar days of payment to{' '}
            <a href="mailto:lexmindsindia@gmail.com" className="text-royal-600 dark:text-royal-400 font-semibold underline">
              lexmindsindia@gmail.com
            </a>. Verified refunds are credited to the original payment instrument within 5 to 7 business days.
          </p>
          <p className="font-medium text-ink-900 dark:text-ink-100">
            For complete terms, please read our dedicated{' '}
            <Link href="/refund-policy" className="text-royal-600 dark:text-royal-400 font-bold underline">
              Cancellation &amp; Refund Policy
            </Link>.
          </p>
        </section>

        {/* 16. Mentor and Professional Guidance */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">16.</span>
            <span>Mentor and Professional Guidance</span>
          </h2>
          <p>
            Lex Minds may involve mentors, legal professionals, educators, researchers, or other professionals. Mentor participation does not necessarily mean that the mentor:
          </p>
          <ul className="list-disc list-inside space-y-1 text-ink-600 dark:text-ink-400 pl-2">
            <li>Is an employee of Lex Minds</li>
            <li>Represents Lex Minds</li>
            <li>Provides individual legal advice</li>
            <li>Guarantees an internship or employment opportunity</li>
            <li>Endorses every activity or publication of Lex Minds</li>
          </ul>
          <p className="text-xs text-ink-500">
            Mentorship is intended primarily for educational and professional-development purposes.
          </p>
        </section>

        {/* 17. Website Content */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">17.</span>
            <span>Website Content</span>
          </h2>
          <p>
            We make reasonable efforts to maintain useful and accurate information on our website. However, legal information, educational content, articles, notes, and other materials may contain errors or become outdated. We do not guarantee that every piece of website content is complete, current, error-free, or suitable for every individual situation.
          </p>
          <p>
            Users should independently verify important legal information and seek professional advice where necessary.
          </p>
        </section>

        {/* 18. No Legal Advice & Not a Law Firm */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">18.</span>
            <span>No Legal Advice &bull; Lex Minds is Not a Law Firm</span>
          </h2>
          <p>
            <strong>Lex Minds is an independent, student-led educational platform and is not a law firm.</strong> Lex Minds does not provide legal representation, legal advice, legal opinions, or legal consultancy of any nature.
          </p>
          <p className="font-semibold text-ink-900 dark:text-ink-100">
            Content available through Lex Minds—including published articles, student commentaries, case briefs, workshops, and mentorship discussions—is strictly intended for informational, academic, and educational purposes.
          </p>
          <p>
            Use of this website, participating in programmes, or communicating with mentors does not create an advocate-client relationship or any other professional legal relationship.
          </p>
        </section>

        {/* 19. User Conduct */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">19.</span>
            <span>User Conduct</span>
          </h2>
          <p>Users must use the website and programmes responsibly. You must not:</p>
          <ul className="list-disc list-inside space-y-1 text-ink-600 dark:text-ink-400 pl-2">
            <li>Engage in unlawful activities</li>
            <li>Harass other participants</li>
            <li>Threaten or intimidate team members or students</li>
            <li>Submit fraudulent information</li>
            <li>Attempt to access restricted systems</li>
            <li>Introduce malicious software</li>
            <li>Interfere with website functionality</li>
            <li>Impersonate another person</li>
            <li>Misuse another person&apos;s personal information</li>
            <li>Attempt to manipulate certificates or verification records</li>
            <li>Use Lex Minds India&apos;s branding without permission</li>
            <li>Engage in behaviour that materially disrupts a programme</li>
          </ul>
        </section>

        {/* 20. WhatsApp, LinkedIn and Other Communication Channels */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">20.</span>
            <span>WhatsApp, LinkedIn and Other Communication Channels</span>
          </h2>
          <p>
            Lex Minds India may use third-party platforms such as WhatsApp, LinkedIn, email, or other communication services to communicate with participants. Users must comply with both these Terms and the applicable third-party platform&apos;s own terms and policies.
          </p>
          <p className="text-xs text-ink-500">
            Lex Minds India is not responsible for outages, restrictions, account suspensions, or other actions taken by third-party platforms.
          </p>
        </section>

        {/* 21. Third-Party Links and Services */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">21.</span>
            <span>Third-Party Links and Services</span>
          </h2>
          <p>
            Our website may contain links to third-party websites and services (including LinkedIn, payment services, educational resources, professional profiles, external legal resources, or technology hosting). Third-party websites operate independently and may have their own terms and privacy policies.
          </p>
          <p>
            Lex Minds India does not guarantee the accuracy, availability, security, or content of third-party websites.
          </p>
        </section>

        {/* 22. Website Availability */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">22.</span>
            <span>Website Availability</span>
          </h2>
          <p>
            We aim to keep the website accessible, but continuous availability cannot be guaranteed. The website may occasionally be unavailable because of maintenance, technical problems, hosting issues, security incidents, updates, or circumstances beyond our reasonable control.
          </p>
          <p>
            We may modify, suspend, or discontinue parts of the website or its services when necessary.
          </p>
        </section>

        {/* 23. Account and Information Security */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">23.</span>
            <span>Account and Information Security</span>
          </h2>
          <p>
            Where accounts or login credentials are provided, users are responsible for maintaining the confidentiality of their credentials. Users must notify Lex Minds India if they believe their account has been compromised.
          </p>
          <p>
            Users must not attempt to access another person&apos;s account or restricted administrative systems.
          </p>
        </section>

        {/* 24. Privacy */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">24.</span>
            <span>Privacy</span>
          </h2>
          <p>
            Our collection and use of personal information are governed by our Privacy Policy. By using our website or participating in our programmes, users acknowledge that personal information may be processed in accordance with the Privacy Policy.
          </p>
        </section>

        {/* 25. Limitation of Liability */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">25.</span>
            <span>Limitation of Liability</span>
          </h2>
          <p>
            To the extent permitted by applicable law, Lex Minds India will not be responsible for losses arising from:
          </p>
          <ul className="list-disc list-inside space-y-1 text-ink-600 dark:text-ink-400 pl-2">
            <li>Temporary website unavailability</li>
            <li>Third-party service failures</li>
            <li>User-provided inaccurate information</li>
            <li>Unauthorised use of user accounts</li>
            <li>Reliance on general educational information as individual legal advice</li>
            <li>Loss or misuse of content caused by a user&apos;s own actions</li>
            <li>Events beyond our reasonable control</li>
          </ul>
          <p className="text-xs text-ink-500">
            Nothing in these Terms is intended to exclude or limit liability where such exclusion or limitation is prohibited by applicable law.
          </p>
        </section>

        {/* 26. Indemnity */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">26.</span>
            <span>Indemnity</span>
          </h2>
          <p>
            To the extent permitted by applicable law, users may be responsible for losses, claims, liabilities, or reasonable expenses arising from their:
          </p>
          <ul className="list-disc list-inside space-y-1 text-ink-600 dark:text-ink-400 pl-2">
            <li>Violation of these Terms</li>
            <li>Fraudulent conduct</li>
            <li>Unlawful use of the website</li>
            <li>Copyright infringement</li>
            <li>Misuse of another person&apos;s personal information</li>
            <li>Misuse of Lex Minds India services</li>
          </ul>
          <p className="text-xs text-ink-500">
            This provision does not remove any rights available to users under applicable law.
          </p>
        </section>

        {/* 27. Suspension or Termination */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">27.</span>
            <span>Suspension or Termination</span>
          </h2>
          <p>
            Lex Minds India may suspend or terminate a user&apos;s participation where there are reasonable grounds to believe that the user has violated these Terms, engaged in fraudulent activity, submitted plagiarised or fraudulent work, misused certificates, harassed other participants, attempted to compromise website security, provided materially false information, or otherwise materially disrupted a programme.
          </p>
          <p>
            Where appropriate, users may be given an opportunity to address the issue before termination.
          </p>
        </section>

        {/* 28. Certificate Revocation */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">28.</span>
            <span>Certificate Revocation</span>
          </h2>
          <p>
            Where a certificate has been issued on the basis of materially false information, fraudulent participation, plagiarism, manipulation, or other serious violation of programme requirements, Lex Minds India may revoke the certificate where appropriate.
          </p>
          <p>
            A revoked certificate may no longer be considered valid through the official verification system.
          </p>
        </section>

        {/* 29. Changes to These Terms */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">29.</span>
            <span>Changes to These Terms</span>
          </h2>
          <p>
            Lex Minds India may update these Terms from time to time to reflect new programmes, changes in website functionality, changes in business practices, changes in applicable law, or changes in technology.
          </p>
          <p>
            The latest version will be published on this page with an updated &ldquo;Last Updated&rdquo; date. Continued use of the website after an updated version is published may constitute acceptance of the revised Terms to the extent permitted by applicable law.
          </p>
        </section>

        {/* 30. Governing Law and Jurisdiction */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">30.</span>
            <span>Governing Law and Jurisdiction</span>
          </h2>
          <p>
            These Terms shall be governed by the laws applicable in India. Subject to applicable law, disputes relating to these Terms or the use of Lex Minds India services shall be subject to the jurisdiction of the appropriate courts in India.
          </p>
          <p>
            Where a specific programme agreement provides a different dispute-resolution mechanism, that agreement may apply to the extent legally valid.
          </p>
        </section>

        {/* 31. Severability */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">31.</span>
            <span>Severability</span>
          </h2>
          <p>
            If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will continue to operate to the extent permitted by law.
          </p>
        </section>

        {/* 32. Entire Agreement */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">32.</span>
            <span>Entire Agreement</span>
          </h2>
          <p>
            These Terms, together with the Privacy Policy and any programme-specific terms, policies, or notices provided to participants, constitute the applicable terms governing use of the relevant Lex Minds India services, subject to applicable law.
          </p>
        </section>

        {/* 33. Contact Us */}
        <section className="space-y-3 p-5 rounded bg-royal-50/50 dark:bg-royal-950/20 border border-royal-200/60 dark:border-royal-800/40">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5">
            <Mail className="w-5 h-5 text-royal-600 dark:text-royal-400" />
            <span>33. Contact Us</span>
          </h2>
          <p>
            For questions, concerns, or requests regarding these Terms, please contact:
          </p>
          <div className="font-mono text-xs space-y-1 text-ink-900 dark:text-ink-100">
            <p className="font-bold font-serif text-sm">Lex Minds India</p>
            <p>
              Email:{' '}
              <a 
                href="mailto:lexmindsindia@gmail.com" 
                className="text-royal-600 dark:text-royal-400 underline hover:text-royal-700"
              >
                lexmindsindia@gmail.com
              </a>
            </p>
          </div>
        </section>

        {/* IMPORTANT NOTICE */}
        <section className="space-y-3 p-5 rounded bg-amber-500/10 dark:bg-amber-500/5 border border-amber-500/20 text-xs">
          <h2 className="text-base font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2 text-amber-900 dark:text-amber-300">
            <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>Important Notice</span>
          </h2>
          <p className="text-ink-700 dark:text-ink-300">
            Lex Minds India is a student-focused legal education and development platform.
          </p>
          <p className="text-ink-700 dark:text-ink-300">
            Nothing on the website should be interpreted as representing that Lex Minds India is a government authority, university, statutory body, bar council, court, or accredited educational institution unless such status is expressly established and legally applicable.
          </p>
          <p className="font-medium text-ink-900 dark:text-ink-100">
            Users should rely on official sources and qualified professionals for important legal or professional decisions.
          </p>
        </section>

        {/* Footer Note */}
        <div className="pt-6 border-t border-ink-900/10 dark:border-ink-800 text-center font-mono text-xs text-ink-500">
          &copy; 2026 Lex Minds India. All rights reserved.
        </div>

      </div>
    </div>
  );
}
