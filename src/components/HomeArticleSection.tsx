'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Clock, 
  ArrowRight, 
  ChevronRight, 
  Copy, 
  Check, 
  BookOpen, 
  Sparkles, 
  PenTool, 
  Quote, 
  ShieldCheck, 
  Award, 
  FileText 
} from 'lucide-react';
import { Article } from '@/lib/types';

interface Props {
  articles: Article[];
}

export default function HomeArticleSection({ articles }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  // Available categories based on actual articles + core defaults
  const categories = useMemo(() => {
    const set = new Set<string>();
    set.add('All');
    articles.forEach((a) => {
      if (a.category) set.add(a.category);
    });
    return Array.from(set);
  }, [articles]);

  const filtered = useMemo(() => {
    if (selectedCategory === 'All') return articles;
    return articles.filter((a) => a.category === selectedCategory);
  }, [articles, selectedCategory]);

  const leadArticle = filtered[0] || articles[0];
  const sideArticles = useMemo(() => {
    const rest = filtered.slice(1);
    if (rest.length >= 3) return rest.slice(0, 3);
    // Fill up to 3 from general articles if current category has fewer
    const remaining = articles.filter(
      (a) => a.id !== leadArticle?.id && !rest.some((r) => r.id === a.id)
    );
    return [...rest, ...remaining].slice(0, 3);
  }, [filtered, articles, leadArticle]);

  const copyBluebook = (article: Article, e: React.MouseEvent) => {
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

  if (!articles || articles.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Editorial Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-ink-900/15 dark:border-ink-700 pb-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-royal-500 dark:text-royal-400">
            <span className="w-2 h-2 rounded-full bg-royal-500 animate-pulse" />
            <span>Lex Minds Law Review &bull; Scholarly Treatises</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-ink-950 dark:text-ink-50 tracking-tight">
            Selected Legal Articles &amp; Commentaries
          </h2>
          <p className="text-sm text-ink-600 dark:text-ink-300 max-w-2xl font-normal leading-relaxed">
            Peer-reviewed legal research, statutory analyses, and student treatises covering emerging jurisprudence, tech policy, and corporate regulation.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0 self-start md:self-auto">
          <Link
            href="/publish"
            className="px-4 py-2.5 btn-brand-secondary text-xs font-semibold uppercase tracking-wider flex items-center space-x-1.5"
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Submit Paper</span>
          </Link>
          <Link
            href="/articles"
            className="px-4 py-2.5 btn-brand-primary text-xs font-semibold uppercase tracking-wider flex items-center space-x-1.5"
          >
            <span>All Treatises ({articles.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Category Pills Strip */}
      <div className="flex flex-wrap items-center gap-2 pt-1 pb-1">
        <span className="text-xs font-mono text-ink-500 dark:text-ink-400 mr-2 uppercase tracking-wide">
          Filter By Domain:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 text-xs font-mono transition-all duration-150 border rounded-sm ${
              selectedCategory === cat
                ? 'bg-royal-500 text-white border-ink-900 dark:border-ink-200 font-semibold shadow-brutal-sm translate-y-[-1px]'
                : 'bg-paper dark:bg-ink-850 text-ink-700 dark:text-ink-300 border-ink-900/15 dark:border-ink-700 hover:border-ink-900 dark:hover:border-ink-500'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Grid: Dominant Lead Article (7 Cols) + Curated Submissions (5 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Dominant Lead Treatise Card */}
        {leadArticle && (
          <div className="lg:col-span-7 p-7 sm:p-10 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 space-y-6 shadow-brutal hover:shadow-royal transition-all duration-200 relative group">
            
            {/* Top Badge Strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-royal-50 dark:bg-royal-950/60 text-royal-600 dark:text-royal-400 font-bold uppercase tracking-wider text-[11px] border border-royal-200 dark:border-royal-800 rounded-xs">
                  {leadArticle.category}
                </span>
                <span className="px-2 py-0.5 bg-paper dark:bg-ink-800 text-ink-600 dark:text-ink-300 text-[10px] uppercase font-bold border border-ink-900/10 dark:border-ink-700">
                  Lead Treatise
                </span>
              </div>

              <div className="flex items-center space-x-3 text-ink-500 dark:text-ink-400 text-xs">
                <span className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-royal-500" />
                  <span>{leadArticle.readTime}</span>
                </span>
                <span>&bull;</span>
                <span className="flex items-center space-x-1">
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  <span>{leadArticle.citationsCount || 12} Citations</span>
                </span>
              </div>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-ink-950 dark:text-ink-50 leading-[1.18] tracking-tight">
                <Link
                  href={`/articles/${leadArticle.slug}`}
                  className="hover:text-royal-500 dark:hover:text-royal-400 transition-colors"
                >
                  {leadArticle.title}
                </Link>
              </h3>

              {/* Jurisprudential Abstract Quote */}
              <div className="p-4 bg-paper-100 dark:bg-ink-900 border-l-2 border-l-royal-500 border-ink-900/10 dark:border-ink-800 text-sm text-ink-700 dark:text-ink-300 leading-relaxed font-normal italic relative">
                <Quote className="w-3.5 h-3.5 text-royal-500 inline-block mr-1 opacity-70" />
                <span>{leadArticle.abstract}</span>
              </div>
            </div>

            {/* Keywords */}
            {leadArticle.keywords && leadArticle.keywords.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {leadArticle.keywords.slice(0, 4).map((kw, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-mono px-2 py-0.5 bg-paper dark:bg-ink-800 text-ink-600 dark:text-ink-300 border border-ink-900/10 dark:border-ink-700 rounded-xs"
                  >
                    #{kw}
                  </span>
                ))}
              </div>
            )}

            {/* Author Footer & CTAs */}
            <div className="pt-4 border-t border-ink-900/10 dark:border-ink-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-sm bg-royal-50 dark:bg-royal-950/60 border border-royal-200 dark:border-royal-800 flex items-center justify-center font-serif font-bold text-royal-600 dark:text-royal-400 shrink-0">
                  {leadArticle.author.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="font-semibold text-sm text-ink-950 dark:text-ink-50">
                      {leadArticle.author.name}
                    </span>
                    <ShieldCheck className="w-3.5 h-3.5 text-royal-500" />
                  </div>
                  <span className="text-xs text-ink-500 dark:text-ink-400 font-mono block">
                    {leadArticle.author.institution}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={(e) => copyBluebook(leadArticle, e)}
                  title="Copy Bluebook Citation"
                  className="px-3 py-2 tactile-control text-xs font-mono text-ink-700 dark:text-ink-300 flex items-center space-x-1 rounded-sm border border-ink-900/20 dark:border-ink-700 hover:border-royal-500"
                >
                  {copiedSlug === leadArticle.slug ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-ink-400" />
                      <span>Cite</span>
                    </>
                  )}
                </button>

                <Link
                  href={`/articles/${leadArticle.slug}`}
                  className="px-4 py-2 btn-brand-primary text-xs font-semibold uppercase tracking-wider flex items-center space-x-1"
                >
                  <span>Read Treatise</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        )}

        {/* Curated Submissions Ledger & Call for Papers (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="p-6 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 space-y-4 shadow-brutal">
            <div className="flex items-center justify-between pb-3 border-b border-ink-900/10 dark:border-ink-800">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-royal-600 dark:text-royal-400 flex items-center space-x-2">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Recent Peer-Reviewed Treatises</span>
              </h4>
              <span className="text-[11px] font-mono text-ink-400">
                {sideArticles.length} Entries
              </span>
            </div>

            <div className="divide-y divide-ink-900/10 dark:divide-ink-800">
              {sideArticles.map((article) => (
                <article key={article.id} className="py-4 space-y-2 group first:pt-1 last:pb-1">
                  <div className="flex items-center justify-between text-[11px] font-mono text-ink-400">
                    <span className="text-royal-600 dark:text-royal-400 font-semibold uppercase tracking-wider text-[10px] px-2 py-0.5 bg-royal-50 dark:bg-royal-950/40 border border-royal-200/50 dark:border-royal-800/50 rounded-xs">
                      {article.category}
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-ink-400" />
                      <span>{article.readTime}</span>
                    </span>
                  </div>

                  <h5 className="font-serif text-base sm:text-lg font-bold text-ink-950 dark:text-ink-50 group-hover:text-royal-500 dark:group-hover:text-royal-400 transition-colors leading-snug">
                    <Link href={`/articles/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h5>

                  <p className="text-xs text-ink-600 dark:text-ink-300 line-clamp-2 leading-relaxed font-normal">
                    {article.abstract}
                  </p>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="font-mono text-[11px] text-ink-500 dark:text-ink-400 truncate max-w-[200px]">
                      By {article.author.name}
                    </span>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={(e) => copyBluebook(article, e)}
                        className="text-[10px] font-mono text-ink-400 hover:text-royal-500 flex items-center space-x-0.5"
                        title="Copy Citation"
                      >
                        {copiedSlug === article.slug ? (
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold">Copied!</span>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Cite</span>
                          </>
                        )}
                      </button>
                      <Link
                        href={`/articles/${article.slug}`}
                        className="text-xs font-semibold text-royal-600 dark:text-royal-400 hover:underline flex items-center"
                      >
                        <span>Read</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="pt-2 border-t border-ink-900/10 dark:border-ink-800">
              <Link
                href="/articles"
                className="w-full py-2.5 text-center block btn-brand-secondary text-xs font-semibold uppercase tracking-wider hover:border-royal-500"
              >
                Explore Complete Law Review Archive &rarr;
              </Link>
            </div>
          </div>

          {/* Call for Manuscripts Banner */}
          <div className="p-6 rounded-sm bg-paper-100 dark:bg-ink-900 border border-ink-900 dark:border-ink-700 space-y-3 shadow-brutal-sm relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 bg-royal-500 text-white font-mono text-[10px] font-bold uppercase tracking-wider rounded-xs">
                Open Call for Papers
              </span>
              <span className="text-[11px] font-mono text-royal-600 dark:text-royal-400 font-semibold">
                Double-Blind Review
              </span>
            </div>

            <h4 className="text-base font-serif font-bold text-ink-950 dark:text-ink-50">
              Publish Your Legal Research with Lex Minds
            </h4>
            <p className="text-xs text-ink-600 dark:text-ink-300 leading-relaxed font-normal">
              We invite law students, judicial clerks, and legal scholars to submit commentaries on emerging statutes, landmark judgments, and regulatory policy.
            </p>

            <div className="pt-1 flex items-center justify-between">
              <div className="text-[11px] font-mono text-ink-500 dark:text-ink-400">
                <span>Fast Decision: <strong>7-14 Days</strong></span>
              </div>
              <Link
                href="/publish"
                className="px-4 py-2 btn-brand-primary text-xs font-semibold uppercase tracking-wider flex items-center space-x-1"
              >
                <span>Submit Paper</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

      </div>

      {/* Editorial Standards Trust Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
        <div className="p-4 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900/15 dark:border-ink-700 space-y-1">
          <div className="flex items-center space-x-2 text-royal-600 dark:text-royal-400">
            <ShieldCheck className="w-4 h-4" />
            <h5 className="font-serif font-bold text-xs text-ink-950 dark:text-ink-50">Peer-Reviewed</h5>
          </div>
          <p className="text-[11px] text-ink-500 dark:text-ink-400 leading-tight">
            Double-blind review by student editorial board &amp; advocate mentors.
          </p>
        </div>

        <div className="p-4 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900/15 dark:border-ink-700 space-y-1">
          <div className="flex items-center space-x-2 text-royal-600 dark:text-royal-400">
            <FileText className="w-4 h-4" />
            <h5 className="font-serif font-bold text-xs text-ink-950 dark:text-ink-50">Standard Citation</h5>
          </div>
          <p className="text-[11px] text-ink-500 dark:text-ink-400 leading-tight">
            Compliant with Bluebook 21st, OSCOLA 4th &amp; Indian standard formats.
          </p>
        </div>

        <div className="p-4 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900/15 dark:border-ink-700 space-y-1">
          <div className="flex items-center space-x-2 text-royal-600 dark:text-royal-400">
            <Award className="w-4 h-4" />
            <h5 className="font-serif font-bold text-xs text-ink-950 dark:text-ink-50">Indexed Digital Repository</h5>
          </div>
          <p className="text-[11px] text-ink-500 dark:text-ink-400 leading-tight">
            Permanent canonical URLs and Google Scholar compatible metadata.
          </p>
        </div>

        <div className="p-4 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900/15 dark:border-ink-700 space-y-1">
          <div className="flex items-center space-x-2 text-royal-600 dark:text-royal-400">
            <Sparkles className="w-4 h-4" />
            <h5 className="font-serif font-bold text-xs text-ink-950 dark:text-ink-50">Open Access</h5>
          </div>
          <p className="text-[11px] text-ink-500 dark:text-ink-400 leading-tight">
            Democratizing legal scholarship freely for law students across India.
          </p>
        </div>
      </div>

    </section>
  );
}
