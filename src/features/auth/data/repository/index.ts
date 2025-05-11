
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
   * 
   * @param user - The user registration data (includes id, name, email, and password).
   */
  async register(user: AuthRegisterEntity): Promise<void> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    user.emailVerified = false;

    const authRef = await this.dataSource.register(AuthRegisterMapper.toModel(user));
    await authRef.update({ id: authRef.id });
  }
}
