import { UserModel } from "@data/models/users";
import db from "@infrastructure/database/firebase";

const COLLECTION_USER: string = "users";

/**
 * UserApiDataSource provides methods to interact with the user collection in the Firestore database.
 * 
 * Methods:
 * - get: Retrieves all documents from the user collection.
 * - create: Adds a new user document to the user collection.
 * - update: Retrieves a reference to a specific user document by ID.
 * - delete: Retrieves a reference to a specific user document by ID for deletion.
 */
export class UserApiDataSource {
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