import AuthRepository from "@auth/domain/repository";

/**
 * Creates a use case function for handling the reset password operation.
 *
 * @param authRepository - The repository instance responsible for handling authentication operations.
 * @returns An asynchronous function that takes an email and a new password, and performs the reset password operation.
 */
export const ResetPasswordUseCase = (authRepository: AuthRepository) => {
  return async (email: string, password: string): Promise<void> => {
    return await authRepository.resetPassword(email, password);
  }
}
