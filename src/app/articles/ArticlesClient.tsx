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
  ArrowRight, 
  Copy, 
  Check, 
  SlidersHorizontal, 
  LayoutGrid, 
  List, 
  Sparkles, 
  ShieldCheck, 
  Award, 
  Share2,
  Calendar,
  Quote
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Article } from '@/lib/types';
import { INITIAL_ARTICLES } from '@/lib/data-store';

interface Props {
  initialArticles?: Article[];
}

export default function ArticlesClient({ initialArticles = INITIAL_ARTICLES }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'latest' | 'cited' | 'readTime'>('latest');
  const [viewMode, setViewMode] = useState<'ledger' | 'grid'>('ledger');
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  // Derive unique categories with item counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: initialArticles.length };
    initialArticles.forEach((a) => {
      if (a.category) {
        counts[a.category] = (counts[a.category] || 0) + 1;
      }
    });
    return counts;
  }, [initialArticles]);

  const categories = useMemo(() => {
    return ['All', ...Object.keys(categoryCounts).filter((c) => c !== 'All')];
  }, [categoryCounts]);

  // Curated keyword tags from existing articles
  const popularTags = useMemo(() => {
    const tagSet = new Set<string>();
    initialArticles.forEach((a) => {
      a.keywords?.forEach((k) => tagSet.add(k));
    });
    return Array.from(tagSet).slice(0, 8);
  }, [initialArticles]);

  // Filtered & Sorted Articles
  const filteredArticles = useMemo(() => {
    let result = initialArticles.filter((article) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.abstract.toLowerCase().includes(q) ||
        article.author.name.toLowerCase().includes(q) ||
        article.author.institution.toLowerCase().includes(q) ||
        article.keywords.some((k) => k.toLowerCase().includes(q));

      const matchesCat =
        selectedCategory === 'All' || article.category === selectedCategory;

      const matchesTag =
        !selectedTag ||
        article.keywords.some((k) => k.toLowerCase() === selectedTag.toLowerCase());

      return matchesSearch && matchesCat && matchesTag;
    });

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'cited') {
        return (b.citationsCount || 0) - (a.citationsCount || 0);
      }
      if (sortBy === 'readTime') {
        const getMins = (str: string) => parseInt(str) || 5;
        return getMins(a.readTime) - getMins(b.readTime);
      }
      // 'latest' default
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });

    return result;
  }, [initialArticles, searchQuery, selectedCategory, selectedTag, sortBy]);

  const isDefaultView = !searchQuery && selectedCategory === 'All' && !selectedTag;
  const dominantArticle = isDefaultView ? filteredArticles[0] : null;
  const catalogArticles = isDefaultView ? filteredArticles.slice(1) : filteredArticles;

  const copyBluebookCitation = (article: Article, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const citation =
      article.citationFormat?.bluebook ||
      `${article.author.name}, ${article.title}, 4 LEX MINDS L. REV. (2026).`;
    navigator.clipboard.writeText(citation);
    setCopiedSlug(article.slug);
    setTimeout(() => {
      setCopiedSlug((curr) => (curr === article.slug ? null : curr));
    }, 2000);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedTag(null);
    setSortBy('latest');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Editorial Header & Submission Gateway */}
      <div className="space-y-6">
        <Breadcrumbs items={[{ name: 'Publications & Articles' }]} />
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-ink-900/15 dark:border-ink-700 pb-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-royal-500 dark:text-royal-400">
              <span className="w-2 h-2 rounded-full bg-royal-500 animate-pulse" />
              <span>Lex Minds Law Review &bull; Scholarly Repository</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-ink-950 dark:text-ink-50 tracking-tight">
              Articles, Treatises &amp; Commentaries
            </h1>
            <p className="text-base text-ink-600 dark:text-ink-300 max-w-2xl leading-relaxed font-normal">
              Peer-reviewed legal manuscripts, constitutional analyses, judgment breakdowns, and student research published through the Lex Minds Editorial Board.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0 self-start md:self-auto">
            <Link
              href="/editorial-policy"
              className="px-4 py-3 btn-brand-secondary text-xs font-semibold uppercase tracking-wider flex items-center space-x-1.5"
            >
              <BookOpen className="w-4 h-4" />
              <span>Review Policy</span>
            </Link>
            <Link
              href="/publish"
              className="px-5 py-3 btn-brand-primary text-xs font-semibold uppercase tracking-wider flex items-center space-x-2"
            >
              <PenTool className="w-4 h-4" />
              <span>Submit Manuscript</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Control Strip: Search Bar + Subject Pills + View & Sort Controls */}
      <div className="p-6 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 shadow-brutal space-y-5">
        
        {/* Search Input & Reset Row */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-ink-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search treatises by title, statutory keywords (e.g. 'DPDP Act', 'BNS'), author, or institution..."
              className="w-full pl-11 pr-10 py-3 tactile-control text-ink-900 dark:text-ink-100 placeholder-ink-400 text-sm rounded-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-800 dark:hover:text-ink-200"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center space-x-2 shrink-0">
            <span className="text-xs font-mono text-ink-500 dark:text-ink-400 uppercase hidden sm:inline">
              Sort:
            </span>
            <select
              value={sortBy}
              aria-label="Sort articles by"
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3.5 py-3 text-xs font-mono tactile-control text-ink-800 dark:text-ink-200 rounded-sm cursor-pointer"
            >
              <option value="latest">Newest First</option>
              <option value="cited">Most Cited</option>
              <option value="readTime">Shortest Read</option>
            </select>

            {/* View Mode Toggle Buttons */}
            <div className="flex items-center border border-ink-900/20 dark:border-ink-700 rounded-sm overflow-hidden bg-paper dark:bg-ink-900">
              <button
                onClick={() => setViewMode('ledger')}
                className={`p-2.5 transition-colors ${
                  viewMode === 'ledger'
                    ? 'bg-royal-500 text-white font-bold'
                    : 'text-ink-600 dark:text-ink-400 hover:text-ink-900 dark:hover:text-ink-100'
                }`}
                title="Scholarly Ledger View"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-royal-500 text-white font-bold'
                    : 'text-ink-600 dark:text-ink-400 hover:text-ink-900 dark:hover:text-ink-100'
                }`}
                title="Editorial Card Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="space-y-2 pt-1 border-t border-ink-900/10 dark:border-ink-800">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-ink-500 dark:text-ink-400 mr-1 uppercase">
              Subject Area:
            </span>
            {categories.map((category) => {
              const count = categoryCounts[category] || 0;
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 py-1.5 text-xs font-mono transition-all duration-150 border rounded-sm flex items-center space-x-1.5 ${
                    isSelected
                      ? 'bg-royal-500 text-white border-ink-900 dark:border-ink-200 font-semibold shadow-brutal-sm translate-y-[-1px]'
                      : 'bg-paper dark:bg-ink-850 text-ink-700 dark:text-ink-300 border-ink-900/15 dark:border-ink-700 hover:border-ink-900 dark:hover:border-ink-500'
                  }`}
                >
                  <span>{category}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-ink-900/10 dark:bg-ink-700 text-ink-600 dark:text-ink-300'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Tag Pills */}
          {popularTags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-2">
              <span className="text-[11px] font-mono text-ink-400 mr-1">Statutory Dockets:</span>
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  className={`text-[11px] font-mono px-2.5 py-0.5 rounded-sm border transition-colors ${
                    selectedTag === tag
                      ? 'bg-coral-500 text-white border-coral font-bold shadow-brutal-sm'
                      : 'bg-paper-100 dark:bg-ink-900 text-ink-600 dark:text-ink-300 border-ink-900/10 dark:border-ink-800 hover:border-royal-400'
                  }`}
                >
                  #{tag}
                </button>
              ))}
              {(searchQuery || selectedCategory !== 'All' || selectedTag) && (
                <button
                  onClick={handleResetFilters}
                  className="text-[11px] font-mono text-royal-600 dark:text-royal-400 hover:underline ml-2 flex items-center space-x-1"
                >
                  <X className="w-3 h-3" />
                  <span>Clear All Filters</span>
                </button>
              )}
            </div>
          )}
        </div>

      </div>

      {/* Dominant Featured Treatise (Displayed on Default Unfiltered State) */}
      {dominantArticle && (
        <section className="space-y-4">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-royal-500 dark:text-royal-400 flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-royal-500 animate-pulse" />
            <span>Featured Treatise &bull; Current Editorial Lead</span>
          </div>

          <div className="p-8 sm:p-12 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 space-y-6 shadow-brutal hover:shadow-royal transition-all duration-200">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
              <div className="flex items-center space-x-2.5">
                <span className="px-3 py-1 bg-royal-50 dark:bg-royal-950/60 text-royal-600 dark:text-royal-400 font-bold uppercase tracking-wider text-[11px] border border-royal-200 dark:border-royal-800 rounded-xs">
                  {dominantArticle.category}
                </span>
                <span className="px-2 py-0.5 bg-paper dark:bg-ink-800 text-ink-600 dark:text-ink-300 text-[10px] uppercase font-bold border border-ink-900/10 dark:border-ink-700">
                  Lead Article
                </span>
              </div>

              <div className="flex items-center space-x-3 text-ink-500 dark:text-ink-400">
                <span className="flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-royal-500" />
                  <span>{dominantArticle.publishedAt}</span>
                </span>
                <span>&bull;</span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{dominantArticle.readTime}</span>
                </span>
                <span>&bull;</span>
                <span className="flex items-center space-x-1">
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  <span>{dominantArticle.citationsCount || 18} Citations</span>
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-ink-950 dark:text-ink-50 leading-[1.12] tracking-tight">
                <Link
                  href={`/articles/${dominantArticle.slug}`}
                  className="hover:text-royal-500 dark:hover:text-royal-400 transition-colors"
                >
                  {dominantArticle.title}
                </Link>
              </h2>

              <p className="text-base sm:text-lg text-ink-600 dark:text-ink-300 leading-relaxed font-normal max-w-5xl">
                {dominantArticle.abstract}
              </p>
            </div>

            {/* Keywords */}
            {dominantArticle.keywords && dominantArticle.keywords.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {dominantArticle.keywords.map((kw, i) => (
                  <span
                    key={i}
                    className="text-xs font-mono px-2.5 py-0.5 bg-paper dark:bg-ink-850 text-ink-600 dark:text-ink-300 border border-ink-900/10 dark:border-ink-700 rounded-xs"
                  >
                    #{kw}
                  </span>
                ))}
              </div>
            )}

            <div className="pt-4 border-t border-ink-900/10 dark:border-ink-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div className="flex items-center space-x-3.5">
                <div className="w-11 h-11 rounded-sm bg-royal-50 dark:bg-royal-950/60 border border-royal-200 dark:border-royal-800 flex items-center justify-center font-serif font-bold text-lg text-royal-600 dark:text-royal-400">
                  {dominantArticle.author.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="font-semibold text-sm text-ink-950 dark:text-ink-50">
                      {dominantArticle.author.name}
                    </span>
                    <ShieldCheck className="w-4 h-4 text-royal-500" />
                  </div>
                  <span className="text-xs text-ink-500 dark:text-ink-400 font-mono block">
                    {dominantArticle.author.title} &bull; {dominantArticle.author.institution}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-3 shrink-0 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={(e) => copyBluebookCitation(dominantArticle, e)}
                  title="Copy Bluebook Citation"
                  className="px-3.5 py-2.5 tactile-control text-xs font-mono text-ink-700 dark:text-ink-300 flex items-center space-x-1.5 rounded-sm border border-ink-900/20 dark:border-ink-700 hover:border-royal-500"
                >
                  {copiedSlug === dominantArticle.slug ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Citation Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-ink-400" />
                      <span>Copy Citation</span>
                    </>
                  )}
                </button>

                <Link
                  href={`/articles/${dominantArticle.slug}`}
                  className="px-5 py-2.5 btn-brand-primary text-xs font-semibold uppercase tracking-wider flex items-center space-x-2"
                >
                  <span>Read Full Treatise</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Treatises Collection */}
      <div className="space-y-6">
        
        {/* Results Metadata Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-ink-500 dark:text-ink-400 border-b border-ink-900/15 dark:border-ink-700 pb-3">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-ink-900 dark:text-ink-100">
              {filteredArticles.length} Treatises Found
            </span>
            {selectedCategory !== 'All' && (
              <span>in <strong className="text-royal-600 dark:text-royal-400">{selectedCategory}</strong></span>
            )}
            {selectedTag && (
              <span>tagged <strong className="text-coral">#{selectedTag}</strong></span>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <span>Citation Standard: Bluebook 21st / OSCOLA</span>
            <span>&bull;</span>
            <span>Open Access</span>
          </div>
        </div>

        {/* Article Cards (Ledger View vs Grid View) */}
        {catalogArticles.length > 0 ? (
          viewMode === 'ledger' ? (
            /* Scholarly Ledger (Horizontal List Rows) */
            <div className="divide-y divide-ink-900/10 dark:divide-ink-800 border border-ink-900 dark:border-ink-700 rounded-sm bg-surface-light dark:bg-surface-dark shadow-brutal">
              {catalogArticles.map((article) => (
                <article
                  key={article.id}
                  className="p-6 sm:p-8 space-y-4 hover:bg-paper-100/50 dark:hover:bg-ink-850/40 transition-colors group relative"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                    <div className="flex items-center space-x-2.5">
                      <span className="px-2.5 py-0.5 bg-royal-50 dark:bg-royal-950/40 text-royal-600 dark:text-royal-400 text-[10px] font-bold uppercase tracking-wider border border-royal-200 dark:border-royal-800 rounded-xs">
                        {article.category}
                      </span>
                      <span className="text-ink-400">&bull;</span>
                      <span className="text-ink-500 dark:text-ink-400 flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-royal-500" />
                        <span>{article.publishedAt}</span>
                      </span>
                    </div>

                    <div className="flex items-center space-x-3 text-ink-500 dark:text-ink-400 text-[11px]">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{article.readTime}</span>
                      </span>
                      <span>&bull;</span>
                      <span className="flex items-center space-x-1">
                        <Award className="w-3.5 h-3.5 text-amber-500" />
                        <span>{article.citationsCount || 10} Citations</span>
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-ink-950 dark:text-ink-50 group-hover:text-royal-500 dark:group-hover:text-royal-400 transition-colors leading-snug">
                      <Link href={`/articles/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h3>

                    <p className="text-sm text-ink-600 dark:text-ink-300 leading-relaxed max-w-4xl line-clamp-3 font-normal">
                      {article.abstract}
                    </p>
                  </div>

                  {article.keywords && article.keywords.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {article.keywords.map((kw, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedTag(kw)}
                          className="text-[11px] font-mono px-2 py-0.5 bg-paper dark:bg-ink-850 text-ink-600 dark:text-ink-300 hover:text-royal-500 border border-ink-900/10 dark:border-ink-800 rounded-xs"
                        >
                          #{kw}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs border-t border-ink-900/10 dark:border-ink-800">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-7 h-7 rounded-xs bg-royal-50 dark:bg-royal-950/60 border border-royal-200 dark:border-royal-800 flex items-center justify-center font-serif font-bold text-xs text-royal-600 dark:text-royal-400">
                        {article.author.name.charAt(0)}
                      </div>
                      <div>
                        <span className="font-semibold text-ink-950 dark:text-ink-50">{article.author.name}</span>
                        <span className="text-ink-500 dark:text-ink-400 font-mono text-[11px] block sm:inline sm:ml-2">
                          ({article.author.institution})
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 shrink-0 self-start sm:self-auto">
                      <button
                        type="button"
                        onClick={(e) => copyBluebookCitation(article, e)}
                        className="text-xs font-mono text-ink-600 dark:text-ink-400 hover:text-royal-600 flex items-center space-x-1"
                        title="Copy Bluebook Citation"
                      >
                        {copiedSlug === article.slug ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Cite</span>
                          </>
                        )}
                      </button>

                      <Link
                        href={`/articles/${article.slug}`}
                        className="inline-flex items-center space-x-1 text-xs font-semibold uppercase tracking-wider text-royal-600 dark:text-royal-400 hover:underline"
                      >
                        <span>Read Treatise</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            /* Editorial Grid View (2 Columns) */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {catalogArticles.map((article) => (
                <article
                  key={article.id}
                  className="p-6 sm:p-7 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 shadow-brutal flex flex-col justify-between space-y-4 hover:shadow-royal transition-all duration-150 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="px-2.5 py-0.5 bg-royal-50 dark:bg-royal-950/40 text-royal-600 dark:text-royal-400 text-[10px] font-bold uppercase tracking-wider border border-royal-200 dark:border-royal-800 rounded-xs">
                        {article.category}
                      </span>
                      <span className="text-ink-500 dark:text-ink-400 flex items-center space-x-1 text-[11px]">
                        <Clock className="w-3 h-3" />
                        <span>{article.readTime}</span>
                      </span>
                    </div>

                    <h3 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50 group-hover:text-royal-500 dark:group-hover:text-royal-400 transition-colors leading-snug">
                      <Link href={`/articles/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h3>

                    <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-300 line-clamp-3 leading-relaxed font-normal">
                      {article.abstract}
                    </p>

                    {article.keywords && article.keywords.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {article.keywords.slice(0, 3).map((kw, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-mono px-2 py-0.5 bg-paper dark:bg-ink-850 text-ink-500 dark:text-ink-400 border border-ink-900/10 dark:border-ink-800 rounded-xs"
                          >
                            #{kw}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-ink-900/10 dark:border-ink-800 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-semibold text-ink-950 dark:text-ink-50 block truncate max-w-[160px]">
                        {article.author.name}
                      </span>
                      <span className="text-[11px] font-mono text-ink-500 dark:text-ink-400 block truncate max-w-[160px]">
                        {article.author.institution}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={(e) => copyBluebookCitation(article, e)}
                        className="p-1.5 tactile-control text-ink-500 hover:text-royal-600 rounded-xs border border-ink-900/15"
                        title="Copy Bluebook Citation"
                      >
                        {copiedSlug === article.slug ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>

                      <Link
                        href={`/articles/${article.slug}`}
                        className="px-3 py-1.5 btn-brand-primary text-xs font-semibold uppercase tracking-wider flex items-center space-x-1"
                      >
                        <span>Read</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )
        ) : (
          /* Empty Search / Filter State */
          <div className="p-12 sm:p-16 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 text-center space-y-4 shadow-brutal">
            <BookOpen className="w-10 h-10 text-royal-500 mx-auto opacity-70" />
            <div className="space-y-1">
              <h3 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50">
                No matching treatises found
              </h3>
              <p className="text-sm text-ink-600 dark:text-ink-400 max-w-md mx-auto font-normal">
                No manuscripts match &ldquo;{searchQuery || selectedCategory}&rdquo;. Try adjusting keywords or explore popular legal subjects.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap justify-center gap-2">
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 btn-brand-primary text-xs font-semibold uppercase tracking-wider"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Editorial Repository Credentials & Call for Papers */}
      <div className="p-8 sm:p-10 rounded-sm bg-paper-100 dark:bg-ink-900 border border-ink-900 dark:border-ink-700 shadow-brutal space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-8 space-y-2">
            <div className="flex items-center space-x-2 text-royal-600 dark:text-royal-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>Call For Manuscripts &bull; Lex Minds Law Review</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-ink-950 dark:text-ink-50 tracking-tight">
              Publish Your Legal Scholarship With Us
            </h3>
            <p className="text-sm text-ink-600 dark:text-ink-300 max-w-2xl leading-relaxed font-normal">
              Lex Minds welcomes scholarly papers, case comments, and legislative analyses from law students and researchers. Submissions undergo double-blind peer review with expedited 7–14 day decisions.
            </p>
          </div>

          <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3 justify-center">
            <Link
              href="/publish"
              className="py-3 px-5 btn-brand-primary text-xs font-semibold uppercase tracking-wider text-center flex items-center justify-center space-x-2"
            >
              <PenTool className="w-4 h-4" />
              <span>Submit Manuscript Now</span>
            </Link>
            <Link
              href="/editorial-policy"
              className="py-2.5 px-4 btn-brand-secondary text-xs font-semibold uppercase tracking-wider text-center"
            >
              <span>View Editorial Guidelines</span>
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}
