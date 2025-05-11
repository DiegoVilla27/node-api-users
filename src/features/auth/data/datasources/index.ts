import { AuthLoginModel } from "@auth/data/models/login";
import { AuthRegisterModel } from "@auth/data/models/register";
import db from "@core/database/firebase";

const COLLECTION_USER: string = "users";

/**
 * Interface for interacting with the Firebase Firestore data source for user-related operations.
 *
 * This interface defines methods for CRUD (Create, Read, Update, Delete, Get by ID, Upload Image) operations on user data, 
 * utilizing Firestore's document references and query snapshots.
 *
 * @interface
 */
export interface AuthApiDataSource {
  login(user: AuthLoginModel): Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>;
  register(user: AuthRegisterModel): Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>;
}

/**
 * UserApiDataSource provides methods to interact with the user collection in the Firestore database.
 * 
 * Methods:
 * - get: Retrieves all documents from the user collection.
 * - create: Adds a new user document to the user collection.
 * - update: Retrieves a reference to a specific user document by ID.
 * - delete: Retrieves a reference to a specific user document by ID for deletion.
 * - uploadImage: Uploads a file to AWS S3 using the provided upload parameters and returns the upload result.
 * - deleteImage: Delete a file to AWS S3 using the provided deleteObject parameters and returns the delete result.
 * 
 * @class
 */
export class AuthApiDataSourceImpl implements AuthApiDataSource {
  async login(user: AuthLoginModel): Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>> {
    const snapshot = await db.collection('users').where('email', '==', user.email).limit(1).get();
    if (snapshot.empty) {
      throw new Error('Email does not exists');
    }

    return snapshot;
  }

  async register(user: AuthRegisterModel): Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>> {
    const snapshotExists = await db.collection('users').where('email', '==', user.email).get();
    if (!snapshotExists.empty) {
      throw new Error('Email already exists');
    }

    const snapshot = await db.collection(COLLECTION_USER).add(user.toJSON());
    return snapshot;
  }
}