import { handleError } from "@auth/infrastructure/errors";
import { di } from "@core/di";
import { Request, Response } from "express";
import { VerifyEmailQuerySchema } from "./schema";
import jwt from 'jsonwebtoken';

/**
 * Secret key used for verifying JWT email verification tokens.
 * It is retrieved from environment variables and cast as a string.
 */
const JWT_RESET_SECRET = String(process.env.JWT_RESET_SECRET!);

/**
 * Service instance for handling email verification operations.
 *
 * This constant holds the reference to the `verifyEmailUseCase` from the auth dependency container.
 * It is used to mark a user's email as verified after decoding and validating the provided token.
 */
const verifyEmailSvc = di.auth.verifyEmailUseCase;

/**
 * Handles the email verification request by decoding and validating the provided JWT token.
 *
 * @param req - The HTTP request object, expected to contain the `token` in the query parameters.
 * @param res - The HTTP response object used to send back the response.
 *
 * The function first validates the query using `VerifyEmailQuerySchema` to extract the token.
 * Then, it decodes and verifies the JWT token using the `JWT_RESET_SECRET`. If the token is valid,
 * it invokes the `verifyEmailUseCase` to mark the user's email as verified. Upon success,
 * a confirmation message is returned. If any error occurs during the process, it is caught
 * and an appropriate error message is returned using the `handleError` utility.
 */
const verifyEmailUser = async (req: Request, res: Response) => {
  try {
    const { token } = VerifyEmailQuerySchema.parse(req.query);

    const decoded = jwt.verify(token, JWT_RESET_SECRET) as jwt.JwtPayload;

    await verifyEmailSvc(decoded['email']);

    res.status(200).json({ message: 'Email has been successfully verified' });
  } catch (error) {
    handleError(error, res, 'Error verifying email');
  }
};

export default verifyEmailUser;