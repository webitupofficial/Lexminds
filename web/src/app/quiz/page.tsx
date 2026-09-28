import React from 'react';
import QuizClient from './QuizClient';

export const metadata = {
  title: 'Register for LexMinds Virtual Quiz | Lex Minds',
  description:
    'Register for the LexMinds Virtual Quiz. Complete your registration and pay the ₹19 registration fee to participate in the virtual competition.',
  openGraph: {
    title: 'LexMinds Virtual Quiz Registration',
    description:
      'Test your knowledge, compete with fellow participants, and take part in the upcoming LexMinds virtual quiz.',
  },
};

export default function QuizPage() {
  return <QuizClient />;
}
