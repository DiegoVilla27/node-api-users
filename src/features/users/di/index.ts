import { UserApiDataSourceImpl } from "@users/data/datasources";
import { UserRepositoryImpl } from "@users/data/repository";
import { CreateUserUseCase } from "@users/domain/usecases/create";
import { DeleteUserUseCase } from "@users/domain/usecases/delete";
import { GetUsersUseCase } from "@users/domain/usecases/get";
import { UpdateUserUseCase } from "@users/domain/usecases/update";
import { GetByIdUserUseCase } from "@users/domain/usecases/get_by_id";
import { UploadImageUserUseCase } from "@users/domain/usecases/upload_image";
import { DeleteImageUserUseCase } from "@users/domain/usecases/delete_image";

/**
 * Instance of the user API data source.
 *
 * `UserApiDataSourceImpl` is the concrete implementation responsible for handling
 * all low-level operations related to user data, such as making HTTP requests to an external API
 * or backend service. It acts as the data provider for the repository layer.
 *
 * Responsibilities:
 * - Send HTTP requests (GET, POST, PUT, DELETE) to external APIs.
 * - Serialize and deserialize user data.
 * - Handle API-specific logic such as endpoints, headers, and response formats.
 */
const userApiDataSource = new UserApiDataSourceImpl();

/**
 * Instance of the user repository.
 *
 * `UserRepositoryImpl` is the concrete implementation of the user domain repository.
 * It receives a data source (`userApiDataSource`) and abstracts the data retrieval and
 * manipulation logic for higher layers (such as use cases).
 *
 * Responsibilities:
 * - Act as a bridge between the data source layer and the domain layer.
 * - Map and transform raw data into domain entities.
 * - Encapsulate business logic related to user persistence.
 * - Provide a clean and consistent API for user operations (CRUD, image upload, etc.).
 */
const userRepository = new UserRepositoryImpl(userApiDataSource);

/**
 * Dependency injection container for user-related use cases.
 *
 * The `diUsers` object serves as a centralized provider for all user domain use cases.
 * Each use case is instantiated with the necessary dependencies, particularly the `userRepository`,
 * which abstracts the data access layer.
 *
 * This structure supports separation of concerns and allows easier testing and scalability.
 */
export const diUsers = {
  /**
   * Use case responsible for retrieving all users from the repository.
   *
   * - Calls the repository's method to fetch a list of users.
   * - Returns domain-mapped user entities.
   * - Typically used in listing or administrative views.
   */
  getUsersUseCase: GetUsersUseCase(userRepository),

  /**
   * Use case responsible for creating a new user.
   *
   * - Receives user creation data (e.g., name, email, etc.).
   * - Validates and sends the data to the repository for persistence.
   * - Returns the created user or status confirmation.
   */
  createUsersUseCase: CreateUserUseCase(userRepository),

  /**
   * Use case responsible for updating an existing user by ID.
   *
   * - Accepts an identifier and updated user data.
   * - Delegates to the repository to perform the update.
   * - Returns the updated user or success status.
   */
  updateUsersUseCase: UpdateUserUseCase(userRepository),

  /**
   * Use case responsible for deleting a user by ID.
   *
   * - Receives a user identifier.
   * - Invokes the repository to remove the user from the data source.
   * - Returns a success/failure status.
   */
  deleteUsersUseCase: DeleteUserUseCase(userRepository),

  /**
   * Use case responsible for retrieving a single user by ID.
   *
   * - Accepts a user identifier.
   * - Fetches and returns the corresponding user entity from the repository.
   * - Used in detail or profile views.
   */
  getByIdUserUseCase: GetByIdUserUseCase(userRepository),

  /**
   * Use case responsible for uploading a user image (e.g., avatar/profile picture).
   *
   * - Accepts a user identifier and file data.
   * - Delegates the upload process to the repository, often to a remote storage service.
   * - Returns upload result or updated user info.
   */
  uploadImageUserUseCase: UploadImageUserUseCase(userRepository),

  /**
   * Use case responsible for deleting a user's uploaded image.
   *
   * - Accepts the user ID or image identifier.
   * - Calls the repository to remove the image from storage.
   * - Returns operation result (success/failure).
   */
  deleteImageUserUseCase: DeleteImageUserUseCase(userRepository),
};
