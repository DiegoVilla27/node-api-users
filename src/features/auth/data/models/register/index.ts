/**
 * Represents a auth register model with basic personal information.
 *
 * @property {string} id - The unique identifier for the user.
 * @property {string} firstName - The first name of the user.
 * @property {string} lastName - The last name of the user.
 * @property {string} email - The email address of the user.
 * @property {string} password - The password of the user.
 * @property {boolean} emailVerified - The email verified of the user.
 */
export class AuthRegisterModel {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  emailVerified: boolean;

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    emailVerified: boolean
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.emailVerified = emailVerified;
  }

  /**
   * Converts the current instance of the `AuthRegisterEntity` to a plain JavaScript object.
   *
   * This method is used to transform the instance properties of the `AuthRegisterEntity` class
   * into a simple JavaScript object that can be easily serialized or returned in API responses.
   * The `toJSON()` method excludes any methods and returns only the essential user registration data.
   *
   * **Returns:**
   * - A plain object containing the registration properties, formatted for JSON serialization.
   *
   * **Returned Object Structure:**
   * - `id`: The unique identifier for the user.
   * - `firstName`: The user's first name.
   * - `lastName`: The user's last name.
   * - `email`: The user's email address.
   * - `password`: The user's password.
   * - `emailVerified`: A boolean indicating if the user's email is verified.
   */
  toJSON(): object {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      emailVerified: this.emailVerified
    }
  }
}