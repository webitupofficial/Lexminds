'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Building2,
  FileText,
  Lock,
  ArrowRight,
  ExternalLink,
  ChevronLeft
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

interface SessionInfo {
  orderId: string;
  referenceId: string;
  productKey: string;
  productName: string;
  amountPaise: number;
  currency: string;
  email: string;
  keyId: string;
}

export default function PaymentClient() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || '';
  const token = searchParams.get('token') || '';

  const [session, setSession] = useState<SessionInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [paying, setPaying] = useState(false);
  const [successData, setSuccessData] = useState<{
    referenceId: string;
    paymentId: string;
    alreadyProcessed?: boolean;
  } | null>(null);

  // 1. Fetch Session Info from Token
  useEffect(() => {
    if (!orderId || !token) {
      setError('Missing order ID or payment session token. Please initiate your application from the portal.');
      setLoading(false);
      return;
    }

    async function loadSession() {
      try {
        const res = await fetch('/api/payment/session-info', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId, token }),
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          setError(data.error || 'The payment session has expired or is invalid. Please restart your submission.');
        } else {
          setSession(data);
        }
      } catch (err: any) {
        setError(err.message || 'Unable to connect to payment server.');
      } finally {
        setLoading(false);
      }
    }

    loadSession();
  }, [orderId, token]);

  // 2. Dynamically Load Razorpay SDK
  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (typeof window !== 'undefined' && (window as any).Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // 3. Launch Checkout
  const handleLaunchPayment = async () => {
    if (!session) return;
    setPaying(true);

    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      alert('Failed to connect to Razorpay payment gateway. Please check your internet connection.');
      setPaying(false);
      return;
    }

    const options = {
      key: session.keyId,
      amount: session.amountPaise,
      currency: session.currency,
      name: 'Lex Minds',
      description: session.productName,
      order_id: session.orderId,
      prefill: {
        email: session.email,
      },
      notes: {
        referenceId: session.referenceId,
        productKey: session.productKey,
      },
      theme: {
        color: '#5B3DF5',
      },
      modal: {
        ondismiss: () => {
          setPaying(false);
        },
      },
      handler: async function (response: any) {
        try {
          const verifyRes = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              token,
            }),
          });

          const verifyData = await verifyRes.json();
          if (verifyRes.ok && verifyData.success) {
            setSuccessData({
              referenceId: verifyData.referenceId || session.referenceId,
              paymentId: response.razorpay_payment_id,
              alreadyProcessed: verifyData.alreadyProcessed,
            });
          } else {
            alert(`Payment verification notice: ${verifyData.error || 'Verification failed. Please contact support.'}`);
          }
        } catch (err: any) {
          alert(`Network verification error: ${err.message || 'Error communicating with server.'}`);
        } finally {
          setPaying(false);
        }
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  // Render Loading State
  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <Loader2 className="w-9 h-9 text-royal-600 dark:text-royal-400 animate-spin" />
        <h2 className="text-lg font-serif font-bold text-ink-900 dark:text-ink-100">
          Securing Payment Session...
        </h2>
        <p className="text-xs text-ink-600 dark:text-ink-400 max-w-sm font-mono">
          Cryptographically validating your application docket and initializing server-priced payment order.
        </p>
      </div>
    );
  }

  // Render Error State
  if (error || !session) {
    return (
      <div className="max-w-xl mx-auto my-12 p-6 sm:p-8 neo-card border border-rose-500/40 text-center space-y-6 bg-white dark:bg-ink-900">
        <div className="w-12 h-12 bg-rose-50 dark:bg-rose-950/40 border border-rose-500/30 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-serif font-bold text-ink-900 dark:text-ink-100">
            Payment Session Expired or Invalid
          </h2>
          <p className="text-xs text-ink-700 dark:text-ink-300 leading-relaxed font-normal">
            {error || 'The requested payment session is no longer valid or has expired after 30 minutes.'}
          </p>
        </div>
        <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/internships"
            className="px-5 py-3 btn-brand-secondary text-xs uppercase tracking-wider flex items-center justify-center space-x-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Fellowships Index</span>
          </Link>
          <Link
            href="/publish"
            className="px-5 py-3 btn-brand-primary text-xs uppercase tracking-wider flex items-center justify-center space-x-2"
          >
            <span>Publish Manuscript</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  // Render Success State
  if (successData) {
    const isInternship = session.productKey === 'internship_enrollment';

    return (
      <div className="max-w-2xl mx-auto my-12 p-8 sm:p-12 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 shadow-brutal space-y-8 animate-editorial-reveal">
        <div className="text-center space-y-3">
          <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-500/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto rounded-sm">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider border border-emerald-500/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Payment Verified &bull; Record Active</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-ink-950 dark:text-ink-50">
            {isInternship ? 'Enrollment Record Confirmed' : 'Manuscript Submitted For Review'}
          </h1>
          <p className="text-sm text-ink-600 dark:text-ink-300 max-w-lg mx-auto font-normal">
            Your transaction has been securely reconciled with our central database.
          </p>
        </div>

        {/* Docket Details Card */}
        <div className="p-6 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 space-y-3 text-xs font-mono rounded-sm">
          <div className="flex justify-between items-center pb-2.5 border-b border-ink-900/10 dark:border-ink-800">
            <span className="text-ink-500 dark:text-ink-400">Docket Reference:</span>
            <span className="font-bold text-royal-600 dark:text-royal-400 text-sm">
              {successData.referenceId}
            </span>
          </div>
          <div className="flex justify-between items-center pb-2.5 border-b border-ink-900/10 dark:border-ink-800">
            <span className="text-ink-500 dark:text-ink-400">Payment ID:</span>
            <span className="font-medium text-ink-950 dark:text-ink-50">
              {successData.paymentId}
            </span>
          </div>
          <div className="flex justify-between items-center pb-2.5 border-b border-ink-900/10 dark:border-ink-800">
            <span className="text-ink-500 dark:text-ink-400">Verified Google ID:</span>
            <span className="font-medium text-ink-950 dark:text-ink-50">{session.email}</span>
          </div>
          <div className="flex justify-between items-center pt-1">
            <span className="text-ink-500 dark:text-ink-400">Amount Paid:</span>
            <span className="font-bold text-royal-600 dark:text-royal-400 text-sm">
              ₹{(session.amountPaise / 100).toFixed(2)} {session.currency}
            </span>
          </div>
        </div>

        {/* Next Steps Guidance */}
        <div className="p-5 bg-paper dark:bg-ink-850 border border-ink-900/15 dark:border-ink-700 text-xs space-y-2 text-ink-700 dark:text-ink-300 rounded-sm">
          <p className="font-serif font-bold text-ink-950 dark:text-ink-50 text-sm">Next Steps &amp; Editorial Timelines:</p>
          <ul className="list-disc list-inside space-y-1.5 text-ink-600 dark:text-ink-400 font-normal leading-relaxed">
            {isInternship ? (
              <>
                <li>Your application has been placed in the fellowship candidate evaluation pool.</li>
                <li>Shortlisted candidates will receive communication directly at {session.email}.</li>
                <li>Please preserve your docket reference <strong>{successData.referenceId}</strong> for all correspondence.</li>
              </>
            ) : (
              <>
                <li>Your manuscript has entered our editorial evaluation workflow.</li>
                <li>Reviewer notes and editorial disposition will be communicated to your registered email.</li>
                <li>Your docket reference <strong>{successData.referenceId}</strong> is linked to your manuscript.</li>
              </>
            )}
          </ul>
        </div>

        <div className="pt-2 text-center">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-7 py-3.5 btn-brand-primary text-xs uppercase tracking-wider"
          >
            <span>Return to Central Platform</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  // Render Checkout Order View
  const feeRupees = (session.amountPaise / 100).toFixed(2);

  return (
    <div className="max-w-2xl mx-auto my-10 sm:my-16 px-4 space-y-8">
      <Breadcrumbs
        items={[
          { name: 'Application', href: '/internships' },
          { name: 'Authoritative Checkout', href: '#' },
        ]}
      />

      <div className="p-8 sm:p-12 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 shadow-brutal space-y-8">
        
        {/* Header */}
        <div className="space-y-3 pb-6 border-b border-ink-900/15 dark:border-ink-700">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-royal-50 dark:bg-royal-950/40 border border-royal-200 dark:border-royal-800 text-royal-600 dark:text-royal-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5" />
            <span>Secure SSL Payment Checkout</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-ink-950 dark:text-ink-50 tracking-tight">
            Complete Submission Fee
          </h1>

          <p className="text-sm text-ink-600 dark:text-ink-300 leading-relaxed font-normal">
            Your application record has been logged with <span className="font-mono font-semibold text-royal-600 dark:text-royal-400">payment pending</span> status. Please complete the administrative evaluation fee to finalize your docket.
          </p>
        </div>

        {/* Order Details Breakdown */}
        <div className="p-6 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 space-y-4 rounded-sm">
          <div className="flex justify-between items-start">
            <div className="space-y-0.5">
              <span className="text-xs text-ink-500 dark:text-ink-400 font-mono uppercase">Designated Service</span>
              <h3 className="text-base font-serif font-bold text-ink-950 dark:text-ink-50">
                {session.productName}
              </h3>
              <span className="text-[11px] font-mono text-ink-500 block">
                Inclusive of all applicable taxes
              </span>
            </div>
            <div className="text-right">
              <div className="flex items-baseline space-x-2 justify-end">
                <span className="text-2xl sm:text-3xl font-serif font-bold text-royal-600 dark:text-royal-400">
                  ₹{feeRupees}
                </span>
                {session.productKey === 'internship_enrollment' ? (
                  <span className="text-sm line-through text-ink-400">₹299</span>
                ) : (
                  <span className="text-sm line-through text-ink-400">₹399</span>
                )}
              </div>
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 block font-semibold">
                Limited Academic Subsidy Applied
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-ink-900/10 dark:border-ink-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <span className="text-ink-500 dark:text-ink-400 block text-[10px] uppercase">Docket Reference:</span>
              <span className="font-semibold text-ink-950 dark:text-ink-50 text-xs mt-0.5 block">
                {session.referenceId}
              </span>
            </div>

            <div>
              <span className="text-ink-500 dark:text-ink-400 block text-[10px] uppercase">Applicant Email:</span>
              <span className="font-medium text-ink-950 dark:text-ink-50 text-xs truncate mt-0.5 block">
                {session.email}
              </span>
            </div>
          </div>
        </div>

        {/* Non-Guarantee & Compliance Disclosure */}
        <div className="p-4 bg-amber-50/70 dark:bg-amber-950/30 border border-amber-500/30 text-xs text-amber-900 dark:text-amber-200 rounded-sm space-y-1.5 leading-relaxed font-normal">
          <strong className="block font-serif text-sm text-ink-950 dark:text-ink-50">
            Mandatory Evaluation Disclosure:
          </strong>
          <p>
            Payment covers operational evaluation, academic intake triage, and peer-review coordination. <strong>Payment does not guarantee fellowship selection, article publication, or certificate issuance.</strong> Lex Minds is an educational platform and is not a law firm; we do not provide legal advice or representation.
          </p>
        </div>

        {/* Security Guarantees & Policy Links */}
        <div className="space-y-2 text-xs text-ink-500 dark:text-ink-400 font-mono">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-royal-500 shrink-0" />
            <span>Encrypted checkout processed directly via Razorpay. Card/UPI credentials are never stored on Lex Minds servers.</span>
          </div>
          <div className="flex items-center space-x-2">
            <Lock className="w-4 h-4 text-royal-500 shrink-0" />
            <span>This payment session link is valid for 30 minutes from form submission.</span>
          </div>
          <div className="pt-2 border-t border-ink-900/10 dark:border-ink-800 text-[11px] text-ink-600 dark:text-ink-400">
            By proceeding with payment, you acknowledge that you have read and agree to our{' '}
            <Link href="/terms" className="text-royal-600 dark:text-royal-400 underline font-bold" target="_blank">
              Terms &amp; Conditions
            </Link>{' '}
            and{' '}
            <Link href="/refund-policy" className="text-royal-600 dark:text-royal-400 underline font-bold" target="_blank">
              Cancellation &amp; Refund Policy
            </Link>.
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 space-y-3">
          <button
            onClick={handleLaunchPayment}
            disabled={paying}
            className="w-full py-4 px-6 btn-brand-primary text-xs uppercase font-semibold tracking-wider flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {paying ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing Payment...</span>
              </>
            ) : (
              <>
                <CreditCard className="w-4 h-4" />
                <span>Pay ₹{feeRupees} via Razorpay</span>
              </>
            )}
          </button>

          <p className="text-xs font-mono text-center text-ink-500 dark:text-ink-400">
            Reconciles submission with docket {session.referenceId}.
          </p>
        </div>

      </div>
    </div>
  );
}
