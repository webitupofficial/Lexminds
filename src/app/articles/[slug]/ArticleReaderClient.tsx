'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  Clock, 
  Share2, 
  Copy, 
  Check, 
  Quote, 
  Calendar, 
  ShieldCheck, 
  ArrowRight, 
  BookOpen, 
  ListTree, 
  Type, 
  Award, 
  ExternalLink, 
  ChevronRight, 
  Eye, 
  FileText 
} from 'lucide-react';
import { Article } from '@/lib/types';

interface Props {
  article: Article;
  relatedArticles: Article[];
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function ArticleReaderClient({ article, relatedArticles }: Props) {
  const [citationTab, setCitationTab] = useState<'bluebook' | 'oscola' | 'indian'>('bluebook');
  const [citationCopied, setCitationCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [fontSize, setFontSize] = useState<'standard' | 'comfortable' | 'large'>('comfortable');
  const [activeTocId, setActiveTocId] = useState<string>('');
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);

  // Parse Table of Contents items from article markdown
  const tocItems = useMemo<TocItem[]>(() => {
    if (!article.content) return [];
    const lines = article.content.split('\n');
    const items: TocItem[] = [];

    lines.forEach((line) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('## ') && !trimmed.startsWith('### ')) {
        const text = trimmed.replace(/^##\s+/, '').replace(/[*_~`]/g, '');
        const id = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-');
        items.push({ id, text, level: 2 });
      } else if (trimmed.startsWith('### ')) {
        const text = trimmed.replace(/^###\s+/, '').replace(/[*_~`]/g, '');
        const id = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-');
        items.push({ id, text, level: 3 });
      }
    });

    return items;
  }, [article.content]);

  // Track scroll progress and active ToC section
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = windowHeight > 0 ? (totalScroll / windowHeight) * 100 : 0;
      setReadingProgress(Math.min(100, Math.max(0, progress)));

      // Highlight active ToC header
      if (tocItems.length > 0) {
        let currentId = '';
        for (const item of tocItems) {
          const el = document.getElementById(item.id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 140) {
              currentId = item.id;
            }
          }
        }
        if (currentId) {
          setActiveTocId(currentId);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [tocItems]);

  const copyCitation = () => {
    const text = article.citationFormat?.[citationTab] || '';
    navigator.clipboard.writeText(text);
    setCitationCopied(true);
    setTimeout(() => setCitationCopied(false), 2000);
  };

  const shareArticle = (platform: 'linkedin' | 'twitter' | 'whatsapp' | 'copy') => {
    const url = typeof window !== 'undefined' ? window.location.href : `https://lexminds.in/articles/${article.slug}`;
    const text = `${article.title} | Lex Minds Law Review`;

    if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`${text}: ${url}`)}`, '_blank');
    } else {
      navigator.clipboard.writeText(url);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    }
  };

  // Helper to render markdown inline elements (bold, italic, code)
  const renderInlineFormatted = (text: string) => {
    // Basic regex replacer for bold and italic
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={idx} className="font-semibold text-ink-950 dark:text-ink-50">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={idx} className="italic">{part.slice(1, -1)}</em>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={idx} className="font-mono text-xs px-1.5 py-0.5 bg-paper-200 dark:bg-ink-800 text-royal-600 dark:text-royal-400 rounded-xs">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  // Font size class mapper for comfortable reading typography
  const proseFontSizeClass = {
    standard: 'text-base leading-relaxed',
    comfortable: 'text-lg leading-relaxed tracking-normal',
    large: 'text-xl leading-loose',
  }[fontSize];

  return (
    <>
      {/* 1. Global Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-ink-900/10 dark:bg-ink-800">
        <div 
          className="h-full bg-royal-500 transition-all duration-75 ease-out shadow-sm"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* 2. Top Reader Controls Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 px-4 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900/15 dark:border-ink-700 shadow-brutal-sm text-xs font-mono">
        <div className="flex items-center space-x-3 text-ink-500 dark:text-ink-400">
          <span className="flex items-center space-x-1.5">
            <BookOpen className="w-3.5 h-3.5 text-royal-500" />
            <span>Reading Progress: <strong>{Math.round(readingProgress)}%</strong></span>
          </span>
          <span className="hidden sm:inline">&bull;</span>
          <span className="hidden sm:flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5 text-ink-400" />
            <span>{article.readTime}</span>
          </span>
        </div>

        {/* Font Size Adjuster & Mobile ToC button */}
        <div className="flex items-center space-x-3">
          {tocItems.length > 0 && (
            <button
              onClick={() => setIsMobileTocOpen(!isMobileTocOpen)}
              className="lg:hidden px-2.5 py-1 tactile-control rounded-sm text-ink-700 dark:text-ink-300 flex items-center space-x-1 border border-ink-900/20"
            >
              <ListTree className="w-3.5 h-3.5" />
              <span>Contents</span>
            </button>
          )}

          <div className="flex items-center space-x-1 border border-ink-900/15 dark:border-ink-700 rounded-sm p-0.5 bg-paper dark:bg-ink-900">
            <span className="px-1.5 text-ink-400 text-[10px] uppercase">Font:</span>
            <button
              onClick={() => setFontSize('standard')}
              className={`px-2 py-0.5 text-[11px] rounded-xs transition-colors ${
                fontSize === 'standard' ? 'bg-royal-500 text-white font-bold' : 'text-ink-600 dark:text-ink-300 hover:text-ink-950'
              }`}
              title="Standard Font Size"
            >
              A
            </button>
            <button
              onClick={() => setFontSize('comfortable')}
              className={`px-2 py-0.5 text-xs font-semibold rounded-xs transition-colors ${
                fontSize === 'comfortable' ? 'bg-royal-500 text-white font-bold' : 'text-ink-600 dark:text-ink-300 hover:text-ink-950'
              }`}
              title="Comfortable Font Size (Default)"
            >
              A+
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-2 py-0.5 text-sm font-bold rounded-xs transition-colors ${
                fontSize === 'large' ? 'bg-royal-500 text-white font-bold' : 'text-ink-600 dark:text-ink-300 hover:text-ink-950'
              }`}
              title="Large Font Size"
            >
              A++
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Collapsible Table of Contents */}
      {isMobileTocOpen && tocItems.length > 0 && (
        <div className="lg:hidden p-4 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 shadow-brutal space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-ink-900/10 dark:border-ink-800 text-xs font-mono font-bold text-royal-600 dark:text-royal-400 uppercase">
            <span>Table of Contents</span>
            <button onClick={() => setIsMobileTocOpen(false)} className="text-ink-400">Close</button>
          </div>
          <nav className="space-y-1 text-xs">
            {tocItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setIsMobileTocOpen(false)}
                className={`block py-1 hover:text-royal-500 ${
                  item.level === 3 ? 'pl-4 text-ink-500' : 'font-medium text-ink-800 dark:text-ink-200'
                }`}
              >
                {item.text}
              </a>
            ))}
          </nav>
        </div>
      )}

      {/* Main Grid: Reading Article Body (8 cols) + Scholarly Toolkit (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Main Reading Column (8 Cols) */}
        <article className="lg:col-span-8 space-y-10">
          
          {/* Header Metadata & Headline */}
          <header className="space-y-6 border-b border-ink-900/15 dark:border-ink-700 pb-8">
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
              <span className="px-3 py-1 rounded-xs bg-royal-50 dark:bg-royal-950/60 text-royal-600 dark:text-royal-400 font-bold uppercase tracking-wider text-[11px] border border-royal-200 dark:border-royal-800">
                {article.category}
              </span>
              <span className="text-ink-500 dark:text-ink-400 flex items-center space-x-1.5">
                <Calendar className="w-3.5 h-3.5 text-royal-500" />
                <span>Published: {article.publishedAt}</span>
              </span>
              <span className="text-ink-300 dark:text-ink-700">&bull;</span>
              <span className="text-ink-500 dark:text-ink-400 flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-ink-400" />
                <span>{article.readTime}</span>
              </span>
              <span className="text-ink-300 dark:text-ink-700">&bull;</span>
              <span className="text-ink-500 dark:text-ink-400 flex items-center space-x-1.5">
                <Award className="w-3.5 h-3.5 text-amber-500" />
                <span>{article.citationsCount || 14} Citations</span>
              </span>
            </div>

            {/* H1 Headline */}
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-ink-950 dark:text-ink-50 tracking-tight leading-[1.12]">
              {article.title}
            </h1>

            {/* Author Byline */}
            <div className="pt-2 flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 flex items-center justify-center text-royal-600 dark:text-royal-400 font-serif font-bold text-xl shadow-brutal-sm">
                {article.author.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-base font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-1.5">
                  <span>{article.author.name}</span>
                  <ShieldCheck className="w-4 h-4 text-royal-500" />
                </h3>
                <p className="text-xs text-royal-600 dark:text-royal-400 font-medium">
                  {article.author.title}
                </p>
                <p className="text-xs text-ink-500 dark:text-ink-400 font-mono">
                  {article.author.institution}
                </p>
              </div>
            </div>
          </header>

          {/* Abstract Jurisprudential Scope Box */}
          <div className="p-6 sm:p-8 rounded-sm bg-surface-light dark:bg-surface-dark border-l-4 border-l-royal-500 border border-ink-900 dark:border-ink-700 space-y-2 shadow-brutal-sm">
            <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-royal-600 dark:text-royal-400">
              <Quote className="w-4 h-4" />
              <span>Abstract &amp; Jurisprudential Scope</span>
            </div>
            <p className="text-sm sm:text-base leading-relaxed italic text-ink-800 dark:text-ink-200 font-normal">
              {article.abstract}
            </p>
          </div>

          {/* Treatise Content Body */}
          <div className={`legal-prose p-8 sm:p-12 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 space-y-6 shadow-brutal ${proseFontSizeClass}`}>
            {article.content.split('\n\n').map((paragraph, index) => {
              const trimmed = paragraph.trim();

              // Heading 2
              if (trimmed.startsWith('## ') && !trimmed.startsWith('### ')) {
                const titleText = trimmed.replace(/^##\s+/, '').replace(/[*_~`]/g, '');
                const anchorId = titleText
                  .toLowerCase()
                  .replace(/[^\w\s-]/g, '')
                  .replace(/\s+/g, '-');

                return (
                  <h2 
                    key={index} 
                    id={anchorId}
                    className="text-2xl sm:text-3xl font-serif font-bold text-ink-950 dark:text-ink-50 pt-6 pb-1 border-b border-ink-900/10 dark:border-ink-800 scroll-mt-20"
                  >
                    {trimmed.replace(/^##\s+/, '')}
                  </h2>
                );
              }

              // Heading 3
              if (trimmed.startsWith('### ')) {
                const titleText = trimmed.replace(/^###\s+/, '').replace(/[*_~`]/g, '');
                const anchorId = titleText
                  .toLowerCase()
                  .replace(/[^\w\s-]/g, '')
                  .replace(/\s+/g, '-');

                return (
                  <h3 
                    key={index} 
                    id={anchorId}
                    className="text-xl font-serif font-bold text-royal-600 dark:text-royal-400 pt-4 scroll-mt-20"
                  >
                    {trimmed.replace(/^###\s+/, '')}
                  </h3>
                );
              }

              // Code or statutory citation block
              if (trimmed.startsWith('```')) {
                return (
                  <pre 
                    key={index} 
                    className="bg-paper dark:bg-ink-950 p-4 font-mono text-xs text-ink-900 dark:text-ink-200 overflow-x-auto border border-ink-900/15 dark:border-ink-800 rounded-sm"
                  >
                    <code>{trimmed.replace(/```/g, '')}</code>
                  </pre>
                );
              }

              // Blockquotes (Statute or Judgment Citation)
              if (trimmed.startsWith('>')) {
                return (
                  <blockquote 
                    key={index} 
                    className="p-4 pl-6 bg-paper-100 dark:bg-ink-900 border-l-4 border-royal-500 my-4 text-ink-700 dark:text-ink-300 italic rounded-xs font-serif"
                  >
                    {renderInlineFormatted(trimmed.replace(/^>\s*/, ''))}
                  </blockquote>
                );
              }

              // Markdown Tables
              if (trimmed.startsWith('|')) {
                const rows = trimmed.split('\n');
                return (
                  <div key={index} className="overflow-x-auto my-6 font-mono text-xs">
                    <table className="w-full text-left border border-ink-900/15 dark:border-ink-700 overflow-hidden shadow-sm">
                      <tbody>
                        {rows.map((row, rIdx) => {
                          const cols = row.split('|').filter((c) => c.trim() !== '');
                          if (rIdx === 0) {
                            return (
                              <tr key={rIdx} className="bg-paper-200 dark:bg-ink-950 text-royal-600 dark:text-royal-400 font-bold border-b border-ink-900/15 dark:border-ink-800">
                                {cols.map((c, cIdx) => (
                                  <th key={cIdx} className="p-3.5">{c.trim()}</th>
                                ))}
                              </tr>
                            );
                          }
                          if (row.includes('---')) return null;
                          return (
                            <tr key={rIdx} className="border-b border-ink-900/10 dark:border-ink-850 hover:bg-paper-100 dark:hover:bg-ink-850/60 transition-colors">
                              {cols.map((c, cIdx) => (
                                <td key={cIdx} className="p-3 text-ink-800 dark:text-ink-200">{c.trim()}</td>
                              ))}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                );
              }

              // Numbered list items
              if (/^\d+\.\s/.test(trimmed)) {
                return (
                  <div key={index} className="pl-4 border-l-2 border-royal-200 dark:border-royal-900 my-2 text-ink-800 dark:text-ink-200">
                    {renderInlineFormatted(trimmed)}
                  </div>
                );
              }

              // Divider
              if (trimmed === '---') {
                return <hr key={index} className="border-t border-ink-900/15 dark:border-ink-800 my-6" />;
              }

              // Standard body paragraph
              return (
                <p key={index} className="leading-relaxed text-ink-800 dark:text-ink-200 font-normal">
                  {renderInlineFormatted(trimmed)}
                </p>
              );
            })}
          </div>

          {/* Keywords & Indexing Metadata */}
          {article.keywords && article.keywords.length > 0 && (
            <div className="pt-2 flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className="text-ink-500 dark:text-ink-400">Indexed Under:</span>
              {article.keywords.map((kw, i) => (
                <Link
                  key={i}
                  href={`/articles`}
                  className="px-3 py-1 bg-paper dark:bg-ink-850 text-royal-600 dark:text-royal-400 border border-ink-900/15 dark:border-ink-700 text-xs rounded-sm hover:border-royal-500 transition-colors"
                >
                  #{kw}
                </Link>
              ))}
            </div>
          )}

          {/* Author Credential Section */}
          <div className="p-6 sm:p-8 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 flex flex-col sm:flex-row items-start sm:items-center gap-5 shadow-brutal">
            <div className="w-16 h-16 bg-paper dark:bg-ink-800 border border-ink-900/20 dark:border-ink-700 flex items-center justify-center text-royal-600 dark:text-royal-400 font-serif font-bold text-2xl shrink-0">
              {article.author.name.charAt(0)}
            </div>
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center space-x-2">
                <h4 className="text-lg font-serif font-bold text-ink-950 dark:text-ink-50">
                  {article.author.name}
                </h4>
                <ShieldCheck className="w-4 h-4 text-royal-500" />
              </div>
              <p className="text-xs text-royal-600 dark:text-royal-400 font-mono font-medium">
                {article.author.title} &bull; {article.author.institution}
              </p>
              <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-300 leading-relaxed font-normal">
                {article.author.bio}
              </p>
            </div>
          </div>

          {/* Related Articles Recommendation Deck */}
          {relatedArticles.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-ink-900/15 dark:border-ink-700">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-serif font-bold text-ink-950 dark:text-ink-50">
                  Related Treatises in {article.category}
                </h3>
                <Link
                  href="/articles"
                  className="text-xs font-mono text-royal-600 dark:text-royal-400 hover:underline flex items-center space-x-1"
                >
                  <span>View All</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedArticles.map((rel) => (
                  <div
                    key={rel.id}
                    className="p-5 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 shadow-brutal-sm space-y-2 hover:shadow-royal transition-all duration-150 group"
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono text-ink-400">
                      <span className="text-royal-600 dark:text-royal-400 font-semibold uppercase">
                        {rel.category}
                      </span>
                      <span>{rel.readTime}</span>
                    </div>

                    <h4 className="font-serif font-bold text-base text-ink-950 dark:text-ink-50 group-hover:text-royal-500 dark:group-hover:text-royal-400 transition-colors leading-snug">
                      <Link href={`/articles/${rel.slug}`}>
                        {rel.title}
                      </Link>
                    </h4>

                    <p className="text-xs text-ink-600 dark:text-ink-400 line-clamp-2 leading-relaxed">
                      {rel.abstract}
                    </p>

                    <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-ink-500">
                      <span>By {rel.author.name}</span>
                      <Link
                        href={`/articles/${rel.slug}`}
                        className="text-royal-600 dark:text-royal-400 hover:underline font-semibold flex items-center"
                      >
                        <span>Read</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </article>

        {/* Sticky Scholarly Tools Sidebar (4 Cols) */}
        <aside className="lg:col-span-4 lg:sticky lg:top-20 space-y-6">
          
          {/* 1. Dynamic Table of Contents (Desktop Sticky) */}
          {tocItems.length > 0 && (
            <div className="hidden lg:block p-6 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 space-y-3 shadow-brutal">
              <div className="flex items-center justify-between pb-2 border-b border-ink-900/10 dark:border-ink-800">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-royal-600 dark:text-royal-400 flex items-center space-x-1.5">
                  <ListTree className="w-3.5 h-3.5" />
                  <span>Table of Contents</span>
                </span>
                <span className="text-[10px] font-mono text-ink-400">{tocItems.length} Sections</span>
              </div>

              <nav className="space-y-1.5 max-h-[320px] overflow-y-auto text-xs">
                {tocItems.map((item) => {
                  const isActive = activeTocId === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block py-1 transition-colors leading-snug ${
                        item.level === 3 ? 'pl-4 text-xs' : 'font-semibold'
                      } ${
                        isActive
                          ? 'text-royal-600 dark:text-royal-400 border-l-2 border-royal-500 pl-2 font-bold'
                          : 'text-ink-600 dark:text-ink-300 hover:text-ink-950 dark:hover:text-ink-50'
                      }`}
                    >
                      {item.text}
                    </a>
                  );
                })}
              </nav>
            </div>
          )}

          {/* 2. Standardized Citation Generator Box */}
          <div className="p-6 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 space-y-4 shadow-brutal">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-royal-600 dark:text-royal-400 text-xs font-mono font-bold uppercase tracking-wider">
                <Quote className="w-4 h-4" />
                <span>Cite This Treatise</span>
              </div>
              <span className="text-[10px] font-mono text-ink-400">Peer Reviewed</span>
            </div>

            {/* Citation Format Switcher */}
            <div className="grid grid-cols-3 gap-1 bg-paper dark:bg-ink-950 p-1 border border-ink-900/15 dark:border-ink-800 text-xs font-mono rounded-sm">
              <button
                onClick={() => setCitationTab('bluebook')}
                className={`py-1.5 transition-colors rounded-xs ${
                  citationTab === 'bluebook'
                    ? 'bg-royal-500 text-white font-bold shadow-sm'
                    : 'text-ink-700 dark:text-ink-400 hover:text-ink-900 dark:hover:text-white'
                }`}
              >
                Bluebook
              </button>
              <button
                onClick={() => setCitationTab('oscola')}
                className={`py-1.5 transition-colors rounded-xs ${
                  citationTab === 'oscola'
                    ? 'bg-royal-500 text-white font-bold shadow-sm'
                    : 'text-ink-700 dark:text-ink-400 hover:text-ink-900 dark:hover:text-white'
                }`}
              >
                OSCOLA
              </button>
              <button
                onClick={() => setCitationTab('indian')}
                className={`py-1.5 transition-colors rounded-xs ${
                  citationTab === 'indian'
                    ? 'bg-royal-500 text-white font-bold shadow-sm'
                    : 'text-ink-700 dark:text-ink-400 hover:text-ink-900 dark:hover:text-white'
                }`}
              >
                Indian Law
              </button>
            </div>

            {/* Citation Text Display */}
            <div className="p-3.5 bg-paper dark:bg-ink-950 border border-ink-900/15 dark:border-ink-800 font-mono text-xs text-ink-900 dark:text-ink-200 leading-relaxed rounded-sm select-all">
              {article.citationFormat?.[citationTab] || 'Citation format pending.'}
            </div>

            {/* Copy Button */}
            <button
              onClick={copyCitation}
              className="w-full py-2.5 btn-brand-secondary text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-2"
            >
              {citationCopied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Citation Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Standard Citation</span>
                </>
              )}
            </button>
          </div>

          {/* 3. Social Share Box */}
          <div className="p-6 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 space-y-3 shadow-brutal">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-800 dark:text-ink-200 flex items-center space-x-2">
              <Share2 className="w-4 h-4 text-royal-500" />
              <span>Share Scholarship</span>
            </h4>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <button
                onClick={() => shareArticle('linkedin')}
                className="py-2 px-3 bg-paper dark:bg-ink-950 hover:bg-paper-200 dark:hover:bg-ink-800 border border-ink-900/15 dark:border-ink-800 text-ink-700 dark:text-ink-300 rounded-sm transition-colors text-center"
              >
                LinkedIn
              </button>
              <button
                onClick={() => shareArticle('twitter')}
                className="py-2 px-3 bg-paper dark:bg-ink-950 hover:bg-paper-200 dark:hover:bg-ink-800 border border-ink-900/15 dark:border-ink-800 text-ink-700 dark:text-ink-300 rounded-sm transition-colors text-center"
              >
                X (Twitter)
              </button>
              <button
                onClick={() => shareArticle('whatsapp')}
                className="py-2 px-3 bg-paper dark:bg-ink-950 hover:bg-paper-200 dark:hover:bg-ink-800 border border-ink-900/15 dark:border-ink-800 text-ink-700 dark:text-ink-300 rounded-sm transition-colors text-center"
              >
                WhatsApp
              </button>
              <button
                onClick={() => shareArticle('copy')}
                className="py-2 px-3 bg-paper dark:bg-ink-950 hover:bg-paper-200 dark:hover:bg-ink-800 border border-ink-900/15 dark:border-ink-800 text-ink-700 dark:text-ink-300 rounded-sm transition-colors text-center"
              >
                {shareCopied ? 'URL Copied' : 'Copy URL'}
              </button>
            </div>
          </div>

          {/* 4. Call for Manuscripts / Response Prompt */}
          <div className="p-6 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 space-y-3 shadow-brutal">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-royal-500 dark:text-royal-400">
              Contribute &bull; Call for Papers
            </span>
            <h4 className="text-base font-serif font-bold text-ink-950 dark:text-ink-50">
              Submit a Response or Treatise
            </h4>
            <p className="text-xs text-ink-600 dark:text-ink-400 leading-relaxed font-normal">
              Have an analysis or rebuttal on this legal topic? Submit your commentary to the Lex Minds Editorial Board.
            </p>
            <Link
              href="/publish"
              className="w-full py-3 btn-brand-primary text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-2"
            >
              <span>Submit Manuscript</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </aside>

      </div>
    </>
  );
}
