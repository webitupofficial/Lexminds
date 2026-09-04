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
      name: 'LexMinds Legal Platform',
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
        color: '#b89344',
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
        <Loader2 className="w-10 h-10 text-gold-600 dark:text-gold-400 animate-spin" />
        <h2 className="text-lg font-serif font-bold text-slate-900 dark:text-white">
          Securing Payment Session...
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
          Cryptographically validating your application docket and initializing server-priced payment order.
        </p>
      </div>
    );
  }

  // Render Error State
  if (error || !session) {
    return (
      <div className="max-w-xl mx-auto my-12 p-6 sm:p-8 neumorph-card rounded-3xl border border-rose-500/30 text-center space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-500/30 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
          <AlertCircle className="w-7 h-7" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white">
            Payment Session Expired or Invalid
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {error || 'The requested payment link is no longer valid or has expired after 30 minutes.'}
          </p>
        </div>
        <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/internships"
            className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-legal-900 hover:bg-slate-200 dark:hover:bg-legal-800 text-xs font-bold text-slate-900 dark:text-white transition-colors flex items-center justify-center space-x-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Internship Directory</span>
          </Link>
          <Link
            href="/publish"
            className="px-5 py-2.5 rounded-xl bg-gold-600 hover:bg-gold-500 text-xs font-bold text-slate-950 transition-colors flex items-center justify-center space-x-2"
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
      <div className="max-w-2xl mx-auto my-8 p-6 sm:p-10 neumorph-card rounded-3xl border border-gold-500/40 shadow-2xl space-y-8 animate-fade-in">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-3xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-500/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Payment Verified &bull; Record Active</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">
            {isInternship ? 'Enrollment Record Confirmed' : 'Manuscript Submitted For Review'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
            Your transaction has been cryptographically reconciled with our central database.
          </p>
        </div>

        {/* Docket Details Card */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-legal-900/90 border border-slate-200 dark:border-legal-800 space-y-3 text-xs">
          <div className="flex justify-between items-center pb-2.5 border-b border-slate-200 dark:border-legal-800/80">
            <span className="text-slate-500 dark:text-slate-400">Official Docket Reference:</span>
            <span className="font-mono font-bold text-gold-600 dark:text-gold-400 text-sm">
              {successData.referenceId}
            </span>
          </div>
          <div className="flex justify-between items-center pb-2.5 border-b border-slate-200 dark:border-legal-800/80">
            <span className="text-slate-500 dark:text-slate-400">Razorpay Payment ID:</span>
            <span className="font-mono font-medium text-slate-900 dark:text-white">
              {successData.paymentId}
            </span>
          </div>
          <div className="flex justify-between items-center pb-2.5 border-b border-slate-200 dark:border-legal-800/80">
            <span className="text-slate-500 dark:text-slate-400">Associated Google Account:</span>
            <span className="font-medium text-slate-900 dark:text-white">{session.email}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500 dark:text-slate-400">Amount Paid:</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">
              ₹{(session.amountPaise / 100).toFixed(2)} {session.currency}
            </span>
          </div>
        </div>

        {/* Next Steps Guidance */}
        <div className="p-4 rounded-xl bg-gold-50/60 dark:bg-gold-950/20 border border-gold-500/20 text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
          <p className="font-bold text-gold-700 dark:text-gold-400">Next Steps & Editorial Timelines:</p>
          <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-600 dark:text-slate-400">
            {isInternship ? (
              <>
                <li>Your application has been placed in the candidate evaluation pool.</li>
                <li>Shortlisted scholars will receive interview call intimations directly on {session.email}.</li>
                <li>Please preserve your docket number <strong>{successData.referenceId}</strong> for all correspondence.</li>
              </>
            ) : (
              <>
                <li>Your treatise has entered our double-blind peer-review workflow.</li>
                <li>Reviewer notes and editorial disposition will be communicated within 7-10 business days.</li>
                <li>Your docket reference <strong>{successData.referenceId}</strong> is linked to your manuscript.</li>
              </>
            )}
          </ul>
        </div>

        <div className="pt-2 text-center">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-gold-500 dark:hover:bg-gold-400 dark:text-slate-950 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-lg"
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
    <div className="max-w-2xl mx-auto my-8 sm:my-12 px-4 space-y-8">
      <Breadcrumbs
        items={[
          { name: 'Application', href: '/internships' },
          { name: 'Authoritative Checkout', href: '#' },
        ]}
      />

      <div className="neumorph-card rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-gold-500/30 shadow-2xl space-y-8">
        
        {/* Header */}
        <div className="space-y-3 pb-6 border-b border-slate-200 dark:border-legal-800/80">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold-50 dark:bg-gold-950/80 border border-gold-500/30 text-gold-700 dark:text-gold-400 text-xs font-bold uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5" />
            <span>Secure 256-Bit SSL Checkout</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">
            Complete Submission Payment
          </h1>

          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Your application record has been recorded in our system with <span className="font-semibold text-amber-600 dark:text-amber-400">payment pending</span> status. Please complete the statutory processing fee to finalize and lock your docket.
          </p>
        </div>

        {/* Order Details Breakdown */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-legal-900/70 border border-slate-200 dark:border-legal-800 space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-0.5">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Designated Item</span>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                {session.productName}
              </h3>
            </div>
            <span className="text-lg sm:text-xl font-bold font-serif text-gold-600 dark:text-gold-400">
              ₹{feeRupees}
            </span>
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-legal-800/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Docket Reference:</span>
              <span className="font-mono font-semibold text-slate-900 dark:text-white text-xs">
                {session.referenceId}
              </span>
            </div>

            <div>
              <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Verified Identity:</span>
              <span className="font-medium text-slate-900 dark:text-white text-xs truncate block">
                {session.email}
              </span>
            </div>
          </div>
        </div>

        {/* Security & Regulatory Guarantees */}
        <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-gold-600 dark:text-gold-400 shrink-0" />
            <span>Card and UPI credentials are processed directly via Razorpay and never stored on LexMinds servers.</span>
          </div>
          <div className="flex items-center space-x-2">
            <Lock className="w-4 h-4 text-gold-600 dark:text-gold-400 shrink-0" />
            <span>This payment link is valid for 30 minutes from form submission.</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 space-y-3">
          <button
            onClick={handleLaunchPayment}
            disabled={paying}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-gold-500 via-gold-600 to-gold-700 hover:from-gold-400 hover:to-gold-600 text-slate-950 font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-xl hover:shadow-gold-500/25 flex items-center justify-center space-x-3 disabled:opacity-50"
          >
            {paying ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Processing Payment...</span>
              </>
            ) : (
              <>
                <CreditCard className="w-5 h-5" />
                <span>Pay ₹{feeRupees} via Razorpay</span>
              </>
            )}
          </button>

          <p className="text-[11px] text-center text-slate-500 dark:text-slate-400">
            By clicking Pay, you authorize LexMinds to submit your application with authoritative docket {session.referenceId}.
          </p>
        </div>

      </div>
    </div>
  );
}
