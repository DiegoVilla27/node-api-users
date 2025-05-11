import { AuthLoginEntity } from "@auth/domain/entities/login";
import { AuthRegisterEntity } from "@auth/domain/entities/register";

/**
 * Interface for authentication repository operations.
 * Provides methods for performing authentication-related operations on user entities,
 * such as login and registration.
 *
 * This interface abstracts the underlying logic of interacting with data sources
 * (e.g., databases, APIs) and provides a clean contract for handling user authentication.
 *
 * **Methods:**
 * - `login`: Authenticates a user by verifying their credentials.
 * - `register`: Registers a new user by adding their details to the system.
 */
export interface AuthRepository {
  /**
   * Authenticates a user by verifying their credentials.
   *
   * @param user - The user entity containing the login details, such as email and password.
   * @returns {Promise<void>} A promise indicating the result of the login attempt.
   */
  login(user: AuthLoginEntity): Promise<void>;

  /**
   * Registers a new user by adding their information to the system.
   * 
   * @param user - The user entity containing the registration details, such as name, email, and password.
   * @returns {Promise<void>} A promise indicating the result of the registration attempt.
   */
  register(user: AuthRegisterEntity): Promise<void>;
}

export default AuthRepository;