import { handleError } from "@auth/infrastructure/errors";
import { di } from "@core/di";
import { Request, Response } from "express";
import { ResetPasswordQuerySchema, ResetPasswordSchema } from "./schema";
import jwt from 'jsonwebtoken';

/**
 * Secret key used for verifying JWT reset password tokens.
 * It is retrieved from environment variables and cast as a string.
 */
const JWT_RESET_SECRET = String(process.env.JWT_RESET_SECRET!);

/**
 * Service instance for handling password reset operations.
 *
 * This constant holds the reference to the `resetPasswordUseCase` from the auth dependency container.
 * It is used to reset the user's password using the provided token and new password.
 */
const resetPasswordSvc = di.auth.resetPasswordUseCase;

/**
 * Handles the password reset request by verifying the reset token and updating the user's password.
 *
 * @param req - The HTTP request object, expected to contain the `token` in the query and `password` in the body.
 * @param res - The HTTP response object used to send back the response.
 *
 * The function first validates the query parameters and body using `ResetPasswordQuerySchema` and `ResetPasswordSchema`.
 * Then it decodes and verifies the JWT reset token using the `JWT_RESET_SECRET`. After successful token verification,
 * it invokes the `resetPasswordUseCase` to reset the user's password. If successful, a success message is returned.
 * If there's an error, it is caught and a proper error message is sent using the `handleError` utility.
 */
const resetPasswordUser = async (req: Request, res: Response) => {
  try {
    const { token } = ResetPasswordQuerySchema.parse(req.query);
    const { password } = ResetPasswordSchema.parse(req.body);

    const decoded = jwt.verify(token, JWT_RESET_SECRET) as jwt.JwtPayload;

    await resetPasswordSvc(decoded['email'], password);

    res.status(200).json({ message: 'Password has been successfully reset' });
  } catch (error) {
    handleError(error, res, 'Error registering user');
  }
};

export default resetPasswordUser;