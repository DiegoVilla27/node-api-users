import { z } from 'zod';

/**
 * Schema for validating user registration data using Zod.
 *
 * This schema defines the structure and validation rules for user input 
 * during the registration process. It ensures that all required fields 
 * are provided and meet the expected format.
 *
 * **Keys:**
 * - `id`: Optional field for the user's ID. Typically used when the ID is auto-generated or provided manually.
 * - `firstName`: Required field for the user's first name. Must be a non-empty string.
 * - `lastName`: Required field for the user's last name. Must be a non-empty string.
 * - `email`: Required field for the user's email address. Must be in a valid email format.
 * - `password`: Required, must be at least 8 characters and include letters and numbers.
 * - `emailVerified`: Optional boolean indicating whether the user's email is already verified.
 */
export const RegisterCreateSchema = z.object({
  id: z.string().optional(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Email must be a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[a-zA-Z]/, 'Password must contain letters')
    .regex(/[0-9]/, 'Password must contain numbers'),
  emailVerified: z.boolean().optional()
});
