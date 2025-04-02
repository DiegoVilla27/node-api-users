import UserServicesSingleton from "@app/services";
import { UserEntity } from "@domain/entities/users";
import { handleError } from "@infrastructure/errors";
import { Request, Response } from "express";

const userServices = UserServicesSingleton.getInstance().getUserUseCase();

/**
 * Handles the HTTP request to retrieve a list of users.
 *
 * This function interacts with the user services to fetch user data
 * and sends a JSON response with the retrieved users. In case of an error,
 * it utilizes the handleError function to send an appropriate error response.
 *
 * @param _req - The incoming HTTP request object (unused).
 * @param res - The HTTP response object used to send back the desired HTTP response.
 */
const getUsers = async (_req: Request, res: Response) => {
  try {
    const usersRef = await userServices.get();

    res.status(200).json(usersRef);
  } catch (error) {
    handleError(error, res, 'Error fetching users');
  }
};

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
    const userRes = await userServices.create(userBody);

    res.status(200).json(userRes);
  } catch (error) {
    handleError(error, res, 'Error creating user');
  }
};

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
    const userRes = await userServices.update(id, user);

    res.status(200).json(userRes);
  } catch (error) {
    handleError(error, res, 'Error updating user');
  }
};

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
    const userRes = await userServices.delete(id);

    res.status(200).json(userRes);
  } catch (error) {
    handleError(error, res, 'Error deleting user');
  }
}

export {
  createUser, deleteUser, getUsers, updateUser
};

