/**
 * Represents a auth register entity with basic personal information.
 *
 * @property {string} id - The unique identifier for the user.
 * @property {string} firstName - The first name of the user.
 * @property {string} lastName - The last name of the user.
 * @property {string} email - The email address of the user.
 * @property {string} password - The password of the user.
 * @property {boolean} emailVerified - The email verified of the user.
 */
export class AuthRegisterEntity {
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
}