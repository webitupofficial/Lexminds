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
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-sm bg-royal-50 dark:bg-royal-950/40 border border-royal-200 dark:border-royal-800 text-royal-700 dark:text-royal-300 text-[11px] font-mono font-bold uppercase tracking-wider">
            <Scale className="w-3.5 h-3.5" />
            <span>Archival Notice &bull; Status 404</span>
          </div>

          <div className="w-16 h-16 mx-auto rounded-sm bg-surface border border-ink/10 dark:border-white/10 flex items-center justify-center text-royal-600 dark:text-royal-400 shadow-sm">
            <FileQuestion className="w-8 h-8" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-ink tracking-tight">
            Archival Docket <span className="text-royal-600 dark:text-royal-400">Not Found</span>
          </h1>

          <p className="text-xs sm:text-sm text-ink/70 max-w-lg mx-auto leading-relaxed font-normal">
            The commentary, syllabus, or fellowship docket you are seeking may have concluded, been re-indexed, or moved to another section in the LexMinds archive.
          </p>
        </div>

        {/* Quick Search Form */}
        <form 
          action="/articles" 
          method="GET"
          className="max-w-md mx-auto flex items-center rounded-sm bg-surface border border-ink/15 dark:border-white/15 p-1.5 focus-within:border-royal-500 transition-colors shadow-sm"
        >
          <Search className="w-4 h-4 text-ink/40 ml-2.5 shrink-0" />
          <input
            type="text"
            name="q"
            placeholder="Search statutes, case analyses, or topics..."
            className="w-full bg-transparent px-3 py-1.5 text-xs text-ink placeholder-ink/40 focus:outline-none font-mono"
          />
          <button
            type="submit"
            className="btn-brand-primary !py-1.5 !px-3.5 !text-xs shrink-0"
          >
            Search
          </button>
        </form>

        {/* Direct Action Hub */}
        <div className="pt-4 border-t border-ink/10 dark:border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left font-mono">
          <Link
            href="/"
            className="p-4 rounded-sm border border-ink/10 dark:border-white/10 bg-surface hover:border-royal-500/50 transition-all group"
          >
            <Home className="w-4 h-4 text-royal-600 dark:text-royal-400 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="text-xs font-bold text-ink group-hover:text-royal-600 dark:group-hover:text-royal-400 font-serif">Front Page</h4>
            <p className="text-[11px] text-ink/60 mt-0.5">Return to central publication</p>
          </Link>

          <Link
            href="/internships"
            className="p-4 rounded-sm border border-ink/10 dark:border-white/10 bg-surface hover:border-royal-500/50 transition-all group"
          >
            <Briefcase className="w-4 h-4 text-royal-600 dark:text-royal-400 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="text-xs font-bold text-ink group-hover:text-royal-600 dark:group-hover:text-royal-400 font-serif">Opportunities</h4>
            <p className="text-[11px] text-ink/60 mt-0.5">Explore active research cohorts</p>
          </Link>

          <Link
            href="/articles"
            className="p-4 rounded-sm border border-ink/10 dark:border-white/10 bg-surface hover:border-royal-500/50 transition-all group"
          >
            <BookOpen className="w-4 h-4 text-royal-600 dark:text-royal-400 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="text-xs font-bold text-ink group-hover:text-royal-600 dark:group-hover:text-royal-400 font-serif">Journal Index</h4>
            <p className="text-[11px] text-ink/60 mt-0.5">Read law review commentaries</p>
          </Link>
        </div>

      </div>
    </div>
  );
}
