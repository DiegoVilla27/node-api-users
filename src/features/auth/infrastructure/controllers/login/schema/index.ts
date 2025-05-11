import { z } from 'zod';

export const LoginCreateSchema = z.object({
  email: z.string().email('Email must be a valid email address'),
  password: z.string()
});