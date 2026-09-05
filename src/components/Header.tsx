'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  Sun, 
  Moon
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
    { name: 'Mentors', href: '/mentors' },
    { name: 'Internships', href: '/internships' },
    { name: 'Publications', href: '/articles' },
    { name: 'About', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
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
          
          {/* Left: Brand Wordmark */}
          <Link href="/" className="flex items-center space-x-2.5 group focus:outline-none shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-200 flex items-center justify-center text-royal-500 dark:text-royal-400 transition-transform duration-200 group-hover:scale-105 shadow-brutal-sm">
              <span className="font-serif font-black text-base sm:text-lg">L</span>
            </div>
            
            <div className="flex items-baseline space-x-1.5">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-ink-900 dark:text-ink-50">
                Lex Minds
              </span>
              <span className="w-2 h-2 rounded-full bg-royal-500 dark:bg-royal-400 inline-block" />
            </div>
          </Link>

          {/* Right Group: Right-Aligned Navigation Links + Tactile Theme Toggle + Mobile Hamburger */}
          <div className="flex items-center space-x-5 md:space-x-8">
            
            {/* Right-Aligned Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8" aria-label="Main Navigation">
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

            {/* Separator between links and theme toggle on desktop */}
            <div className="hidden md:block w-px h-5 bg-paper-300 dark:bg-ink-800" aria-hidden="true" />

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
        <div className="md:hidden bg-paper-100 dark:bg-ink-900 border-b border-ink-900 dark:border-ink-200 px-4 py-5 space-y-2 animate-editorial-reveal">
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
        </div>
      )}
    </header>
  );
}
