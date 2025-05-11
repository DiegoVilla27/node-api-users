import { AuthLoginEntity } from "@auth/domain/entities/login";
import { handleError } from "@auth/infrastructure/errors";
import { di } from "@core/di";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { LoginCreateSchema } from "./schema";

/**
 * Secret key used for signing JWT tokens.
 * It is retrieved from environment variables and cast as a string.
 */
const JWT_SECRET = String(process.env.JWT_SECRET!);

/**
 * Expiration time for JWT tokens.
 * Defines how long the issued token will be valid (e.g., '1d' = 1 day).
 */
const JWT_EXPIRES_IN = '1d';

/**
 * Service instance for logging in a user.
 *
 * This constant holds the reference to the `loginUseCase` from the auth dependency container.
 * It is used to perform the login logic by verifying user credentials against the domain layer.
 */
const loginSvc = di.auth.loginUseCase;

/**
 * Handles user login and token generation.
 *
 * @param req - The HTTP request object, expected to contain `email` and `password` in the body.
 * @param res - The HTTP response object used to send back the response.
 *
 * The function validates the request body against the login schema, then invokes
 * the login service to authenticate the user. If successful, a JWT token is generated 
 * using the user's email and returned in the response.
 *
 * On failure, the error is caught and a proper error message is sent using the `handleError` utility.
 */
const loginUser = async (req: Request, res: Response) => {
  try {
    const userParsed = LoginCreateSchema.parse(req.body) as AuthLoginEntity;
    await loginSvc(userParsed);

    const token = jwt.sign({ email: userParsed.email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN
    });

    res.status(200).json({ token });
  } catch (error) {
    handleError(error, res, 'Error login user');
  }
};

export default loginUser;