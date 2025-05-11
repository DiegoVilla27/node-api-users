import { AuthRegisterEntity } from "@auth/domain/entities/register";
import AuthRepository from "@auth/domain/repository";

/**
 * Creates a use case function for registering a new user.
 *
 * @param authRepository - The repository instance responsible for handling authentication operations.
 * @returns An asynchronous function that takes an AuthRegisterEntity and performs the registration operation.
 */
export const RegisterUseCase = (authRepository: AuthRepository) => {
  return async (user: AuthRegisterEntity, token: string): Promise<void> => {
    return await authRepository.register(user, token);
  }
}
