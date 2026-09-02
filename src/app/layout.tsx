import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import { ThemeProvider } from '@/components/ThemeProvider';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#040814' },
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://lexminds.in'),
  title: {
    default: 'LexMinds | Bridging Legal Education & Industry Practice',
    template: '%s | LexMinds India',
  },
  description:
    'LexMinds connects law students and advocates to verified Tier-1 internships, Supreme Court clerkships, and a peer-reviewed academic article publishing platform.',
  keywords: [
    'Legal Internships India',
    'Law Student Internships',
    'Tier 1 Law Firms',
    'Supreme Court Clerkship',
    'Legal Research Articles',
    'Publish Legal Paper',
    'LexMinds',
    'DPDP Act 2023',
    'Bharatiya Nyaya Sanhita',
    'Corporate Law Internships'
  ],
  authors: [{ name: 'LexMinds Editorial Board', url: 'https://lexminds.in' }],
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
    title: 'LexMinds | Bridging Legal Education & Industry Practice',
    description:
      'Verified legal internships, Supreme Court clerkships, and peer-reviewed legal journal publishing for ambitious law students.',
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
    title: 'LexMinds | Bridging Legal Education & Industry Practice',
    description:
      'Verified legal internships, Supreme Court clerkships, and peer-reviewed legal journal publishing.',
    site: '@LexMindsIn',
    creator: '@LexMindsIn',
    images: ['/icon.svg'],
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
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
      name: 'LexMinds India',
      url: 'https://lexminds.in',
      logo: 'https://lexminds.in/icon.svg',
      description: 'Ecosystem platform connecting law students with verified legal internships and peer-reviewed academic article publishing.',
      sameAs: [
        'https://linkedin.com/company/lexminds-in',
        'https://twitter.com/LexMindsIn'
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+91-11-4982-1000',
        contactType: 'editorial & internships desk',
        areaServed: 'IN',
        availableLanguage: ['en', 'hi']
      }
    },
    {
      '@type': 'LocalBusiness',
      '@id': 'https://lexminds.in/#localbusiness',
      name: 'LexMinds Legal Hub',
      image: 'https://lexminds.in/icon.svg',
      priceRange: '₹199 - ₹499',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Barakhamba Road, Connaught Place',
        addressLocality: 'New Delhi',
        addressRegion: 'Delhi',
        postalCode: '110001',
        addressCountry: 'IN'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '28.6289',
        longitude: '77.2289'
      },
      url: 'https://lexminds.in'
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
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 dark:bg-legal-950 text-slate-900 dark:text-slate-100 antialiased selection:bg-gold-500 selection:text-legal-950 transition-colors duration-300">
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
