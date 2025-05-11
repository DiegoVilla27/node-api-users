import { z } from 'zod';

/**
 * Schema for validating user login data using Zod.
 *
 * This schema defines the structure and validation rules for user input 
 * during the login process. It ensures that the input meets the required 
 * format for successful authentication.
 * 
 * **Keys:**
 * - `email`: Required field for the user's email address. Must be a valid email format.
 * - `password`: Required field for the user's password. Must be a string (no additional constraints applied here).
 */
export const LoginCreateSchema = z.object({
  email: z.string().email('Email must be a valid email address'),
  password: z.string()
});
