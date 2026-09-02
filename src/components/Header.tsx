'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Scale, 
  Menu, 
  X, 
  Sun, 
  Moon,
  ArrowRight
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Strictly: Internships, Articles, Contact Us
  const navLinks = [
    { name: 'Internships', href: '/internships' },
    { name: 'Articles', href: '/articles' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 dark:bg-[#030712]/85 backdrop-blur-2xl border-b border-slate-200/80 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] py-3' 
          : 'bg-white/50 dark:bg-[#030712]/50 backdrop-blur-xl border-b border-slate-200/40 dark:border-white/5 py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Most Left: Logo + Name immediately right of logo */}
          <Link href="/" className="flex items-center space-x-3.5 group">
            {/* Claymorphic/Glassmorphic Crest */}
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-white via-slate-100 to-slate-200 dark:from-slate-800/90 dark:via-slate-900/90 dark:to-slate-950/90 border border-slate-200/80 dark:border-gold-500/30 flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.1)] group-hover:scale-105 group-hover:border-gold-500/60 transition-all duration-300">
              <Scale className="w-5 h-5 text-gold-600 dark:text-gold-400 group-hover:rotate-6 transition-transform duration-300" />
            </div>
            
            {/* Brand Title */}
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-gold-600 dark:group-hover:text-gold-300 transition-colors">
                Lex<span className="text-gold-600 dark:text-gold-400">Minds</span>
              </span>
              <span className="text-[9px] tracking-[0.2em] font-sans font-medium uppercase text-slate-400 dark:text-slate-500">
                Legal Research &amp; Practice
              </span>
            </div>
          </Link>

          {/* Center/Menu Section: Strictly Internships, Articles, Contact Us */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-slate-100/70 dark:bg-slate-900/40 p-1.5 rounded-full border border-slate-200/60 dark:border-white/10 backdrop-blur-lg">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                    isActive
                      ? 'text-slate-950 dark:text-white bg-white dark:bg-slate-800/90 shadow-[0_2px_10px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.6)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.15)] border border-slate-200/60 dark:border-white/10'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Section: Attractive Claymorphic Theme Switcher + Minimal Action */}
          <div className="flex items-center space-x-3">
            
            {/* Highly Attractive Theme Switcher Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="relative p-1.5 sm:p-2 rounded-2xl bg-gradient-to-b from-white to-slate-100 dark:from-slate-800/90 dark:to-slate-900/90 border border-slate-200/80 dark:border-gold-500/30 text-slate-700 dark:text-slate-300 hover:text-gold-600 dark:hover:text-gold-300 shadow-[0_4px_14px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center group"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <div className="w-6 h-6 flex items-center justify-center relative">
                <Sun className={`w-4 h-4 text-amber-500 transition-all duration-500 transform ${
                  theme === 'light' ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'
                }`} />
                <Moon className={`w-4 h-4 text-gold-400 transition-all duration-500 transform absolute ${
                  theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
                }`} />
              </div>
            </button>

            {/* Direct Minimal Call to Action */}
            <Link
              href="/internships"
              className="hidden sm:inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-slate-900 dark:bg-gradient-to-r dark:from-gold-400 dark:via-gold-500 dark:to-gold-400 text-white dark:text-slate-950 text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-all shadow-[0_4px_14px_rgba(0,0,0,0.15)] dark:shadow-[0_4px_20px_rgba(212,175,55,0.25)] transform hover:-translate-y-0.5"
            >
              <span>Explore</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-[#030712]/95 border-b border-slate-200 dark:border-white/10 px-4 pt-3 pb-6 space-y-2 animate-fade-in backdrop-blur-2xl">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'text-gold-700 dark:text-gold-400 bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5'
                }`}
              >
                <span>{link.name}</span>
              </Link>
            );
          })}

          <div className="pt-3 border-t border-slate-100 dark:border-white/10">
            <Link
              href="/internships"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 text-center block rounded-2xl bg-slate-900 dark:bg-gold-400 text-white dark:text-slate-950 font-bold text-xs uppercase tracking-wider"
            >
              Explore Openings
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
