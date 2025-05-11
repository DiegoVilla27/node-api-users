import { handleError } from "@auth/infrastructure/errors";
import { di } from "@core/di";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { ForgotPasswordSchema } from "./schema";

/**
 * Secret key used for signing JWT reset password tokens.
 * It is retrieved from environment variables and cast as a string.
 */
const JWT_RESET_SECRET = String(process.env.JWT_RESET_SECRET!);

/**
 * Service instance for handling password reset operations.
 *
 * This constant holds the reference to the `forgotPasswordUseCase` from the auth dependency container.
 * It is used to generate a token and send a password reset email to the user.
 */
const forgotPasswordSvc = di.auth.forgotPasswordUseCase;

/**
 * Handles the password reset request by generating a reset token and sending it via email.
 *
 * @param req - The HTTP request object, expected to contain the `email` in the body.
 * @param res - The HTTP response object used to send back the response.
 *
 * The function validates the request body against the `ForgotPasswordSchema`, generates a reset password token,
 * and invokes the `forgotPasswordUseCase` to send the reset email to the user. If successful, a success message
 * is returned. If there's an error, it is caught and a proper error message is sent using the `handleError` utility.
 */
const forgotPasswordUser = async (req: Request, res: Response) => {
  try {
    const { email } = ForgotPasswordSchema.parse(req.body);

    const token = jwt.sign(
      { email },
      JWT_RESET_SECRET,
      { expiresIn: '15m' }
    );

    await forgotPasswordSvc(email, token);

    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    handleError(error, res, 'Error sending reset email');
  }
};

export default forgotPasswordUser;