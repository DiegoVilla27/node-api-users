import { UploadImageParams } from "@shared/interfaces/upload";
import { UserEntity } from "@users/domain/entities/user";
import { UserResponseEntity } from "@users/domain/entities/user_response";

/**
 * Interface for user repository operations.
 * Provides methods for managing user entities, including creation, retrieval, updating,
 * deletion, and image handling.
 *
 * This interface abstracts the logic for interacting with the data source (e.g., databases, APIs)
 * and defines a clean contract for performing user-related operations.
 *
 * **Methods:**
 * - `get`: Retrieves all users.
 * - `create`: Creates a new user in the system.
 * - `update`: Updates the details of an existing user by ID.
 * - `delete`: Deletes a user from the system by ID.
 * - `getById`: Retrieves a user by their unique identifier.
 * - `uploadImage`: Uploads a profile image for a user.
 * - `deleteImage`: Deletes a user's image, with an option to update the user record.
 */
export interface UserRepository {
  /**
   * Retrieves users.
   *
   * @returns {Promise<UserResponseEntity>} A promise resolving to the user's information.
   */
  get(): Promise<UserResponseEntity>;

  /**
   * Creates a new user in the system.
   *
   * @param user - The user entity containing the details of the user to be created.
   * @returns {Promise<UserEntity>} A promise resolving to the created user entity.
   */
  create(user: UserEntity): Promise<UserEntity>;

  /**
   * Updates the details of an existing user.
   *
   * @param id - The unique identifier of the user to update.
   * @param user - The updated user entity data.
   * @returns {Promise<UserEntity>} A promise resolving to the updated user entity.
   */
  update(id: string, user: UserEntity): Promise<UserEntity>;

  /**
   * Deletes a user from the system.
   *
   * @param id - The unique identifier of the user to delete.
   * @returns {Promise<UserEntity>} A promise resolving to the deleted user entity.
   */
  delete(id: string): Promise<UserEntity>;

  /**
   * Retrieves a user by their unique identifier.
   *
   * @param id - The unique identifier of the user to retrieve.
   * @returns {Promise<UserEntity>} A promise resolving to the retrieved user entity.
   */
  getById(id: string): Promise<UserEntity>;

  /**
   * Uploads a profile image for a specific user.
   *
   * @param params - The image upload parameters (e.g., file data, metadata).
   * @param id - The ID of the user to whom the image will be associated.
   * @returns {Promise<void>} A promise indicating completion of the upload operation.
   */
  uploadImage(params: UploadImageParams, id: string): Promise<void>;

  /**
   * Deletes a user's profile image.
   *
   * @param id - The ID of the user whose image should be deleted.
   * @param updateUser - Whether to update the user record after deletion.
   * @returns {Promise<void>} A promise indicating completion of the deletion operation.
   */
  deleteImage(id: string, updateUser: boolean): Promise<void>;
}

export default UserRepository;