import AuthRepository from "@auth/domain/repository";

/**
 * Creates a use case function for handling the email verification operation.
 *
 * @param authRepository - The repository instance responsible for handling authentication operations.
 * @returns An asynchronous function that takes an email and performs the email verification operation.
 */
export const VerifyEmailUseCase = (authRepository: AuthRepository) => {
  return async (email: string): Promise<void> => {
    return await authRepository.verifyEmail(email);
  }
}
