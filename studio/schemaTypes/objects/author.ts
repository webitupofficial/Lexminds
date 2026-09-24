import { defineType, defineField } from 'sanity';

export const authorType = defineType({
  name: 'author',
  title: 'Author',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Author Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Designation / Title',
      type: 'string',
    }),
    defineField({
      name: 'institution',
      title: 'Institutional Affiliation',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Short Bio',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'avatarUrl',
      title: 'Avatar URL',
      type: 'url',
    }),
  ],
});
