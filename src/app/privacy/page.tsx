import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  FileText, 
  UserCheck, 
  Award, 
  QrCode, 
  Users, 
  Cookie, 
  Globe, 
  CreditCard, 
  Share2, 
  Clock, 
  AlertCircle, 
  Mail, 
  ExternalLink, 
  CheckCircle2,
  FileCode2,
  Scale
} from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | Lex Minds India',
  description: 'Official Privacy Policy of Lex Minds India explaining how we collect, use, store, protect, and handle personal data across our programmes and publications.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <Breadcrumbs items={[{ name: 'Privacy Policy' }]} />

      {/* Header */}
      <div className="space-y-3 border-b border-ink-900/15 dark:border-ink-700 pb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-sm bg-royal-50 dark:bg-royal-950/40 border border-royal-200 dark:border-royal-800 text-royal-700 dark:text-royal-300 text-[11px] font-mono font-bold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Official Transparency &amp; Governance</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-ink-950 dark:text-ink-50 tracking-tight">
          Privacy Policy
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
            Lex Minds India is a student-focused legal learning and development platform intended to provide opportunities relating to legal education, legal research, legal writing, publications, internships, legal awareness content, and related academic activities.
          </p>
          <p>
            This Privacy Policy explains how we collect, use, store, protect, and disclose information when you visit or use our website, participate in our internship programmes, submit content, register for our programmes, communicate with us, or otherwise interact with Lex Minds India.
          </p>
          <p className="font-medium text-ink-900 dark:text-ink-100">
            By using our website or voluntarily providing information to us, you acknowledge that you have read and understood this Privacy Policy.
          </p>
        </section>

        {/* 2. Information We May Collect */}
        <section className="space-y-4">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">02.</span>
            <span>Information We May Collect</span>
          </h2>
          <p>
            Depending on how you interact with Lex Minds India, we may collect the following categories of information.
          </p>

          <div className="space-y-4 pl-1 sm:pl-4 border-l-2 border-royal-500/30 dark:border-royal-500/20">
            <div className="space-y-2">
              <h3 className="font-serif font-bold text-base text-ink-900 dark:text-ink-100">
                A. Information provided during registration
              </h3>
              <p>When you register for an internship, programme, event, or other activity, we may collect:</p>
              <ul className="list-disc list-inside space-y-1 text-ink-600 dark:text-ink-400 pl-2">
                <li>Full name</li>
                <li>Email address</li>
                <li>Contact number</li>
                <li>Educational institution</li>
                <li>Course or programme of study</li>
                <li>Year/semester of study</li>
                <li>City/state or general location</li>
                <li>Areas of legal interest</li>
                <li>Information necessary to process your registration</li>
                <li>Other information voluntarily provided through the registration form</li>
              </ul>
              <p className="text-xs italic text-ink-500">
                We will only request information reasonably necessary for the relevant purpose.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <h3 className="font-serif font-bold text-base text-ink-900 dark:text-ink-100">
                B. Internship-related information
              </h3>
              <p>For participants in our internship programmes, we may collect information relating to:</p>
              <ul className="list-disc list-inside space-y-1 text-ink-600 dark:text-ink-400 pl-2">
                <li>Internship registration</li>
                <li>Assigned tasks</li>
                <li>Submitted assignments</li>
                <li>Attendance or participation</li>
                <li>Completion status</li>
                <li>Feedback and evaluations</li>
                <li>Publication status</li>
                <li>Certificate information</li>
              </ul>
            </div>

            <div className="space-y-2 pt-2">
              <h3 className="font-serif font-bold text-base text-ink-900 dark:text-ink-100">
                C. Content submitted by users
              </h3>
              <p>Users may voluntarily submit:</p>
              <ul className="list-disc list-inside space-y-1 text-ink-600 dark:text-ink-400 pl-2">
                <li>Legal articles</li>
                <li>Research work</li>
                <li>Case analyses</li>
                <li>Case briefs</li>
                <li>Legal awareness content</li>
                <li>Videos or other educational content</li>
                <li>Presentations</li>
                <li>Assignments</li>
                <li>Photographs or profile information for authorised publication</li>
              </ul>
              <p className="text-xs text-coral-600 dark:text-coral-400">
                Users should not submit confidential, sensitive, or personally identifying information belonging to another person without proper permission.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <h3 className="font-serif font-bold text-base text-ink-900 dark:text-ink-100">
                D. Communication information
              </h3>
              <p>
                If you contact us through email, forms, social-media platforms, WhatsApp, or other communication channels, we may retain the information necessary to respond to your enquiry and maintain appropriate records.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <h3 className="font-serif font-bold text-base text-ink-900 dark:text-ink-100">
                E. Technical information
              </h3>
              <p>
                When you use our website, certain technical information may be collected automatically, depending on the technologies and services used on the website, such as:
              </p>
              <ul className="list-disc list-inside space-y-1 text-ink-600 dark:text-ink-400 pl-2">
                <li>IP address</li>
                <li>Browser type</li>
                <li>Device type</li>
                <li>Operating system</li>
                <li>Pages visited</li>
                <li>Approximate usage information</li>
                <li>Date and time of access</li>
                <li>Referring pages or links</li>
              </ul>
              <p className="text-xs text-ink-500">
                Such information may be used for website security, analytics, troubleshooting, and improving our services.
              </p>
            </div>
          </div>
        </section>

        {/* 3. How We Use Your Information */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">03.</span>
            <span>How We Use Your Information</span>
          </h2>
          <p>We may use collected information for legitimate purposes including:</p>
          <ul className="list-disc list-inside space-y-1 text-ink-600 dark:text-ink-400 pl-2">
            <li>Processing internship and programme registrations</li>
            <li>Communicating with applicants and participants</li>
            <li>Managing internship activities</li>
            <li>Assigning and reviewing tasks</li>
            <li>Providing educational opportunities</li>
            <li>Managing publications</li>
            <li>Issuing certificates</li>
            <li>Verifying certificates</li>
            <li>Responding to enquiries</li>
            <li>Maintaining organisational records</li>
            <li>Improving our website and programmes</li>
            <li>Preventing fraud, abuse, or misuse</li>
            <li>Maintaining website security</li>
            <li>Complying with applicable legal requirements</li>
            <li>Communicating important programme-related information</li>
          </ul>
          <p className="text-xs font-mono text-ink-500">
            We will not use personal information for purposes unrelated to the reason for which it was collected unless permitted or required by applicable law.
          </p>
        </section>

        {/* 4. Legal Publications and User Contributions */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">04.</span>
            <span>Legal Publications and User Contributions</span>
          </h2>
          <p>
            Lex Minds India may publish educational and legal content submitted by students, interns, team members, mentors, or other contributors.
          </p>
          <p>
            Where content is accepted for publication, the contributor&apos;s name may be displayed alongside the content where appropriate.
          </p>
          <p>Before submitting material for publication, contributors should ensure that:</p>
          <ul className="list-disc list-inside space-y-1 text-ink-600 dark:text-ink-400 pl-2">
            <li>The work is original or appropriately licensed.</li>
            <li>Sources are properly acknowledged.</li>
            <li>Copyright belonging to third parties is not infringed.</li>
            <li>Confidential information is not disclosed.</li>
            <li>Personal information of other individuals is not unnecessarily included.</li>
          </ul>
          <p>
            Lex Minds India may review, edit, format, reject, remove, or request modifications to submitted content in accordance with its editorial standards.
          </p>
        </section>

        {/* 5. Photographs, Profiles and Social Media */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">05.</span>
            <span>Photographs, Profiles and Social Media</span>
          </h2>
          <p>With appropriate permission, Lex Minds India may publish information such as:</p>
          <ul className="list-disc list-inside space-y-1 text-ink-600 dark:text-ink-400 pl-2">
            <li>Student names</li>
            <li>Mentor names</li>
            <li>Team-member names</li>
            <li>Professional photographs</li>
            <li>Professional biographies</li>
            <li>LinkedIn or other professional profile links</li>
            <li>Internship achievements</li>
            <li>Publication details</li>
            <li>Programme-related photographs</li>
          </ul>
          <p>
            Such information may appear on our website, LinkedIn page, social-media channels, certificates, promotional materials, or other official Lex Minds India platforms.
          </p>
          <p>
            We will seek appropriate permission where required before publicly displaying personal information or photographs.
          </p>
        </section>

        {/* 6. Certificate Verification */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">06.</span>
            <span>Certificate Verification</span>
          </h2>
          <p>
            Lex Minds India may provide certificates to eligible participants who satisfy the requirements of a relevant programme.
          </p>
          <p>
            Certificates may contain a unique certificate identification number. For example:{' '}
            <code className="px-2 py-0.5 rounded bg-royal-50 dark:bg-royal-950/50 border border-royal-200 dark:border-royal-800 font-mono text-royal-700 dark:text-royal-300">
              LMI-INT-2026-0001
            </code>
          </p>
          <p>
            We may maintain a certificate-verification database to allow third parties to verify the authenticity and status of certificates issued by Lex Minds India.
          </p>
          <p>A verification page may display limited information such as:</p>
          <ul className="list-disc list-inside space-y-1 text-ink-600 dark:text-ink-400 pl-2">
            <li>Certificate ID</li>
            <li>Certificate holder&apos;s name</li>
            <li>Programme name</li>
            <li>Programme duration</li>
            <li>Date of issue</li>
            <li>Certificate status</li>
          </ul>
          <p>
            We will seek to limit publicly accessible verification information to what is reasonably necessary for verification.
          </p>
          <div className="p-3.5 rounded bg-paper dark:bg-ink-900 border border-ink-900/10 dark:border-ink-800 text-xs">
            A certificate issued by Lex Minds India represents participation or completion according to the applicable programme requirements. It should not be represented as a government certificate, statutory licence, university qualification, accreditation, or professional licence unless Lex Minds India expressly states and is legally entitled to make such a representation.
          </div>
        </section>

        {/* 7. QR Codes and Verification Links */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">07.</span>
            <span>QR Codes and Verification Links</span>
          </h2>
          <p>
            Certificates may contain QR codes linking to an official Lex Minds India verification page.
          </p>
          <p>
            The purpose of the QR code is to help a person verify the authenticity of the certificate. Users should rely only on verification pages hosted through official Lex Minds India channels.
          </p>
          <p>
            Lex Minds India may suspend, correct, or revoke a certificate where there is a legitimate reason, including fraudulent issuance, material error, misuse, or violation of programme requirements.
          </p>
        </section>

        {/* 8. Mentors and Team Members */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">08.</span>
            <span>Mentors and Team Members</span>
          </h2>
          <p>
            Information relating to mentors, coordinators, founders, team members, or other associated individuals may be displayed on our website or official social-media platforms where appropriate permission has been obtained.
          </p>
          <p>
            Such information may include professional designation, biography, photograph, area of expertise, and professional profile links.
          </p>
          <p className="font-medium text-ink-900 dark:text-ink-100">
            We do not intend to imply an employment, partnership, institutional affiliation, or professional endorsement where none exists.
          </p>
        </section>

        {/* 9. Cookies and Similar Technologies */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">09.</span>
            <span>Cookies and Similar Technologies</span>
          </h2>
          <p>Our website may use cookies or similar technologies to:</p>
          <ul className="list-disc list-inside space-y-1 text-ink-600 dark:text-ink-400 pl-2">
            <li>Make the website function properly</li>
            <li>Remember preferences</li>
            <li>Understand website usage</li>
            <li>Improve performance</li>
            <li>Maintain security</li>
            <li>Support analytics or other website functionality</li>
          </ul>
          <p>
            The specific cookies used may depend on the services and technologies integrated into the website.
          </p>
          <p>
            Users may be able to control cookies through their browser settings. Disabling certain cookies may affect website functionality.
          </p>
        </section>

        {/* 10. Third-Party Services */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">10.</span>
            <span>Third-Party Services</span>
          </h2>
          <p>Our website may use third-party services for purposes such as:</p>
          <ul className="list-disc list-inside space-y-1 text-ink-600 dark:text-ink-400 pl-2">
            <li>Website hosting</li>
            <li>Database management</li>
            <li>Forms</li>
            <li>Analytics</li>
            <li>Email communication</li>
            <li>Certificate verification</li>
            <li>QR-code generation</li>
            <li>Payment processing, where applicable</li>
            <li>Embedded content</li>
            <li>Social-media integrations</li>
          </ul>
          <p>
            Third-party services may process information according to their own privacy policies and terms. Lex Minds India does not control the privacy practices of independent third-party services. Where appropriate, users should review the privacy policies of those services.
          </p>
        </section>

        {/* 11. Payments */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">11.</span>
            <span>Payments</span>
          </h2>
          <p>
            If Lex Minds India offers programmes that require a registration or participation fee, payment information may be processed by the applicable payment service provider.
          </p>
          <p>
            Lex Minds India should not ordinarily receive or store complete payment-card information when payment is processed through a third-party payment provider.
          </p>
          <p>Payment-related information may be used to:</p>
          <ul className="list-disc list-inside space-y-1 text-ink-600 dark:text-ink-400 pl-2">
            <li>Confirm payment</li>
            <li>Maintain transaction records</li>
            <li>Process refunds where applicable</li>
            <li>Resolve payment disputes</li>
            <li>Prevent fraudulent transactions</li>
            <li>Comply with applicable legal and accounting requirements</li>
          </ul>
          <p className="text-xs italic text-ink-500">
            The applicable payment provider may have its own terms and privacy policy.
          </p>
        </section>

        {/* 12. Data Sharing and Disclosure */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">12.</span>
            <span>Data Sharing and Disclosure</span>
          </h2>
          <p className="font-semibold text-ink-900 dark:text-ink-100">
            We do not intend to sell users&apos; personal information.
          </p>
          <p>Information may be shared only where reasonably necessary for purposes such as:</p>
          <ul className="list-disc list-inside space-y-1 text-ink-600 dark:text-ink-400 pl-2">
            <li>Providing requested services</li>
            <li>Operating our website</li>
            <li>Managing programmes</li>
            <li>Processing payments</li>
            <li>Maintaining databases</li>
            <li>Providing technical services</li>
            <li>Certificate verification</li>
            <li>Responding to lawful requests</li>
            <li>Protecting the rights, safety, and security of Lex Minds India and its users</li>
            <li>Complying with applicable law</li>
          </ul>
          <p>
            Where third-party service providers process information on our behalf, we will seek to use providers and arrangements appropriate to the service being provided.
          </p>
        </section>

        {/* 13. Publicly Available Information */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">13.</span>
            <span>Publicly Available Information</span>
          </h2>
          <p>
            Information voluntarily submitted for public publication may become accessible to other people through the internet.
          </p>
          <p>
            For example, a published article may contain the author&apos;s name and may be indexed by search engines. Users should therefore carefully consider what personal information they include in material submitted for publication.
          </p>
          <p>
            Lex Minds India is not responsible for copies of publicly published content reproduced or redistributed by independent third parties, except to the extent required by applicable law.
          </p>
        </section>

        {/* 14. Data Retention */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">14.</span>
            <span>Data Retention</span>
          </h2>
          <p>
            We retain personal information only for as long as reasonably necessary for the purposes described in this Privacy Policy, including:
          </p>
          <ul className="list-disc list-inside space-y-1 text-ink-600 dark:text-ink-400 pl-2">
            <li>Programme administration</li>
            <li>Certificate verification</li>
            <li>Publication records</li>
            <li>Legal or regulatory requirements</li>
            <li>Dispute resolution</li>
            <li>Security and fraud prevention</li>
            <li>Legitimate organisational record keeping</li>
          </ul>
          <p>
            Retention periods may differ depending on the type and purpose of the information. Certificate records may need to be retained for longer periods so that certificates can continue to be verified after issuance.
          </p>
        </section>

        {/* 15. Data Security */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">15.</span>
            <span>Data Security</span>
          </h2>
          <p>
            We take reasonable measures to protect personal information against unauthorised access, alteration, disclosure, loss, or misuse. Depending on the systems used, security measures may include:
          </p>
          <ul className="list-disc list-inside space-y-1 text-ink-600 dark:text-ink-400 pl-2">
            <li>Access controls</li>
            <li>Password protection</li>
            <li>Secure hosting</li>
            <li>Limited administrative access</li>
            <li>Data backups</li>
            <li>Secure transmission where supported</li>
            <li>Appropriate database permissions</li>
          </ul>
          <p>
            However, no internet-based service can guarantee absolute security. Users should also take reasonable precautions to protect their own accounts, passwords, documents, and personal information.
          </p>
        </section>

        {/* 16. Children's and Minor Users' Privacy */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">16.</span>
            <span>Children&apos;s and Minor Users&apos; Privacy</span>
          </h2>
          <p>
            Some Lex Minds India programmes may be accessible to students who are under the age of 18.
          </p>
          <p>
            Where a programme involves minors, Lex Minds India may require appropriate consent or authorisation from a parent or legal guardian where required by applicable law or considered appropriate for the programme.
          </p>
          <p>
            We do not knowingly seek unnecessary personal information from minors. If a parent or guardian believes that a minor has provided personal information without appropriate consent, they may contact us at:{' '}
            <a href="mailto:lexmindsindia@gmail.com" className="text-royal-600 dark:text-royal-400 font-mono hover:underline">
              lexmindsindia@gmail.com
            </a>. We will review the request and take appropriate action where required by applicable law.
          </p>
        </section>

        {/* 17. User Rights and Requests */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">17.</span>
            <span>User Rights and Requests</span>
          </h2>
          <p>
            Depending on applicable law, individuals may have rights concerning their personal information, which may include the ability to:
          </p>
          <ul className="list-disc list-inside space-y-1 text-ink-600 dark:text-ink-400 pl-2">
            <li>Request access to certain personal information</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion where legally applicable</li>
            <li>Withdraw consent where processing is based on consent</li>
            <li>Object to or restrict certain processing</li>
            <li>Request information about how personal information is used</li>
          </ul>
          <p>
            Requests can be submitted to:{' '}
            <a href="mailto:lexmindsindia@gmail.com" className="text-royal-600 dark:text-royal-400 font-mono hover:underline">
              lexmindsindia@gmail.com
            </a>
          </p>
          <p className="text-xs text-ink-500">
            We may need to verify the identity of the person making a request before taking action. Some information may need to be retained where required by law or where there is a legitimate reason to maintain the record.
          </p>
        </section>

        {/* 18. Withdrawal of Permission */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">18.</span>
            <span>Withdrawal of Permission</span>
          </h2>
          <p>
            Where we rely on your permission to publish your photograph, profile, article, or other personal information, you may contact us to request withdrawal of that permission.
          </p>
          <p>
            Withdrawal does not necessarily affect processing that occurred before the withdrawal.
          </p>
          <p>
            Where content has already been published or distributed, removal from our website may not automatically remove copies that have been independently reproduced, cached, indexed, or shared by third parties.
          </p>
        </section>

        {/* 19. Accuracy of Information */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">19.</span>
            <span>Accuracy of Information</span>
          </h2>
          <p>
            Users are responsible for providing accurate information when registering for programmes or submitting information to Lex Minds India.
          </p>
          <p>
            Providing false, misleading, or fraudulent information may result in cancellation of registration, rejection of submissions, suspension from a programme, or other appropriate action.
          </p>
        </section>

        {/* 20. Intellectual Property and Privacy */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">20.</span>
            <span>Intellectual Property and Privacy</span>
          </h2>
          <p>Users should not upload or submit material containing:</p>
          <ul className="list-disc list-inside space-y-1 text-ink-600 dark:text-ink-400 pl-2">
            <li>Confidential documents</li>
            <li>Private communications</li>
            <li>Personal data belonging to another person</li>
            <li>Unpublished legal documents</li>
            <li>Restricted institutional material</li>
            <li>Copyrighted material without appropriate permission</li>
          </ul>
          <p>
            Users are responsible for ensuring that their submissions comply with applicable copyright, privacy, confidentiality, and other laws.
          </p>
        </section>

        {/* 21. External Links */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">21.</span>
            <span>External Links</span>
          </h2>
          <p>
            Our website may contain links to external websites, including LinkedIn, educational resources, professional profiles, legal resources, or third-party services.
          </p>
          <p>
            We are not responsible for the privacy practices, security, content, or policies of external websites. Users should review the relevant third party&apos;s policies before providing personal information.
          </p>
        </section>

        {/* 22. Changes to This Privacy Policy */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">22.</span>
            <span>Changes to This Privacy Policy</span>
          </h2>
          <p>We may update this Privacy Policy from time to time to reflect:</p>
          <ul className="list-disc list-inside space-y-1 text-ink-600 dark:text-ink-400 pl-2">
            <li>Changes to our services</li>
            <li>Changes to our website</li>
            <li>Changes to technology</li>
            <li>Changes in legal requirements</li>
            <li>Changes in our data practices</li>
          </ul>
          <p>
            The updated version will be published on this page with a revised &ldquo;Last Updated&rdquo; date. Users are encouraged to review this page periodically.
          </p>
        </section>

        {/* 23. Contact Us */}
        <section className="space-y-3 p-5 rounded bg-royal-50/50 dark:bg-royal-950/20 border border-royal-200/60 dark:border-royal-800/40">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5">
            <Mail className="w-5 h-5 text-royal-600 dark:text-royal-400" />
            <span>23. Contact Us</span>
          </h2>
          <p>
            If you have questions, concerns, complaints, or requests relating to this Privacy Policy or the handling of personal information, please contact us:
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
          <p className="text-xs text-ink-500">
            We will endeavour to review and respond to legitimate privacy-related enquiries within a reasonable period.
          </p>
        </section>

        {/* 24. Important Disclaimer */}
        <section className="space-y-3 p-5 rounded bg-amber-500/10 dark:bg-amber-500/5 border border-amber-500/20 text-xs">
          <h2 className="text-base font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2 text-amber-900 dark:text-amber-300">
            <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>24. Important Disclaimer</span>
          </h2>
          <p className="text-ink-700 dark:text-ink-300">
            Lex Minds India is a legal education and student-focused platform. Information provided through our website, publications, notes, articles, social-media platforms, internships, or other educational activities is intended for educational and informational purposes.
          </p>
          <p className="text-ink-700 dark:text-ink-300">
            Unless expressly stated otherwise, content provided by Lex Minds India does not constitute legal advice, an advocate-client relationship, or professional legal representation.
          </p>
          <p className="font-medium text-ink-900 dark:text-ink-100">
            Users should consult a qualified legal professional for advice concerning their individual legal circumstances.
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
