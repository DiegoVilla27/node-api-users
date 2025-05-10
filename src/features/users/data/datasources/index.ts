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
 * This interface defines methods for CRUD (Create, Read, Update, Delete, Get by ID, Upload Image) operations on user data, 
 * utilizing Firestore's document references and query snapshots.
 *
 * @interface
 */
export interface UserApiDataSource {
  get(): Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>;
  create(user: UserModel): Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>;
  update(id: string, user: UserModel): Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>;
  delete(id: string): Promise<FirebaseFirestore.WriteResult>;
  getById(id: string): Promise<FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>>;
  uploadImage(params: UploadImageParams): Promise<AWS.S3.ManagedUpload>;
  deleteImage(params: DeleteImageParams): Promise<AWS.Request<AWS.S3.DeleteObjectOutput, AWS.AWSError>>;
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

  async delete(id: string): Promise<FirebaseFirestore.WriteResult> {
    const snapshot = await db.collection(COLLECTION_USER).doc(id).delete();
    return snapshot;
  }

  async getById(id: string): Promise<FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>> {
    const snapshot = await db.collection(COLLECTION_USER).doc(id).get();
    return snapshot;
  }

  async uploadImage(params: UploadImageParams): Promise<AWS.S3.ManagedUpload> {
    const resAws = await s3.upload(params);
    return resAws;
  }

  async deleteImage(params: DeleteImageParams): Promise<AWS.Request<AWS.S3.DeleteObjectOutput, AWS.AWSError>> {
    const resAws = await s3.deleteObject(params);
    return resAws;
  }
}