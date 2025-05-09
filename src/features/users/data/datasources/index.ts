import db from "@core/database/firebase";
import { UserModel } from "@users/data/models/user";

const COLLECTION_USER: string = "users";

/**
 * Interface for interacting with the Firebase Firestore data source for user-related operations.
 *
 * This interface defines methods for CRUD (Create, Read, Update, Delete) operations on user data, 
 * utilizing Firestore's document references and query snapshots.
 *
 * @interface
 */
export interface UserApiDataSource {
  get(): Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>;
  create(user: UserModel): Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>;
  update(id: string, user: UserModel): Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>;
  delete(id: string): Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>;
}

/**
 * UserApiDataSource provides methods to interact with the user collection in the Firestore database.
 * 
 * Methods:
 * - get: Retrieves all documents from the user collection.
 * - create: Adds a new user document to the user collection.
 * - update: Retrieves a reference to a specific user document by ID.
 * - delete: Retrieves a reference to a specific user document by ID for deletion.
 * 
 * @class
 */
export class UserApiDataSourceImpl implements UserApiDataSource {
  async get(): Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>> {
    const snapshot = await db.collection(COLLECTION_USER).get();
    return snapshot;
  }

  async create(user: UserModel): Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>> {
    const snapshot = await db.collection(COLLECTION_USER).add(user.toJSON());
    return snapshot;
  }

  async update(id: string): Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>> {
    const snapshot = await db.collection(COLLECTION_USER).doc(id);
    return snapshot;
  }

  async delete(id: string): Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>> {
    const snapshot = await db.collection(COLLECTION_USER).doc(id);
    return snapshot;
  }
}