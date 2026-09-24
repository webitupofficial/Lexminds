import React from 'react';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import { 
  fetchArticleBySlugFromCMS, 
  fetchArticlesFromCMS, 
  INITIAL_ARTICLES 
} from '@/lib/data-store';
import ArticleReaderClient from './ArticleReaderClient';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const articles = await fetchArticlesFromCMS().catch(() => INITIAL_ARTICLES);
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const article = await fetchArticleBySlugFromCMS(params.slug);
  if (!article) return { title: 'Article Not Found | Lex Minds Law Review' };

  return {
    title: `${article.title} | Lex Minds Law Review`,
    description: article.abstract,
    authors: [{ name: article.author.name }],
    alternates: {
      canonical: `https://lexminds.in/articles/${article.slug}`,
    },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.abstract,
      url: `https://lexminds.in/articles/${article.slug}`,
      publishedTime: `${article.publishedAt}T00:00:00+05:30`,
      authors: [article.author.name],
      siteName: 'Lex Minds Law Review',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.abstract,
    },
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const [article, allArticles] = await Promise.all([
    fetchArticleBySlugFromCMS(params.slug),
    fetchArticlesFromCMS().catch(() => INITIAL_ARTICLES),
  ]);

  if (!article) {
    notFound();
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://lexminds.in/articles/${article.slug}`,
    },
    headline: article.title,
    description: article.abstract,
    datePublished: `${article.publishedAt}T00:00:00+05:30`,
    author: {
      '@type': 'Person',
      name: article.author.name,
      jobTitle: article.author.title,
      affiliation: {
        '@type': 'Organization',
        name: article.author.institution,
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'Lex Minds Law Review',
      logo: {
        '@type': 'ImageObject',
        url: 'https://lexminds.in/icon.svg',
      },
    },
    keywords: article.keywords.join(', '),
  };

  // Find related articles by matching category first, then others
  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id)
    .sort((a, b) => (a.category === article.category ? -1 : 1))
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <JsonLd data={articleSchema} />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { name: 'Publications & Articles', href: '/articles' },
          { name: article.category, href: `/articles` },
          { name: article.title },
        ]}
      />

      <ArticleReaderClient article={article} relatedArticles={relatedArticles} />
    </div>
  );
}
