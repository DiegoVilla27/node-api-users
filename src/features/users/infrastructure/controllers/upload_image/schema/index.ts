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

/**
 * List of allowed MIME types for image uploads.
 *
 * This array defines the permitted image formats for the upload functionality.
 * Only images with MIME types that match one of the values in this array will be accepted.
 */
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png'];

/**
 * Maximum allowed file size for image uploads.
 *
 * This constant defines the maximum file size (in bytes) that an image file can have to be
 * accepted by the upload system. In this case, the limit is set to 2MB.
 */
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

/**
 * Validates an uploaded file to ensure it meets required conditions:
 * - The file is present.
 * - It has a valid structure (original name, buffer, and mimetype).
 * - The MIME type is allowed (`image/jpeg` or `image/png`).
 * - The file size does not exceed 2MB.
 *
 * @param file - The uploaded file to validate (from `multer`, in `req.file`).
 * @returns The validated file if all conditions are met.
 * @throws Will throw an error if:
 *   - The file is missing.
 *   - The file structure is invalid.
 *   - The MIME type is not allowed.
 *   - The file exceeds the size limit.
 */
export const validateFile = (file: Express.Multer.File | undefined): Express.Multer.File => {
  if (!file) {
    throw new Error('File missing');
  }
  if (!file.originalname || !file.buffer || !file.mimetype) {
    throw new Error('Invalid file structure');
  }
  if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    throw new Error('Invalid file type');
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File size exceeds 2MB');
  }
  return file;
}