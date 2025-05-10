import { di } from "@core/di";
import { handleError } from "@users/infrastructure/errors";
import { Request, Response } from "express";
import { UserIdParamSchema } from "./schema";

const userDeleteImageSvc = di.user.deleteImageUserUseCase;

/**
 * Handles the HTTP request to delete a user's image and update their profile.
 *
 * This function:
 * - Receives a file from the HTTP request (processed by `multer` middleware).
 * - Parses and validates the `id` parameter using Zod (`UserIdParamSchema`).
 * - Calls `userDeleteImageSvc` to handle uploading the file to S3 and updating the user's avatar in the database.
 * - Returns a 200 OK response upon successful delete and update.
 * - Catches and handles any errors using `handleError`, returning appropriate messages and status codes.
 *
 * @param req - The Express HTTP request containing the image file in `req.file`
 *              and the user ID in `req.params.id`.
 * @param res - The Express HTTP response used to send back success or error messages.
 */
const deleteImageUser = async (req: Request, res: Response) => {
  try {
    const { id } = UserIdParamSchema.parse(req.params);

    await userDeleteImageSvc(id);

    res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
    handleError(error, res, 'Error updating user');
  }
};

export default deleteImageUser;
