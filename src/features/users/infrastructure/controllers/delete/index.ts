import { di } from "@core/di";
import { handleError } from "@users/infrastructure/errors";
import { Request, Response } from "express";
import { UserIdParamSchema } from "./schema";

/**
 * Service instance for deleting a user.
 *
 * This constant refers to the `deleteUsersUseCase` from the user dependency injection container.
 * It encapsulates the business logic required to delete a user by their unique identifier (ID),
 * ensuring any domain-level validations or side effects are handled appropriately.
 */
const userDeleteSvc = di.user.deleteUsersUseCase;
const deletePostsByUserSvc = di.post.getPostsByUserUseCase;

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
    const { id } = UserIdParamSchema.parse(req.params);
    const userRes = await userDeleteSvc(id);
    await deletePostsByUserSvc(id);

    res.status(200).json(userRes);
  } catch (error) {
    handleError(error, res, 'Error deleting user');
  }
}

export default deleteUser;