import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://lexminds.in';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/checkout', '/payment', '/admin', '/api/', '/studio'],
      },
      {
        userAgent: 'GPTBot',
        allow: ['/', '/llms.txt'],
        disallow: ['/checkout', '/payment', '/api/'],
      },
      {
        userAgent: 'ClaudeBot',
        allow: ['/', '/llms.txt'],
        disallow: ['/checkout', '/payment', '/api/'],
      },
      {
        userAgent: 'PerplexityBot',
        allow: ['/', '/llms.txt'],
        disallow: ['/checkout', '/payment', '/api/'],
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
