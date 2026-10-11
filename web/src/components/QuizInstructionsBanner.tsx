import React from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  Clock,
  AlertCircle,
  Scale,
  Wifi,
  Gavel,
  Ban,
  CheckCircle2,
} from 'lucide-react';

interface QuizInstructionsBannerProps {
  className?: string;
  showBorder?: boolean;
}

export default function QuizInstructionsBanner({
  className = '',
  showBorder = true,
}: QuizInstructionsBannerProps) {
  const instructions = [
    {
      number: '1',
      title: 'No Copying or Screenshots Allowed',
      description:
        'Our quiz system includes monitoring tools designed to detect certain suspicious activities, including attempts to copy questions or take screenshots. Any participant found violating the quiz rules may be disqualified from the competition.',
      icon: ShieldAlert,
      badgeColor: 'text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-900',
      tag: 'Monitoring Enabled',
    },
    {
      number: '2',
      title: 'Do Not Switch Tabs or Leave the Quiz Window',
      description:
        'Participants must remain on the quiz tab throughout the competition. Switching tabs, navigating away from the quiz window, or attempting to access other resources may be detected by our monitoring system and may result in disqualification.',
      icon: Ban,
      badgeColor: 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-900',
      tag: 'Strict Tab Lock',
    },
    {
      number: '3',
      title: 'Quiz Timing and Submission Deadline',
      description:
        'The quiz will be available tomorrow, 11 October 2026, from 12:00 PM to 1:00 PM (IST). All participants must complete and submit their responses within this time period.',
      icon: Clock,
      badgeColor: 'text-royal-700 dark:text-royal-400 bg-royal-50 dark:bg-royal-950/60 border-royal-200 dark:border-royal-900',
      tag: '12:00 PM – 1:00 PM IST',
    },
    {
      number: '4',
      title: 'No Late Submissions',
      description:
        'Any quiz attempt initiated after 1:00 PM or any submission received after the deadline will not be accepted. Participants are strongly advised to complete and submit their responses well before the deadline to avoid last-minute technical issues.',
      icon: AlertCircle,
      badgeColor: 'text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-900',
      tag: 'Deadline Strict',
    },
    {
      number: '5',
      title: 'Maintain Fair Play and Academic Integrity',
      description:
        'Participants must attempt the quiz independently and must not seek assistance from other people, use unauthorized external resources, or engage in any unfair practices.',
      icon: Scale,
      badgeColor: 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-900',
      tag: 'Honor Code',
    },
    {
      number: '6',
      title: 'Be Prepared in Advance',
      description:
        'Please ensure that you have a stable internet connection and a suitable device before the quiz begins. Participants are requested to be ready before the starting time.',
      icon: Wifi,
      badgeColor: 'text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-900',
      tag: 'Preparation',
    },
    {
      number: '7',
      title: 'Final Decision',
      description:
        'The organizing team of Lex Minds India reserves the right to review suspected violations and take appropriate action in accordance with the competition rules.',
      icon: Gavel,
      badgeColor: 'text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 border-purple-200 dark:border-purple-900',
      tag: 'Authority',
    },
  ];

  return (
    <div
      className={`rounded-sm bg-surface-light dark:bg-surface-dark ${
        showBorder ? 'border-2 border-rose-500/50 dark:border-rose-500/40 shadow-brutal' : ''
      } p-6 sm:p-8 md:p-10 space-y-8 ${className}`}
    >
      {/* Header Banner */}
      <div className="space-y-3 pb-6 border-b border-ink-900/10 dark:border-ink-800">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-sm bg-rose-50 dark:bg-rose-950/50 border border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300 font-bold uppercase tracking-wider text-[11px]">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
            <span>Official Candidate Guidance &amp; Warnings</span>
          </div>
          <span className="text-xs font-mono font-bold text-ink-500 dark:text-ink-400 uppercase tracking-wider">
            LEX MINDS INDIA
          </span>
        </div>

        <div className="space-y-1.5">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink-950 dark:text-ink-50 tracking-tight">
            Legal Awareness Quiz Competition – Important Instructions
          </h2>
          <p className="text-sm text-ink-600 dark:text-ink-300 leading-relaxed font-normal">
            Dear Participants,
          </p>
          <p className="text-xs sm:text-sm text-ink-700 dark:text-ink-300 leading-relaxed font-mono">
            Please read all the following instructions carefully before attempting the Legal Awareness Quiz Competition. All participants are required to follow these rules strictly.
          </p>
        </div>
      </div>

      {/* 7 Instructions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {instructions.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.number}
              className="p-4 sm:p-5 rounded-sm bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-800 flex flex-col justify-between space-y-3 transition-all hover:border-ink-900/30 dark:hover:border-ink-600"
            >
              <div className="space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center space-x-2.5">
                    <span className="w-6 h-6 rounded-full bg-ink-900 dark:bg-white text-white dark:text-ink-900 text-xs font-mono font-bold flex items-center justify-center shrink-0">
                      {item.number}
                    </span>
                    <h3 className="font-serif font-bold text-sm sm:text-base text-ink-950 dark:text-ink-50 leading-snug">
                      {item.title}
                    </h3>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border shrink-0 ${item.badgeColor}`}
                  >
                    {item.tag}
                  </span>
                </div>

                <p className="text-xs text-ink-600 dark:text-ink-300 font-mono leading-relaxed pl-8">
                  {item.description}
                </p>
              </div>

              <div className="pt-2 border-t border-ink-900/5 dark:border-ink-800/60 flex items-center space-x-2 text-[11px] font-mono text-ink-400 pl-8">
                <Icon className="w-3.5 h-3.5 text-ink-500 dark:text-ink-400" />
                <span>Rule {item.number} &bull; Strict Compliance Required</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sign-off & Best Wishes */}
      <div className="p-4 sm:p-5 rounded-sm bg-royal-50/70 dark:bg-royal-950/40 border border-royal-200 dark:border-royal-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-sm font-serif font-bold text-royal-900 dark:text-royal-100 flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>We wish all participants the very best!</span>
          </p>
          <p className="text-xs font-mono text-ink-600 dark:text-ink-300">
            Know the Law, Empower the Mind.
          </p>
        </div>

        <div className="text-right sm:text-right text-xs font-mono text-ink-700 dark:text-ink-300 border-t sm:border-t-0 pt-2 sm:pt-0 border-royal-200 dark:border-royal-800/60 w-full sm:w-auto">
          <span className="block text-[11px] text-ink-400 uppercase tracking-wider">Regards</span>
          <strong className="text-ink-950 dark:text-ink-50 font-bold block">Team Lex Minds India</strong>
        </div>
      </div>
    </div>
  );
}
