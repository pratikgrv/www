import { defineConfig, s } from 'velite';

export default defineConfig({
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    clean: true
  },
  collections: {
    posts: {
      name: 'Post',
      pattern: 'posts/**/*.mdx',
      schema: s.object({
        title: s.string().max(99),
        slug: s.path(),
        date: s.isodate(),
        excerpt: s.string(),
        body: s.mdx(),
      }),
    },
  },
});
