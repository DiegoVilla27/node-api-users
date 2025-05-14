import db from "@core/database/firebase";
import { PostModel } from "@posts/data/models/post";

const COLLECTION_USER: string = "posts";

/**
 * Interface for interacting with the Firebase Firestore data source for post-related operations.
 *
 * This interface defines the standard methods for performing CRUD (Create, Read, Update, Delete) operations 
 * on post data.
 * 
 * The methods in this interface utilize Firestore's document references and query snapshots, enabling 
 * efficient interactions with the Firestore database for post management tasks.
 * 
 * **Key Operations**:
 * - CRUD operations for post data.
 * 
 * @interface PostApiDataSource
 */
export interface PostApiDataSource {

  /**
   * Retrieves all post documents from the Firestore database.
   * 
   * This method returns a `QuerySnapshot`, which contains metadata and the actual data for all post 
   * documents in the collection. It provides access to the full set of post records in Firestore.
   * 
   * @returns {Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>>} 
   *          A promise that resolves with the `QuerySnapshot` containing all post documents.
   */
  get(): Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>;

  /**
   * Creates a new post document in Firestore.
   * 
   * This method accepts a `PostModel` instance, creates a new document in the Firestore posts collection,
   * and returns the document reference. The returned reference can be used to retrieve or update the document 
   * later if needed.
   * 
   * @param {PostModel} post - The post data to be saved in Firestore.
   * 
   * @returns {Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>>} 
   *          A promise that resolves with the reference of the newly created post document.
   */
  create(post: PostModel): Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>;

  /**
   * Updates an existing post document in Firestore.
   * 
   * This method updates an existing post document by its `id` with the provided `PostModel` data.
   * It returns a document reference, which can be used for further operations on the updated document.
   * 
   * @param {string} id - The ID of the post document to update.
   * @param {PostModel} post - The new post data to replace the existing data in Firestore.
   * 
   * @returns {Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>>} 
   *          A promise that resolves with the reference of the updated post document.
   */
  update(id: string, post: PostModel): Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>;

  /**
   * Deletes a post document from Firestore.
   * 
   * This method deletes the post document specified by the given `id`. It returns a `WriteResult`,
   * which contains metadata about the delete operation, including whether the operation was successful.
   * 
   * @param {string} id - The ID of the post document to delete.
   * 
   * @returns {Promise<FirebaseFirestore.WriteResult>} 
   *          A promise that resolves with a `WriteResult` object containing the result of the delete operation.
   */
  delete(id: string): Promise<FirebaseFirestore.WriteResult>;

  /**
   * Retrieves a specific post document by its ID.
   * 
   * This method fetches a post document from Firestore by its `id` and returns the document snapshot,
   * which contains the data and metadata of the post document.
   * 
   * @param {string} id - The ID of the post document to retrieve.
   * 
   * @returns {Promise<FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>>} 
   *          A promise that resolves with the `DocumentSnapshot` containing the post document data.
   */
  getById(id: string): Promise<FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>>;
}

/**
 * `PostApiDataSourceImpl` provides concrete implementations of methods to interact with the post collection 
 * in the Firestore database.
 * 
 * This class implements the `PostApiDataSource` interface, ensuring that the methods adhere to a consistent contract 
 * for post data management.
 * 
 * **Methods**:
 * - `get`: Retrieves all post documents from the Firestore database.
 * - `create`: Adds a new post document to the Firestore database.
 * - `update`: Retrieves a reference to a specific post document in Firestore for updating.
 * - `delete`: Deletes a specific post document in Firestore by its ID.
 * - `getById`: Retrieves a specific post document by its ID from Firestore.
 * 
 * @class PostApiDataSourceImpl
 */
export class PostApiDataSourceImpl implements PostApiDataSource {

  /**
   * Retrieves all post documents from the Firestore database.
   * 
   * This method fetches all documents from the Firestore `posts` collection and returns a `QuerySnapshot`.
   * The snapshot contains metadata and the actual data for all post documents stored in Firestore.
   * 
   * @returns {Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>} 
   *          A promise that resolves with a `QuerySnapshot` containing all post documents from the Firestore database.
   */
  async get(): Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>> {
    const snapshot = await db.collection(COLLECTION_USER).get();
    return snapshot;
  }

  /**
   * Adds a new post document to the Firestore database.
   * 
   * This method creates a new document in the Firestore `posts` collection using the provided `PostModel`. 
   * The data is serialized using the `toJSON()` method before being added to Firestore. 
   * Returns a document reference for the newly created document.
   * 
   * @param {PostModel} post - The `PostModel` instance containing the post data to be added to Firestore.
   * 
   * @returns {Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>} 
   *          A promise that resolves with a `DocumentReference` of the newly created post document in Firestore.
   */
  async create(post: PostModel): Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>> {
    const snapshot = await db.collection(COLLECTION_USER).add(post.toJSON());
    return snapshot;
  }

  /**
   * Retrieves a reference to a specific post document by its ID.
   * 
   * This method fetches a document reference for a specific post document in Firestore based on the provided `id`.
   * The reference can be used to update the document or perform other operations on it.
   * 
   * @param {string} id - The ID of the post document to retrieve the reference for.
   * 
   * @returns {Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>} 
   *          A promise that resolves with a `DocumentReference` to the post document in Firestore.
   */
  async update(id: string): Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>> {
    const snapshot = await db.collection(COLLECTION_USER).doc(id);
    return snapshot;
  }

  /**
   * Deletes a specific post document from Firestore by its ID.
   * 
   * This method deletes a post document from the Firestore `posts` collection based on the provided `id`.
   * It returns a `WriteResult` containing metadata about the operation (such as whether it was successful).
   * 
   * @param {string} id - The ID of the post document to delete.
   * 
   * @returns {Promise<FirebaseFirestore.WriteResult>} 
   *          A promise that resolves with a `WriteResult` object containing the result of the delete operation.
   */
  async delete(id: string): Promise<FirebaseFirestore.WriteResult> {
    const snapshot = await db.collection(COLLECTION_USER).doc(id).delete();
    return snapshot;
  }

  /**
   * Retrieves a specific post document by its ID from Firestore.
   * 
   * This method fetches the post document by its `id` from the Firestore `posts` collection and returns a 
   * `DocumentSnapshot` containing the data and metadata of the post document.
   * 
   * @param {string} id - The ID of the post document to retrieve.
   * 
   * @returns {Promise<FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>>} 
   *          A promise that resolves with a `DocumentSnapshot` containing the post document data.
   */
  async getById(id: string): Promise<FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>> {
    const snapshot = await db.collection(COLLECTION_USER).doc(id).get();
    return snapshot;
  }
}
