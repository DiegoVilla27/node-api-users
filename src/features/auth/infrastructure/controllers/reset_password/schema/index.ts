import { z } from 'zod';

/**
 * Schema for validating the forgot/reset password request payload.
 *
 * This schema ensures that:
 * - The `token` is a required string (typically from the reset email).
 *
 * **Keys:**
 * - `token`: Required string representing the reset token sent via email.
 */
export const ResetPasswordQuerySchema = z.object({
  token: z.string()
});

/**
 * Schema for validating the reset password payload.
 *
 * This schema validates:
 * - `password`: Required, must be at least 8 characters and include letters and numbers.
 * - `confirmPassword`: Required, must match the `password` field.
 *
 * **Keys:**
 * - `password`: The new password chosen by the user.
 * - `confirmPassword`: Must match the `password` field.
 */
export const ResetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[a-zA-Z]/, 'Password must contain letters')
    .regex(/[0-9]/, 'Password must contain numbers'),
  confirmPassword: z.string(),
})
.refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});
