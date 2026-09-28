'use client';

import React, { useState, useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';

const WHATSAPP_CHANNEL_URL = 'https://whatsapp.com/channel/0029Vb8i43gEgGfQD6ZnNE31';
const STORAGE_KEY = 'lexminds_wa_popup_dismissed_v1';

export default function WhatsAppCommunityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Check if the user previously dismissed the pop-up in this session
    const isDismissed = sessionStorage.getItem(STORAGE_KEY);
    if (!isDismissed) {
      // Show the popup automatically after 3.5 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsOpen(false);
    setHasInteracted(true);
    sessionStorage.setItem(STORAGE_KEY, 'true');
  };

  const handleOpenChannel = () => {
    window.open(WHATSAPP_CHANNEL_URL, '_blank', 'noopener,noreferrer');
    handleDismiss();
  };

  const togglePopup = () => {
    if (!isOpen) {
      setIsOpen(true);
    } else {
      handleOpenChannel();
    }
  };

  return (
    <div 
      className="fixed z-40 flex flex-col items-end pointer-events-none select-none"
      style={{
        bottom: 'max(1rem, env(safe-area-inset-bottom, 1rem))',
        right: 'max(1rem, env(safe-area-inset-right, 1rem))',
      }}
    >
      
      {/* 1. Engaging Pop-up Card - Responsive across small phones (320px) up to 4K screens */}
      {isOpen && (
        <div className="pointer-events-auto mb-2.5 sm:mb-3 w-[calc(100vw-2rem)] sm:w-80 md:w-84 max-w-[340px] max-h-[82vh] overflow-y-auto rounded-sm bg-surface-light dark:bg-surface-dark border-2 border-ink-950 dark:border-ink-600 p-4 sm:p-5 shadow-brutal animate-editorial-reveal relative">
          {/* Close button */}
          <button
            onClick={handleDismiss}
            aria-label="Dismiss community notice"
            className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 p-1.5 text-ink-400 hover:text-ink-950 dark:hover:text-ink-50 rounded-sm transition-colors cursor-pointer touch-manipulation"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Top Badge */}
          <div className="flex items-center space-x-2 mb-2">
            <span className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-500/30 text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
              <span>Official WhatsApp Channel</span>
            </span>
          </div>

          {/* Content */}
          <div className="space-y-1.5 pr-3">
            <h4 className="font-serif font-bold text-ink-950 dark:text-ink-50 text-sm sm:text-base leading-snug flex items-center gap-1.5">
              <span>Never Miss Any Opportunity</span>
              <span className="text-sm">⚖️</span>
            </h4>
            <p className="text-xs text-ink-600 dark:text-ink-300 leading-relaxed font-normal">
              Join <strong className="text-ink-900 dark:text-ink-100 font-semibold">1,000+ law students &amp; researchers</strong> for instant alerts on legal internships, call for papers, and workshop updates.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="mt-3.5 pt-2.5 sm:pt-3 border-t border-ink-900/10 dark:border-ink-800 flex items-center justify-between gap-2">
            <button
              onClick={handleDismiss}
              className="text-[11px] font-mono text-ink-500 dark:text-ink-400 hover:text-ink-900 dark:hover:text-ink-100 px-2 py-1.5 rounded-sm transition-colors cursor-pointer touch-manipulation"
            >
              Maybe later
            </button>
            <button
              onClick={handleOpenChannel}
              className="px-3 sm:px-3.5 py-2 rounded-sm bg-[#25D366] hover:bg-[#20bd5a] active:bg-[#1caa51] text-ink-950 font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5 shadow-sm transition-all duration-150 cursor-pointer touch-manipulation"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 fill-ink-950 shrink-0" />
              <span>Join Channel</span>
              <ArrowRight className="w-3 h-3 text-ink-950 ml-0.5" />
            </button>
          </div>
        </div>
      )}

      {/* 2. Floating WhatsApp Floating Icon Button */}
      <div className="pointer-events-auto relative flex items-center group">
        
        {/* Subtle Tooltip on Hover for desktop / laptop */}
        {!isOpen && (
          <div className="mr-3 hidden lg:flex items-center px-3 py-1.5 rounded-sm bg-ink-950 dark:bg-ink-100 text-white dark:text-ink-950 text-xs font-mono font-medium shadow-brutal-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
            <span>Join LexMinds WhatsApp Community</span>
            <span className="ml-1 text-emerald-400 dark:text-emerald-700">&bull; Active</span>
          </div>
        )}

        <button
          onClick={togglePopup}
          aria-label="Join LexMinds WhatsApp Community Channel"
          className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-brutal border-2 border-ink-950 dark:border-ink-700 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer touch-manipulation group"
        >
          {/* Subtle pulsating outer ring */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none" />

          {/* WhatsApp Icon */}
          <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 fill-white relative z-10 transition-transform duration-200 group-hover:rotate-6" />

          {/* Unread notification ping dot */}
          {!hasInteracted && (
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-coral rounded-full border-2 border-white dark:border-ink-950 flex items-center justify-center z-20">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
            </span>
          )}
        </button>
      </div>

    </div>
  );
}

function WhatsAppIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
