import { z } from 'zod';

export const UserIdParamSchema = z.object({
  id: z.string(),
});

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png'];
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