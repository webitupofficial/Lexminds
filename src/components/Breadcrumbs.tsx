import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import JsonLd from './JsonLd';

export interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allItems = [{ name: 'Home', href: '/' }, ...items];

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.href ? `https://lexminds.in${item.href}` : 'https://lexminds.in',
    })),
  };

  return (
    <>
      <JsonLd data={schemaData} />
      <nav aria-label="Breadcrumb" className="py-2">
        <ol className="flex flex-wrap items-center space-x-2 text-xs font-mono text-ink-500 dark:text-ink-400">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;
            return (
              <li key={index} className="flex items-center space-x-2">
                {index > 0 && <ChevronRight className="w-3 h-3 text-ink-400 dark:text-ink-600 shrink-0" />}
                {index === 0 ? (
                  <Link
                    href="/"
                    className="flex items-center space-x-1 hover:text-royal-600 dark:hover:text-royal-400 transition-colors"
                  >
                    <Home className="w-3.5 h-3.5 text-royal-600 dark:text-royal-400" />
                    <span>Home</span>
                  </Link>
                ) : item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="hover:text-royal-600 dark:hover:text-royal-400 transition-colors max-w-[180px] sm:max-w-xs truncate"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <span className="text-royal-600 dark:text-royal-400 font-semibold max-w-[220px] sm:max-w-md truncate" aria-current="page">
                    {item.name}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
