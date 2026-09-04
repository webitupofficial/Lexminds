'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Search, 
  Clock, 
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Breadcrumbs & Editorial Header */}
      <div className="space-y-4">
        <Breadcrumbs items={[{ name: 'Legal Treatises' }]} />
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-ink-300 dark:border-ink-700 pb-6">
          <div className="space-y-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-oxblood-700 dark:text-oxblood-400">
              LexMinds Law Review &bull; Volume II
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-ink-950 dark:text-white">
              Legal Treatises &amp; Jurisprudential Inquiries
            </h1>
            <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-300 max-w-2xl leading-relaxed">
              Analytical scholarship and case commentaries on contemporary Indian statutory jurisprudence, comparative law, and regulatory compliance.
            </p>
          </div>

          <Link
            href="/publish"
            className="px-5 py-2.5 bg-oxblood-700 hover:bg-oxblood-800 dark:bg-oxblood-600 dark:hover:bg-oxblood-500 text-white font-serif text-xs font-semibold uppercase tracking-wider rounded-sm shadow-sm transition-all flex items-center space-x-2 shrink-0 self-start md:self-auto"
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Submit Manuscript</span>
          </Link>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="editorial-card rounded-sm p-4 sm:p-5 bg-white dark:bg-ink-850 border border-ink-200 dark:border-ink-800 space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-ink-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search treatises, statutes (e.g. 'DPDP Act', 'BNS', 'Copyright')..."
              className="w-full pl-10 pr-4 py-2.5 rounded-sm bg-ivory-50 dark:bg-ink-900 border border-ink-200 dark:border-ink-700 text-ink-950 dark:text-white placeholder-ink-400 text-xs sm:text-sm focus:outline-none focus:border-oxblood-700"
            />
          </div>

          {(searchQuery || selectedCategory !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 rounded-sm bg-ivory-100 dark:bg-ink-800 text-ink-700 dark:text-ink-300 text-xs font-mono flex items-center justify-center space-x-1 hover:text-oxblood-700 dark:hover:text-oxblood-400 border border-ink-200 dark:border-ink-700"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}

        </div>

        {/* Category Hairline Tags */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] font-mono text-ink-400 mr-2 uppercase">Category:</span>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded-sm text-xs font-mono transition-colors border ${
                selectedCategory === category
                  ? 'bg-oxblood-700 text-white border-oxblood-700 dark:bg-oxblood-600 dark:border-oxblood-600'
                  : 'bg-ivory-50 dark:bg-ink-900 text-ink-600 dark:text-ink-400 border-ink-200 dark:border-ink-700 hover:border-ink-400'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Publications Ledger */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-ink-500 border-b border-ink-200 dark:border-ink-800 pb-2">
          <span>{filteredArticles.length} Treatises Indexed</span>
          <span>Citation Reference: OSCOLA / Bluebook 21st</span>
        </div>

        {filteredArticles.length > 0 ? (
          <div className="divide-y divide-ink-200 dark:divide-ink-800 border-t border-b border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-850">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="p-6 sm:p-8 space-y-3 hover:bg-ivory-50/60 dark:hover:bg-ink-900/30 transition-colors group"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded-sm bg-ivory-200 dark:bg-ink-800 text-oxblood-700 dark:text-oxblood-400 text-[10px] font-semibold uppercase tracking-wider">
                      {article.category}
                    </span>
                    <span className="text-ink-400">&bull;</span>
                    <span className="text-ink-500 dark:text-ink-400">{article.publishedAt}</span>
                  </div>

                  <span className="text-ink-400 flex items-center space-x-1 text-[11px]">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime}</span>
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-serif font-bold text-ink-950 dark:text-white group-hover:text-oxblood-700 dark:group-hover:text-oxblood-400 transition-colors leading-snug">
                  <Link href={`/articles/${article.slug}`}>
                    {article.title}
                  </Link>
                </h2>

                <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-300 leading-relaxed max-w-4xl line-clamp-3">
                  {article.abstract}
                </p>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-semibold text-ink-900 dark:text-white">{article.author.name}</span>
                    <span className="text-ink-500 dark:text-ink-400 font-mono text-[11px] block sm:inline sm:ml-2">
                      ({article.author.institution})
                    </span>
                  </div>

                  <Link
                    href={`/articles/${article.slug}`}
                    className="inline-flex items-center space-x-1 text-xs font-serif font-bold uppercase tracking-wider text-oxblood-700 dark:text-oxblood-400 hover:underline shrink-0"
                  >
                    <span>Read Full Treatise</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="editorial-card rounded-sm p-12 text-center space-y-3 bg-white dark:bg-ink-850">
            <BookOpen className="w-8 h-8 text-ink-400 mx-auto" />
            <h3 className="text-base font-serif font-bold text-ink-950 dark:text-white">
              No matching treatises found
            </h3>
            <p className="text-xs text-ink-500 max-w-sm mx-auto">
              Try adjusting your search terms or select another legal category from the filter list.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
