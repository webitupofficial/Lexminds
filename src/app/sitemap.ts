import { MetadataRoute } from 'next';
import { INITIAL_ARTICLES, INITIAL_INTERNSHIPS } from '@/lib/data-store';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://lexminds.in';
  const now = new Date();

  // Core static landing pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/internships`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/publish`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/mentors`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/editorial-policy`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/refund-policy`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // Dynamic published legal articles
  const articlePages: MetadataRoute.Sitemap = INITIAL_ARTICLES.map((article) => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: new Date(`${article.publishedAt}T00:00:00+05:30`),
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  // Dynamic active internships and fellowships
  const internshipPages: MetadataRoute.Sitemap = INITIAL_INTERNSHIPS.map((internship) => ({
    url: `${baseUrl}/internships/${internship.slug}`,
    lastModified: new Date(`${internship.postedDate}T00:00:00+05:30`),
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  return [...staticPages, ...articlePages, ...internshipPages];
}
