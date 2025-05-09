import admin from 'firebase-admin';
import serviceAccount from './firebaseServiceAccount.json';

/**
 * Initializes the Firebase Admin SDK with the provided service account credentials
 * and exports the Firestore database instance for use in the application.
 */
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any)
});

const db = admin.firestore();

export default db;