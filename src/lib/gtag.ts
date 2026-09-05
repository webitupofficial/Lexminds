export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-24YN00VPHB';

declare global {
  interface Window {
    dataLayer: Record<string, any>[];
    gtag: (...args: any[]) => void;
  }
}

// Log page views (GA4 handles browser history automatically when enhanced measurement is enabled)
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Log specific events (e.g., button clicks, form submissions)
export const event = (
  action: string,
  params?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', action, params);
  }
};
