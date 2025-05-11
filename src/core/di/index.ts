import { diAuth } from "@auth/di";
import { diUsers } from "@users/di";

/**
 * Dependency Injection (DI) configuration.
 * 
 * This object encapsulates the setup for Dependency Injection (DI) and provides access to various 
 * use cases related to user management and authentication. It holds references to the features 
 * each of which includes the individual use cases and their respective dependencies.
 * 
 * The `di` object centralizes the DI configuration, making it easier to manage and inject dependencies 
 * into components, services, or controllers that require them.
 * 
 * **Properties**:
 * - `user`: Contains all user-related use cases and their dependencies (e.g., creating, updating, 
 *   retrieving, and deleting users).
 * - `auth`: Contains all authentication-related use cases and their dependencies (e.g., login, 
 *   registration, authentication checks).
 * 
 * By using DI, the `di` object helps to decouple the logic for managing users and authentication 
 * from the rest of the application, fostering better code maintainability and testability.
 * 
 * @constant di
 */
export const di = {
  /**
   * Contains all user-related use cases and their dependencies. This object is responsible for managing
   * the entire lifecycle of user data, including creation, retrieval, updates, deletion, and image uploads.
   * 
   * **Properties**:
   * - `getUsersUseCase`: A use case for retrieving all users from the system.
   * - `createUsersUseCase`: A use case for creating a new user in the system.
   * - `updateUsersUseCase`: A use case for updating an existing user by their ID.
   * - `deleteUsersUseCase`: A use case for deleting a user by their ID.
   * - `getByIdUserUseCase`: A use case for retrieving a user by their ID.
   * - `uploadImageUserUseCase`: A use case for uploading an image for a user.
   * - `deleteImageUserUseCase`: A use case for deleting an image for a user.
   */
  user: diUsers,
  /**
   * Contains all authentication-related use cases and their dependencies. This object is responsible 
   * for managing the authentication process, including login, registration, and authentication checks.
   * 
   * **Properties**:
   * - `loginUseCase`: A use case for handling user login.
   * - `registerUseCase`: A use case for handling user registration.
   */
  auth: diAuth,
};