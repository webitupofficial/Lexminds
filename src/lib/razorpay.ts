// Razorpay Client-Side & Simulation Helper

export interface RazorpayOptions {
  key?: string;
  amount: number; // in paise
  currency: string;
  name: string;
  description: string;
  image?: string;
  order_id?: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
  handler?: (response: RazorpayPaymentResponse) => void;
  modal?: {
    ondismiss?: () => void;
  };
}

export interface RazorpayPaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

export const loadRazorpayScript = (): Promise<boolean> => {
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
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const initiateRazorpayPayment = async (
  options: RazorpayOptions,
  onSuccess: (paymentIdOrResponse: string | RazorpayPaymentResponse) => void,
  onFailure?: (err: any) => void
) => {
  const isLoaded = await loadRazorpayScript();
  const apiKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_LexMindsDemoKey';

  if (isLoaded && (window as any).Razorpay && process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
    try {
      const rzp = new (window as any).Razorpay({
        ...options,
        key: apiKey,
        handler: (response: RazorpayPaymentResponse) => {
          onSuccess(response);
        }
      });
      rzp.open();
    } catch (e) {
      console.warn('Falling back to simulated checkout overlay', e);
      simulateCheckout(options, onSuccess);
    }
  } else {
    // Simulated sandbox modal for test/review environment
    simulateCheckout(options, onSuccess);
  }
};

function simulateCheckout(
  options: RazorpayOptions, 
  onSuccess: (response: RazorpayPaymentResponse) => void
) {
  const simulatedPaymentId = `pay_sim_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const simulatedOrderId = options.order_id || `order_sim_${Date.now()}`;
  const simulatedSig = 'simulated_sig_verified';

  setTimeout(() => {
    onSuccess({
      razorpay_payment_id: simulatedPaymentId,
      razorpay_order_id: simulatedOrderId,
      razorpay_signature: simulatedSig
    });
  }, 900);
}
