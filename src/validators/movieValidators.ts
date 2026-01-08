import { z } from 'zod';

export const movieSchema = z.object({
  title: z.string({ error: 'Title is required' }).min(1, 'Title is required'),
  overview: z.string().optional(),
  releaseYear: z.number({ error: 'Release year is required' }),
  genres: z.array(z.string()).optional(),
  runtime: z.number().optional(),
  posterUrl: z.string().url().optional(),
});
