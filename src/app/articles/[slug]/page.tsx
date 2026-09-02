import React from 'react';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import { INITIAL_ARTICLES } from '@/lib/data-store';
import ArticleReaderClient from './ArticleReaderClient';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return INITIAL_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const article = INITIAL_ARTICLES.find((a) => a.slug === params.slug);
  if (!article) return { title: 'Article Not Found' };

  return {
    title: `${article.title} | LexMinds Law Review`,
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
      siteName: 'LexMinds Law Review',
    },
  };
}

export default function ArticleDetailPage({ params }: Props) {
  const article = INITIAL_ARTICLES.find((a) => a.slug === params.slug);

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
      name: 'LexMinds Law Review',
      logo: {
        '@type': 'ImageObject',
        url: 'https://lexminds.in/icon.svg',
      },
    },
    keywords: article.keywords.join(', '),
  };

  const relatedArticles = INITIAL_ARTICLES.filter((a) => a.id !== article.id).slice(0, 2);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <JsonLd data={articleSchema} />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { name: 'Legal Articles', href: '/articles' },
          { name: article.title },
        ]}
      />

      <ArticleReaderClient article={article} relatedArticles={relatedArticles} />
    </div>
  );
}
