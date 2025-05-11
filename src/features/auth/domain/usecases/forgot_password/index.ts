import AuthRepository from "@auth/domain/repository";

/**
 * Creates a use case function for handling the forgot password operation.
 *
 * @param authRepository - The repository instance responsible for handling authentication operations.
 * @returns An asynchronous function that takes an email and token, and performs the forgot password operation.
 */
export const ForgotPasswordUseCase = (authRepository: AuthRepository) => {
  return async (email: string, token: string): Promise<void> => {
    return await authRepository.forgotPassword(email, token);
  }
}
