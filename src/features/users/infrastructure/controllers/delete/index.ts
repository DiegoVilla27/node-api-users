import { di } from "@core/di";
import { handleError } from "@users/infrastructure/errors";
import { Request, Response } from "express";

const userDeleteSvc = di.user.deleteUsersUseCase;

/**
 * Deletes a user based on the provided ID in the request parameters.
 * 
 * @param req - The HTTP request object containing the user ID in the parameters.
 * @param res - The HTTP response object used to send back the response.
 * 
 * @returns A JSON response with the result of the delete operation.
 * 
 * @throws Will handle errors using the handleError function, sending an appropriate
 * response with a status code and error message.
 */
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userRes = await userDeleteSvc(id);

    res.status(200).json(userRes);
  } catch (error) {
    handleError(error, res, 'Error deleting user');
  }
}

export default deleteUser;