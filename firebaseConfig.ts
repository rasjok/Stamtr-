import { initializeApp, getApp, getApps } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

// Sikker adgang til miljøvariable
const env = (import.meta as any).env || {};

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID
};

const isConfigValid = !!(firebaseConfig.apiKey && firebaseConfig.projectId);

let app;
try {
  if (isConfigValid) {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    console.log("Firebase initialiseret succesfuldt.");
  } else {
    console.warn("Firebase konfiguration mangler - tjek dine miljøvariable.");
  }
} catch (e) {
  console.error("Fejl under Firebase initialisering:", e);
}

export const isFirebaseEnabled = !!app;
export const storage = app ? getStorage(app) : null;
export const db = app ? getFirestore(app) : null;