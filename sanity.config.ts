import { schemaTypes } from './src/sanity/schemas';

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'lexminds-cms',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  title: 'LexMinds Editorial CMS',
  apiVersion: '2024-03-01',
  basePath: '/studio',
  schema: {
    types: schemaTypes,
  },
};

export default sanityConfig;
