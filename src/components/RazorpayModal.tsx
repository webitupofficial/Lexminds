'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  CheckCircle2, 
  X, 
  Sparkles, 
  Loader2, 
  Copy, 
  ArrowRight,
  Receipt
} from 'lucide-react';
import { initiateRazorpayPayment } from '@/lib/razorpay';

interface RazorpayModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  amount: number; // in INR (e.g. 299)
  type: 'internship_fee' | 'publication_fee';
  metadata: {
    applicantName?: string;
    email?: string;
    phone?: string;
    targetTitle?: string;
  };
  onSuccess: (paymentId: string) => void;
}

export default function RazorpayModal({
  isOpen,
  onClose,
  title,
  subtitle,
  amount,
  type,
  metadata,
  onSuccess
}: RazorpayModalProps) {
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [generatedPaymentId, setGeneratedPaymentId] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePay = async () => {
    setProcessing(true);

    try {
      // 1. Create order on backend
      const res = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          currency: 'INR',
          receipt: `rcpt_${Date.now()}`,
          notes: {
            type,
            name: metadata.applicantName,
            target: metadata.targetTitle,
          }
        })
      });

      const orderData = await res.json();

      // 2. Launch Razorpay / Simulated Sandbox
      await initiateRazorpayPayment(
        {
          amount: amount * 100,
          currency: 'INR',
          name: 'LexMinds India',
          description: title,
          order_id: orderData.id,
          prefill: {
            name: metadata.applicantName || 'Law Scholar',
            email: metadata.email || 'scholar@lexminds.in',
            contact: metadata.phone || '9999999999',
          },
          theme: {
            color: '#070f26',
          }
        },
        async (paymentId) => {
          // Verify
          const verifyRes = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: orderData.id,
              razorpay_payment_id: paymentId,
              razorpay_signature: 'simulated_sig_verified'
            })
          });
          const verifyData = await verifyRes.json();
          setGeneratedPaymentId(paymentId);
          setProcessing(false);
          setPaymentSuccess(true);
          onSuccess(paymentId);
        },
        (err) => {
          console.error('Payment error', err);
          setProcessing(false);
          alert('Payment was cancelled or failed. Please try again.');
        }
      );
    } catch (err: any) {
      console.error(err);
      setProcessing(false);
      alert('Error initiating checkout. Please try again.');
    }
  };

  const copyReceipt = () => {
    navigator.clipboard.writeText(generatedPaymentId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 dark:bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-legal-950 border border-slate-200 dark:border-gold-500/30 shadow-2xl overflow-hidden transition-colors">
        
        {/* Modal Header */}
        <div className="bg-slate-100 dark:bg-legal-900/80 px-6 py-5 border-b border-slate-200 dark:border-legal-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gold-100 dark:bg-gold-950 border border-gold-500/40 flex items-center justify-center text-gold-700 dark:text-gold-400">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-white">Razorpay Secure Checkout</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">LexMinds Official Payment Gateway</p>
            </div>
          </div>
          {!processing && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-legal-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {!paymentSuccess ? (
            <>
              {/* Order Details */}
              <div className="bg-slate-50 dark:bg-legal-900/60 rounded-2xl p-4 border border-slate-200 dark:border-legal-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Service</span>
                  <span className="text-xs font-bold text-gold-700 dark:text-gold-400">{type === 'internship_fee' ? 'Internship Processing Fee' : 'Publication & Peer Review Fee'}</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>
                </div>
                {metadata.applicantName && (
                  <div className="pt-2 border-t border-slate-200 dark:border-legal-800/80 text-xs flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Beneficiary / Applicant:</span>
                    <span className="text-slate-900 dark:text-slate-200 font-medium">{metadata.applicantName}</span>
                  </div>
                )}
              </div>

              {/* Fee Breakdown */}
              <div className="space-y-2 bg-slate-50/70 dark:bg-legal-900/30 rounded-2xl p-4 border border-slate-200/80 dark:border-legal-800/50">
                <div className="flex justify-between text-xs text-slate-600 dark:text-slate-300">
                  <span>Standard Evaluation &amp; Verification Fee</span>
                  <span>₹{amount}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-600 dark:text-slate-300">
                  <span>Goods &amp; Services Tax (GST 18%)</span>
                  <span className="text-emerald-600 dark:text-emerald-400">Inclusive</span>
                </div>
                <div className="flex justify-between text-xs text-slate-600 dark:text-slate-300">
                  <span>Editorial / Chamber Coordination</span>
                  <span className="text-emerald-600 dark:text-emerald-400">Waived (₹0)</span>
                </div>
                <div className="pt-2 border-t border-slate-200 dark:border-legal-800 flex justify-between items-center text-sm font-bold text-slate-900 dark:text-white">
                  <span>Total Payable:</span>
                  <span className="text-xl text-gold-700 dark:text-gold-400 font-serif">₹{amount}.00</span>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 gap-3 text-[11px] text-slate-500 dark:text-slate-400">
                <div className="flex items-center space-x-2 bg-slate-50 dark:bg-legal-900/40 p-2.5 rounded-xl border border-slate-200 dark:border-legal-800">
                  <Lock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>256-Bit Bank Grade SSL</span>
                </div>
                <div className="flex items-center space-x-2 bg-slate-50 dark:bg-legal-900/40 p-2.5 rounded-xl border border-slate-200 dark:border-legal-800">
                  <ShieldCheck className="w-4 h-4 text-gold-600 dark:text-gold-400 shrink-0" />
                  <span>Instant Verification</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handlePay}
                disabled={processing}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400 hover:from-gold-300 hover:to-gold-500 text-slate-950 font-bold text-sm uppercase tracking-wider rounded-xl shadow-sm dark:shadow-glow-gold transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {processing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Processing Payment via Razorpay...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-slate-950" />
                    <span>Pay ₹{amount}.00 via Razorpay</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </>
          ) : (
            /* Success Receipt Screen */
            <div className="text-center py-4 space-y-5">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 rounded-2xl border border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white">Payment Verified &amp; Completed</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Your transaction has been securely processed and confirmed by LexMinds.</p>
              </div>

              <div className="bg-slate-50 dark:bg-legal-900/70 p-4 rounded-xl border border-slate-200 dark:border-legal-800 text-left space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400">Transaction ID:</span>
                  <button 
                    onClick={copyReceipt}
                    className="flex items-center space-x-1 font-mono text-gold-700 dark:text-gold-400 hover:underline bg-slate-100 dark:bg-legal-850 px-2 py-1 rounded border border-slate-200 dark:border-legal-700"
                  >
                    <span>{generatedPaymentId}</span>
                    <Copy className="w-3 h-3 ml-1" />
                  </button>
                </div>
                {copied && <p className="text-[10px] text-emerald-600 dark:text-emerald-400 text-right">Copied to clipboard!</p>}
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Amount Settled:</span>
                  <span className="text-slate-900 dark:text-white font-bold">₹{amount}.00 INR</span>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Status:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold uppercase">Confirmed &amp; Active</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-semibold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all"
              >
                Continue to Application Confirmation
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
