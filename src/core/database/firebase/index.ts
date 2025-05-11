import admin from 'firebase-admin';
import serviceAccount from './firebaseServiceAccount.json';

/**
 * Initializes the Firebase Admin SDK with the provided service account credentials
 * and exports the Firestore database instance for use in the application.
 */
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any)
});

/**
 * Initializes and provides access to Firestore database using Firebase Admin SDK.
 * 
 * This constant holds the Firestore service instance, which allows interaction with
 * the Firestore database. It is typically used in a server-side environment, such as
 * Firebase Cloud Functions, where you need to perform CRUD (Create, Read, Update, Delete)
 * operations on Firestore collections and documents.
 * 
 * @constant
 * @type {FirebaseFirestore.Firestore}
 */
const db = admin.firestore();

export default db;