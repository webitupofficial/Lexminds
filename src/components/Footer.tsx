'use client';

import React from 'react';
import Link from 'next/link';
import { Scale, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-paper-200 dark:bg-ink-950 border-t border-ink-900/15 dark:border-ink-700 text-ink-600 dark:text-ink-400 text-xs transition-colors duration-200">
      
      {/* Main Colophon Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand & Editorial Colophon (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-8 h-8 bg-paper-100 dark:bg-ink-850 border border-ink-900 dark:border-ink-200 flex items-center justify-center text-vermilion shadow-tactile">
                <Scale className="w-4 h-4" />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-ink-900 dark:text-white">
                Lex<span className="text-vermilion">Minds</span>
              </span>
            </Link>
            
            <p className="text-ink-700 dark:text-ink-300 text-xs leading-relaxed max-w-md font-normal">
              An independent, student-led legal scholarship initiative publishing peer-informed research, statutory commentaries, and selective research fellowship dossiers for emerging law students across India.
            </p>

            <div className="pt-1 text-xs text-ink-500 dark:text-ink-400 flex items-center space-x-2">
              <Mail className="w-3.5 h-3.5 text-vermilion shrink-0" />
              <span>Editorial Inquiries: editorial@lexminds.in</span>
            </div>
          </div>

          {/* Publications & Volumes (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-ink-900 dark:text-white font-mono">
              Indexes &amp; Calls
            </h4>
            <ul className="space-y-2 text-xs text-ink-600 dark:text-ink-400">
              <li>
                <Link href="/internships" className="hover:text-vermilion transition-colors">
                  Fellowship Open Calls
                </Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-vermilion transition-colors">
                  Treatises &amp; Index
                </Link>
              </li>
              <li>
                <Link href="/publish" className="hover:text-vermilion transition-colors">
                  Submit Manuscript
                </Link>
              </li>
            </ul>
          </div>

          {/* Academic Governance (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-ink-900 dark:text-white font-mono">
              Governance
            </h4>
            <ul className="space-y-2 text-xs text-ink-600 dark:text-ink-400">
              <li>
                <Link href="/editorial-policy" className="hover:text-vermilion transition-colors">
                  Editorial Standards
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-vermilion transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-vermilion transition-colors">
                  Terms of Publication
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-vermilion transition-colors">
                  Academic Desk
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Colophon & Academic Notice */}
        <div className="mt-12 pt-6 border-t border-ink-900/10 dark:border-ink-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-ink-500 dark:text-ink-400 gap-3">
          <div>
            &copy; {currentYear} LexMinds Law Journal. Published strictly for academic discourse and legal scholarship. Non-solicitation under BCI standards.
          </div>
          <div className="flex items-center space-x-5">
            <Link href="/privacy" className="hover:text-vermilion transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-vermilion transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-vermilion transition-colors">
              Contact
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
