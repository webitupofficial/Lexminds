import React, { Suspense } from 'react';
import { Metadata } from 'next';
import PaymentClient from './PaymentClient';
import { Loader2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Secure Payment Checkout | LexMinds',
  description: 'Complete verified processing fee checkout for LexMinds fellowships or manuscript peer reviews.',
};

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 space-y-4">
          <Loader2 className="w-10 h-10 text-gold-600 dark:text-gold-400 animate-spin" />
          <p className="text-xs text-slate-500 dark:text-slate-400">Loading payment checkout...</p>
        </div>
      }
    >
      <PaymentClient />
    </Suspense>
  );
}
