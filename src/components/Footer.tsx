'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Scale, 
  Mail, 
  BookOpen, 
  Briefcase, 
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 dark:bg-[#030712] border-t border-slate-200/80 dark:border-white/10 text-slate-600 dark:text-slate-400 text-sm transition-colors duration-300">
      
      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand Col (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <Link href="/" className="flex items-center space-x-3.5 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-white via-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-gold-500/30 flex items-center justify-center shadow-sm">
                <Scale className="w-5 h-5 text-gold-600 dark:text-gold-400" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Lex<span className="text-gold-600 dark:text-gold-400">Minds</span>
              </span>
            </Link>
            
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
              An independent legal scholarship and research platform dedicated to fostering rigorous case analysis, peer-reviewed legal writing, and merit-based research fellowships.
            </p>

            <div className="pt-2 text-xs text-slate-500 dark:text-slate-400 flex items-center space-x-2">
              <Mail className="w-4 h-4 text-gold-600 dark:text-gold-400 shrink-0" />
              <span>Academic Inquiries: contact@lexminds.in</span>
            </div>
          </div>

          {/* Quick Navigation Col (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Platform
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/internships" className="hover:text-gold-600 dark:hover:text-gold-300 transition-colors">
                  Research Fellowships
                </Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-gold-600 dark:hover:text-gold-300 transition-colors">
                  Legal Articles &amp; Treatises
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold-600 dark:hover:text-gold-300 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies & Institutional (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Governance
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/privacy" className="hover:text-gold-600 dark:hover:text-gold-300 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-gold-600 dark:hover:text-gold-300 transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/editorial-policy" className="hover:text-gold-600 dark:hover:text-gold-300 transition-colors">
                  Editorial Standards
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-200/80 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4">
          <div>
            &copy; {currentYear} LexMinds. All legal research and published commentary provided for academic and informational purposes.
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
