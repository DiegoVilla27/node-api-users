import { z } from 'zod';

/**
 * Schema for validating the user ID parameter.
 *
 * This schema is used to validate that the `id` parameter passed in a request is a string.
 * Typically used when validating URL parameters, ensuring that the `id` is in the expected format
 * (string) for identifying a specific user resource.
 *
 * **Keys:**
 * - `id`: Required string field representing the user ID.
 */
export const UserIdParamSchema = z.object({
  id: z.string(),
});