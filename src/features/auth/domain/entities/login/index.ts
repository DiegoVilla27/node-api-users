/**
 * Represents a auth login entity with basic personal information.
 *
 * @property {string} email - The email address of the user.
 * @property {string} password - The password of the user.
 */
export class AuthLoginEntity {
  email: string;
  password: string;

  constructor(
    email: string,
    password: string
  ) {
    this.email = email;
    this.password = password;
  }
}