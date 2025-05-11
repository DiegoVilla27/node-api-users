import { di } from "@core/di";
import { UploadImageParams } from "@shared/interfaces/upload";
import { handleError } from "@users/infrastructure/errors";
import { Request, Response } from "express";
import multer from "multer";
import { UserIdParamSchema, validateFile } from "./schema";

/**
 * Memory storage configuration for file uploads using multer.
 *
 * This configuration uses `multer.memoryStorage()` to store files in memory 
 * rather than on disk. The uploaded files are available in `req.file` as 
 * a buffer, which can then be processed or saved to a database.
 * 
 * Typically used for short-lived files like images or temporary uploads.
 */
const storage = multer.memoryStorage();

/**
 * Multer middleware instance for handling file uploads.
 *
 * This instance is configured with the `storage` defined above to process file uploads 
 * and store them in memory.
 * It is typically used as middleware in routes to handle the upload process.
 * 
 * Files will be available in `req.file` (for single files) or `req.files` (for multiple files).
 */
const upload = multer({ storage });

/**
 * Service instance for uploading a user's image.
 *
 * This constant references the `uploadImageUserUseCase` from the user dependency injection container.
 * It encapsulates the business logic for uploading an image to a user's profile.
 * 
 * Typically used in controllers to handle client requests for uploading profile images.
 */
const userUploadSvc = di.user.uploadImageUserUseCase;

/**
 * Handles the HTTP request to upload a user's image and update their profile.
 *
 * This function:
 * - Receives a file from the HTTP request (processed by `multer` middleware).
 * - Parses and validates the `id` parameter using Zod (`UserIdParamSchema`).
 * - Validates the uploaded file (e.g., presence, type, and size) using `validateFile`.
 * - Constructs a unique image key for S3 using the user ID and original filename.
 * - Builds the `UploadParams` object required for AWS S3 upload.
 * - Calls `userUploadSvc` to handle uploading the file to S3 and updating the user's avatar in the database.
 * - Returns a 200 OK response upon successful upload and update.
 * - Catches and handles any errors using `handleError`, returning appropriate messages and status codes.
 *
 * @param req - The Express HTTP request containing the image file in `req.file`
 *              and the user ID in `req.params.id`.
 * @param res - The Express HTTP response used to send back success or error messages.
 */
const uploadImageUser = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    const fileValid = validateFile(file);

    const { id } = UserIdParamSchema.parse(req.params);

    const imageUrl: string = `${id}_${fileValid.originalname}`;

    const params: UploadImageParams = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: imageUrl,
      Body: fileValid.buffer,
      ContentType: fileValid.mimetype,
    };

    await userUploadSvc(params, id);

    res.status(200).json({ message: 'File upload successfully' });
  } catch (error) {
    handleError(error, res, 'Error updating user');
  }
};

export { upload, uploadImageUser };
