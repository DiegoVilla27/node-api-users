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
  login(user: AuthLoginEntity): Promise<string>;

  /**
   * Registers a new user by adding their information to the system.
   * 
   * @param user - The user entity containing the registration details, such as name, email, and password.
   * @param token - Token verify of the user.
   * @returns {Promise<string>} A promise indicating the result of the registration attempt.
   */
  register(user: AuthRegisterEntity, token: string): Promise<void>;

  /**
   * Sends a password reset email to the user.
   * 
   * @param email - The email address of the user who requested the password reset.
   * @param token - The reset token used for verifying the password reset request.
   * @returns {Promise<void>} A promise indicating the result of sending the reset email.
   */
  forgotPassword(email: string, token: string): Promise<void>;

  /**
   * Resets the user's password in the system.
   * 
   * @param email - The email address of the user whose password needs to be reset.
   * @param password - The new password to be set for the user.
   * @returns {Promise<void>} A promise indicating the result of the password reset operation.
   */
  resetPassword(email: string, password: string): Promise<void>;

  /**
   * Verifies the user's email in the system.
   * 
   * @param email - The email address of the user to be verified.
   * @returns {Promise<void>} A promise indicating the result of the email verification operation.
   */
  verifyEmail(email: string): Promise<void>;

}

export default AuthRepository;