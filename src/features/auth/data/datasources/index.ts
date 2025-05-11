import { AuthLoginModel } from "@auth/data/models/login";
import { AuthRegisterModel } from "@auth/data/models/register";
import db from "@core/database/firebase";

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
}
