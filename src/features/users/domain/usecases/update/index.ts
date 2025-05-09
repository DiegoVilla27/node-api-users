import { UserEntity } from "@users/domain/entities/user";
import UserRepository from "@users/domain/repository";

/**
 * Creates a use case function for updating an existing user by ID.
 *
 * @param userRepository - The repository instance responsible for user data operations.
 * @returns An asynchronous function that takes a user ID and a UserEntity with the updated data,
 *          and returns the updated UserEntity.
 */
export const UpdateUserUseCase = (userRepository: UserRepository) => {
  return async (id: string, user: UserEntity): Promise<UserEntity> => {
    return await userRepository.update(id, user);
  }
}