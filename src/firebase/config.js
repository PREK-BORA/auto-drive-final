// ============================================================
// Firebase Configuration & Initialization
// ============================================================
//
// This file sets up the connection to Firebase services:
//   - Authentication
//   - Firestore Database
//   - Storage
//
// HOW TO USE:
//   1. Create a Firebase project at https://console.firebase.google.com
//   2. Add a web app to get your config values
//   3. Create a `.env` file in the project root (see `.env.example`)
//   4. Paste your values into the environment variables below
//   5. Restart the dev server
//
// If no Firebase config is provided, the app runs in "MOCK MODE"
// using sample data stored in localStorage. This lets you see the
// app working immediately before connecting a real Firebase project.
// ============================================================

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Read Firebase config from environment variables (Vite uses VITE_ prefix)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const requiredFirebaseConfig = [
  firebaseConfig.apiKey,
  firebaseConfig.authDomain,
  firebaseConfig.projectId,
  firebaseConfig.storageBucket,
  firebaseConfig.messagingSenderId,
  firebaseConfig.appId,
]

// Enable Firebase only when the complete web-app config is supplied.
export const isFirebaseConfigured = requiredFirebaseConfig.every(Boolean)

// Initialize Firebase only if configured
let app = null
let auth = null
let db = null
let storage = null

if (isFirebaseConfigured) {
  app = initializeApp(firebaseConfig)
  auth = getAuth(app)
  db = getFirestore(app)
  storage = getStorage(app)
}

// Export instances (they will be null in mock mode)
export { app, auth, db, storage }
