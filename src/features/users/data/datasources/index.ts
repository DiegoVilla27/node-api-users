import { UploadImageParams, DeleteImageParams } from "@shared/interfaces/upload";
import db from "@core/database/firebase";
import { UserModel } from "@users/data/models/user";
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  region: 'eu-west-3',
});
const COLLECTION_USER: string = "users";

/**
 * Interface for interacting with the Firebase Firestore data source for user-related operations.
 *
 * This interface defines the standard methods for performing CRUD (Create, Read, Update, Delete) operations 
 * on user data, along with methods for managing user profile images using Firebase Firestore and AWS S3.
 * 
 * The methods in this interface utilize Firestore's document references and query snapshots, enabling 
 * efficient interactions with the Firestore database for user management tasks. Additionally, methods for 
 * uploading and deleting user images are provided, leveraging AWS S3 for image storage.
 * 
 * **Key Operations**:
 * - CRUD operations for user data.
 * - Uploading and deleting user images.
 * 
 * @interface UserApiDataSource
 */
export interface UserApiDataSource {
  
  /**
   * Retrieves all user documents from the Firestore database.
   * 
   * This method returns a `QuerySnapshot`, which contains metadata and the actual data for all user 
   * documents in the collection. It provides access to the full set of user records in Firestore.
   * 
   * @returns {Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>>} 
   *          A promise that resolves with the `QuerySnapshot` containing all user documents.
   */
  get(): Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>;

  /**
   * Creates a new user document in Firestore.
   * 
   * This method accepts a `UserModel` instance, creates a new document in the Firestore users collection,
   * and returns the document reference. The returned reference can be used to retrieve or update the document 
   * later if needed.
   * 
   * @param {UserModel} user - The user data to be saved in Firestore.
   * 
   * @returns {Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>>} 
   *          A promise that resolves with the reference of the newly created user document.
   */
  create(user: UserModel): Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>;

  /**
   * Updates an existing user document in Firestore.
   * 
   * This method updates an existing user document by its `id` with the provided `UserModel` data.
   * It returns a document reference, which can be used for further operations on the updated document.
   * 
   * @param {string} id - The ID of the user document to update.
   * @param {UserModel} user - The new user data to replace the existing data in Firestore.
   * 
   * @returns {Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>>} 
   *          A promise that resolves with the reference of the updated user document.
   */
  update(id: string, user: UserModel): Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>;

  /**
   * Deletes a user document from Firestore.
   * 
   * This method deletes the user document specified by the given `id`. It returns a `WriteResult`,
   * which contains metadata about the delete operation, including whether the operation was successful.
   * 
   * @param {string} id - The ID of the user document to delete.
   * 
   * @returns {Promise<FirebaseFirestore.WriteResult>} 
   *          A promise that resolves with a `WriteResult` object containing the result of the delete operation.
   */
  delete(id: string): Promise<FirebaseFirestore.WriteResult>;

  /**
   * Retrieves a specific user document by its ID.
   * 
   * This method fetches a user document from Firestore by its `id` and returns the document snapshot,
   * which contains the data and metadata of the user document.
   * 
   * @param {string} id - The ID of the user document to retrieve.
   * 
   * @returns {Promise<FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>>} 
   *          A promise that resolves with the `DocumentSnapshot` containing the user document data.
   */
  getById(id: string): Promise<FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>>;

  /**
   * Uploads an image to AWS S3 for a user profile.
   * 
   * This method uploads a user image to AWS S3 and returns a `ManagedUpload` object, which can be used to track
   * the progress and status of the upload operation.
   * 
   * @param {UploadImageParams} params - The parameters containing the image data and the target user information.
   * 
   * @returns {Promise<AWS.S3.ManagedUpload>} 
   *          A promise that resolves with the `ManagedUpload` object containing the result of the upload.
   */
  uploadImage(params: UploadImageParams): Promise<AWS.S3.ManagedUpload>;

  /**
   * Deletes a user profile image from AWS S3.
   * 
   * This method deletes a user’s profile image from AWS S3 based on the provided image parameters.
   * It returns a `Request` object, which can be used to track the status of the delete operation.
   * 
   * @param {DeleteImageParams} params - The parameters containing the image information to be deleted.
   * 
   * @returns {Promise<AWS.Request<AWS.S3.DeleteObjectOutput, AWS.AWSError>>} 
   *          A promise that resolves with the request object containing the result of the image deletion operation.
   */
  deleteImage(params: DeleteImageParams): Promise<AWS.Request<AWS.S3.DeleteObjectOutput, AWS.AWSError>>;
}

