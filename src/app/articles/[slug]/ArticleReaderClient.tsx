'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Clock, 
  User, 
  Share2, 
  Copy, 
  Check, 
  Quote, 
  Calendar, 
  ShieldCheck, 
  ArrowRight,
  Building
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
    const text = `${article.title} - Read on LexMinds Law Review`;

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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
      
      {/* Main Reading Column (8 Cols) */}
      <div className="lg:col-span-8 space-y-8">
        
        {/* Header Metadata */}
        <div className="space-y-4 border-b border-ink-200 dark:border-ink-800 pb-8">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="px-2.5 py-0.5 rounded-sm bg-ivory-200 dark:bg-ink-800 text-oxblood-700 dark:text-oxblood-400 font-semibold uppercase tracking-wider text-[10px]">
              {article.category}
            </span>
            <span className="text-ink-500 dark:text-ink-400 flex items-center space-x-1 ml-2">
              <Calendar className="w-3.5 h-3.5 text-oxblood-700 dark:text-oxblood-400" />
              <span>Published: {article.publishedAt}</span>
            </span>
            <span className="text-ink-300 dark:text-ink-700">&bull;</span>
            <span className="text-ink-500 dark:text-ink-400 flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 text-ink-400" />
              <span>{article.readTime}</span>
            </span>
          </div>

          {/* H1 */}
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-ink-950 dark:text-white tracking-tight leading-tight">
            {article.title}
          </h1>

          {/* Author Byline */}
          <div className="pt-2 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-sm bg-ivory-100 dark:bg-ink-800 border border-ink-300 dark:border-ink-700 flex items-center justify-center text-oxblood-700 dark:text-oxblood-400 font-serif font-bold text-base shadow-sm">
              {article.author.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-ink-950 dark:text-white flex items-center space-x-1.5">
                <span>{article.author.name}</span>
                <ShieldCheck className="w-4 h-4 text-oxblood-700 dark:text-oxblood-400" />
              </h3>
              <p className="text-xs text-oxblood-700 dark:text-oxblood-400 font-medium">{article.author.title}</p>
              <p className="text-xs text-ink-500 dark:text-ink-400 font-mono">{article.author.institution}</p>
            </div>
          </div>
        </div>

        {/* Abstract Callout Box */}
        <div className="editorial-dossier rounded-sm p-6 space-y-2 bg-ivory-50 dark:bg-ink-900 border border-ink-200 dark:border-ink-800">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-widest text-oxblood-700 dark:text-oxblood-400">
            <Quote className="w-4 h-4" />
            <span>Abstract &amp; Jurisprudential Scope</span>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed italic text-ink-700 dark:text-ink-300">
            {article.abstract}
          </p>
        </div>

        {/* Article Body Prose */}
        <div className="legal-prose editorial-card rounded-sm p-6 sm:p-10 space-y-6 bg-white dark:bg-ink-850 border border-ink-200 dark:border-ink-800">
          {article.content.split('\n\n').map((paragraph, index) => {
            if (paragraph.startsWith('## ')) {
              return (
                <h2 key={index} className="text-2xl font-serif font-bold text-ink-950 dark:text-white pt-4">
                  {paragraph.replace('## ', '')}
                </h2>
              );
            }
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={index} className="text-lg font-serif font-bold text-oxblood-700 dark:text-oxblood-400 pt-2">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('```')) {
              return (
                <pre key={index} className="bg-ivory-100 dark:bg-ink-900 p-4 rounded-sm font-mono text-xs text-ink-900 dark:text-ink-200 overflow-x-auto border border-ink-200 dark:border-ink-800">
                  <code>{paragraph.replace(/```/g, '')}</code>
                </pre>
              );
            }
            if (paragraph.startsWith('|')) {
              const rows = paragraph.split('\n');
              return (
                <div key={index} className="overflow-x-auto my-4 font-mono text-xs">
                  <table className="w-full text-left border border-ink-200 dark:border-ink-800 rounded-sm overflow-hidden">
                    <tbody>
                      {rows.map((row, rIdx) => {
                        const cols = row.split('|').filter(c => c.trim() !== '');
                        if (rIdx === 0) {
                          return (
                            <tr key={rIdx} className="bg-ivory-100 dark:bg-ink-900 text-oxblood-700 dark:text-oxblood-400 font-bold border-b border-ink-200 dark:border-ink-800">
                              {cols.map((c, cIdx) => (
                                <th key={cIdx} className="p-3">{c.trim()}</th>
                              ))}
                            </tr>
                          );
                        }
                        if (row.includes('---')) return null;
                        return (
                          <tr key={rIdx} className="border-b border-ink-100 dark:border-ink-850 hover:bg-ivory-50 dark:hover:bg-ink-900/40">
                            {cols.map((c, cIdx) => (
                              <td key={cIdx} className="p-3 text-ink-700 dark:text-ink-300">{c.trim()}</td>
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
              <p key={index} className="leading-relaxed text-ink-700 dark:text-ink-300 text-sm sm:text-base">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Article Keywords & Tags */}
        <div className="pt-2 flex flex-wrap items-center gap-2 font-mono text-xs">
          <span className="text-ink-400">Indexed Under:</span>
          {article.keywords.map((kw, i) => (
            <span
              key={i}
              className="px-2.5 py-0.5 rounded-sm bg-ivory-100 dark:bg-ink-850 text-oxblood-700 dark:text-oxblood-400 border border-ink-200 dark:border-ink-700 text-[11px]"
            >
              #{kw}
            </span>
          ))}
        </div>

        {/* Author Bio Box */}
        <div className="editorial-card rounded-sm p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white dark:bg-ink-850 border border-ink-200 dark:border-ink-800">
          <div className="w-12 h-12 rounded-sm bg-ivory-100 dark:bg-ink-800 border border-ink-300 dark:border-ink-700 flex items-center justify-center text-oxblood-700 dark:text-oxblood-400 font-serif font-bold text-lg shrink-0">
            {article.author.name.charAt(0)}
          </div>
          <div className="space-y-1">
            <h4 className="text-base font-serif font-bold text-ink-950 dark:text-white">{article.author.name}</h4>
            <p className="text-xs text-oxblood-700 dark:text-oxblood-400 font-mono font-medium">{article.author.title} &bull; {article.author.institution}</p>
            <p className="text-xs text-ink-600 dark:text-ink-400 leading-relaxed pt-1 font-normal">{article.author.bio}</p>
          </div>
        </div>

      </div>

      {/* Sidebar Tool Column (4 Cols) */}
      <div className="lg:col-span-4 lg:sticky lg:top-20 space-y-6">
        
        {/* 1. Citation Generator Box */}
        <div className="editorial-card rounded-sm p-5 space-y-4 bg-white dark:bg-ink-850 border border-ink-200 dark:border-ink-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-oxblood-700 dark:text-oxblood-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Quote className="w-4 h-4" />
              <span>Cite This Treatise</span>
            </div>
            <span className="text-[10px] font-mono text-ink-400">Standardized</span>
          </div>

          {/* Citation Format Switcher */}
          <div className="grid grid-cols-3 gap-1 bg-ivory-100 dark:bg-ink-900 p-1 rounded-sm border border-ink-200 dark:border-ink-800 text-[11px] font-mono">
            <button
              onClick={() => setCitationTab('bluebook')}
              className={`py-1.5 rounded-sm transition-colors ${
                citationTab === 'bluebook' ? 'bg-oxblood-700 text-white font-bold' : 'text-ink-600 dark:text-ink-400 hover:text-ink-900 dark:hover:text-white'
              }`}
            >
              Bluebook
            </button>
            <button
              onClick={() => setCitationTab('oscola')}
              className={`py-1.5 rounded-sm transition-colors ${
                citationTab === 'oscola' ? 'bg-oxblood-700 text-white font-bold' : 'text-ink-600 dark:text-ink-400 hover:text-ink-900 dark:hover:text-white'
              }`}
            >
              OSCOLA
            </button>
            <button
              onClick={() => setCitationTab('indian')}
              className={`py-1.5 rounded-sm transition-colors ${
                citationTab === 'indian' ? 'bg-oxblood-700 text-white font-bold' : 'text-ink-600 dark:text-ink-400 hover:text-ink-900 dark:hover:text-white'
              }`}
            >
              Indian Law
            </button>
          </div>

          {/* Citation Text Display */}
          <div className="p-3 bg-ivory-50 dark:bg-ink-900 rounded-sm border border-ink-200 dark:border-ink-800 font-mono text-xs text-ink-900 dark:text-ink-200 leading-relaxed">
            {article.citationFormat[citationTab]}
          </div>

          {/* Copy Button */}
          <button
            onClick={copyCitation}
            className="w-full py-2 bg-ivory-100 dark:bg-ink-800 hover:bg-oxblood-700 text-ink-800 dark:text-ink-200 hover:text-white font-serif font-bold text-xs uppercase tracking-wider rounded-sm transition-all flex items-center justify-center space-x-1.5 border border-ink-200 dark:border-ink-700"
          >
            {citationCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Citation Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Citation</span>
              </>
            )}
          </button>
        </div>

        {/* 2. Social Share Box */}
        <div className="editorial-card rounded-sm p-5 space-y-3 bg-white dark:bg-ink-850 border border-ink-200 dark:border-ink-800">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-700 dark:text-ink-300 flex items-center space-x-1.5">
            <Share2 className="w-3.5 h-3.5 text-oxblood-700 dark:text-oxblood-400" />
            <span>Share Scholarship</span>
          </h4>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <button
              onClick={() => shareArticle('linkedin')}
              className="py-1.5 px-3 rounded-sm bg-ivory-50 dark:bg-ink-900 hover:bg-ivory-100 dark:hover:bg-ink-800 border border-ink-200 dark:border-ink-800 text-ink-700 dark:text-ink-300"
            >
              LinkedIn
            </button>
            <button
              onClick={() => shareArticle('twitter')}
              className="py-1.5 px-3 rounded-sm bg-ivory-50 dark:bg-ink-900 hover:bg-ivory-100 dark:hover:bg-ink-800 border border-ink-200 dark:border-ink-800 text-ink-700 dark:text-ink-300"
            >
              X (Twitter)
            </button>
            <button
              onClick={() => shareArticle('whatsapp')}
              className="py-1.5 px-3 rounded-sm bg-ivory-50 dark:bg-ink-900 hover:bg-ivory-100 dark:hover:bg-ink-800 border border-ink-200 dark:border-ink-800 text-ink-700 dark:text-ink-300"
            >
              WhatsApp
            </button>
            <button
              onClick={() => shareArticle('copy')}
              className="py-1.5 px-3 rounded-sm bg-ivory-50 dark:bg-ink-900 hover:bg-ivory-100 dark:hover:bg-ink-800 border border-ink-200 dark:border-ink-800 text-ink-700 dark:text-ink-300"
            >
              {shareCopied ? 'Copied' : 'Copy URL'}
            </button>
          </div>
        </div>

        {/* 3. Call to Action / Call for Papers */}
        <div className="editorial-card rounded-sm p-5 space-y-3 bg-white dark:bg-ink-850 border border-ink-200 dark:border-ink-800">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-oxblood-700 dark:text-oxblood-400">
            Call for Papers
          </span>
          <h4 className="text-sm font-serif font-bold text-ink-950 dark:text-white">
            Submit Your Legal Research to LexMinds
          </h4>
          <p className="text-[11px] text-ink-600 dark:text-ink-400 leading-relaxed font-normal">
            Gain academic visibility, structured editorial feedback, and indexed publication recognition.
          </p>
          <Link
            href="/publish"
            className="w-full py-2.5 bg-oxblood-700 hover:bg-oxblood-800 dark:bg-oxblood-600 dark:hover:bg-oxblood-500 text-white font-serif font-bold text-xs uppercase tracking-wider rounded-sm flex items-center justify-center space-x-1.5 shadow-sm transition-all"
          >
            <span>Submit Manuscript</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

    </div>
  );
}
