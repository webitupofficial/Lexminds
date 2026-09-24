import { defineType, defineField, defineArrayMember } from 'sanity';

export const articleType = defineType({
  name: 'article',
  title: 'Scholarly Article / Treatise',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Article Title',
      type: 'string',
      validation: (rule) => rule.required().error('Article title is mandatory for publication indexing.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author Details',
      type: 'author',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Practice Area / Subject Domain',
      type: 'string',
      options: {
        list: [
          'Data Privacy & Tech Law',
          'Constitutional & Criminal',
          'Corporate & M&A',
          'Intellectual Property',
          'Arbitration & Banking',
          'Environmental Jurisprudence',
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'abstract',
      title: 'Scholarly Abstract',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required().min(50).warning('Abstracts should provide a comprehensive overview.'),
    }),
    defineField({
      name: 'content',
      title: 'Full Treatise Content (Markdown)',
      type: 'text',
      rows: 25,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'readTime',
      title: 'Estimated Read Time',
      type: 'string',
      initialValue: '7 min read',
    }),
    defineField({
      name: 'status',
      title: 'Editorial Review Status',
      type: 'string',
      options: {
        list: [
          { title: 'Published Live', value: 'published' },
          { title: 'Under Review', value: 'under_review' },
          { title: 'Draft', value: 'draft' },
          { title: 'Rejected', value: 'rejected' },
        ],
      },
      initialValue: 'published',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publication Date',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'citationFormat',
      title: 'Standardized Legal Citations',
      type: 'object',
      fields: [
        defineField({ name: 'bluebook', title: 'Bluebook Citation', type: 'string' }),
        defineField({ name: 'oscola', title: 'OSCOLA Citation', type: 'string' }),
        defineField({ name: 'indian', title: 'Indian Standard Citation', type: 'string' }),
      ],
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords / Statutory Dockets',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'string',
        }),
      ],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'views',
      title: 'Total View Count',
      type: 'number',
      initialValue: 1200,
    }),
    defineField({
      name: 'citationsCount',
      title: 'Recorded Citations Count',
      type: 'number',
      initialValue: 12,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      category: 'category',
    },
    prepare({ title, author, category }) {
      return {
        title,
        subtitle: `${author ? `By ${author}` : 'No author'} • ${category || 'Uncategorized'}`,
      };
    },
  },
});
