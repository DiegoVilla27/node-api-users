import { di } from "@core/di";
import { UploadParams } from "@shared/interfaces/upload";
import { handleError } from "@users/infrastructure/errors";
import { Request, Response } from "express";
import multer from "multer";
import { UserIdParamSchema, validateFile } from "./schema";

const storage = multer.memoryStorage();
const upload = multer({ storage });
const userUploadSvc = di.user.uploadUserUseCase;

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

    const params: UploadParams = {
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
