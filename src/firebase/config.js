
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Read Firebase config from environment variables (Vite uses VITE_ prefix)
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyDEb2aoRqHLJIPoGEnUPUSGX8bdpgPoVcs",
  authDomain: "car-auto-d0dac.firebaseapp.com",
  databaseURL:
    "https://car-auto-d0dac-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "car-auto-d0dac",
  storageBucket: "car-auto-d0dac.firebasestorage.app",
  messagingSenderId: "421087241239",
  appId: "1:421087241239:web:ca5c38f0da0b608917e852",
};

const requiredFirebaseConfig = [
  firebaseConfig.apiKey,
  firebaseConfig.authDomain,
  firebaseConfig.projectId,
  firebaseConfig.storageBucket,
  firebaseConfig.messagingSenderId,
  firebaseConfig.appId,
];

// Enable Firebase only when the complete web-app config is supplied.
export const isFirebaseConfigured = requiredFirebaseConfig.every(Boolean);

// Initialize Firebase only if configured
let app = null;
let auth = null;
let db = null;
let storage = null;

if (isFirebaseConfigured) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
}

// Export instances (they will be null in mock mode)
export { app, auth, db, storage };
