import { LoginUseCase } from "@auth/domain/usecases/login";
import { RegisterUseCase } from "@auth/domain/usecases/register";
import { AuthApiDataSourceImpl } from "@auth/data/datasources";
import { AuthRepositoryImpl } from "@auth/data/repository";

/**
 * Instance of the authentication API data source.
 *
 * `AuthApiDataSourceImpl` is the concrete implementation responsible for handling
 * all low-level operations related to authentication, such as making HTTP requests
 * to external authentication APIs or backend services. It acts as the data provider
 * for the authentication repository layer.
 *
 * Responsibilities:
 * - Send HTTP requests (e.g., POST) to external authentication APIs for login or registration.
 * - Handle user authentication data (e.g., tokens, credentials).
 * - Manage API-specific logic such as endpoints, headers, and response formats.
 */
const authApiDataSource = new AuthApiDataSourceImpl();

/**
 * Instance of the authentication repository.
 *
 * `AuthRepositoryImpl` is the concrete implementation of the authentication domain repository.
 * It receives a data source (`authApiDataSource`) and abstracts the data retrieval and
 * manipulation logic for higher layers (such as use cases).
 *
 * Responsibilities:
 * - Act as a bridge between the authentication data source layer and the authentication domain layer.
 * - Encapsulate business logic related to user authentication (e.g., login, registration).
 * - Provide a clean and consistent API for authentication operations.
 */
const authRepository = new AuthRepositoryImpl(authApiDataSource);

/**
 * Dependency injection container for authentication-related use cases.
 *
 * The `diAuth` object serves as a centralized provider for all authentication domain use cases.
 * Each use case is instantiated with the necessary dependencies, particularly the `authRepository`,
 * which abstracts the data access layer.
 *
 * This structure supports separation of concerns and allows easier testing and scalability.
 */
export const diAuth = {
  /**
   * Use case responsible for logging in a user.
   *
   * - Accepts user credentials (e.g., email and password).
   * - Sends the login request to the repository, which handles communication with external APIs.
   * - Returns the result of the login attempt (e.g., authentication tokens, success/failure).
   */
  loginUseCase: LoginUseCase(authRepository),

  /**
   * Use case responsible for registering a new user.
   *
   * - Accepts user registration data (e.g., name, email, password).
   * - Sends the data to the repository for registration.
   * - Returns the result of the registration attempt (e.g., success confirmation, new user details).
   */
  registerUseCase: RegisterUseCase(authRepository)
};
