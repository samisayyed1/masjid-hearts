import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// The browser editor can save blank optional fields as '' or null; treat those as "not set".
const blank = (v: unknown) => (v === '' || v === null ? undefined : v);

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string().max(220),
      date: z.coerce.date(),
      updated: z.preprocess(blank, z.coerce.date().optional()),
      category: z.enum(['Faith', 'Community', 'Giving', 'Masajid']),
      author: z.preprocess(blank, z.string().default('Masjid Hearts')),
      // Optional photo. Without one, the site draws a cover from the motif.
      cover: z.preprocess(blank, image().optional()),
      coverAlt: z.preprocess(blank, z.string().optional()),
      motif: z.preprocess(blank, z.enum(['star', 'arch', 'lattice', 'dome']).default('star')),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

export const collections = { articles };
