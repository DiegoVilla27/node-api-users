import { UserEntity } from "@users/domain/entities/user";
import UserRepository from "@users/domain/repository";

/**
 * Creates a use case function for deleting a user by ID.
 *
 * @param userRepository - The repository instance responsible for handling user operations.
 * @returns An asynchronous function that takes a user ID and returns the deleted UserEntity.
 */
export const DeleteUserUseCase = (userRepository: UserRepository) => {
  return async (id: string): Promise<UserEntity> => {
    return await userRepository.delete(id);
  }
}