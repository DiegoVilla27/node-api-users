import UserRepository from "@users/domain/repository";

/**
 * Creates a use case function for delete a user image to a remote storage service (e.g., AWS S3)
 * and deleting the corresponding user record with the image URL.
 *
 * @param userRepository - The repository instance responsible for user-related data operations,
 *                         including file delete handling and updating user entities.
 * @returns An asynchronous function that takes user ID,
 *          and performs the image delete and user update.
 */
export const DeleteImageUserUseCase = (userRepository: UserRepository) => {
  return async (id: string): Promise<void> => {
    return await userRepository.deleteImage(id, true);
  }
}