import { AuthLoginEntity } from "@auth/domain/entities/login";
import AuthRepository from "@auth/domain/repository";

/**
 * Creates a use case function for creating a new user.
 *
 * @param userRepository - The repository instance responsible for handling user persistence.
 * @returns An asynchronous function that takes a UserEntity and returns the created UserEntity.
 */
export const LoginUseCase = (authRepository: AuthRepository) => {
  return async (user: AuthLoginEntity): Promise<void> => {
    return await authRepository.login(user);
  }
}