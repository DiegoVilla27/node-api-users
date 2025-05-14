import { z } from 'zod';

/**
 * Schema for validating the post ID parameter.
 *
 * This schema is used to validate that the `id` parameter passed in a request is a string.
 * Typically used when validating URL parameters, ensuring that the `id` is in the expected format
 * (string) for identifying a specific post resource.
 *
 * **Keys:**
 * - `id`: Required string field representing the post ID.
 */
export const PostIdParamSchema = z.object({
  id: z.string(),
});
