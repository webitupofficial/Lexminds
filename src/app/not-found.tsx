import React from 'react';
import Link from 'next/link';
import { 
  Scale, 
  Search, 
  Home, 
  Briefcase, 
  BookOpen, 
  FileQuestion 
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: '404 - Docket Not Found | LexMinds',
  description: 'The requested legal resource, article, or fellowship docket could not be located in the LexMinds registry.',
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full text-center space-y-8">
        
        {/* Breadcrumbs */}
        <div className="flex justify-center">
          <Breadcrumbs items={[{ name: 'Error 404: Docket Not Found' }]} />
        </div>

        {/* Badge & Icon */}
        <div className="space-y-4">
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-sm bg-ivory-200 dark:bg-ink-800 border border-ink-300 dark:border-ink-700 text-oxblood-700 dark:text-oxblood-400 text-[10px] font-mono font-bold uppercase tracking-wider">
            <Scale className="w-3.5 h-3.5" />
            <span>Archival Notice &bull; Status 404</span>
          </div>

          <div className="w-16 h-16 mx-auto rounded-sm bg-ivory-100 dark:bg-ink-850 border border-ink-300 dark:border-ink-700 flex items-center justify-center text-oxblood-700 dark:text-oxblood-400 shadow-sm">
            <FileQuestion className="w-8 h-8" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-ink-950 dark:text-white tracking-tight">
            Archival Docket <span className="text-oxblood-700 dark:text-oxblood-400">Not Found</span>
          </h1>

          <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-400 max-w-lg mx-auto leading-relaxed font-normal">
            The treatise, commentary, or fellowship docket you are seeking may have concluded, been re-indexed, or moved to another volume in the LexMinds archive.
          </p>
        </div>

        {/* Quick Search Form */}
        <form 
          action="/articles" 
          method="GET"
          className="max-w-md mx-auto flex items-center rounded-sm bg-white dark:bg-ink-850 border border-ink-300 dark:border-ink-700 p-1.5 focus-within:border-oxblood-700 transition-colors shadow-sm"
        >
          <Search className="w-4 h-4 text-ink-400 ml-2.5 shrink-0" />
          <input
            type="text"
            name="q"
            placeholder="Search statutes, case analyses, or topics..."
            className="w-full bg-transparent px-3 py-1.5 text-xs text-ink-950 dark:text-white placeholder-ink-400 focus:outline-none font-mono"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-oxblood-700 hover:bg-oxblood-800 dark:bg-oxblood-600 dark:hover:bg-oxblood-500 text-white font-serif font-bold text-xs uppercase tracking-wider rounded-sm transition-all shrink-0"
          >
            Search
          </button>
        </form>

        {/* Direct Action Hub */}
        <div className="pt-4 border-t border-ink-200 dark:border-ink-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left font-mono">
          <Link
            href="/"
            className="p-3.5 rounded-sm editorial-card border border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-850 transition-all group"
          >
            <Home className="w-4 h-4 text-oxblood-700 dark:text-oxblood-400 mb-1.5 group-hover:scale-105 transition-transform" />
            <h4 className="text-xs font-bold text-ink-950 dark:text-white group-hover:text-oxblood-700 dark:group-hover:text-oxblood-400 font-serif">Front Page</h4>
            <p className="text-[11px] text-ink-500 mt-0.5">Return to central publication</p>
          </Link>

          <Link
            href="/internships"
            className="p-3.5 rounded-sm editorial-card border border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-850 transition-all group"
          >
            <Briefcase className="w-4 h-4 text-oxblood-700 dark:text-oxblood-400 mb-1.5 group-hover:scale-105 transition-transform" />
            <h4 className="text-xs font-bold text-ink-950 dark:text-white group-hover:text-oxblood-700 dark:group-hover:text-oxblood-400 font-serif">Fellowships</h4>
            <p className="text-[11px] text-ink-500 mt-0.5">Explore active research cohorts</p>
          </Link>

          <Link
            href="/articles"
            className="p-3.5 rounded-sm editorial-card border border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-850 transition-all group"
          >
            <BookOpen className="w-4 h-4 text-oxblood-700 dark:text-oxblood-400 mb-1.5 group-hover:scale-105 transition-transform" />
            <h4 className="text-xs font-bold text-ink-950 dark:text-white group-hover:text-oxblood-700 dark:group-hover:text-oxblood-400 font-serif">Legal Treatises</h4>
            <p className="text-[11px] text-ink-500 mt-0.5">Read law review commentaries</p>
          </Link>
        </div>

      </div>
    </div>
  );
}
