import { di } from "@core/di";
import { UserEntity } from "@users/domain/entities/user";
import { handleError } from "@users/infrastructure/errors";
import { Request, Response } from "express";

const userUpdateSvc = di.user.updateUsersUseCase;

/**
 * Updates a user entity based on the provided request parameters and body.
 * 
 * @param req - The HTTP request object containing user ID in params and user data in the body.
 * @param res - The HTTP response object used to send back the updated user data or an error message.
 * 
 * @throws Will handle and respond with an error if the update process fails.
 */
const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user: UserEntity = req.body;
    const userRes = await userUpdateSvc(id, user);

    res.status(200).json(userRes);
  } catch (error) {
    handleError(error, res, 'Error updating user');
  }
};

export default updateUser;