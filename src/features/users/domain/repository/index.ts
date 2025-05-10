import { UploadParams } from "@shared/interfaces/upload";
import { UserEntity } from "@users/domain/entities/user";
import { UserResponseEntity } from "@users/domain/entities/user_response";

/**
 * Interface for user repository operations.
 * Provides methods to perform CRUD operations on user entities.
 *
 * @method get - Retrieves a list of users wrapped in a UserResponseEntity.
 * @method create - Adds a new user and returns the created UserEntity.
 * @method update - Updates an existing user by ID and returns the updated UserEntity.
 * @method delete - Removes a user by ID and returns the deleted UserEntity.
 * @method getById - Retrieve a user by ID and returns the UserEntity.
 * @method uploadImage - Uploads an image to a remote storage service (e.g., AWS S3) and updates the user entity with the image URL.
 *                       Takes upload parameters and the user ID as arguments.
 */
export interface UserRepository {
  get(): Promise<UserResponseEntity>;
  create(user: UserEntity): Promise<UserEntity>;
  update(id: string, user: UserEntity): Promise<UserEntity>;
  delete(id: string): Promise<UserEntity>;
  getById(id: string): Promise<UserEntity>;
  uploadImage(params: UploadParams, id: string): Promise<void>;
}

export default UserRepository;