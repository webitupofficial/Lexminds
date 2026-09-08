import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'Lex Minds Editorial Studio',
  description: 'Editorial CMS studio for managing legal treatises and internship programmes.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
