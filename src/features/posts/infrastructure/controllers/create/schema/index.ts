import { z } from 'zod';

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
 * - `id`: Optional post ID (typically used for updates or when the ID is auto-generated).
 * - `title`: Required field for the post's title. Must be a non-empty string.
 * - `description`: Required field for the post's description. Must be a non-empty string.
 * - `createDate`: Date string in the format `yyyy-MM-dd`. Must be a valid date.
 * - `idUser`: ID of the user logged.
 */
export const PostCreateSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Title is required').max(20, 'Title must be 20 caracteres.'),
  description: z.string().min(1, 'Description is required').max(150, 'Description must be 100 caracteres.'),
  createDate: z
    .string()
    .regex(DATE_REGEX, 'Create date must be in format yyyy-MM-dd')
    .refine(
      (val) => !isNaN(Date.parse(val)),
      'Create date must be a valid date'
    ),
  idUser: z.string()
});