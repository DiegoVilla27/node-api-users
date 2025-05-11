import { AuthRegisterEntity } from "@auth/domain/entities/register";
import { handleError } from "@auth/infrastructure/errors";
import { di } from "@core/di";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { RegisterCreateSchema } from "./schema";

/**
 * Secret key used for signing JWT verify email tokens.
 * It is retrieved from environment variables and cast as a string.
 */
const JWT_VERIFY_SECRET = String(process.env.JWT_VERIFY_SECRET!);

/**
 * Service instance for registering a new user.
 *
 * This constant holds the reference to the `registerUseCase` from the auth dependency container.
 * It handles the logic of registering a user by interacting with the domain layer and
 * applying any necessary validations or business rules.
 */
const registerSvc = di.auth.registerUseCase;

/**
 * Handles user registration and generate a verify token and sending it via email.
 *
 * @param req - The HTTP request object, expected to contain registration data such as name, email, and password.
 * @param res - The HTTP response object used to send back the response.
 *
 * This function validates the request body against the registration schema, then invokes
 * the register service to persist the new user data. Upon successful registration,
 * a success message is returned with a 200 status code.
 *
 * If any error occurs (e.g., invalid data, repository failure), the `handleError` utility
 * is used to return a structured error response.
 */
const registerUser = async (req: Request, res: Response) => {
  try {
    const userParsed = RegisterCreateSchema.parse(req.body) as AuthRegisterEntity;

    const token = jwt.sign(
      { email: userParsed.email },
      JWT_VERIFY_SECRET
    );

    await registerSvc(userParsed, token);

    res.status(200).json({ message: 'User created successfully' });
  } catch (error) {
    handleError(error, res, 'Error register user');
  }
};

export default registerUser;