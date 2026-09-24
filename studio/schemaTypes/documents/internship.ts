import { defineType, defineField, defineArrayMember } from 'sanity';

export const internshipType = defineType({
  name: 'internship',
  title: 'Research Fellowship / Internship',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Fellowship Title',
      type: 'string',
      validation: (rule) => rule.required(),
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
      name: 'organization',
      title: 'Host Institution / Wing',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'orgType',
      title: 'Organization Type',
      type: 'string',
      options: {
        list: [
          'Tier-1 Law Firm',
          'Senior Advocate Chambers',
          'Corporate In-House',
          'Legal Tech & Research',
          'Think Tank',
          'Legal Education & Research',
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'practiceArea',
      title: 'Practice Area',
      type: 'string',
      options: {
        list: [
          'Corporate & M&A',
          'Litigation & Dispute Resolution',
          'IPR & Tech Law',
          'Cyber & AI Governance',
          'Criminal & Constitutional Law',
          'Arbitration & Banking',
          'Legal Media & Content Creation',
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      initialValue: 'Online',
    }),
    defineField({
      name: 'mode',
      title: 'Mode',
      type: 'string',
      options: {
        list: ['Remote', 'On-site', 'Hybrid', 'Online'],
      },
      initialValue: 'Online',
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      initialValue: '4 Weeks',
    }),
    defineField({
      name: 'stipend',
      title: 'Stipend / Grant',
      type: 'string',
      initialValue: 'Honorarium & Research Publication Grant',
    }),
    defineField({
      name: 'applicationFee',
      title: 'Application Processing Fee (INR)',
      type: 'number',
      initialValue: 299,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'lateFee',
      title: 'Late Registration Fee (INR)',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'seats',
      title: 'Available Seats / Cohort Size',
      type: 'number',
      initialValue: 10,
    }),
    defineField({
      name: 'deadline',
      title: 'Application Deadline (YYYY-MM-DD)',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured On Homepage',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isClosed',
      title: 'Applications Closed',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'description',
      title: 'Programme Scope & Overview',
      type: 'text',
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'responsibilities',
      title: 'Key Responsibilities / Deliverables',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'eligibility',
      title: 'Eligibility Criteria',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'learningOutcomes',
      title: 'Practical Learning Outcomes',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'selectionProcess',
      title: 'Selection Procedure',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'postedDate',
      title: 'Posting Date (YYYY-MM-DD)',
      type: 'date',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'organization',
      mode: 'mode',
    },
    prepare({ title, subtitle, mode }) {
      return {
        title,
        subtitle: `${subtitle || 'Lex Minds'} (${mode || 'Online'})`,
      };
    },
  },
});
