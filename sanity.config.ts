import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/sanity/schemas';

export const sanityConfig = defineConfig({
  name: 'default',
  title: 'Lex Minds Editorial Studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'cmd2ojma',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});

export default sanityConfig;
