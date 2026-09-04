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

  const navLinks = [
    { name: 'Fellowships', href: '/internships' },
    { name: 'Treatises & Articles', href: '/articles' },
    { name: 'Academic Desk', href: '/contact' },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 transition-colors duration-200 border-b ${
        scrolled 
          ? 'bg-[#fbf9f5]/95 dark:bg-[#0d1117]/95 backdrop-blur-md border-ink-200/90 dark:border-ink-800/90 shadow-sm py-2.5' 
          : 'bg-[#fbf9f5] dark:bg-[#0d1117] border-ink-200/60 dark:border-ink-850 py-3 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Masthead Brand */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-9 h-9 rounded-sm bg-white dark:bg-ink-850 border border-ink-300 dark:border-ink-700 flex items-center justify-center text-oxblood-700 dark:text-oxblood-400 group-hover:border-oxblood-700 dark:group-hover:border-oxblood-400 transition-colors shadow-sm">
              <Scale className="w-4 h-4 transition-transform duration-200 group-hover:scale-105" />
            </div>
            
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-ink-950 dark:text-white transition-colors">
                Lex<span className="text-oxblood-700 dark:text-oxblood-400">Minds</span>
              </span>
              <span className="text-[9px] tracking-[0.2em] font-sans font-medium uppercase text-ink-500 dark:text-ink-400">
                Law Journal &amp; Review
              </span>
            </div>
          </Link>

          {/* Center Navigation with Active Underline */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative py-1 text-xs uppercase tracking-widest transition-colors ${
                    isActive
                      ? 'text-oxblood-700 dark:text-oxblood-400 font-bold'
                      : 'text-ink-600 dark:text-ink-400 hover:text-ink-900 dark:hover:text-ink-100 font-medium'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-oxblood-700 dark:bg-oxblood-400 transition-all" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Section: Theme Toggle & Primary Action */}
          <div className="flex items-center space-x-3">
            
            {/* Restrained Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="p-2 rounded-sm bg-white dark:bg-ink-850 border border-ink-300 dark:border-ink-700 text-ink-700 dark:text-ink-300 hover:border-oxblood-700 dark:hover:border-oxblood-400 hover:text-oxblood-700 dark:hover:text-oxblood-400 transition-colors shadow-sm"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <div className="w-4 h-4 flex items-center justify-center">
                {theme === 'dark' ? (
                  <Moon className="w-3.5 h-3.5 text-gold-400" />
                ) : (
                  <Sun className="w-3.5 h-3.5 text-oxblood-700" />
                )}
              </div>
            </button>

            {/* Primary Action Button */}
            <Link
              href="/internships"
              className="hidden sm:inline-flex items-center space-x-1.5 px-4 py-2 rounded-sm bg-oxblood-700 hover:bg-oxblood-800 dark:bg-oxblood-600 dark:hover:bg-oxblood-500 text-white font-serif text-xs font-semibold tracking-wider transition-all shadow-sm"
            >
              <span>Fellowships</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-sm bg-white dark:bg-ink-850 text-ink-700 dark:text-ink-300 border border-ink-300 dark:border-ink-700"
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
        <div className="md:hidden bg-[#fbf9f5] dark:bg-[#0d1117] border-b border-ink-200 dark:border-ink-800 px-4 py-4 space-y-2 animate-fade-in">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2 text-xs uppercase tracking-wider border-b border-ink-100 dark:border-ink-850 ${
                  isActive
                    ? 'text-oxblood-700 dark:text-oxblood-400 font-bold'
                    : 'text-ink-700 dark:text-ink-300'
                }`}
              >
                <span>{link.name}</span>
                {isActive && <span className="text-oxblood-700 dark:text-oxblood-400">&bull;</span>}
              </Link>
            );
          })}

          <div className="pt-2">
            <Link
              href="/internships"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center block rounded-sm bg-oxblood-700 text-white font-serif text-xs font-semibold tracking-wider"
            >
              View Fellowships
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
