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
  ArrowUpRight
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

  // If no search filter is active, highlight the first article as dominant
  const isDefaultView = !searchQuery && selectedCategory === 'All';
  const dominantArticle = isDefaultView ? filteredArticles[0] : null;
  const ledgerArticles = isDefaultView ? filteredArticles.slice(1) : filteredArticles;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Breadcrumbs & Editorial Header */}
      <div className="space-y-4">
        <Breadcrumbs items={[{ name: 'Treatises & Index' }]} />
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-ink-900/15 dark:border-ink-700 pb-6">
          <div className="space-y-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-vermilion">
              LexMinds Law Journal &bull; Index of Volumes
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-ink-900 dark:text-ink-100">
              Legal Treatises &amp; Jurisprudential Inquiries
            </h1>
            <p className="text-xs sm:text-sm text-ink-700 dark:text-ink-300 max-w-2xl leading-relaxed">
              Analytical scholarship and statutory commentaries on Indian legal reforms, comparative constitutionalism, and algorithmic regulation.
            </p>
          </div>

          <Link
            href="/publish"
            className="px-4 py-2.5 btn-neo-primary text-xs uppercase tracking-wider flex items-center space-x-2 shrink-0 self-start md:self-auto"
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Submit Manuscript</span>
          </Link>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="neo-card p-4 sm:p-5 bg-paper-50 dark:bg-ink-900 space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-ink-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search treatises, statutory dockets (e.g. 'DPDP Act', 'BNS', 'Copyright')..."
              className="w-full pl-10 pr-4 py-2.5 tactile-control text-ink-900 dark:text-ink-100 placeholder-ink-400 text-xs sm:text-sm rounded-none"
            />
          </div>

          {(searchQuery || selectedCategory !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 tactile-control text-ink-700 dark:text-ink-300 text-xs font-mono flex items-center justify-center space-x-1 hover:text-vermilion"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}

        </div>

        {/* Category Hairline Tags */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] font-mono text-ink-500 dark:text-ink-400 mr-2 uppercase">Subject:</span>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 text-xs font-mono transition-colors border ${
                selectedCategory === category
                  ? 'bg-vermilion text-white border-ink-900 font-semibold shadow-brutal-sm'
                  : 'bg-paper-100 dark:bg-ink-800 text-ink-700 dark:text-ink-300 border-ink-900/20 dark:border-ink-700 hover:border-ink-900'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Dominant Featured Article (Shown in default view) */}
      {dominantArticle && (
        <section className="space-y-3">
          <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-vermilion flex items-center space-x-1.5">
            <span className="w-2 h-2 bg-vermilion"></span>
            <span>Dominant Treatise &bull; Current Editorial Lead</span>
          </div>

          <div className="neo-card p-6 sm:p-8 space-y-4 bg-white dark:bg-ink-900">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
              <span className="px-2 py-0.5 bg-paper-200 dark:bg-ink-800 text-vermilion font-semibold uppercase tracking-wider text-[10px] border border-ink-900/15 dark:border-ink-700">
                Lead Inquiry &bull; {dominantArticle.category}
              </span>
              <span className="text-ink-500 dark:text-ink-400 flex items-center space-x-1 text-[11px]">
                <Clock className="w-3 h-3" />
                <span>{dominantArticle.readTime}</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink-900 dark:text-ink-100 leading-snug">
              <Link href={`/articles/${dominantArticle.slug}`} className="hover:text-vermilion transition-colors">
                {dominantArticle.title}
              </Link>
            </h2>

            <p className="text-xs sm:text-sm text-ink-700 dark:text-ink-300 leading-relaxed line-clamp-4">
              {dominantArticle.abstract}
            </p>

            <div className="pt-3 border-t border-ink-900/10 dark:border-ink-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="font-semibold text-ink-900 dark:text-ink-100 block">{dominantArticle.author.name}</span>
                <span className="text-[11px] text-ink-500 dark:text-ink-400 font-mono block">{dominantArticle.author.institution}</span>
              </div>
              <Link
                href={`/articles/${dominantArticle.slug}`}
                className="px-4 py-2 btn-neo-primary text-xs uppercase tracking-wider flex items-center space-x-1 self-start sm:self-auto"
              >
                <span>Read Full Treatise</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Publications Ledger */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-ink-500 dark:text-ink-400 border-b border-ink-900/15 dark:border-ink-700 pb-2">
          <span>{filteredArticles.length} Treatises In Docket</span>
          <span>Citation Reference: OSCOLA / Bluebook 21st</span>
        </div>

        {ledgerArticles.length > 0 ? (
          <div className="divide-y divide-ink-900/10 dark:divide-ink-800 border-t border-b border-ink-900/15 dark:border-ink-700 bg-white dark:bg-ink-900">
            {ledgerArticles.map((article) => (
              <article
                key={article.id}
                className="p-6 sm:p-7 space-y-2.5 hover:bg-paper-100/60 dark:hover:bg-ink-850/40 transition-colors group"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 bg-paper-200 dark:bg-ink-800 text-vermilion text-[10px] font-semibold uppercase tracking-wider border border-ink-900/10 dark:border-ink-700">
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

                <h3 className="text-lg sm:text-xl font-serif font-bold text-ink-900 dark:text-ink-100 group-hover:text-vermilion transition-colors leading-snug">
                  <Link href={`/articles/${article.slug}`}>
                    {article.title}
                  </Link>
                </h3>

                <p className="text-xs sm:text-sm text-ink-700 dark:text-ink-300 leading-relaxed max-w-4xl line-clamp-3">
                  {article.abstract}
                </p>

                <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div>
                    <span className="font-semibold text-ink-900 dark:text-ink-100">{article.author.name}</span>
                    <span className="text-ink-500 dark:text-ink-400 font-mono text-[11px] block sm:inline sm:ml-2">
                      ({article.author.institution})
                    </span>
                  </div>

                  <Link
                    href={`/articles/${article.slug}`}
                    className="inline-flex items-center space-x-1 text-xs font-semibold uppercase tracking-wider text-vermilion hover:underline shrink-0"
                  >
                    <span>Read Treatise</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="neo-card p-12 text-center space-y-3 bg-white dark:bg-ink-900">
            <BookOpen className="w-8 h-8 text-ink-400 mx-auto" />
            <h3 className="text-base font-serif font-bold text-ink-900 dark:text-ink-100">
              No matching treatises found
            </h3>
            <p className="text-xs text-ink-600 dark:text-ink-400 max-w-sm mx-auto font-normal">
              No manuscripts match your query. Try adjusting your search criteria or reset subject filters.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
