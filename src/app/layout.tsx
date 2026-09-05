import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import { ThemeProvider } from '@/components/ThemeProvider';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#101116' },
    { media: '(prefers-color-scheme: light)', color: '#F7F3EC' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://lexminds.in'),
  title: {
    default: 'LexMinds India | Legal Education, Research, Writing & Media',
    template: '%s | LexMinds India',
  },
  description:
    'LexMinds India is a student-led platform focused on legal education, research, writing, publications and legal media. Empowering students through legal learning and practical skills.',
  keywords: [
    'LexMinds India',
    'Legal Education India',
    'Law Student Research',
    'Legal Writing and Publications',
    'Legal Media',
    'Student Law Review',
    'Legal Internships India',
    'Case Commentaries',
    'Judgment Analysis'
  ],
  authors: [{ name: 'LexMinds India Team', url: 'https://lexminds.in' }],
  creator: 'LexMinds India',
  publisher: 'LexMinds India',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://lexminds.in',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://lexminds.in',
    title: 'LexMinds | Legal Scholarship & Research Fellowship',
    description:
      'An independent student-led legal scholarship initiative publishing analytical treatises and selective research fellowships.',
    siteName: 'LexMinds',
    images: [
      {
        url: '/icon.svg',
        width: 1200,
        height: 630,
        alt: 'LexMinds Legal Platform Monogram',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LexMinds | Legal Scholarship & Research Fellowship',
    description:
      'An independent student-led legal scholarship initiative publishing analytical treatises and selective research fellowships.',
    site: '@LexMindsIn',
    creator: '@LexMindsIn',
    images: ['/icon.svg'],
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
    apple: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
  },
  manifest: '/manifest.json',
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://lexminds.in/#organization',
      name: 'LexMinds',
      url: 'https://lexminds.in',
      logo: 'https://lexminds.in/icon.svg',
      description: 'An independent student-led legal scholarship initiative and academic research publication platform.',
      sameAs: [
        'https://linkedin.com/company/lexminds-in',
        'https://twitter.com/LexMindsIn'
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Editorial & Academic Secretariat',
        email: 'editorial@lexminds.in',
        areaServed: 'IN',
        availableLanguage: ['en', 'hi']
      }
    },
    {
      '@type': 'WebSite',
      '@id': 'https://lexminds.in/#website',
      url: 'https://lexminds.in',
      name: 'LexMinds',
      publisher: {
        '@id': 'https://lexminds.in/#organization'
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://lexminds.in/articles?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <JsonLd data={orgSchema} />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function() {
              try {
                var stored = localStorage.getItem('lexminds-theme');
                var isDark = stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (isDark) {
                  document.documentElement.classList.add('dark');
                  document.documentElement.classList.remove('light');
                } else {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.classList.add('light');
                }
              } catch (e) {}
            })();`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-paper dark:bg-ink-950 text-ink dark:text-ink-50 antialiased selection:bg-royal selection:text-white transition-colors duration-250 relative overflow-x-hidden">
        {/* Controlled Atmospheric Royal Violet Glow */}
        <div className="atmospheric-glow" aria-hidden="true" />
        {/* Authentic Wrinkled Paper Background Texture */}
        <div className="paper-texture-overlay" aria-hidden="true" />
        <ThemeProvider>
          <div className="relative z-10 flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
