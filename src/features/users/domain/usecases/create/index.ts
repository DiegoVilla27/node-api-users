import { UserEntity } from "@users/domain/entities/user";
import UserRepository from "@users/domain/repository";

/**
 * Creates a use case function for creating a new user.
 *
 * @param userRepository - The repository instance responsible for handling user persistence.
 * @returns An asynchronous function that takes a UserEntity and returns the created UserEntity.
 */
export const CreateUserUseCase = (userRepository: UserRepository) => {
  return async (user: UserEntity): Promise<UserEntity> => {
    return await userRepository.create(user);
  }
}