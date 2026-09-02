import React from 'react';
import Link from 'next/link';
import { 
  Scale, 
  Search, 
  Home, 
  Briefcase, 
  BookOpen, 
  ArrowLeft, 
  FileQuestion,
  Sparkles
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: '404 - Legal Precedent Not Found',
  description: 'The requested legal resource, article, or internship docket could not be located in the LexMinds registry.',
};

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-blue-500/5 dark:bg-legal-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl w-full text-center relative z-10 space-y-8">
        
        {/* Breadcrumbs */}
        <div className="flex justify-center">
          <Breadcrumbs items={[{ name: 'Error 404: Docket Not Found' }]} />
        </div>

        {/* Badge & Icon */}
        <div className="space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold-50 dark:bg-gold-950/80 border border-gold-500/30 text-gold-700 dark:text-gold-400 text-xs font-semibold uppercase tracking-widest">
            <Scale className="w-3.5 h-3.5" />
            <span>Jurisdictional Notice &bull; Status 404</span>
          </div>

          <div className="w-20 h-20 mx-auto rounded-3xl neumorph-card flex items-center justify-center">
            <FileQuestion className="w-10 h-10 text-gold-600 dark:text-gold-400" />
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">
            Legal Precedent <span className="gold-gradient-text">Not Found</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
            The citation, article, or internship docket you are seeking may have been amended, concluded, or moved to another section of the LexMinds registry.
          </p>
        </div>

        {/* Quick Search Form */}
        <form 
          action="/articles" 
          method="GET"
          className="max-w-md mx-auto flex items-center rounded-2xl bg-white dark:bg-legal-900/90 border border-slate-200 dark:border-legal-700 p-1.5 focus-within:border-gold-500 transition-colors shadow-sm dark:shadow-lg neumorph-inset"
        >
          <Search className="w-4 h-4 text-slate-400 ml-3 shrink-0" />
          <input
            type="text"
            name="q"
            placeholder="Search statutes, case analyses, or internships..."
            className="w-full bg-transparent px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shrink-0"
          >
            Search
          </button>
        </form>

        {/* Direct Action Hub */}
        <div className="pt-4 border-t border-slate-200 dark:border-legal-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
          <Link
            href="/"
            className="p-3.5 rounded-2xl neumorph-card transition-all group"
          >
            <Home className="w-4 h-4 text-gold-600 dark:text-gold-400 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-gold-600 dark:group-hover:text-gold-300">Homepage</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Return to LexMinds central portal</p>
          </Link>

          <Link
            href="/internships"
            className="p-3.5 rounded-2xl neumorph-card transition-all group"
          >
            <Briefcase className="w-4 h-4 text-gold-600 dark:text-gold-400 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-gold-600 dark:group-hover:text-gold-300">Internship Portal</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Explore active Tier-1 clerkships</p>
          </Link>

          <Link
            href="/articles"
            className="p-3.5 rounded-2xl neumorph-card transition-all group"
          >
            <BookOpen className="w-4 h-4 text-gold-600 dark:text-gold-400 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-gold-600 dark:group-hover:text-gold-300">Legal Articles</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Read peer-reviewed treatises</p>
          </Link>
        </div>

      </div>
    </div>
  );
}
