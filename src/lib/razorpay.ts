// ==============================================================================
// Razorpay Standard Checkout Client Loader
// ==============================================================================

export interface RazorpayOptions {
  key: string;
  amount: number; // in paise
  currency: string;
  name: string;
  description: string;
  image?: string;
  order_id: string;
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
  razorpay_order_id: string;
  razorpay_signature: string;
}

/**
 * Dynamically loads Razorpay checkout.js script in the browser.
 */
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
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.error('[Razorpay Script]: Failed to load checkout.js from CDN.');
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

/**
 * Initiates Razorpay Standard Checkout popup.
 * Never simulates success or returns fake signatures.
 */
export const initiateRazorpayPayment = async (
  options: RazorpayOptions,
  onSuccess: (response: RazorpayPaymentResponse) => void,
  onFailure?: (err: any) => void
) => {
  const isLoaded = await loadRazorpayScript();

  if (!isLoaded || !(window as any).Razorpay) {
    const errorMsg = 'Failed to load Razorpay payment gateway. Please check your network connection.';
    console.error('[Razorpay Error]:', errorMsg);
    if (onFailure) onFailure(new Error(errorMsg));
    return;
  }

  try {
    const rzp = new (window as any).Razorpay({
      ...options,
      handler: (response: RazorpayPaymentResponse) => {
        if (!response.razorpay_payment_id || !response.razorpay_signature) {
          if (onFailure) onFailure(new Error('Incomplete payment response from Razorpay.'));
          return;
        }
        onSuccess(response);
      },
      modal: {
        ondismiss: () => {
          if (options.modal?.ondismiss) options.modal.ondismiss();
          if (onFailure) onFailure(new Error('Payment window dismissed by user.'));
        },
      },
    });

    rzp.open();
  } catch (err: any) {
    console.error('[Razorpay Checkout Error]:', err);
    if (onFailure) onFailure(err);
  }
};
