import { UserResponseEntity } from "@users/domain/entities/user_response";
import UserRepository from "@users/domain/repository";

/**
 * Creates a use case function for retrieving all users.
 *
 * @param userRepository - The repository instance responsible for fetching users.
 * @returns An asynchronous function that returns a UserResponseEntity containing the list of users.
 */
export const GetUsersUseCase = (userRepository: UserRepository) => {
  return async (): Promise<UserResponseEntity> => {
    return await userRepository.get();
  }
}