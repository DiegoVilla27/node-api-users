import { di } from "@core/di";
import { handleError } from "@users/infrastructure/errors";
import { Request, Response } from "express";

const userGetSvc = di.user.getUsersUseCase;

/**
 * Handles the HTTP request to retrieve a list of users.
 *
 * This function interacts with the user services to fetch user data
 * and sends a JSON response with the retrieved users. In case of an error,
 * it utilizes the handleError function to send an appropriate error response.
 *
 * @param _ - The incoming HTTP request object (unused).
 * @param res - The HTTP response object used to send back the desired HTTP response.
 */
const getUsers = async (_: Request, res: Response) => {
  try {
    const usersRef = await userGetSvc();

    res.status(200).json(usersRef);
  } catch (error) {
    handleError(error, res, 'Error fetching users');
  }
};

export default getUsers;