import { initializeApp, getApp, getApps } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const getEnv = (key: string) => {
  // Safe check for process and import.meta to prevent ReferenceErrors in browser
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key];
  }
  const meta = (import.meta as any);
  if (meta.env && meta.env[key]) {
    return meta.env[key];
  }
  return '';
};

const firebaseConfig = {
  apiKey: getEnv('VITE_FIREBASE_API_KEY'),
  authDomain: getEnv('VITE_FIREBASE_AUTH_DOMAIN'),
  projectId: getEnv('VITE_FIREBASE_PROJECT_ID'),
  storageBucket: getEnv('VITE_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: getEnv('VITE_FIREBASE_MESSAGING_SENDER_ID'),
  appId: getEnv('VITE_FIREBASE_APP_ID')
};

const isConfigValid = !!(firebaseConfig.apiKey && firebaseConfig.projectId);

let app;
try {
  if (isConfigValid) {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  }
} catch (e) {
  console.error("Firebase initialization failed:", e);
}

export const isFirebaseEnabled = !!app;
export const storage = app ? getStorage(app) : null;
export const db = app ? getFirestore(app) : null;
