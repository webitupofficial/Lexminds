'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Clock, 
  Share2, 
  Copy, 
  Check, 
  Quote, 
  Calendar, 
  ShieldCheck, 
  ArrowRight
} from 'lucide-react';
import { Article } from '@/lib/types';

interface Props {
  article: Article;
  relatedArticles: Article[];
}

export default function ArticleReaderClient({ article, relatedArticles }: Props) {
  const [citationTab, setCitationTab] = useState<'bluebook' | 'oscola' | 'indian'>('bluebook');
  const [citationCopied, setCitationCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  const copyCitation = () => {
    const text = article.citationFormat[citationTab];
    navigator.clipboard.writeText(text);
    setCitationCopied(true);
    setTimeout(() => setCitationCopied(false), 2000);
  };

  const shareArticle = (platform: 'linkedin' | 'twitter' | 'whatsapp' | 'copy') => {
    const url = typeof window !== 'undefined' ? window.location.href : `https://lexminds.in/articles/${article.slug}`;
    const text = `${article.title} - Read on LexMinds Law Journal`;

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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start py-6">
      
      {/* Main Reading Column (8 Cols) */}
      <div className="lg:col-span-8 space-y-10">
        
        {/* Header Metadata */}
        <div className="space-y-6 border-b border-ink-900/15 dark:border-ink-700 pb-8">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <span className="px-3 py-1 rounded-sm bg-royal-50 dark:bg-royal-950/40 text-royal-600 dark:text-royal-400 font-bold uppercase tracking-wider text-[11px] border border-royal-200 dark:border-royal-800">
              {article.category}
            </span>
            <span className="text-ink-500 dark:text-ink-400 flex items-center space-x-1.5 ml-2">
              <Calendar className="w-3.5 h-3.5 text-royal-500" />
              <span>Published: {article.publishedAt}</span>
            </span>
            <span className="text-ink-300 dark:text-ink-700">&bull;</span>
            <span className="text-ink-500 dark:text-ink-400 flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-ink-400" />
              <span>{article.readTime}</span>
            </span>
          </div>

          {/* H1 Headline */}
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-ink-950 dark:text-ink-50 tracking-tight leading-[1.12]">
            {article.title}
          </h1>

          {/* Author Byline */}
          <div className="pt-2 flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 flex items-center justify-center text-royal-600 dark:text-royal-400 font-serif font-bold text-lg shadow-brutal-sm">
              {article.author.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-base font-bold text-ink-950 dark:text-ink-50 flex items-center space-x-1.5">
                <span>{article.author.name}</span>
                <ShieldCheck className="w-4 h-4 text-royal-500" />
              </h3>
              <p className="text-xs text-royal-600 dark:text-royal-400 font-medium">{article.author.title}</p>
              <p className="text-xs text-ink-500 dark:text-ink-400 font-mono">{article.author.institution}</p>
            </div>
          </div>
        </div>

        {/* Abstract Callout Box */}
        <div className="p-6 sm:p-8 rounded-sm bg-surface-light dark:bg-surface-dark border-l-4 border-l-royal-500 border border-ink-900 dark:border-ink-700 space-y-2 shadow-brutal-sm">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-royal-600 dark:text-royal-400">
            <Quote className="w-4 h-4" />
            <span>Abstract &amp; Jurisprudential Scope</span>
          </div>
          <p className="text-sm leading-relaxed italic text-ink-800 dark:text-ink-200 font-normal">
            {article.abstract}
          </p>
        </div>

        {/* Article Body Prose */}
        <div className="legal-prose p-8 sm:p-12 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 space-y-6 shadow-brutal">
          {article.content.split('\n\n').map((paragraph, index) => {
            if (paragraph.startsWith('## ')) {
              return (
                <h2 key={index} className="text-2xl sm:text-3xl font-serif font-bold text-ink-950 dark:text-ink-50 pt-4">
                  {paragraph.replace('## ', '')}
                </h2>
              );
            }
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={index} className="text-xl font-serif font-bold text-royal-600 dark:text-royal-400 pt-2">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('```')) {
              return (
                <pre key={index} className="bg-paper dark:bg-ink-950 p-4 font-mono text-xs text-ink-900 dark:text-ink-200 overflow-x-auto border border-ink-900/15 dark:border-ink-800 rounded-sm">
                  <code>{paragraph.replace(/```/g, '')}</code>
                </pre>
              );
            }
            if (paragraph.startsWith('|')) {
              const rows = paragraph.split('\n');
              return (
                <div key={index} className="overflow-x-auto my-4 font-mono text-xs">
                  <table className="w-full text-left border border-ink-900/15 dark:border-ink-700 overflow-hidden">
                    <tbody>
                      {rows.map((row, rIdx) => {
                        const cols = row.split('|').filter(c => c.trim() !== '');
                        if (rIdx === 0) {
                          return (
                            <tr key={rIdx} className="bg-paper-200 dark:bg-ink-950 text-royal-600 dark:text-royal-400 font-bold border-b border-ink-900/15 dark:border-ink-800">
                              {cols.map((c, cIdx) => (
                                <th key={cIdx} className="p-3">{c.trim()}</th>
                              ))}
                            </tr>
                          );
                        }
                        if (row.includes('---')) return null;
                        return (
                          <tr key={rIdx} className="border-b border-ink-900/10 dark:border-ink-850 hover:bg-paper-100 dark:hover:bg-ink-850">
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
            return (
              <p key={index} className="leading-relaxed text-ink-800 dark:text-ink-200 text-base font-normal">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Article Keywords & Tags */}
        <div className="pt-2 flex flex-wrap items-center gap-2 font-mono text-xs">
          <span className="text-ink-500 dark:text-ink-400">Indexed Under:</span>
          {article.keywords.map((kw, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-paper dark:bg-ink-850 text-royal-600 dark:text-royal-400 border border-ink-900/15 dark:border-ink-700 text-xs rounded-sm"
            >
              #{kw}
            </span>
          ))}
        </div>

        {/* Author Bio Box */}
        <div className="p-6 sm:p-8 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 flex flex-col sm:flex-row items-start sm:items-center gap-5 shadow-brutal-sm">
          <div className="w-14 h-14 bg-paper dark:bg-ink-800 border border-ink-900/20 dark:border-ink-700 flex items-center justify-center text-royal-600 dark:text-royal-400 font-serif font-bold text-xl shrink-0">
            {article.author.name.charAt(0)}
          </div>
          <div className="space-y-1">
            <h4 className="text-lg font-serif font-bold text-ink-950 dark:text-ink-50">{article.author.name}</h4>
            <p className="text-xs text-royal-600 dark:text-royal-400 font-mono font-medium">{article.author.title} &bull; {article.author.institution}</p>
            <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-300 leading-relaxed pt-1 font-normal">{article.author.bio}</p>
          </div>
        </div>

      </div>

      {/* Sidebar Tool Column (4 Cols) */}
      <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
        
        {/* 1. Citation Generator Box */}
        <div className="p-6 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 space-y-4 shadow-brutal">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-royal-600 dark:text-royal-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Quote className="w-4 h-4" />
              <span>Cite This Treatise</span>
            </div>
            <span className="text-[10px] font-mono text-ink-400">Standardized</span>
          </div>

          {/* Citation Format Switcher */}
          <div className="grid grid-cols-3 gap-1 bg-paper dark:bg-ink-950 p-1 border border-ink-900/15 dark:border-ink-800 text-xs font-mono rounded-sm">
            <button
              onClick={() => setCitationTab('bluebook')}
              className={`py-1.5 transition-colors ${
                citationTab === 'bluebook' ? 'bg-royal-500 text-white font-bold' : 'text-ink-700 dark:text-ink-400 hover:text-ink-900 dark:hover:text-white'
              }`}
            >
              Bluebook
            </button>
            <button
              onClick={() => setCitationTab('oscola')}
              className={`py-1.5 transition-colors ${
                citationTab === 'oscola' ? 'bg-royal-500 text-white font-bold' : 'text-ink-700 dark:text-ink-400 hover:text-ink-900 dark:hover:text-white'
              }`}
            >
              OSCOLA
            </button>
            <button
              onClick={() => setCitationTab('indian')}
              className={`py-1.5 transition-colors ${
                citationTab === 'indian' ? 'bg-royal-500 text-white font-bold' : 'text-ink-700 dark:text-ink-400 hover:text-ink-900 dark:hover:text-white'
              }`}
            >
              Indian Law
            </button>
          </div>

          {/* Citation Text Display */}
          <div className="p-3.5 bg-paper dark:bg-ink-950 border border-ink-900/15 dark:border-ink-800 font-mono text-xs text-ink-900 dark:text-ink-200 leading-relaxed rounded-sm">
            {article.citationFormat[citationTab]}
          </div>

          {/* Copy Button */}
          <button
            onClick={copyCitation}
            className="w-full py-2.5 btn-brand-secondary text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-2"
          >
            {citationCopied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Citation Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Citation</span>
              </>
            )}
          </button>
        </div>

        {/* 2. Social Share Box */}
        <div className="p-6 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 space-y-3 shadow-brutal">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-800 dark:text-ink-200 flex items-center space-x-2">
            <Share2 className="w-4 h-4 text-royal-500" />
            <span>Share Scholarship</span>
          </h4>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <button
              onClick={() => shareArticle('linkedin')}
              className="py-2 px-3 bg-paper dark:bg-ink-950 hover:bg-paper-200 dark:hover:bg-ink-800 border border-ink-900/15 dark:border-ink-800 text-ink-700 dark:text-ink-300 rounded-sm"
            >
              LinkedIn
            </button>
            <button
              onClick={() => shareArticle('twitter')}
              className="py-2 px-3 bg-paper dark:bg-ink-950 hover:bg-paper-200 dark:hover:bg-ink-800 border border-ink-900/15 dark:border-ink-800 text-ink-700 dark:text-ink-300 rounded-sm"
            >
              X (Twitter)
            </button>
            <button
              onClick={() => shareArticle('whatsapp')}
              className="py-2 px-3 bg-paper dark:bg-ink-950 hover:bg-paper-200 dark:hover:bg-ink-800 border border-ink-900/15 dark:border-ink-800 text-ink-700 dark:text-ink-300 rounded-sm"
            >
              WhatsApp
            </button>
            <button
              onClick={() => shareArticle('copy')}
              className="py-2 px-3 bg-paper dark:bg-ink-950 hover:bg-paper-200 dark:hover:bg-ink-800 border border-ink-900/15 dark:border-ink-800 text-ink-700 dark:text-ink-300 rounded-sm"
            >
              {shareCopied ? 'Copied' : 'Copy URL'}
            </button>
          </div>
        </div>

        {/* 3. Call to Action / Call for Papers */}
        <div className="p-6 rounded-sm bg-surface-light dark:bg-surface-dark border border-ink-900 dark:border-ink-700 space-y-3 shadow-brutal">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-royal-500 dark:text-royal-400">
            Call for Papers
          </span>
          <h4 className="text-base font-serif font-bold text-ink-950 dark:text-ink-50">
            Submit Your Legal Research to LexMinds
          </h4>
          <p className="text-xs text-ink-600 dark:text-ink-400 leading-relaxed font-normal">
            Gain academic visibility, structured editorial feedback, and indexed publication recognition.
          </p>
          <Link
            href="/publish"
            className="w-full py-3 btn-brand-primary text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-2"
          >
            <span>Submit Manuscript</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

    </div>
  );
}
