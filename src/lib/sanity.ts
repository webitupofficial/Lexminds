import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import { Article, Internship } from './types';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = '2024-03-01';

export const isSanityConfigured = Boolean(
  projectId && projectId.trim() !== '' && projectId !== 'lexminds-cms' && !projectId.includes('placeholder')
);

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: process.env.NODE_ENV === 'production',
      token: process.env.SANITY_API_READ_TOKEN,
    })
  : createClient({
      projectId: 'placeholder-project',
      dataset: 'production',
      apiVersion,
      useCdn: false,
    });

const imageBuilder = createImageUrlBuilder(sanityClient);

export function urlForSanityImage(source: any) {
  if (!isSanityConfigured || !source) return null;
  return imageBuilder.image(source);
}

// ==============================================================================
// GROQ Queries
// ==============================================================================

export const ALL_PUBLISHED_ARTICLES_GROQ = `*[_type == "article" && status == "published"] | order(publishedAt desc) {
  "id": _id,
  "slug": slug.current,
  title,
  author,
  category,
  abstract,
  content,
  readTime,
  publishedAt,
  views,
  citationsCount,
  status,
  citationFormat,
  keywords
}`;

export const ARTICLE_BY_SLUG_GROQ = `*[_type == "article" && slug.current == $slug][0] {
  "id": _id,
  "slug": slug.current,
  title,
  author,
  category,
  abstract,
  content,
  readTime,
  publishedAt,
  views,
  citationsCount,
  status,
  citationFormat,
  keywords
}`;

export const ALL_INTERNSHIPS_GROQ = `*[_type == "internship"] | order(postedDate desc) {
  "id": _id,
  "slug": slug.current,
  title,
  organization,
  orgType,
  practiceArea,
  location,
  mode,
  duration,
  stipend,
  applicationFee,
  seats,
  deadline,
  featured,
  description,
  responsibilities,
  eligibility,
  learningOutcomes,
  selectionProcess,
  postedDate
}`;

export const INTERNSHIP_BY_SLUG_GROQ = `*[_type == "internship" && slug.current == $slug][0] {
  "id": _id,
  "slug": slug.current,
  title,
  organization,
  orgType,
  practiceArea,
  location,
  mode,
  duration,
  stipend,
  applicationFee,
  seats,
  deadline,
  featured,
  description,
  responsibilities,
  eligibility,
  learningOutcomes,
  selectionProcess,
  postedDate
}`;

/**
 * Fetches published articles from Sanity CMS if configured.
 */
export async function fetchSanityArticles(): Promise<Article[] | null> {
  if (!isSanityConfigured || process.env.APP_ENV === 'test') {
    return null;
  }

  try {
    const articles = await sanityClient.fetch<Article[]>(ALL_PUBLISHED_ARTICLES_GROQ);
    return articles && articles.length > 0 ? articles : null;
  } catch (err: any) {
    console.warn('[Sanity CMS Warning]: Failed to fetch articles from Sanity:', err.message || err);
    return null;
  }
}

/**
 * Fetches a published article by slug from Sanity CMS if configured.
 */
export async function fetchSanityArticleBySlug(slug: string): Promise<Article | null> {
  if (!isSanityConfigured || process.env.APP_ENV === 'test') {
    return null;
  }

  try {
    return await sanityClient.fetch<Article>(ARTICLE_BY_SLUG_GROQ, { slug });
  } catch (err: any) {
    console.warn(`[Sanity CMS Warning]: Failed to fetch article "${slug}" from Sanity:`, err.message || err);
    return null;
  }
}

/**
 * Fetches fellowships/internships from Sanity CMS if configured.
 */
export async function fetchSanityInternships(): Promise<Internship[] | null> {
  if (!isSanityConfigured || process.env.APP_ENV === 'test') {
    return null;
  }

  try {
    const internships = await sanityClient.fetch<Internship[]>(ALL_INTERNSHIPS_GROQ);
    return internships && internships.length > 0 ? internships : null;
  } catch (err: any) {
    console.warn('[Sanity CMS Warning]: Failed to fetch internships from Sanity:', err.message || err);
    return null;
  }
}

/**
 * Fetches fellowship by slug from Sanity CMS if configured.
 */
export async function fetchSanityInternshipBySlug(slug: string): Promise<Internship | null> {
  if (!isSanityConfigured || process.env.APP_ENV === 'test') {
    return null;
  }

  try {
    return await sanityClient.fetch<Internship>(INTERNSHIP_BY_SLUG_GROQ, { slug });
  } catch (err: any) {
    console.warn(`[Sanity CMS Warning]: Failed to fetch internship "${slug}" from Sanity:`, err.message || err);
    return null;
  }
}
