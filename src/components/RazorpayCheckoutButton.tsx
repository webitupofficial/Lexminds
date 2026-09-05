'use client';

import React, { useState } from 'react';
import { Loader2, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';

export interface RazorpayCheckoutButtonProps {
  amount?: number; // in paise (e.g. 100 for ₹1.00)
  currency?: string;
  name?: string;
  description?: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  buttonText?: string;
  className?: string;
  onSuccess?: (verificationResult: {
    order_id: string;
    payment_id: string;
    message: string;
  }) => void;
  onError?: (errorMessage: string) => void;
}

// Dynamically load Razorpay checkout script if not already present
function loadCheckoutScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(false);
      return;
    }
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.error('[Razorpay Script Load Error]: Failed to load checkout.js');
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export default function RazorpayCheckoutButton({
  amount = 100, // default 100 paise (₹1.00)
  currency = 'INR',
  name = 'Lex Minds',
  description = 'Standard Web Checkout Payment',
  prefill,
  buttonText,
  className = '',
  onSuccess,
  onError,
}: RazorpayCheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState<{
    payment_id: string;
    order_id: string;
  } | null>(null);

  const handleCheckout = async () => {
    setLoading(true);
    setErrorMessage(null);
    setPaymentSuccess(null);

    try {
      // 1. Ensure Razorpay SDK script is loaded
      const scriptLoaded = await loadCheckoutScript();
      if (!scriptLoaded || !(window as any).Razorpay) {
        throw new Error('Could not load Razorpay payment gateway. Please check your network connection.');
      }

      // 2. Step 1: Call Backend to Create Order
      const orderRes = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          currency,
          receipt: `rcpt_${Date.now()}`,
          notes: {
            source: 'standard_checkout_button',
          },
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok || !orderData.order_id) {
        throw new Error(orderData.error || 'Failed to initialize payment order with server.');
      }

      const keyId =
        orderData.key_id ||
        process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
        'rzp_test_TYTDBm9wmONdO1';

      // 3. Step 2: Open Razorpay Standard Checkout Modal
      const options = {
        key: keyId,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name,
        description,
        order_id: orderData.order_id,
        prefill: {
          name: prefill?.name || '',
          email: prefill?.email || '',
          contact: prefill?.contact || '',
        },
        theme: {
          color: '#5B3DF5', // Brand Royal Violet
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            const cancelMsg = 'Payment window was closed by user.';
            setErrorMessage(cancelMsg);
            if (onError) onError(cancelMsg);
          },
        },
        // On Payment Success in Modal
        handler: async function (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) {
          try {
            // 4. Step 3: Call Backend to Verify Payment Signature
            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyRes.ok && verifyData.success) {
              setPaymentSuccess({
                payment_id: response.razorpay_payment_id,
                order_id: response.razorpay_order_id,
              });
              setLoading(false);
              if (onSuccess) {
                onSuccess({
                  order_id: response.razorpay_order_id,
                  payment_id: response.razorpay_payment_id,
                  message: verifyData.message || 'Payment verified successfully.',
                });
              }
            } else {
              throw new Error(verifyData.error || 'Payment signature verification failed.');
            }
          } catch (verifyErr: any) {
            const errorText = verifyErr.message || 'Error communicating with verification endpoint.';
            setErrorMessage(errorText);
            setLoading(false);
            if (onError) onError(errorText);
          }
        },
      };

      const rzp = new (window as any).Razorpay(options);

      // Handle payment.failed event
      rzp.on('payment.failed', function (response: any) {
        console.error('[Razorpay Payment Failed]:', response.error);
        const failMsg = `Payment failed: ${response.error.description || 'Transaction declined by bank.'}`;
        setErrorMessage(failMsg);
        setLoading(false);
        if (onError) onError(failMsg);
      });

      rzp.open();
    } catch (err: any) {
      console.error('[Razorpay Checkout Error]:', err);
      const msg = err.message || 'An unexpected error occurred during checkout.';
      setErrorMessage(msg);
      setLoading(false);
      if (onError) onError(msg);
    }
  };

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={handleCheckout}
        disabled={loading}
        className={
          className ||
          'py-3 px-6 rounded-sm bg-royal-600 hover:bg-royal-700 active:bg-royal-800 text-white text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-brutal flex items-center justify-center space-x-2 disabled:opacity-50'
        }
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Connecting Gateway...</span>
          </>
        ) : (
          <>
            <ShieldCheck className="w-4 h-4" />
            <span>
              {buttonText || `Pay with Razorpay (₹${(amount / 100).toFixed(2)})`}
            </span>
          </>
        )}
      </button>

      {/* Success Notification */}
      {paymentSuccess && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/40 rounded-sm text-xs text-emerald-900 dark:text-emerald-200 flex items-start space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-semibold">Payment Verified &amp; Confirmed!</strong>
            <span className="font-mono text-[11px]">
              Payment ID: {paymentSuccess.payment_id} &bull; Order ID: {paymentSuccess.order_id}
            </span>
          </div>
        </div>
      )}

      {/* Error Notification */}
      {errorMessage && (
        <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-500/40 rounded-sm text-xs text-rose-800 dark:text-rose-300 flex items-start space-x-2">
          <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-semibold">Transaction Notice</strong>
            <span>{errorMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}