/**
 * `UserApiDataSourceImpl` provides concrete implementations of methods to interact with the user collection 
 * in the Firestore database, along with methods to handle user profile image uploads and deletions via AWS S3.
 * 
 * This class implements the `UserApiDataSource` interface, ensuring that the methods adhere to a consistent contract 
 * for user data management and image handling.
 * 
 * **Methods**:
 * - `get`: Retrieves all user documents from the Firestore database.
 * - `create`: Adds a new user document to the Firestore database.
 * - `update`: Retrieves a reference to a specific user document in Firestore for updating.
 * - `delete`: Deletes a specific user document in Firestore by its ID.
 * - `getById`: Retrieves a specific user document by its ID from Firestore.
 * - `uploadImage`: Uploads a user profile image to AWS S3 and returns the result of the upload operation.
 * - `deleteImage`: Deletes a user profile image from AWS S3 and returns the result of the delete operation.
 * 
 * @class UserApiDataSourceImpl
 */
export class UserApiDataSourceImpl implements UserApiDataSource {

  /**
   * Retrieves all user documents from the Firestore database.
   * 
   * This method fetches all documents from the Firestore `users` collection and returns a `QuerySnapshot`.
   * The snapshot contains metadata and the actual data for all user documents stored in Firestore.
   * 
   * @returns {Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>} 
   *          A promise that resolves with a `QuerySnapshot` containing all user documents from the Firestore database.
   */
  async get(): Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>> {
    const snapshot = await db.collection(COLLECTION_USER).get();
    return snapshot;
  }

  /**
   * Adds a new user document to the Firestore database.
   * 
   * This method creates a new document in the Firestore `users` collection using the provided `UserModel`. 
   * The data is serialized using the `toJSON()` method before being added to Firestore. 
   * Returns a document reference for the newly created document.
   * 
   * @param {UserModel} user - The `UserModel` instance containing the user data to be added to Firestore.
   * 
   * @returns {Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>} 
   *          A promise that resolves with a `DocumentReference` of the newly created user document in Firestore.
   */
  async create(user: UserModel): Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>> {
    const snapshot = await db.collection(COLLECTION_USER).add(user.toJSON());
    return snapshot;
  }

  /**
   * Retrieves a reference to a specific user document by its ID.
   * 
   * This method fetches a document reference for a specific user document in Firestore based on the provided `id`.
   * The reference can be used to update the document or perform other operations on it.
   * 
   * @param {string} id - The ID of the user document to retrieve the reference for.
   * 
   * @returns {Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>} 
   *          A promise that resolves with a `DocumentReference` to the user document in Firestore.
   */
  async update(id: string): Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>> {
    const snapshot = await db.collection(COLLECTION_USER).doc(id);
    return snapshot;
  }

  /**
   * Deletes a specific user document from Firestore by its ID.
   * 
   * This method deletes a user document from the Firestore `users` collection based on the provided `id`.
   * It returns a `WriteResult` containing metadata about the operation (such as whether it was successful).
   * 
   * @param {string} id - The ID of the user document to delete.
   * 
   * @returns {Promise<FirebaseFirestore.WriteResult>} 
   *          A promise that resolves with a `WriteResult` object containing the result of the delete operation.
   */
  async delete(id: string): Promise<FirebaseFirestore.WriteResult> {
    const snapshot = await db.collection(COLLECTION_USER).doc(id).delete();
    return snapshot;
  }

  /**
   * Retrieves a specific user document by its ID from Firestore.
   * 
   * This method fetches the user document by its `id` from the Firestore `users` collection and returns a 
   * `DocumentSnapshot` containing the data and metadata of the user document.
   * 
   * @param {string} id - The ID of the user document to retrieve.
   * 
   * @returns {Promise<FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>>} 
   *          A promise that resolves with a `DocumentSnapshot` containing the user document data.
   */
  async getById(id: string): Promise<FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>> {
    const snapshot = await db.collection(COLLECTION_USER).doc(id).get();
    return snapshot;
  }

  /**
   * Uploads a user profile image to AWS S3.
   * 
   * This method uploads an image to AWS S3 using the provided `UploadImageParams`. The result of the 
   * upload operation is returned as a `ManagedUpload` object, which can be used to track the status of the 
   * upload process.
   * 
   * @param {UploadImageParams} params - The parameters required for the image upload, including file data and metadata.
   * 
   * @returns {Promise<AWS.S3.ManagedUpload>} 
   *          A promise that resolves with the `ManagedUpload` object containing the result of the upload operation.
   */
  async uploadImage(params: UploadImageParams): Promise<AWS.S3.ManagedUpload> {
    const resAws = await s3.upload(params);
    return resAws;
  }

  /**
   * Deletes a user profile image from AWS S3.
   * 
   * This method deletes a user profile image from AWS S3 using the provided `DeleteImageParams`. The result 
   * of the delete operation is returned as a `Request` object, which can be used to track the status of the 
   * deletion process.
   * 
   * @param {DeleteImageParams} params - The parameters required for the image deletion, including the image key.
   * 
   * @returns {Promise<AWS.Request<AWS.S3.DeleteObjectOutput, AWS.AWSError>>} 
   *          A promise that resolves with the `Request` object containing the result of the delete operation.
   */
  async deleteImage(params: DeleteImageParams): Promise<AWS.Request<AWS.S3.DeleteObjectOutput, AWS.AWSError>> {
    const resAws = await s3.deleteObject(params);
    return resAws;
  }
}
