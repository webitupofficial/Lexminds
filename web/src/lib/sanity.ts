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
 * Normalizes raw Sanity CMS article data to ensure all UI fields have robust defaults.
 */
export function normalizeArticle(raw: any): Article {
  const id = raw.id || raw._id || `art-${Math.random().toString(36).substring(2, 9)}`;
  const slug = typeof raw.slug === 'string' ? raw.slug : raw.slug?.current || id;
  const authorName = raw.author?.name || 'Contributing Legal Scholar';
  const authorTitle = raw.author?.title || 'Legal Research Contributor';
  const authorInstitution = raw.author?.institution || 'Lex Minds Law Review';
  const authorBio = raw.author?.bio || 'Author and researcher contributing to contemporary Indian legal jurisprudence.';
  const authorAvatarUrl = raw.author?.avatarUrl || undefined;

  const title = raw.title || 'Untitled Treatise';
  const category = (raw.category as Article['category']) || 'Constitutional & Criminal';
  const abstract = raw.abstract || 'Legal analysis and statutory commentary.';
  const content = raw.content || '';
  const publishedAt = raw.publishedAt ? raw.publishedAt.split('T')[0] : new Date().toISOString().split('T')[0];

  const wordCount = content ? content.split(/\s+/).filter(Boolean).length : 500;
  const calculatedReadTime = `${Math.max(3, Math.ceil(wordCount / 200))} min read`;
  const readTime = raw.readTime || calculatedReadTime;

  const year = publishedAt.substring(0, 4) || '2026';
  const defaultCitation = {
    bluebook: `${authorName}, ${title}, 4 LEX MINDS L. REV. ( ${year} ).`,
    oscola: `${authorName}, ‘${title}’ (${year}) 4 Lex Minds Law Review.`,
    indian: `${authorName}, ${title}, (${year}) 4 LMLR.`,
  };

  const citationFormat = {
    bluebook: raw.citationFormat?.bluebook || defaultCitation.bluebook,
    oscola: raw.citationFormat?.oscola || defaultCitation.oscola,
    indian: raw.citationFormat?.indian || defaultCitation.indian,
  };

  const keywords = Array.isArray(raw.keywords) && raw.keywords.length > 0 
    ? raw.keywords 
    : [category, 'Indian Law', 'Legal Analysis'];

  return {
    id,
    slug,
    title,
    author: {
      name: authorName,
      title: authorTitle,
      institution: authorInstitution,
      bio: authorBio,
      avatarUrl: authorAvatarUrl,
    },
    category,
    abstract,
    content,
    readTime,
    publishedAt,
    views: typeof raw.views === 'number' ? raw.views : 1240,
    citationsCount: typeof raw.citationsCount === 'number' ? raw.citationsCount : 8,
    status: raw.status || 'published',
    citationFormat,
    keywords,
  };
}

/**
 * Fetches published articles from Sanity CMS if configured.
 */
export async function fetchSanityArticles(): Promise<Article[] | null> {
  if (!isSanityConfigured || process.env.APP_ENV === 'test') {
    return null;
  }

  try {
    const rawArticles = await sanityClient.fetch<any[]>(ALL_PUBLISHED_ARTICLES_GROQ);
    if (!rawArticles || rawArticles.length === 0) return null;
    return rawArticles.map(normalizeArticle);
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
    const rawArticle = await sanityClient.fetch<any>(ARTICLE_BY_SLUG_GROQ, { slug });
    if (!rawArticle) return null;
    return normalizeArticle(rawArticle);
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
