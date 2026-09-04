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
  ArrowUpRight
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
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Programmes', href: '/internships' },
    { name: 'Publications', href: '/articles' },
    { name: 'Submit', href: '/publish' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-200 liquid-glass-nav ${
        scrolled 
          ? 'py-3 shadow-sm' 
          : 'py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Wordmark */}
          <Link href="/" className="flex items-center space-x-2.5 group focus:outline-none">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-200 flex items-center justify-center text-royal-500 dark:text-royal-400 transition-transform duration-200 group-hover:scale-105 shadow-brutal-sm">
              <span className="font-serif font-black text-base sm:text-lg">L</span>
            </div>
            
            <div className="flex items-baseline space-x-1.5">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-ink-900 dark:text-ink-50">
                LexMinds
              </span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-royal-600 dark:text-royal-400 hidden sm:inline">
                India
              </span>
              <span className="w-2 h-2 rounded-full bg-royal-500 dark:bg-royal-400 inline-block" />
            </div>
          </Link>

          {/* Simple Spacious Navigation */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative py-1 text-sm font-medium transition-colors tracking-tight ${
                    isActive
                      ? 'text-royal-600 dark:text-royal-400 font-semibold'
                      : 'text-ink-600 dark:text-ink-300 hover:text-ink-950 dark:hover:text-ink-50'
                  }`}
                >
                  <span>{link.name}</span>
                  <span 
                    className={`absolute -bottom-1 left-0 right-0 h-[2px] bg-royal-500 dark:bg-royal-400 transition-transform duration-200 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`} 
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right Section: Theme Toggle & Primary Action */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* Tactile Theme Switcher */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="tactile-control p-2.5 rounded-sm text-ink-700 dark:text-ink-300 hover:text-royal-500 dark:hover:text-royal-400 cursor-pointer"
              title={`Toggle theme (${theme === 'dark' ? 'currently dark' : 'currently light'})`}
            >
              <div className="w-4 h-4 flex items-center justify-center">
                {theme === 'dark' ? (
                  <Moon className="w-4 h-4 text-royal-400" />
                ) : (
                  <Sun className="w-4 h-4 text-ink-900" />
                )}
              </div>
            </button>

            {/* Primary Action Button */}
            <Link
              href="/internships"
              className="hidden sm:inline-flex items-center space-x-1.5 px-4 py-2 text-xs font-semibold tracking-wide btn-brand-primary"
            >
              <span>Explore Opportunities</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-sm bg-surface-light dark:bg-surface-dark text-ink-900 dark:text-ink-100 border border-ink-900 dark:border-ink-200"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-paper-100 dark:bg-ink-900 border-b border-ink-900 dark:border-ink-200 px-4 py-5 space-y-3 animate-editorial-reveal">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 text-sm font-medium border-b border-paper-300 dark:border-ink-800 ${
                  isActive
                    ? 'text-royal-500 dark:text-royal-400 font-bold'
                    : 'text-ink-800 dark:text-ink-200'
                }`}
              >
                <span>{link.name}</span>
                {isActive && <span className="text-royal-500 dark:text-royal-400 font-mono text-sm">&bull;</span>}
              </Link>
            );
          })}

          <div className="pt-2">
            <Link
              href="/internships"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 text-center block text-xs font-semibold btn-brand-primary"
            >
              Explore Opportunities
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
