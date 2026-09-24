export const articleSchema = {
  name: 'article',
  title: 'Scholarly Article',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Article Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'author',
      title: 'Author Details',
      type: 'object',
      fields: [
        { name: 'name', title: 'Author Name', type: 'string', validation: (Rule: any) => Rule.required() },
        { name: 'title', title: 'Designation / Title', type: 'string' },
        { name: 'institution', title: 'Institutional Affiliation', type: 'string', validation: (Rule: any) => Rule.required() },
        { name: 'bio', title: 'Short Bio', type: 'text' },
        { name: 'avatarUrl', title: 'Avatar URL', type: 'url' },
      ],
    },
    {
      name: 'category',
      title: 'Practice Area / Category',
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
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'abstract',
      title: 'Scholarly Abstract',
      type: 'text',
      rows: 4,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'content',
      title: 'Full Treatise Content (Markdown or Text)',
      type: 'text',
      rows: 20,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'readTime',
      title: 'Estimated Read Time',
      type: 'string',
      initialValue: '8 min read',
    },
    {
      name: 'status',
      title: 'Editorial Status',
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
    },
    {
      name: 'publishedAt',
      title: 'Publication Date',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'citationFormat',
      title: 'Standardized Citations',
      type: 'object',
      fields: [
        { name: 'bluebook', title: 'Bluebook Citation', type: 'string' },
        { name: 'oscola', title: 'OSCOLA Citation', type: 'string' },
        { name: 'indian', title: 'Indian Standard Citation', type: 'string' },
      ],
    },
    {
      name: 'keywords',
      title: 'Keywords / Tags',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
};
