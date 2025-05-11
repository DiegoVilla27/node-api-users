import { AuthLoginModel } from "@auth/data/models/login";
import { AuthRegisterModel } from "@auth/data/models/register";
import db from "@core/database/firebase";
import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY!;
const COLLECTION_USER: string = "users";

/**
 * Interface for interacting with the Firebase Firestore data source for authentication-related operations.
 *
 * This interface defines the methods for handling authentication operations, such as logging in and registering users.
 * It serves as the contract for any class implementing authentication logic in the application.
 *
 * Responsibilities:
 * - Provide methods for logging in users based on their credentials.
 * - Provide methods for registering new users and handling their data.
 *
 * @interface
 */
export interface AuthApiDataSource {
  /**
   * Logs in a user by their credentials.
   *
   * @param user The user's login model.
   * @returns A promise that resolves to the `QuerySnapshot` of the user.
   */
  login(user: AuthLoginModel): Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>;

  /**
   * Registers a new user in the database.
   *
   * @param user The user's registration model.
   * @returns A promise that resolves to the `DocumentReference` of the newly created user.
   */
  register(user: AuthRegisterModel): Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>;

  /**
   * Sends a password reset email to the provided email address.
   *
   * @param email - The email address to which the reset email will be sent.
   * @param token - The unique token that will be embedded in the reset password link.
   */
  sendResetEmail(email: string, token: string): Promise<void>;

  /**
   * Sends a verification email to the provided email address.
   *
   * @param email - The email address to which the verify email will be sent.
   * @param token - The unique token that will be embedded in the verify link.
   */
  sendVerificationEmail(email: string, token: string): Promise<void>;

  /**
   * Searches for a user by their email address in the Firestore database.
   *
   * @param email - The email address to search for in the database.
   * @returns A promise that resolves to a `QuerySnapshot` containing the user data if found.
   */
  searchUserByEmail(email: string): Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>;
}

/**
 * Concrete implementation of the `AuthApiDataSource` interface for interacting with Firebase Firestore.
 *
 * `AuthApiDataSourceImpl` is responsible for performing the actual database operations related to user authentication.
 * This class directly communicates with Firestore to handle user login and registration logic.
 *
 * Responsibilities:
 * - Perform Firestore queries to check user credentials and register new users.
 * - Handle common errors like non-existent emails or existing email conflicts.
 *
 * @class
 */
export class AuthApiDataSourceImpl implements AuthApiDataSource {
  /**
   * Logs in a user by verifying their email.
   *
   * - Queries Firestore to check if the user's email exists in the 'users' collection.
   * - Throws an error if the email does not exist in the collection.
   * - Returns a `QuerySnapshot` containing the user's data.
   *
   * @param user The user's login credentials.
   * @returns A promise that resolves to the `QuerySnapshot` containing the user's data.
   * @throws Error if the email does not exist in Firestore.
   */
  async login(user: AuthLoginModel): Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>> {
    const snapshot = await db.collection('users').where('email', '==', user.email).limit(1).get();
    if (snapshot.empty) {
      throw new Error('Email does not exist');
    }
    return snapshot;
  }

  /**
   * Registers a new user if the email is not already in use.
   *
   * - First checks Firestore to ensure the email is not already registered.
   * - Throws an error if the email is already in use.
   * - Creates a new user document in the Firestore 'users' collection.
   * - Returns a `DocumentReference` for the newly created user document.
   *
   * @param user The user's registration data.
   * @returns A promise that resolves to the `DocumentReference` of the newly created user.
   * @throws Error if the email is already in use.
   */
  async register(user: AuthRegisterModel): Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>> {
    const snapshotExists = await db.collection('users').where('email', '==', user.email).get();
    if (!snapshotExists.empty) {
      throw new Error('Email already exists');
    }

    const snapshot = await db.collection(COLLECTION_USER).add(user.toJSON());
    return snapshot;
  }

  /**
   * Sends a password reset email to the user.
   *
   * This function generates and sends an email to the specified user's email address, 
   * containing a password reset link. The link includes a token that the user can 
   * use to securely reset their password.
   *
   * @param email The email address of the user who requested the password reset.
   * @param token The token used to verify the password reset request.
   * @returns A promise that resolves when the email has been successfully sent.
   * @throws Error if there is an issue with sending the email via Resend service.
   */
  async sendResetEmail(email: string, token: string): Promise<void> {
    const resend = new Resend(RESEND_API_KEY);

    resend.emails.send({
      from: 'api-users@resend.dev',
      to: email,
      subject: 'Reset your password',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>Password Reset Request</h2>
          <p>Hello,</p>
          <p>We received a request to reset your password. If you didn't make this request, you can ignore this email.</p>
          <p>To reset your password, click the button below:</p>
          <a href="http://localhost:3100/api/auth/reset-password?token=${token}"
             style="display: inline-block; padding: 12px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px; margin: 16px 0;">
            Reset Password
          </a>
          <p>If the button doesn't work, you can also copy and paste the following link into your browser:</p>
          <p><a href="http://localhost:3100/api/auth/reset-password?token=${token}">
            http://localhost:3100/api/auth/reset-password?token=${token}
          </a></p>
          <p>Thanks,<br/>The Support Team - <strong>DV</strong></p>
        </div>
      `
    });
  }

  /**
   * Sends a verify email to the user.
   *
   * This function generates and sends an email to the specified user's email address, 
   * containing a verify link. The link includes a token that the user can 
   * use to securely verify their email.
   *
   * @param email The email address of the user who requested the verification.
   * @param token The token used to verify the email.
   * @returns A promise that resolves when the email has been successfully sent.
   * @throws Error if there is an issue with sending the email via Resend service.
   */
  async sendVerificationEmail(email: string, token: string): Promise<void> {
    const resend = new Resend(RESEND_API_KEY);

    resend.emails.send({
      from: 'api-users@resend.dev',
      to: email,
      subject: 'Verify Your Email Address',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>Verify Your Email Address</h2>
          <p>Hello,</p>
          <p>Thank you for registering with us. To complete your registration, please verify your email address by clicking the button below:</p>
          <a href="http://localhost:3100/api/auth/verify-email?token=${token}"
              style="display: inline-block; padding: 12px 20px; background-color: #28a745; color: #fff; text-decoration: none; border-radius: 5px; margin: 16px 0;">
            Verify Email
          </a>
          <p>If the button doesn't work, you can also copy and paste the following link into your browser:</p>
          <p><a href="http://localhost:3100/api/auth/verify-email?token=${token}">
            http://localhost:3100/api/auth/verify-email?token=${token}
          </a></p>
          <p>If you did not create an account, please ignore this email.</p>
          <p>Thanks,<br/>The Support Team - <strong>DV</strong></p>
        </div>
      `
    });
  }

  /**
   * Searches for a user by their email address in the Firestore database.
   *
   * This function queries the 'users' collection in Firestore to check if a user exists with the provided email.
   * It returns the Firestore query snapshot containing the user data if the user is found, 
   * or throws an error if no matching user is found.
   *
   * @param email The email address of the user to search for.
   * @returns A promise that resolves to a `QuerySnapshot` containing the user data if found.
   * @throws Error if no user is found with the given email.
   */
  async searchUserByEmail(email: string): Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>> {
    const snapshot = await db.collection('users').where('email', '==', email).limit(1).get();
    if (snapshot.empty) {
      throw new Error('Email does not exist');
    }
    return snapshot;
  }
}
