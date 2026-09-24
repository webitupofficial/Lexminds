import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: 'cmd2ojma',
    dataset: 'production',
  },
  // @ts-expect-error - Sanity TypeGen configuration
  typegen: {
    path: '../web/src/**/*.{ts,tsx,js,jsx}',
    schema: './schema.json',
    generates: '../web/sanity.types.ts',
  },
});
