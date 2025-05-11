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

  toJSON(): object {
    return {
      email: this.email,
      password: this.password
    }
  }
}