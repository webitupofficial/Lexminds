'use client';

import React, { useState } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import RazorpayCheckoutButton from '@/components/RazorpayCheckoutButton';
import { CreditCard, ShieldCheck, CheckCircle2, RefreshCw } from 'lucide-react';

export default function CheckoutTestPage() {
  const [amountPaise, setAmountPaise] = useState<number>(100); // default 100 paise = ₹1.00
  const [name, setName] = useState('Lex Minds Applicant');
  const [email, setEmail] = useState('test@lexminds.in');
  const [contact, setContact] = useState('+919876543210');
  const [verifiedResult, setVerifiedResult] = useState<any>(null);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      <Breadcrumbs items={[{ name: 'Standard Checkout', href: '/checkout' }]} />

      <div className="p-8 sm:p-10 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 shadow-brutal space-y-6">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-sm bg-royal-50 dark:bg-royal-950/40 border border-royal-200 dark:border-royal-800 text-royal-700 dark:text-royal-300 text-[11px] font-mono font-bold uppercase tracking-wider">
          <CreditCard className="w-3.5 h-3.5" />
          <span>Razorpay Standard Web Checkout</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-ink-950 dark:text-ink-50 tracking-tight">
            Checkout Integration Demo
          </h1>
          <p className="text-sm text-ink-600 dark:text-ink-300 leading-relaxed">
            Test the 3-step Razorpay Standard Web Checkout integration: <strong>/api/create-order</strong> &rarr; <strong>Razorpay Modal</strong> &rarr; <strong>/api/verify-payment</strong> (HMAC-SHA256).
          </p>
        </div>

        <div className="p-4 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 rounded-sm space-y-4">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-900 dark:text-ink-100">
            Payment Parameters
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {[
              { label: '₹1.00 (Test Minimum)', paise: 100 },
              { label: '₹39.00 (Internship)', paise: 3900 },
              { label: '₹99.00 (Publication)', paise: 9900 },
            ].map((option) => (
              <button
                key={option.paise}
                type="button"
                onClick={() => {
                  setAmountPaise(option.paise);
                  setVerifiedResult(null);
                }}
                className={`py-2 px-3 text-xs font-mono rounded-sm border transition-all ${
                  amountPaise === option.paise
                    ? 'bg-royal-600 text-white border-royal-600 font-bold shadow-sm'
                    : 'bg-surface-light dark:bg-surface-dark border-ink-900/15 dark:border-ink-700 text-ink-700 dark:text-ink-300'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-mono text-ink-600 dark:text-ink-400 mb-1">
                Prefill Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 text-xs tactile-control text-ink-900 dark:text-ink-100 rounded-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-ink-600 dark:text-ink-400 mb-1">
                Prefill Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs tactile-control text-ink-900 dark:text-ink-100 rounded-sm"
              />
            </div>
          </div>
        </div>

        {/* Live Checkout Button */}
        <div className="space-y-4">
          <RazorpayCheckoutButton
            amount={amountPaise}
            currency="INR"
            name="Lex Minds India"
            description={`Evaluation Fee - ₹${(amountPaise / 100).toFixed(2)}`}
            prefill={{ name, email, contact }}
            buttonText={`Pay ₹${(amountPaise / 100).toFixed(2)} via Standard Checkout`}
            className="w-full py-4 px-6 rounded-sm bg-royal-600 hover:bg-royal-700 active:bg-royal-800 text-white text-xs font-bold uppercase tracking-wider shadow-brutal flex items-center justify-center space-x-2 transition-all"
            onSuccess={(result) => setVerifiedResult(result)}
          />
        </div>

        {/* Verification Display */}
        {verifiedResult && (
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/40 rounded-sm text-xs space-y-2">
            <div className="flex items-center space-x-2 text-emerald-800 dark:text-emerald-300 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Cryptographic Verification Passed (HMAC-SHA256)</span>
            </div>
            <pre className="p-3 bg-white/70 dark:bg-black/40 rounded font-mono text-[11px] overflow-x-auto text-ink-800 dark:text-ink-200">
              {JSON.stringify(verifiedResult, null, 2)}
            </pre>
          </div>
        )}

        <div className="pt-4 border-t border-ink-900/10 dark:border-ink-800 flex items-center justify-between text-xs font-mono text-ink-500 dark:text-ink-400">
          <span>Gateway: Razorpay Active</span>
          <span>Status: Standard Web Checkout Live</span>
        </div>
      </div>
    </div>
  );
}
