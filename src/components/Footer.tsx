'use client';

import React from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-paper dark:bg-ink-950 border-t border-ink-900/15 dark:border-ink-800 text-ink-600 dark:text-ink-400 text-xs transition-colors duration-200">
      
      {/* Main Colophon Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Brand & Mission Colophon (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="w-8 h-8 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 flex items-center justify-center text-royal-500 dark:text-royal-400 font-serif font-bold text-base shadow-brutal-sm">
                L
              </div>
              <div className="flex items-baseline space-x-1.5">
                <span className="font-serif text-xl font-bold tracking-tight text-ink-950 dark:text-ink-50">
                  Lex Minds
                </span>
                <span className="w-2 h-2 rounded-full bg-royal-500 dark:bg-royal-400 inline-block" />
              </div>
            </Link>
            
            <p className="text-ink-600 dark:text-ink-300 text-xs leading-relaxed max-w-md font-normal">
              Lex Minds is an independent, student-led platform focused on legal education, research, writing, publications and legal learning. Empowering law students through structured practical research.
            </p>

            <div className="font-mono text-xs text-royal-600 dark:text-royal-400 font-semibold">
              Learn &bull; Research &bull; Write &bull; Create &bull; Grow
            </div>

            <div className="pt-2 text-xs text-ink-500 dark:text-ink-400 flex items-center space-x-2 font-mono">
              <Mail className="w-3.5 h-3.5 text-royal-500 shrink-0" />
              <span>
                Contact Us:{' '}
                <a href="mailto:lexmindsindia@gmail.com" className="hover:text-royal-600 dark:hover:text-royal-400 underline">
                  lexmindsindia@gmail.com
                </a>
              </span>
            </div>
          </div>

          {/* Programmes & Publications (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-950 dark:text-ink-100 font-mono">
              Programmes &amp; Journal
            </h4>
            <ul className="space-y-2.5 text-xs text-ink-600 dark:text-ink-400">
              <li>
                <Link href="/internships" className="hover:text-royal-500 dark:hover:text-royal-400 transition-colors">
                  Internship Programmes
                </Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-royal-500 dark:hover:text-royal-400 transition-colors">
                  Articles &amp; Commentaries
                </Link>
              </li>
              <li>
                <Link href="/publish" className="hover:text-royal-500 dark:hover:text-royal-400 transition-colors">
                  Submit Writing &amp; Papers
                </Link>
              </li>
              <li>
                <Link href="/mentors" className="hover:text-royal-500 dark:hover:text-royal-400 transition-colors">
                  Mentors &amp; Faculty
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-royal-500 dark:hover:text-royal-400 transition-colors">
                  About Us &amp; Our Vision
                </Link>
              </li>
            </ul>
          </div>

          {/* Governance & Information (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-950 dark:text-ink-100 font-mono">
              Transparency &amp; Legal
            </h4>
            <ul className="space-y-2.5 text-xs text-ink-600 dark:text-ink-400">
              <li>
                <Link href="/privacy" className="hover:text-royal-500 dark:hover:text-royal-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-royal-500 dark:hover:text-royal-400 transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-royal-500 dark:hover:text-royal-400 transition-colors">
                  Cancellation &amp; Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/editorial-policy" className="hover:text-royal-500 dark:hover:text-royal-400 transition-colors">
                  Editorial Standards
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-royal-500 dark:hover:text-royal-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Colophon & Disclaimer */}
        <div className="mt-14 pt-8 border-t border-ink-900/10 dark:border-ink-800 flex flex-col sm:flex-row items-center justify-between text-xs text-ink-500 dark:text-ink-400 gap-4">
          <div>
            &copy; {currentYear} Lex Minds. Independent student-led platform for legal education and practical learning.
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/about" className="hover:text-royal-500 dark:hover:text-royal-400 transition-colors">
              About
            </Link>
            <Link href="/privacy" className="hover:text-royal-500 dark:hover:text-royal-400 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-royal-500 dark:hover:text-royal-400 transition-colors">
              Terms
            </Link>
            <Link href="/refund-policy" className="hover:text-royal-500 dark:hover:text-royal-400 transition-colors">
              Refunds
            </Link>
            <Link href="/contact" className="hover:text-royal-500 dark:hover:text-royal-400 transition-colors">
              Contact
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
