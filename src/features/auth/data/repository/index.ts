
import { AuthApiDataSourceImpl } from "@auth/data/datasources";
import { AuthLoginMapper } from "@auth/data/mappers/login";
import { AuthRegisterMapper } from "@auth/data/mappers/register";
import { AuthLoginEntity } from "@auth/domain/entities/login";
import { AuthRegisterEntity } from "@auth/domain/entities/register";
import AuthRepository from "@auth/domain/repository";
import bcrypt from "bcrypt";

/**
 * Concrete implementation of the `AuthRepository` interface responsible for handling 
 * user authentication-related business logic.
 * 
 * The `AuthRepositoryImpl` class interacts with the `AuthApiDataSource` to perform 
 * authentication operations such as login and registration, abstracting the lower-level
 * data source operations and providing a clean API for the higher layers of the application.
 *
 * **Responsibilities:**
 * - Validate user credentials during login.
 * - Hash user passwords before registration.
 * - Delegate authentication operations (login, registration) to the `AuthApiDataSource` data source.
 * - Handle errors such as invalid credentials, unverified emails, and duplicate email registrations.
 */
export class AuthRepositoryImpl implements AuthRepository {
  constructor(private dataSource: AuthApiDataSourceImpl) { }

  /**
   * Handles user login by validating credentials and checking if the user is registered.
   *
   * This method calls the `login` method on the `AuthApiDataSource` to retrieve user data,
   * checks the password match and verifies if the user's email is confirmed.
   * 
   * **Throws:**
   * - `Error`: If the user does not exist, the email is not verified, or the password does not match.
   * 
   * **Steps:**
   * 1. Calls the `login` method from the data source to retrieve the user record.
   * 2. Verifies if the user exists and if their email is verified.
   * 3. Compares the provided password with the stored hash using `bcrypt`.
   * 
   * @param user - The user credentials for login (email and password).
   */
  async login(user: AuthLoginEntity): Promise<void> {
    const loginRef = await this.dataSource.login(AuthLoginMapper.toModel(user));
    const loginSnapshot = await loginRef.docs[0].data();

    if (!loginSnapshot.password) {
      throw new Error('User has not been registered');
    }

    if (!loginSnapshot.emailVerified) {
      throw new Error('User has not verified the email');
    }

    // Compare passwords using bcrypt
    const isMatch = await bcrypt.compare(user.password, loginSnapshot.password);
    if (!isMatch) {
      throw new Error('Invalid password');
    }
  }

  /**
   * Handles user registration by hashing the password and saving the new user.
   *
   * This method takes the user registration data, hashes the password, and saves the new 
   * user to the database. The email is marked as unverified during registration.
   * 
   * **Throws:**
   * - `Error`: If there is an issue with saving the user (e.g., email already exists).
   *
   * **Steps:**
   * 1. Hashes the password using `bcrypt`.
   * 2. Sets the email verification status to `false`.
   * 3. Calls the `register` method from the data source to save the user data.
   * 4. Updates the user record with the newly generated `id` after successful registration.
   * 5. Calls the `sendVerificationEmail` method from the data source to send the email.
   * 6. The email includes a link with a verify token that allows the user to verificate your email.
   * 
   * @param user - The user registration data (includes id, name, email, and password).
   * @param token - Token verify of the user.
   */
  async register(user: AuthRegisterEntity, token: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    user.emailVerified = false;

    const authRef = await this.dataSource.register(AuthRegisterMapper.toModel(user));
    await authRef.update({ id: authRef.id });

    await this.dataSource.sendVerificationEmail(user.email, token);
  }

  /**
   * Initiates the password reset process by sending a reset email with a token.
   *
   * This method generates the password reset flow by sending a reset email to the user.
   * The email contains a link with a unique token that the user can use to reset their password.
   * 
   * **Steps:**
   * 1. Calls the `sendResetEmail` method from the data source to send the email.
   * 2. The email includes a link with a reset token that allows the user to reset their password securely.
   *
   * **Throws:**
   * - `Error`: If there is an issue with sending the email (e.g., service failure).
   *
   * @param email - The email address of the user requesting the password reset.
   * @param token - The reset token used to identify the user and verify the password reset request.
   */
  async forgotPassword(email: string, token: string): Promise<void> {
    await this.dataSource.sendResetEmail(email, token);
  }

  /**
   * Resets the password for a given user by updating the user's password in the database.
   *
   * This method takes the provided email and new password, verifies if the user exists,
   * checks whether the user has been registered, and updates the user's password in the database.
   * 
   * **Steps:**
   * 1. Verifies that a user with the given email exists by calling `searchUserByEmail` in the data source.
   * 2. If the user exists and has a valid password field, the new password is hashed using `bcrypt`.
   * 3. The password field is updated with the newly hashed password.
   *
   * **Throws:**
   * - `Error`: If the user does not exist.
   * - `Error`: If the user has not been registered or does not have a valid password.
   * 
   * @param email - The email address of the user whose password needs to be reset.
   * @param password - The new password to set for the user.
   */
  async resetPassword(email: string, password: string): Promise<void> {
    const userSnapshot = await this.dataSource.searchUserByEmail(email);
    const doc = userSnapshot.docs[0];

    if (!doc.exists) {
      throw new Error('User does not exist');
    }

    const userData = doc.data();

    if (!userData.password) {
      throw new Error('User has not been registered');
    }

    const newPassword = await bcrypt.hash(password, 10);
    await doc.ref.update({ password: newPassword });
  }

  /**
   * Verifies the email address of a given user by updating the user's verification status in the database.
   * 
   * This method takes the provided email, checks if the user exists in the database, 
   * and updates the `emailVerified` field to `true` to mark the user's email as verified.
   * 
   * **Steps:**
   * 1. Searches for the user by the provided email using `searchUserByEmail` in the data source.
   * 2. If the user exists, the `emailVerified` field in the user's document is set to `true`.
   * 
   * **Throws:**
   * - `Error`: If the user does not exist.
   * 
   * @param email - The email address of the user to be verified.
   */
  async verifyEmail(email: string): Promise<void> {
    const userSnapshot = await this.dataSource.searchUserByEmail(email);
    const doc = userSnapshot.docs[0];

    if (!doc.exists) {
      throw new Error('User does not exist');
    }

    await doc.ref.update({ emailVerified: true });
  }
}
