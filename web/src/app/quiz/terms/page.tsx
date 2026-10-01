import React from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { 
  Scale, 
  Trophy, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  Clock, 
  Award, 
  FileCheck, 
  Ban, 
  ExternalLink,
  BookOpen,
  ArrowRight
} from 'lucide-react';

export const metadata = {
  title: 'Terms & Conditions for Quiz | Lex Minds',
  description:
    'Official Terms and Conditions, competition rules, candidate eligibility, examination protocol, and award policies for the LexMinds Virtual Quiz.',
  alternates: {
    canonical: 'https://lexminds.in/quiz/terms',
  },
};

export default function QuizTermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <Breadcrumbs 
        items={[
          { name: 'Virtual Quiz', href: '/quiz' },
          { name: 'Terms & Conditions for Quiz', href: '/quiz/terms' }
        ]} 
      />

      {/* Header Banner */}
      <div className="space-y-4 border-b border-ink-900/15 dark:border-ink-700 pb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-sm bg-royal-50 dark:bg-royal-950/40 border border-royal-200 dark:border-royal-800 text-royal-700 dark:text-royal-300 text-[11px] font-mono font-bold uppercase tracking-wider">
          <Scale className="w-3.5 h-3.5" />
          <span>Competition Rulebook &bull; Official Governance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-ink-950 dark:text-ink-50 tracking-tight leading-tight">
          Terms &amp; Conditions for <span className="text-royal-600 dark:text-royal-400">Virtual Quiz</span>
        </h1>
        <p className="text-sm sm:text-base text-ink-600 dark:text-ink-300 leading-relaxed font-normal max-w-2xl">
          These Terms and Conditions govern participation, evaluation, candidate conduct, and certification for the LexMinds Virtual National Quiz Competition.
        </p>
        <div className="flex flex-wrap gap-y-1 gap-x-4 text-xs font-mono text-ink-500 dark:text-ink-400 pt-2 border-t border-ink-900/10 dark:border-ink-800">
          <span><strong>Effective Edition:</strong> 2026 Virtual Edition</span>
          <span>&bull;</span>
          <span><strong>Nominal Registration Fee:</strong> ₹19.00</span>
          <span>&bull;</span>
          <span>
            <strong>Official Support:</strong>{' '}
            <a href="mailto:lexmindsindia@gmail.com" className="text-royal-600 dark:text-royal-400 hover:underline">
              lexmindsindia@gmail.com
            </a>
          </span>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="p-6 sm:p-12 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 space-y-10 text-sm text-ink-700 dark:text-ink-300 leading-relaxed shadow-brutal">

        {/* 1. Binding Agreement & Preamble */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">01.</span>
            <span>Binding Agreement &amp; Acceptance</span>
          </h2>
          <p>
            By ticking the mandatory acceptance checkbox on the Quiz Registration page and paying the nominal ₹19 registration fee, you (&ldquo;Participant&rdquo;, &ldquo;Candidate&rdquo;, or &ldquo;You&rdquo;) enter into a legally binding agreement with LexMinds India (&ldquo;LexMinds&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) and agree to abide strictly by these Terms &amp; Conditions for Quiz, together with our{' '}
            <Link href="/terms" className="text-royal-600 dark:text-royal-400 underline font-semibold" target="_blank">
              General Terms
            </Link>,{' '}
            <Link href="/privacy" className="text-royal-600 dark:text-royal-400 underline font-semibold" target="_blank">
              Privacy Policy
            </Link>, and{' '}
            <Link href="/cancellation-refund-policy" className="text-royal-600 dark:text-royal-400 underline font-semibold" target="_blank">
              Cancellation &amp; Refund Policy
            </Link>.
          </p>
          <div className="p-4 bg-royal-50/60 dark:bg-royal-950/40 border border-royal-200 dark:border-royal-800 rounded-sm text-xs font-mono text-royal-900 dark:text-royal-200">
            <strong>Mandatory Affirmation:</strong> If you do not accept these terms in their entirety, you must not check the declaration box or submit the registration form.
          </div>
        </section>

        {/* 2. Eligibility & Individual Participation */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">02.</span>
            <span>Eligibility &amp; Registration Requirements</span>
          </h2>
          <p>
            The LexMinds Virtual Quiz is an academic jurisprudence competition open to:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-xs font-mono pl-2">
            <li>Students enrolled in 5-Year Integrated Law Programmes (B.A. LL.B, B.B.A. LL.B, B.Sc. LL.B, etc.).</li>
            <li>Students enrolled in 3-Year LL.B Programmes from recognized universities.</li>
            <li>LL.M Candidates, judicial service aspirants, and recent law graduates.</li>
            <li>Law aspirants preparing for entrance examinations (CLAT UG/PG, AILET, LSAT, etc.).</li>
          </ul>
          <p>
            <strong>Single Individual Entry:</strong> Each registration is strictly individual. Team participation, proxy candidates, or multiple individuals collaborating under a single registration docket are strictly prohibited.
          </p>
          <p>
            <strong>Accuracy of Profile:</strong> You warrant that your full legal name, college/institution name, WhatsApp contact number, and verified Google email are true and complete. E-Certificates will be issued strictly with the name submitted during registration.
          </p>
        </section>

        {/* 3. Registration Fee & Non-Refundability */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">03.</span>
            <span>Registration Fee &amp; Payment Policy (₹19.00)</span>
          </h2>
          <p>
            To cover essential administrative and examination infrastructure costs, a nominal, heavily subsidized registration fee of <strong>₹19.00 (Indian Rupees Nineteen Only)</strong> is payable via our secure payment gateway (Razorpay).
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-xs font-mono pl-2">
            <li><strong>Strict Non-Refundability:</strong> As detailed in our Cancellation and Refund Policy, the ₹19 registration fee is immediately committed to docket generation and backend slot reservation and is strictly non-refundable under all circumstances, including but not limited to candidate absence, timing conflicts, internet connectivity failure, or withdrawal.</li>
            <li><strong>Idempotency &amp; Conflict Protection:</strong> The LexMinds transactional pipeline records unique reference IDs (`QUIZ-...`). Conflicting or duplicate payments will not grant multiple slots.</li>
            <li><strong>Authoritative Receipt:</strong> Upon verified payment, an authoritative digital confirmation docket and Razorpay payment ID are recorded.</li>
          </ul>
        </section>

        {/* 4. Examination Format, Syllabus & Timelines */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">04.</span>
            <span>Examination Protocol, Syllabus &amp; Access</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3.5 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-800">
              <span className="text-ink-500 uppercase text-[10px] block">Test Structure</span>
              <span className="font-bold text-ink-950 dark:text-ink-50 mt-1 block">50 Multiple Choice Questions (MCQs)</span>
            </div>
            <div className="p-3.5 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-800">
              <span className="text-ink-500 uppercase text-[10px] block">Time Allowed</span>
              <span className="font-bold text-ink-950 dark:text-ink-50 mt-1 block">45 Minutes Strict Timed Window</span>
            </div>
            <div className="p-3.5 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-800">
              <span className="text-ink-500 uppercase text-[10px] block">Mode</span>
              <span className="font-bold text-royal-600 dark:text-royal-400 mt-1 block">Virtual Online Examination Link</span>
            </div>
            <div className="p-3.5 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-800">
              <span className="text-ink-500 uppercase text-[10px] block">Candidate Portal</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 mt-1 block">/quiz-main (Paid Candidates Desk)</span>
            </div>
          </div>
          <p className="pt-2">
            <strong>Syllabus Scope:</strong> The competition evaluates constitutional fundamentals, landmark Supreme Court of India precedents, modern criminal jurisprudence (Bharatiya Nyaya Sanhita, BNSS, BSA), contemporary legal developments, and digital data protection laws.
          </p>
          <p>
            <strong>Single Attempt Rule:</strong> Only the first submitted form from a verified participant email/docket will be evaluated. Subsequent or duplicate submissions from the same candidate will be automatically discarded.
          </p>
        </section>

        {/* 5. Anti-Malpractice & Academic Integrity */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">05.</span>
            <span>Code of Conduct &amp; Zero-Tolerance for Malpractice</span>
          </h2>
          <p>
            LexMinds adheres to the highest standards of academic integrity. The following actions constitute severe malpractice and will result in immediate, non-negotiable disqualification:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-xs font-mono pl-2 text-rose-700 dark:text-rose-300">
            <li>Collaborating with other participants during the examination window.</li>
            <li>Using unauthorized artificial intelligence bots, scraping scripts, or external automated solvers.</li>
            <li>Sharing the confidential examination link or question papers with unauthorized non-registered persons.</li>
            <li>Submitting answers under a false identity or impersonating another candidate.</li>
            <li>Attempting any distributed denial of service or disruption against the examination portal.</li>
          </ul>
          <p className="text-xs">
            LexMinds reserves the right to withhold certification and bar any candidate found engaging in unfair practices from future competitions or editorial fellowships.
          </p>
        </section>

        {/* 6. Scoring, Ranking & Tie-Breaking */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">06.</span>
            <span>Evaluation, Scoring Scheme &amp; Tie-Breakers</span>
          </h2>
          <p>
            All answer submissions are evaluated objectively by the LexMinds Academic &amp; Quiz Coordination Committee:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-xs font-mono pl-2">
            <li><strong>Standard Scheme:</strong> Each correct response is awarded one (+1) mark. Zero marks are deducted for unattempted questions unless specific negative marking is announced in the official candidate instructions before the quiz.</li>
            <li><strong>Authoritative Tie-Breaker:</strong> In the event of a tie in scores, the candidate who submitted their completed responses earlier (earliest verified server timestamp) will receive the higher ranking.</li>
            <li><strong>Finality of Decision:</strong> The decision of the LexMinds Quiz Advisory Board regarding answer keys, scoring anomalies, and final merit positions shall be final and binding. No individual arbitrations or subjective reviews shall be entertained.</li>
          </ul>
        </section>

        {/* 7. Official Candidate WhatsApp Group & Communications */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">07.</span>
            <span>Official Candidate WhatsApp Channel &amp; Alerts</span>
          </h2>
          <p>
            All critical operational announcements, test window countdowns, immediate answer keys, and rankings are published through the <strong>Official Candidates WhatsApp Group</strong> accessible on the Candidate Desk (<Link href="/quiz-main" className="text-royal-600 dark:text-royal-400 underline font-semibold">/quiz-main</Link>).
          </p>
          <p className="text-xs font-mono">
            Candidates are responsible for joining the WhatsApp channel promptly upon completing their ₹19 registration. LexMinds is not liable for missed instructions resulting from a candidate&apos;s failure to join the official communication channel.
          </p>
        </section>

        {/* 8. Recognition & E-Certificates */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">08.</span>
            <span>Recognition, Awards &amp; E-Certificates</span>
          </h2>
          <ul className="list-disc list-inside space-y-1.5 text-xs font-mono pl-2">
            <li><strong>Certificate of Participation:</strong> Every registered candidate who successfully submits their responses within the official test window will receive an authoritative digital E-Certificate of Participation.</li>
            <li><strong>Merit Certificates:</strong> Top performers and rank holders will receive official Merit E-Certificates and editorial recognition on LexMinds platforms.</li>
            <li><strong>Issuance Timeline:</strong> Digital certificates are dispatched to the registered candidate email within 7&ndash;14 business days following publication of the final verified rankings.</li>
          </ul>
        </section>

        {/* 9. Intellectual Property */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">09.</span>
            <span>Intellectual Property Rights</span>
          </h2>
          <p>
            All quiz questionnaires, research compilations, editorial rubrics, logos, branding, and answer keys are the exclusive intellectual property of LexMinds India. Unlicensed reproduction, public distribution, commercial resale, or hosting of quiz material on third-party repositories without prior written permission is strictly prohibited and actionable under applicable copyright laws.
          </p>
        </section>

        {/* 10. Modifications & Grievance Redressal */}
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-2.5 border-b border-ink-900/10 dark:border-ink-800 pb-2">
            <span className="font-mono text-royal-600 dark:text-royal-400 text-base">10.</span>
            <span>Modifications &amp; Grievance Redressal</span>
          </h2>
          <p>
            LexMinds reserves the right to amend competition timelines, question count, or test schedules if required by unforeseen technical or operational contingencies. Any schedule revisions will be announced in advance on the official Candidate Desk and WhatsApp group.
          </p>
          <div className="p-4 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 text-xs font-mono space-y-1.5">
            <span className="font-bold text-ink-950 dark:text-ink-50 block uppercase text-[11px]">
              Grievance &amp; Candidate Support:
            </span>
            <p className="text-ink-600 dark:text-ink-400">
              For any registration issues, docket reference inquiries, or technical assistance:
            </p>
            <p>
              Email:{' '}
              <a href="mailto:lexmindsindia@gmail.com" className="text-royal-600 dark:text-royal-400 underline font-semibold">
                lexmindsindia@gmail.com
              </a>{' '}
              | Desk:{' '}
              <Link href="/contact" className="text-royal-600 dark:text-royal-400 underline">
                LexMinds Helpdesk
              </Link>
            </p>
          </div>
        </section>

      </div>

      {/* Bottom Navigation CTA */}
      <div className="p-6 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 shadow-brutal flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-serif font-bold text-base text-ink-950 dark:text-ink-50">
            Ready to participate in the Virtual Quiz?
          </h3>
          <p className="text-xs text-ink-600 dark:text-ink-400 font-mono">
            Register and pay ₹19 to secure your examination docket.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/quiz"
            className="py-2.5 px-5 btn-brand-primary text-xs font-semibold uppercase tracking-wider flex items-center space-x-2"
          >
            <span>Go to Quiz Registration</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/quiz-main"
            className="py-2.5 px-4 bg-paper dark:bg-ink-800 hover:bg-paper-200 dark:hover:bg-ink-700 text-ink-900 dark:text-ink-100 font-mono text-xs rounded-sm border border-ink-900/15 dark:border-ink-700 transition-colors"
          >
            <span>Candidate Desk</span>
          </Link>
        </div>
      </div>

    </div>
  );
}
