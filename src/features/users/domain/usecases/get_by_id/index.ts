import { UserEntity } from "@users/domain/entities/user";
import UserRepository from "@users/domain/repository";

/**
 * Creates a use case function for retrieving a user by their unique identifier.
 *
 * @param userRepository - The repository instance responsible for accessing user data.
 * @returns An asynchronous function that takes a user ID (string) and returns a Promise resolving to a UserEntity.
 */
export const GetByIdUserUseCase = (userRepository: UserRepository) => {
  return async (id: string): Promise<UserEntity> => {
    return await userRepository.getById(id);
  }
}