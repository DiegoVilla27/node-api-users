import { di } from "@core/di";
import { handleError } from "@users/infrastructure/errors";
import { Request, Response } from "express";
import { UserIdParamSchema } from "./schema";

/**
 * Service instance for retrieving a user by their ID.
 *
 * This constant references the `getByIdUserUseCase` from the user dependency injection container.
 * It encapsulates the business logic required to fetch a specific user by their unique identifier (ID) 
 * from the data source.
 */
const userGetByIdSvc = di.user.getByIdUserUseCase;

/**
 * Handles the HTTP request to retrieve a specific user by their ID.
 *
 * This function:
 * - Extracts the `id` parameter from the request URL.
 * - Invokes the corresponding use case to fetch the user entity from the data source.
 * - Returns the user entity in JSON format with HTTP status 200.
 * - Handles any errors that occur during the process and sends an appropriate error response.
 *
 * @param req - The incoming HTTP request containing the user ID in `req.params`.
 * @param res - The HTTP response object used to send back the retrieved user or an error message.
 */
const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = UserIdParamSchema.parse(req.params);
    const userRef = await userGetByIdSvc(id);

    res.status(200).json(userRef);
  } catch (error) {
    handleError(error, res, 'Error fetching user');
  }
};

export default getUserById;