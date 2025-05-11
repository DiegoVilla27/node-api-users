import { z } from 'zod';

export const RegisterCreateSchema = z.object({
  id: z.string().optional(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Email must be a valid email address'),
  password: z.string(),
  emailVerified: z.boolean().optional()
});