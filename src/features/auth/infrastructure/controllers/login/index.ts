import { AuthLoginEntity } from "@auth/domain/entities/login";
import { handleError } from "@auth/infrastructure/errors";
import { di } from "@core/di";
import { Request, Response } from "express";
import { LoginCreateSchema } from "./schema";

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
 * using the user's email, user's role and returned in the response.
 *
 * On failure, the error is caught and a proper error message is sent using the `handleError` utility.
 */
const loginUser = async (req: Request, res: Response) => {
  try {
    const userParsed = LoginCreateSchema.parse(req.body) as AuthLoginEntity;
    const access_token = await loginSvc(userParsed);

    res.status(200).json({ access_token });
  } catch (error) {
    handleError(error, res, 'Error login user');
  }
};

export default loginUser;