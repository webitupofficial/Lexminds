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
  Sparkles, 
  Calendar, 
  Eye, 
  ShieldCheck, 
  ArrowRight,
  Bookmark,
  Building,
  GraduationCap
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
        <div className="space-y-4 border-b border-slate-200 dark:border-legal-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded bg-gold-50 dark:bg-gold-950/80 text-gold-700 dark:text-gold-400 border border-gold-500/30">
              {article.category}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center space-x-1.5 ml-2">
              <Calendar className="w-3.5 h-3.5 text-gold-600 dark:text-gold-500" />
              <span>Published: {article.publishedAt}</span>
            </span>
            <span className="text-slate-400 dark:text-slate-600">&bull;</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
              <span>{article.readTime}</span>
            </span>
          </div>

          {/* One Clear H1 */}
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
            {article.title}
          </h1>

          {/* Author Byline */}
          <div className="pt-2 flex items-center space-x-3">
            <div className="w-11 h-11 rounded-full bg-gold-100 dark:bg-gold-950 border border-gold-500/40 flex items-center justify-center text-gold-700 dark:text-gold-400 font-serif font-bold text-base shadow-sm dark:shadow-glow-gold">
              {article.author.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
                <span>{article.author.name}</span>
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </h3>
              <p className="text-xs text-gold-700 dark:text-gold-400 font-medium">{article.author.title}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{article.author.institution}</p>
            </div>
          </div>
        </div>

        {/* Abstract Callout Box */}
        <div className="neumorph-card rounded-2xl border-l-4 border-l-gold-500 p-6 space-y-2">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-gold-700 dark:text-gold-400">
            <Quote className="w-4 h-4" />
            <span>Abstract &amp; Executive Summary</span>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed italic text-slate-700 dark:text-slate-300">
            {article.abstract}
          </p>
        </div>

        {/* Article Body Prose */}
        <div className="legal-prose neumorph-card rounded-3xl p-6 sm:p-10 space-y-6">
          {article.content.split('\n\n').map((paragraph, index) => {
            if (paragraph.startsWith('## ')) {
              return (
                <h2 key={index} className="text-2xl font-serif font-bold text-slate-900 dark:text-white pt-4">
                  {paragraph.replace('## ', '')}
                </h2>
              );
            }
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={index} className="text-lg font-serif font-bold text-gold-700 dark:text-gold-300 pt-2">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('```')) {
              return (
                <pre key={index} className="bg-slate-100 dark:bg-legal-900 p-4 rounded-xl font-mono text-xs text-slate-800 dark:text-slate-300 overflow-x-auto border border-slate-200 dark:border-legal-800">
                  <code>{paragraph.replace(/```/g, '')}</code>
                </pre>
              );
            }
            if (paragraph.startsWith('|')) {
              const rows = paragraph.split('\n');
              return (
                <div key={index} className="overflow-x-auto my-4">
                  <table className="w-full text-xs text-left border border-slate-200 dark:border-legal-800 rounded-lg overflow-hidden">
                    <tbody>
                      {rows.map((row, rIdx) => {
                        const cols = row.split('|').filter(c => c.trim() !== '');
                        if (rIdx === 0) {
                          return (
                            <tr key={rIdx} className="bg-slate-100 dark:bg-legal-900 text-gold-700 dark:text-gold-400 font-bold border-b border-slate-200 dark:border-legal-800">
                              {cols.map((c, cIdx) => (
                                <th key={cIdx} className="p-3">{c.trim()}</th>
                              ))}
                            </tr>
                          );
                        }
                        if (row.includes('---')) return null;
                        return (
                          <tr key={rIdx} className="border-b border-slate-100 dark:border-legal-800/60 hover:bg-slate-50 dark:hover:bg-legal-900/40">
                            {cols.map((c, cIdx) => (
                              <td key={cIdx} className="p-3 text-slate-700 dark:text-slate-300">{c.trim()}</td>
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
              <p key={index} className="leading-relaxed text-slate-700 dark:text-slate-300 text-sm sm:text-base">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Article Keywords & Tags */}
        <div className="pt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Indexed Under:</span>
          {article.keywords.map((kw, i) => (
            <span
              key={i}
              className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-legal-900 text-gold-700 dark:text-gold-400 border border-slate-200 dark:border-gold-500/20"
            >
              #{kw}
            </span>
          ))}
        </div>

        {/* Author Bio Box */}
        <div className="neumorph-card rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gold-100 dark:bg-gold-950 border border-gold-500/40 flex items-center justify-center text-gold-700 dark:text-gold-400 font-serif font-bold text-xl shrink-0">
            {article.author.name.charAt(0)}
          </div>
          <div className="space-y-1">
            <h4 className="text-base font-serif font-bold text-slate-900 dark:text-white">{article.author.name}</h4>
            <p className="text-xs text-gold-700 dark:text-gold-400 font-medium">{article.author.title} &bull; {article.author.institution}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-1">{article.author.bio}</p>
          </div>
        </div>

      </div>

      {/* Sidebar Tool Column (4 Cols) */}
      <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
        
        {/* 1. Citation Generator Box */}
        <div className="neumorph-card rounded-2xl p-5 space-y-4 border border-slate-200 dark:border-gold-500/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-gold-700 dark:text-gold-400 text-xs font-bold uppercase tracking-wider">
              <Quote className="w-4 h-4" />
              <span>Cite This Treatise</span>
            </div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">Standardized Formats</span>
          </div>

          {/* Citation Format Switcher */}
          <div className="grid grid-cols-3 gap-1 bg-slate-100 dark:bg-legal-950 p-1 rounded-xl border border-slate-200 dark:border-legal-800 text-[11px] font-semibold">
            <button
              onClick={() => setCitationTab('bluebook')}
              className={`py-1.5 rounded-lg transition-colors ${
                citationTab === 'bluebook' ? 'bg-gold-500 text-slate-950 font-bold shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              Bluebook (21st)
            </button>
            <button
              onClick={() => setCitationTab('oscola')}
              className={`py-1.5 rounded-lg transition-colors ${
                citationTab === 'oscola' ? 'bg-gold-500 text-slate-950 font-bold shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              OSCOLA
            </button>
            <button
              onClick={() => setCitationTab('indian')}
              className={`py-1.5 rounded-lg transition-colors ${
                citationTab === 'indian' ? 'bg-gold-500 text-slate-950 font-bold shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              Indian Citation
            </button>
          </div>

          {/* Citation Text Display */}
          <div className="p-3 bg-slate-50 dark:bg-legal-950 rounded-xl border border-slate-200 dark:border-legal-800 font-mono text-xs text-slate-800 dark:text-slate-300 leading-relaxed neumorph-inset">
            {article.citationFormat[citationTab]}
          </div>

          {/* Copy Button */}
          <button
            onClick={copyCitation}
            className="w-full py-2.5 bg-slate-100 dark:bg-legal-850 hover:bg-gold-500 text-gold-700 dark:text-gold-400 hover:text-slate-950 dark:hover:text-legal-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center space-x-1.5 border border-slate-200 dark:border-legal-700"
          >
            {citationCopied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Citation Copied to Clipboard</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Citation Text</span>
              </>
            )}
          </button>
        </div>

        {/* 2. Social Share Box */}
        <div className="neumorph-card rounded-2xl p-5 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
            <Share2 className="w-4 h-4 text-gold-700 dark:text-gold-400" />
            <span>Share Scholarship</span>
          </h4>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => shareArticle('linkedin')}
              className="py-2 px-3 rounded-lg bg-slate-100 dark:bg-legal-950 hover:bg-slate-200 dark:hover:bg-legal-800 border border-slate-200 dark:border-legal-800 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white font-medium flex items-center justify-center space-x-1.5"
            >
              <span>LinkedIn</span>
            </button>
            <button
              onClick={() => shareArticle('twitter')}
              className="py-2 px-3 rounded-lg bg-slate-100 dark:bg-legal-950 hover:bg-slate-200 dark:hover:bg-legal-800 border border-slate-200 dark:border-legal-800 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white font-medium flex items-center justify-center space-x-1.5"
            >
              <span>X (Twitter)</span>
            </button>
            <button
              onClick={() => shareArticle('whatsapp')}
              className="py-2 px-3 rounded-lg bg-slate-100 dark:bg-legal-950 hover:bg-slate-200 dark:hover:bg-legal-800 border border-slate-200 dark:border-legal-800 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white font-medium flex items-center justify-center space-x-1.5"
            >
              <span>WhatsApp</span>
            </button>
            <button
              onClick={() => shareArticle('copy')}
              className="py-2 px-3 rounded-lg bg-slate-100 dark:bg-legal-950 hover:bg-slate-200 dark:hover:bg-legal-800 border border-slate-200 dark:border-legal-800 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white font-medium flex items-center justify-center space-x-1.5"
            >
              <span>{shareCopied ? 'Copied' : 'Copy URL'}</span>
            </button>
          </div>
        </div>

        {/* 3. Call to Action / Call for Papers */}
        <div className="neumorph-card rounded-2xl p-5 space-y-3 border border-slate-200 dark:border-gold-500/40">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gold-700 dark:text-gold-400">
            Publish With Us
          </span>
          <h4 className="text-sm font-serif font-bold text-slate-900 dark:text-white">
            Submit Your Legal Research to LexMinds
          </h4>
          <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
            Gain academic recognition, double-blind peer review, and high national citation visibility.
          </p>
          <Link
            href="/publish"
            className="w-full py-2.5 bg-gradient-to-r from-gold-400 to-gold-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center space-x-1.5 shadow-sm dark:shadow-glow-gold"
          >
            <span>Submit Manuscript</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

    </div>
  );
}
