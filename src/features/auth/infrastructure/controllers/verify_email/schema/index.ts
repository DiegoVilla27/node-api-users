import { z } from 'zod';

/**
 * Schema for verify email request payload.
 *
 * This schema ensures that:
 * - The `token` is a required string.
 *
 * **Keys:**
 * - `token`: Required string representing the verify emaoil token sent via email.
 */
export const VerifyEmailQuerySchema = z.object({
  token: z.string()
});
