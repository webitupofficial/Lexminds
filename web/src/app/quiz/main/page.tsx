import React from 'react';
import QuizMainClient from '@/app/quiz-main/QuizMainClient';

export const metadata = {
  title: 'Quiz Candidate Desk (Quiz-main) | Lex Minds',
  description:
    'Dedicated portal for verified candidates of the LexMinds Virtual Quiz. Access your examination link, official rules, and exclusive candidate WhatsApp group.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function QuizMainSubPage() {
  return <QuizMainClient />;
}
