'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Search, 
  Clock, 
  User, 
  Sparkles, 
  ArrowRight, 
  ChevronRight, 
  PenTool,
  X
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { INITIAL_ARTICLES } from '@/lib/data-store';

export default function ArticlesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Data Privacy & Tech Law',
    'Constitutional & Criminal',
    'Intellectual Property',
    'Corporate & M&A'
  ];

  const filteredArticles = useMemo(() => {
    return INITIAL_ARTICLES.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat =
        selectedCategory === 'All' || article.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Breadcrumbs & Header */}
      <div className="space-y-4">
        <Breadcrumbs items={[{ name: 'Legal Articles' }]} />
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold-600 dark:text-gold-400 bg-gold-50 dark:bg-gold-950/80 px-3 py-1 rounded-full border border-gold-500/20">
              Academic Publications
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 dark:text-white mt-2">
              Peer-Reviewed Articles &amp; Treatises
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Analytical treatises on contemporary Indian and comparative legal jurisprudence.
            </p>
          </div>

          <Link
            href="/publish"
            className="px-6 py-3 bg-slate-900 dark:bg-gold-400 text-white dark:text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-md hover:opacity-90 transition-all flex items-center space-x-1.5 shrink-0"
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Submit Manuscript</span>
          </Link>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="clay-card rounded-2xl p-5 space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search treatises, statutes (e.g. 'DPDP Act', 'BNS', 'Copyright')..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-gold-500 neumorph-inset"
            />
          </div>

          {(searchQuery || selectedCategory !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold flex items-center justify-center space-x-1 hover:text-slate-900 dark:hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Categories Chips */}
        <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-100 dark:border-white/5">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-slate-900 dark:bg-gold-400 text-white dark:text-slate-950 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200/60 dark:border-white/5'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            className="clay-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-900 text-gold-700 dark:text-gold-400 border border-slate-200 dark:border-white/10">
                  {article.category}
                </span>
                <span className="text-[11px] text-slate-400 flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{article.readTime}</span>
                </span>
              </div>

              <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug">
                {article.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                {article.abstract}
              </p>

              <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-slate-800 dark:text-slate-200">{article.author.name}</span>
                <span>{article.publishedAt}</span>
              </div>
            </div>

            <Link
              href={`/articles/${article.slug}`}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-900/80 hover:bg-gold-500 hover:text-slate-950 dark:hover:bg-gold-400 dark:hover:text-slate-950 text-slate-700 dark:text-slate-200 font-semibold text-xs uppercase tracking-wider border border-slate-200/80 dark:border-white/10 transition-all flex items-center justify-center space-x-1.5 group/btn"
            >
              <span>Read Full Treatise</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        ))}
      </div>

    </div>
  );
}
