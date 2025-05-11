import { AuthLoginEntity } from "@auth/domain/entities/login";
import AuthRepository from "@auth/domain/repository";

/**
 * Creates a use case function for logging in a user.
 *
 * @param authRepository - The repository instance responsible for handling authentication operations.
 * @returns An asynchronous function that takes an AuthLoginEntity and performs the login operation.
 */
export const LoginUseCase = (authRepository: AuthRepository) => {
  return async (user: AuthLoginEntity): Promise<void> => {
    return await authRepository.login(user);
  }
}
