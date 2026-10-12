'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Cookie, 
  SlidersHorizontal, 
  Check, 
  X, 
  ExternalLink,
  ChevronRight,
  Globe2,
  Lock,
  Info
} from 'lucide-react';

export type DpdpConsentPreferences = {
  necessary: boolean; // Always true
  analytics: boolean;
  functional: boolean;
  timestamp: string;
  version: string;
};

const CONSENT_STORAGE_KEY = 'lexminds_dpdp_consent_v1';
const CURRENT_VERSION = '2026-DPDP-1.0';

export default function DpdpConsentBanner() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  // Preferences state
  const [preferences, setPreferences] = useState<DpdpConsentPreferences>({
    necessary: true,
    analytics: false,
    functional: false,
    timestamp: '',
    version: CURRENT_VERSION,
  });

  // Apply consent to Google Consent Mode
  const updateGtagConsent = (analyticsGranted: boolean) => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: analyticsGranted ? 'granted' : 'denied',
        ad_storage: 'denied', // Lex Minds does not serve third-party ads
        personalization_storage: 'denied',
      });
    }
  };

  useEffect(() => {
    setHasLoaded(true);
    try {
      const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (stored) {
        const parsed: DpdpConsentPreferences = JSON.parse(stored);
        setPreferences(parsed);
        updateGtagConsent(parsed.analytics);
        setShowBanner(false);
      } else {
        // No consent recorded yet; default gtag to denied and show banner
        updateGtagConsent(false);
        setShowBanner(true);
      }
    } catch {
      setShowBanner(true);
    }

    // Listen for custom event from footer or other links to re-open consent settings
    const handleOpenSettings = () => {
      setShowCustomizeModal(true);
    };

    window.addEventListener('dpdp-open-consent-settings', handleOpenSettings);
    return () => {
      window.removeEventListener('dpdp-open-consent-settings', handleOpenSettings);
    };
  }, []);

  const saveConsent = (updated: DpdpConsentPreferences) => {
    const payload = {
      ...updated,
      necessary: true,
      timestamp: new Date().toISOString(),
      version: CURRENT_VERSION,
    };
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.error('Failed to store consent:', e);
    }
    setPreferences(payload);
    updateGtagConsent(payload.analytics);
    setShowBanner(false);
    setShowCustomizeModal(false);
  };

  const handleAcceptAll = () => {
    saveConsent({
      necessary: true,
      analytics: true,
      functional: true,
      timestamp: '',
      version: CURRENT_VERSION,
    });
  };

  const handleRejectNonEssential = () => {
    saveConsent({
      necessary: true,
      analytics: false,
      functional: false,
      timestamp: '',
      version: CURRENT_VERSION,
    });
  };

  const handleSaveCustom = () => {
    saveConsent(preferences);
  };

  if (!hasLoaded) return null;

  return (
    <>
      {/* 1. Main Bottom Notice Banner */}
      {showBanner && !showCustomizeModal && (
        <div 
          role="region" 
          aria-label="Digital Personal Data Protection Notice"
          className="fixed bottom-0 inset-x-0 z-50 p-3 sm:p-4 animate-in fade-in slide-in-from-bottom duration-300 pointer-events-auto"
        >
          <div className="max-w-5xl mx-auto bg-paper dark:bg-ink-900 border-2 border-ink-950 dark:border-ink-700 shadow-brutal p-4 sm:p-5 text-ink-900 dark:text-ink-100">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              
              <div className="space-y-1.5 flex-1 pr-2">
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center space-x-1.5 px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-royal-100 dark:bg-royal-950 text-royal-800 dark:text-royal-300 border border-royal-300 dark:border-royal-800">
                    <ShieldCheck className="w-3 h-3 text-royal-600 dark:text-royal-400" />
                    <span>DPDP Act 2023 Notice</span>
                  </span>
                  
                  {/* Language Switcher */}
                  <button
                    type="button"
                    onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                    className="inline-flex items-center space-x-1 text-[11px] font-mono text-ink-600 dark:text-ink-400 hover:text-royal-600 underline cursor-pointer"
                    title="Toggle Language (DPDP 8th Schedule compliance)"
                  >
                    <Globe2 className="w-3 h-3" />
                    <span>{language === 'en' ? 'हिन्दी (Hindi)' : 'English'}</span>
                  </button>
                </div>

                {language === 'en' ? (
                  <p className="text-xs text-ink-700 dark:text-ink-300 leading-relaxed">
                    Under the <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong>, Lex Minds (as a Data Fiduciary) requests your affirmative consent to process non-essential technical &amp; performance metrics. Strictly essential session data is kept active. You may modify or withdraw your consent at any time.
                  </p>
                ) : (
                  <p className="text-xs text-ink-700 dark:text-ink-300 leading-relaxed font-sans">
                    <strong>डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम, 2023 (DPDP Act)</strong> के अंतर्गत लेक्स माइंड्स (डेटा फिड्यूशरी) वेबसाइट के प्रदर्शन व एनालिटिक्स हेतु आपकी सहमति मांगता है। आवश्यक सत्र डेटा सक्रिय रहता है। आप किसी भी समय अपनी सहमति बदल या वापस ले सकते हैं।
                  </p>
                )}

                <div className="flex items-center space-x-3 text-[11px] font-mono pt-1 text-ink-600 dark:text-ink-400">
                  <Link href="/privacy" className="underline hover:text-royal-600 dark:hover:text-royal-400">
                    {language === 'en' ? 'Privacy Policy' : 'गोपनीयता नीति'}
                  </Link>
                  <span>&bull;</span>
                  <Link href="/privacy/rights" className="underline hover:text-royal-600 dark:hover:text-royal-400">
                    {language === 'en' ? 'Data Principal Rights' : 'डेटा अधिकार'}
                  </Link>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0 w-full md:w-auto">
                <button
                  type="button"
                  onClick={() => setShowCustomizeModal(true)}
                  className="w-full sm:w-auto px-3 py-2 text-xs font-mono font-medium border border-ink-400 dark:border-ink-600 hover:bg-paper-200 dark:hover:bg-ink-800 transition-colors flex items-center justify-center space-x-1.5"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>{language === 'en' ? 'Preferences' : 'पसंद'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleRejectNonEssential}
                  className="w-full sm:w-auto px-3 py-2 text-xs font-mono font-medium border border-ink-950 dark:border-ink-400 hover:bg-paper-300 dark:hover:bg-ink-800 transition-colors"
                >
                  {language === 'en' ? 'Reject Non-Essential' : 'अस्वीकार करें'}
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="w-full sm:w-auto px-4 py-2 text-xs font-mono font-bold bg-royal-700 hover:bg-royal-800 text-white shadow-brutal-sm transition-transform active:translate-y-0.5"
                >
                  {language === 'en' ? 'Accept All' : 'सभी स्वीकार करें'}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* 2. Granular Preferences Modal */}
      {showCustomizeModal && (
        <div 
          role="dialog" 
          aria-modal="true" 
          aria-labelledby="dpdp-modal-title"
          className="fixed inset-0 z-50 bg-ink-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
        >
          <div className="relative w-full max-w-2xl bg-paper dark:bg-ink-900 border-2 border-ink-950 dark:border-ink-700 shadow-brutal p-5 sm:p-7 space-y-6 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-ink-900/15 dark:border-ink-700 pb-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-royal-600 dark:text-royal-400" />
                  <h2 id="dpdp-modal-title" className="text-lg font-serif font-bold text-ink-950 dark:text-ink-50">
                    Consent &amp; Privacy Preferences
                  </h2>
                </div>
                <p className="text-xs text-ink-600 dark:text-ink-400 font-mono">
                  Digital Personal Data Protection Act, 2023 (DPDPA) Compliance Centre
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowCustomizeModal(false)}
                className="p-1 text-ink-500 hover:text-ink-950 dark:hover:text-ink-100"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Explanation */}
            <p className="text-xs text-ink-700 dark:text-ink-300 leading-relaxed">
              In accordance with Section 6 of the DPDP Act 2023, consent must be free, specific, informed, unconditional, and unambiguous. You have full granular control over which categories of cookies and identifiers you permit.
            </p>

            {/* Granular Categories */}
            <div className="space-y-4">
              
              {/* Category 1: Strictly Necessary */}
              <div className="p-4 bg-paper-100 dark:bg-ink-850 border border-ink-900/10 dark:border-ink-700 flex items-start justify-between gap-4">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-serif font-bold text-sm text-ink-950 dark:text-ink-50">
                      Strictly Necessary (Essential)
                    </span>
                    <span className="px-1.5 py-0.5 text-[9px] font-mono uppercase bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                      Always Active
                    </span>
                  </div>
                  <p className="text-xs text-ink-600 dark:text-ink-400 leading-relaxed">
                    Required for core website navigation, CSRF security tokens, Razorpay checkout gateway handshakes, and remembering your theme preference. Cannot be disabled.
                  </p>
                </div>
                <div className="shrink-0 pt-1">
                  <input
                    type="checkbox"
                    checked={true}
                    disabled
                    aria-label="Strictly Necessary Cookies (Always Active)"
                    className="w-4 h-4 text-royal-600 opacity-60 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Category 2: Performance & Analytics */}
              <div className="p-4 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 flex items-start justify-between gap-4">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-serif font-bold text-sm text-ink-950 dark:text-ink-50">
                      Performance &amp; Analytics (GA4)
                    </span>
                    <span className="px-1.5 py-0.5 text-[9px] font-mono uppercase bg-royal-100 dark:bg-royal-950 text-royal-800 dark:text-royal-300 border border-royal-300 dark:border-royal-800">
                      Optional
                    </span>
                  </div>
                  <p className="text-xs text-ink-600 dark:text-ink-400 leading-relaxed">
                    Helps the editorial team measure page visits, bounce rates, and popular articles. IP masking is applied. No cross-site or advertising tracking cookies are installed.
                  </p>
                </div>
                <div className="shrink-0 pt-1">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-5 bg-ink-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-ink-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:bg-ink-700 peer-checked:bg-royal-600"></div>
                  </label>
                </div>
              </div>

              {/* Category 3: Functional & Community */}
              <div className="p-4 bg-paper dark:bg-ink-900 border border-ink-900/15 dark:border-ink-700 flex items-start justify-between gap-4">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-serif font-bold text-sm text-ink-950 dark:text-ink-50">
                      Functional &amp; Community Enhancements
                    </span>
                    <span className="px-1.5 py-0.5 text-[9px] font-mono uppercase bg-royal-100 dark:bg-royal-950 text-royal-800 dark:text-royal-300 border border-royal-300 dark:border-royal-800">
                      Optional
                    </span>
                  </div>
                  <p className="text-xs text-ink-600 dark:text-ink-400 leading-relaxed">
                    Permits interactive widgets such as WhatsApp community shortcuts, saved form drafts, and dynamic article sharing previews.
                  </p>
                </div>
                <div className="shrink-0 pt-1">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.functional}
                      onChange={(e) => setPreferences({ ...preferences, functional: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-5 bg-ink-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-ink-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:bg-ink-700 peer-checked:bg-royal-600"></div>
                  </label>
                </div>
              </div>

            </div>

            {/* Statutory Ease of Withdrawal Reminder */}
            <div className="p-3 bg-amber-500/10 dark:bg-amber-500/5 border border-amber-500/20 text-xs text-ink-700 dark:text-ink-300 flex items-start space-x-2 font-mono">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Section 6(4) DPDP Act Notice:</strong> You may withdraw your consent at any time as easily as giving it, by clicking &ldquo;Manage Consent&rdquo; in the footer or returning to this preferences centre.
              </span>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-ink-900/15 dark:border-ink-700">
              <button
                type="button"
                onClick={handleRejectNonEssential}
                className="w-full sm:w-auto px-4 py-2.5 text-xs font-mono font-medium border border-ink-950 dark:border-ink-400 hover:bg-paper-200 dark:hover:bg-ink-800 transition-colors"
              >
                Reject Non-Essential
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleSaveCustom}
                  className="w-full sm:w-auto px-4 py-2.5 text-xs font-mono font-medium border border-royal-600 text-royal-700 dark:text-royal-300 hover:bg-royal-50 dark:hover:bg-royal-950/40 transition-colors"
                >
                  Save My Choices
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-mono font-bold bg-royal-700 hover:bg-royal-800 text-white shadow-brutal-sm transition-transform active:translate-y-0.5"
                >
                  Accept All
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
