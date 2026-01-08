import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string({ error: 'Name is required' }).min(1, 'Name is required'),
  email: z.email({ error: 'Email is required' }),
  password: z.string({ error: 'Password is required' }).min(6, 'Password must be at least 6 characters long'),
});

export const loginSchema = z.object({
  email: z.email({ error: 'Email is required' }),
  password: z.string({ error: 'Password is required' }).min(1, 'Password is required'),
});
