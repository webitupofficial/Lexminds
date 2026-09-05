'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Search, 
  Clock, 
  ChevronRight, 
  PenTool,
  X,
  ArrowRight
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

  const isDefaultView = !searchQuery && selectedCategory === 'All';
  const dominantArticle = isDefaultView ? filteredArticles[0] : null;
  const ledgerArticles = isDefaultView ? filteredArticles.slice(1) : filteredArticles;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Breadcrumbs & Editorial Header */}
      <div className="space-y-6">
        <Breadcrumbs items={[{ name: 'Publications & Articles' }]} />
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-ink-900/15 dark:border-ink-700 pb-8">
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-royal-500 dark:text-royal-400">
              Student Publications &bull; Legal Writing
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-ink-950 dark:text-ink-50 tracking-tight">
              Articles, Commentaries &amp; Research
            </h1>
            <p className="text-base text-ink-600 dark:text-ink-300 max-w-2xl leading-relaxed font-normal">
              Legal articles, case commentaries, judgment analyses, and student research published through Lex Minds.
            </p>
          </div>

          <Link
            href="/publish"
            className="px-5 py-3.5 btn-brand-primary text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 shrink-0 self-start md:self-auto"
          >
            <PenTool className="w-4 h-4" />
            <span>Submit Manuscript</span>
          </Link>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="p-6 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 shadow-brutal-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-ink-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search treatises, statutory dockets (e.g. 'DPDP Act', 'BNS', 'Copyright')..."
              className="w-full pl-11 pr-4 py-3 tactile-control text-ink-900 dark:text-ink-100 placeholder-ink-400 text-sm rounded-sm"
            />
          </div>

          {(searchQuery || selectedCategory !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-3 tactile-control text-ink-700 dark:text-ink-300 text-xs font-mono flex items-center justify-center space-x-1 hover:text-royal-500 rounded-sm"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}

        </div>

        {/* Category Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs font-mono text-ink-500 dark:text-ink-400 mr-2 uppercase">Subject:</span>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3.5 py-1.5 text-xs font-mono transition-colors border rounded-sm ${
                selectedCategory === category
                  ? 'bg-royal-500 text-white border-ink-900 dark:border-ink-200 font-semibold shadow-brutal-sm'
                  : 'bg-paper dark:bg-ink-800 text-ink-700 dark:text-ink-300 border-ink-900/15 dark:border-ink-700 hover:border-ink-900'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Dominant Featured Article */}
      {dominantArticle && (
        <section className="space-y-4">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-royal-500 dark:text-royal-400 flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-royal-500"></span>
            <span>Featured Treatise &bull; Current Editorial Lead</span>
          </div>

          <div className="p-8 sm:p-12 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 space-y-5 shadow-brutal">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
              <span className="px-3 py-1 bg-royal-50 dark:bg-royal-950/40 text-royal-600 dark:text-royal-400 font-bold uppercase tracking-wider text-[11px] border border-royal-200 dark:border-royal-800">
                {dominantArticle.category}
              </span>
              <span className="text-ink-500 dark:text-ink-400 flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{dominantArticle.readTime}</span>
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-ink-950 dark:text-ink-50 leading-snug tracking-tight">
              <Link href={`/articles/${dominantArticle.slug}`} className="hover:text-royal-500 dark:hover:text-royal-400 transition-colors">
                {dominantArticle.title}
              </Link>
            </h2>

            <p className="text-base text-ink-600 dark:text-ink-300 leading-relaxed font-normal">
              {dominantArticle.abstract}
            </p>

            <div className="pt-4 border-t border-ink-900/10 dark:border-ink-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div>
                <span className="font-semibold text-sm text-ink-950 dark:text-ink-50 block">{dominantArticle.author.name}</span>
                <span className="text-xs text-ink-500 dark:text-ink-400 font-mono block">{dominantArticle.author.institution}</span>
              </div>
              <Link
                href={`/articles/${dominantArticle.slug}`}
                className="px-5 py-3 btn-brand-primary text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 self-start sm:self-auto"
              >
                <span>Read Full Treatise</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Publications Ledger */}
      <div className="space-y-6">
        <div className="flex items-center justify-between text-xs font-mono text-ink-500 dark:text-ink-400 border-b border-ink-900/15 dark:border-ink-700 pb-2">
          <span>{filteredArticles.length} Treatises In Archive</span>
          <span>Citation Reference: OSCOLA / Bluebook 21st</span>
        </div>

        {ledgerArticles.length > 0 ? (
          <div className="divide-y divide-ink-900/10 dark:divide-ink-800 border border-ink-900 dark:border-ink-700 rounded-sm bg-surface-light dark:bg-surface-dark shadow-brutal">
            {ledgerArticles.map((article) => (
              <article
                key={article.id}
                className="p-6 sm:p-8 space-y-3 hover:bg-paper-100/50 dark:hover:bg-ink-850/40 transition-colors group"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 bg-royal-50 dark:bg-royal-950/40 text-royal-600 dark:text-royal-400 text-[10px] font-bold uppercase tracking-wider border border-royal-200 dark:border-royal-800">
                      {article.category}
                    </span>
                    <span className="text-ink-400">&bull;</span>
                    <span className="text-ink-500 dark:text-ink-400">{article.publishedAt}</span>
                  </div>

                  <span className="text-ink-500 dark:text-ink-400 flex items-center space-x-1 text-[11px]">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime}</span>
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif font-bold text-ink-950 dark:text-ink-50 group-hover:text-royal-500 dark:group-hover:text-royal-400 transition-colors leading-snug">
                  <Link href={`/articles/${article.slug}`}>
                    {article.title}
                  </Link>
                </h3>

                <p className="text-sm text-ink-600 dark:text-ink-300 leading-relaxed max-w-4xl line-clamp-3 font-normal">
                  {article.abstract}
                </p>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-semibold text-ink-950 dark:text-ink-50">{article.author.name}</span>
                    <span className="text-ink-500 dark:text-ink-400 font-mono text-[11px] block sm:inline sm:ml-2">
                      ({article.author.institution})
                    </span>
                  </div>

                  <Link
                    href={`/articles/${article.slug}`}
                    className="inline-flex items-center space-x-1 text-xs font-semibold uppercase tracking-wider text-royal-600 dark:text-royal-400 hover:underline shrink-0"
                  >
                    <span>Read Treatise</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="p-16 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 text-center space-y-3 shadow-brutal">
            <BookOpen className="w-8 h-8 text-ink-400 mx-auto" />
            <h3 className="text-lg font-serif font-bold text-ink-950 dark:text-ink-50">
              No matching treatises found
            </h3>
            <p className="text-sm text-ink-600 dark:text-ink-400 max-w-sm mx-auto font-normal">
              No manuscripts match your query. Try adjusting your search criteria or reset subject filters.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
