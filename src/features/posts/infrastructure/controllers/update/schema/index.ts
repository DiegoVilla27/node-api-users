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

/**
 * Regular expression to validate the date format "yyyy-MM-dd".
 * This regex ensures that the date string follows the correct structure 
 * but doesn't guarantee the validity of the date itself.
 */
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Schema for validating post creation data using Zod.
 *
 * This schema defines the structure and validation rules for post input 
 * during the post creation process. It ensures that the input adheres to 
 * the expected types and formats, as well as providing error messages 
 * for invalid or missing fields.
 * 
 * **Keys:**
 * - `id`: Post ID. Must be a non-empty string.
 * - `title`: Required field for the post's title. Must be a non-empty string.
 * - `description`: Required field for the post's description. Must be a non-empty string.
 * - `createDate`: Date string in the format `yyyy-MM-dd`. Must be a valid date.
 */
export const PostCreateSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required').max(20, 'Title must be 20 caracteres.'),
  description: z.string().min(1, 'Description is required').max(150, 'Description must be 100 caracteres.'),
  createDate: z
    .string()
    .regex(DATE_REGEX, 'Create date must be in format yyyy-MM-dd')
    .refine(
      (val) => !isNaN(Date.parse(val)),
      'Create date must be a valid date'
    )
});