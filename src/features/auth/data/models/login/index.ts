/**
 * Represents a auth login model with basic personal information.
 *
 * @property {string} email - The email address of the user.
 * @property {string} password - The password of the user.
 */
export class AuthLoginModel {
  email: string;
  password: string;

  constructor(
    email: string,
    password: string
  ) {
    this.email = email;
    this.password = password;
  }

  /**
   * Converts the current instance of `AuthLoginEntity` to a plain JavaScript object.
   *
   * This method is used to transform the instance properties of the `AuthLoginEntity` class
   * into a simple JavaScript object that can be easily serialized or returned in API responses.
   * The `toJSON()` method excludes any methods and returns only the essential login data.
   *
   * **Returns:**
   * - A plain object containing the login properties, formatted for JSON serialization.
   *
   * **Returned Object Structure:**
   * - `email`: The email address associated with the user.
   * - `password`: The password of the user.
   */
  toJSON(): object {
    return {
      email: this.email,
      password: this.password
    }
  }
}