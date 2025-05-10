import { UploadParams } from "@shared/interfaces/upload";
import UserRepository from "@users/domain/repository";

/**
 * Creates a use case function for uploading a user image to a remote storage service (e.g., AWS S3)
 * and updating the corresponding user record with the image URL.
 *
 * @param userRepository - The repository instance responsible for user-related data operations,
 *                         including file upload handling and updating user entities.
 * @returns An asynchronous function that takes S3 upload parameters and a user ID,
 *          and performs the image upload and user update.
 */
export const UploadUserUseCase = (userRepository: UserRepository) => {
  return async (params: UploadParams, id: string): Promise<void> => {
    return await userRepository.uploadImage(params, id);
  }
}