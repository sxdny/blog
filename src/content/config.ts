import { glob } from "astro/loaders";
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	loader: glob({ pattern: '**/[^_]*.md', base: './src/blog' }),
	schema: z.object({
		title: z.string(),
		author: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		tags: z.array(z.string()),
		url: z.string()
	}),
});

export const collections = { blog };
