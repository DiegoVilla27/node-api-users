import { AuthRegisterEntity } from "@auth/domain/entities/register";
import { di } from "@core/di";
import { handleError } from "@auth/infrastructure/errors";
import { Request, Response } from "express";
import { RegisterCreateSchema } from "./schema";

const registerSvc = di.auth.registerUseCase;

/**
 * Handles the creation of a new user.
 *
 * @param req - The HTTP request object, containing the user data in the body.
 * @param res - The HTTP response object used to send back the response.
 *
 * Attempts to create a new user using the data provided in the request body.
 * On success, sends a JSON response with the created user data and a 200 status code.
 * If an error occurs, it is handled and an appropriate error response is sent.
 */
const registerUser = async (req: Request, res: Response) => {
  try {
    const userParsed = RegisterCreateSchema.parse(req.body) as AuthRegisterEntity;
    await registerSvc(userParsed);

    res.status(200).json({ message: 'User created successfully' });
  } catch (error) {
    handleError(error, res, 'Error register user');
  }
};

export default registerUser;