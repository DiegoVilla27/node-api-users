import { di } from "@core/di";
import { UserEntity } from "@users/domain/entities/user";
import { handleError } from "@users/infrastructure/errors";
import { Request, Response } from "express";

const userCreateSvc = di.user.createUsersUseCase;

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
const createUser = async (req: Request, res: Response) => {
  try {
    const userBody = req.body as UserEntity;
    const userRes = await userCreateSvc(userBody);

    res.status(200).json(userRes);
  } catch (error) {
    handleError(error, res, 'Error creating user');
  }
};

export default createUser;