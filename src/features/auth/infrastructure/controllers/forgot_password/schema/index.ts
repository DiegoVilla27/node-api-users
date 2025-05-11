import { z } from 'zod';

/**
 * Schema for validating user forgot password data using Zod.
 *
 * This schema defines the structure and validation rules for user input 
 * during the forgot password process. It ensures that all required fields 
 * are provided and meet the expected format.
 *
 * **Keys:**
 * - `email`: Required field for the user's email address. Must be in a valid email format.
 */
export const ForgotPasswordSchema = z.object({
  email: z.string().email('Email must be a valid email address')
});
