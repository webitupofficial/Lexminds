import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  Building, 
  MapPin, 
  Clock, 
  Calendar, 
  GraduationCap, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Share2, 
  Scale, 
  Award,
  Sparkles,
  DollarSign
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import { INITIAL_INTERNSHIPS } from '@/lib/data-store';
import InternshipDetailClient from './InternshipDetailClient';

interface Props {
  params: {
    slug: string;
  };
}

function getInternship(slug: string) {
  return (
    INITIAL_INTERNSHIPS.find((i) => i.slug === slug) ||
    (slug === 'legal-research-editorial-fellowship' || slug === 'legal-media-internship'
      ? INITIAL_INTERNSHIPS[0]
      : undefined)
  );
}

export async function generateStaticParams() {
  const baseParams = INITIAL_INTERNSHIPS.map((internship) => ({
    slug: internship.slug,
  }));
  return [
    ...baseParams,
    { slug: 'legal-research-editorial-fellowship' },
    { slug: 'legal-media-internship' },
  ];
}

export async function generateMetadata({ params }: Props) {
  const internship = getInternship(params.slug);
  if (!internship) return { title: 'Internship Not Found' };

  return {
    title: `${internship.title} - ${internship.organization}`,
    description: `Apply for ${internship.title} at ${internship.organization}. Duration: ${internship.duration}. Mode: ${internship.mode}. Registration Fee: ₹${internship.applicationFee}. Verified via LexMinds.`,
    alternates: {
      canonical: `https://lexminds.in/internships/${internship.slug}`,
    },
    openGraph: {
      title: `${internship.title} | LexMinds`,
      description: internship.description,
      url: `https://lexminds.in/internships/${internship.slug}`,
      siteName: 'LexMinds',
    },
  };
}

export default function InternshipDetailPage({ params }: Props) {
  const internship = getInternship(params.slug);

  if (!internship) {
    notFound();
  }

  // Schema.org JobPosting format
  const jobPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: internship.title,
    description: internship.description,
    identifier: {
      '@type': 'PropertyValue',
      name: 'LexMinds Docket',
      value: internship.id,
    },
    datePosted: `${internship.postedDate}T00:00:00+05:30`,
    validThrough: `${internship.deadline}T23:59:59+05:30`,
    employmentType: 'INTERN',
    hiringOrganization: {
      '@type': 'Organization',
      name: internship.organization,
      sameAs: 'https://lexminds.in',
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: internship.location,
        addressCountry: 'IN',
      },
    },
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: 'INR',
      value: {
        '@type': 'QuantitativeValue',
        value: internship.stipend,
        unitText: 'MONTH',
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <JsonLd data={jobPostingSchema} />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { name: 'Internship Portal', href: '/internships' },
          { name: internship.title },
        ]}
      />

      <InternshipDetailClient internship={internship} />
    </div>
  );
}
