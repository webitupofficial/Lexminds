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
    { name: 'Open Calls', href: '/internships' },
    { name: 'Treatises & Index', href: '/articles' },
    { name: 'Submit Treatise', href: '/publish' },
    { name: 'Academic Desk', href: '/contact' },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-200 liquid-glass-nav ${
        scrolled 
          ? 'py-2.5 shadow-sm' 
          : 'py-3.5 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Masthead Brand */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-paper-100 dark:bg-ink-850 border border-ink-900 dark:border-ink-200 flex items-center justify-center text-vermilion dark:text-vermilion transition-colors shadow-tactile">
              <Scale className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-baseline space-x-1.5">
                <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-ink-900 dark:text-ink-100">
                  Lex<span className="text-vermilion">Minds</span>
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-ink-500 dark:text-ink-400 hidden sm:inline-block">
                  Vol. IV
                </span>
              </div>
              <span className="text-[9px] tracking-[0.18em] font-sans font-medium uppercase text-ink-500 dark:text-ink-400">
                Independent Legal Journal
              </span>
            </div>
          </Link>

          {/* Center Navigation with Active Underline scaleX */}
          <nav className="hidden md:flex items-center space-x-7" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative py-1 text-xs uppercase tracking-wider transition-colors font-medium ${
                    isActive
                      ? 'text-vermilion dark:text-vermilion font-bold'
                      : 'text-ink-700 dark:text-ink-300 hover:text-ink-900 dark:hover:text-ink-100'
                  }`}
                >
                  <span>{link.name}</span>
                  <span 
                    className={`absolute -bottom-1 left-0 right-0 h-[2px] bg-vermilion transition-transform duration-200 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`} 
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right Section: Tactile Utility Switch & Neo-brutalist Button */}
          <div className="flex items-center space-x-3">
            
            {/* Distinctive Neumorphic Tactile Theme Switch */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="tactile-control p-2 rounded-sm text-ink-700 dark:text-ink-300 hover:text-vermilion dark:hover:text-vermilion cursor-pointer"
              title={`Toggle theme (${theme === 'dark' ? 'currently dark' : 'currently light'})`}
            >
              <div className="w-4 h-4 flex items-center justify-center">
                {theme === 'dark' ? (
                  <Moon className="w-3.5 h-3.5 text-vermilion" />
                ) : (
                  <Sun className="w-3.5 h-3.5 text-ink-900" />
                )}
              </div>
            </button>

            {/* Neo-brutalist Action Button */}
            <Link
              href="/internships"
              className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-semibold tracking-wide btn-neo-primary"
            >
              <span>View Open Calls</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 rounded-sm bg-paper-100 dark:bg-ink-850 text-ink-900 dark:text-ink-100 border border-ink-900 dark:border-ink-200"
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
        <div className="md:hidden bg-paper-100 dark:bg-ink-900 border-b border-ink-900 dark:border-ink-200 px-4 py-4 space-y-2 animate-editorial-reveal">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2 text-xs uppercase tracking-wider border-b border-paper-300 dark:border-ink-800 ${
                  isActive
                    ? 'text-vermilion font-bold'
                    : 'text-ink-800 dark:text-ink-200'
                }`}
              >
                <span>{link.name}</span>
                {isActive && <span className="text-vermilion font-mono text-sm">&bull;</span>}
              </Link>
            );
          })}

          <div className="pt-3">
            <Link
              href="/internships"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center block text-xs font-semibold btn-neo-primary uppercase tracking-wider"
            >
              View Open Calls
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
