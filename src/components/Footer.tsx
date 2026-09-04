'use client';

import React from 'react';
import Link from 'next/link';
import { Scale, Mail, FileText, ArrowRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ivory-200/50 dark:bg-ink-950 border-t border-ink-200 dark:border-ink-800 text-ink-600 dark:text-ink-400 text-xs transition-colors duration-200">
      
      {/* Main Colophon Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand & Editorial Colophon (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-8 h-8 rounded-sm bg-white dark:bg-ink-850 border border-ink-300 dark:border-ink-700 flex items-center justify-center text-oxblood-700 dark:text-oxblood-400 shadow-sm">
                <Scale className="w-4 h-4" />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-ink-950 dark:text-white">
                Lex<span className="text-oxblood-700 dark:text-oxblood-400">Minds</span>
              </span>
            </Link>
            
            <p className="text-ink-600 dark:text-ink-300 text-xs leading-relaxed max-w-md font-normal">
              An independent, student-led legal scholarship initiative publishing critical treatises, statutory commentaries, and selective research fellowship dossiers for emerging scholars across India.
            </p>

            <div className="pt-2 text-xs text-ink-500 dark:text-ink-400 flex items-center space-x-2">
              <Mail className="w-3.5 h-3.5 text-oxblood-700 dark:text-oxblood-400 shrink-0" />
              <span>Editorial Secretariat: editorial@lexminds.in</span>
            </div>
          </div>

          {/* Publications & Volumes (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-ink-900 dark:text-white font-mono">
              Publications
            </h4>
            <ul className="space-y-2 text-xs text-ink-600 dark:text-ink-400">
              <li>
                <Link href="/articles" className="hover:text-oxblood-700 dark:hover:text-oxblood-400 transition-colors">
                  Treatises &amp; Law Articles
                </Link>
              </li>
              <li>
                <Link href="/internships" className="hover:text-oxblood-700 dark:hover:text-oxblood-400 transition-colors">
                  Research Fellowships
                </Link>
              </li>
              <li>
                <Link href="/publish" className="hover:text-oxblood-700 dark:hover:text-oxblood-400 transition-colors">
                  Submit Manuscript
                </Link>
              </li>
            </ul>
          </div>

          {/* Academic Governance (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-ink-900 dark:text-white font-mono">
              Governance
            </h4>
            <ul className="space-y-2 text-xs text-ink-600 dark:text-ink-400">
              <li>
                <Link href="/editorial-policy" className="hover:text-oxblood-700 dark:hover:text-oxblood-400 transition-colors">
                  Editorial Standards
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-oxblood-700 dark:hover:text-oxblood-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-oxblood-700 dark:hover:text-oxblood-400 transition-colors">
                  Terms of Publication
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-oxblood-700 dark:hover:text-oxblood-400 transition-colors">
                  Academic Desk
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Colophon & Academic Notice */}
        <div className="mt-12 pt-6 border-t border-ink-200/80 dark:border-ink-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-ink-500 dark:text-ink-400 gap-3">
          <div>
            &copy; {currentYear} LexMinds Law Review. Published for educational, academic, and legal research purposes. Non-solicitation under BCI norms.
          </div>
          <div className="flex items-center space-x-5">
            <Link href="/privacy" className="hover:text-ink-900 dark:hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-ink-900 dark:hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-ink-900 dark:hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
