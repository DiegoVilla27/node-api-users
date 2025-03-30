import { UserEntity } from "@/domain/entities/users";
import { handleError } from "@/infrastructure/errors";
import { UserRepositoryImpl } from "@data/repository/users";
import { UsersUseCase } from "@domain/use-cases/users";
import { Request, Response } from "express";

const userRepository = new UserRepositoryImpl();
const userUseCase = new UsersUseCase(userRepository);

const getUsers = async (_req: Request, res: Response) => {
  try {
    const usersRef = await userUseCase.get();

    res.status(200).json(usersRef);
  } catch (error) {
    handleError(error, res, 'Error fetching users');
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const userBody = req.body as UserEntity;
    const userRes = await userUseCase.create(userBody);

    res.status(200).json(userRes);
  } catch (error) {
    handleError(error, res, 'Error creating user');
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user: UserEntity = req.body;
    const userRes = await userUseCase.update(id, user);

    res.status(200).json(userRes);
  } catch (error) {
    handleError(error, res, 'Error updating user');
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userRes = await userUseCase.delete(id);

    res.status(200).json(userRes);
  } catch (error) {
    handleError(error, res, 'Error deleting user');
  }
}

export {
  createUser, deleteUser, getUsers, updateUser
};

