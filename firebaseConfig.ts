import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

/**
 * Upload a photo to Firebase Storage
 * @param file - The image file to upload
 * @param personId - The ID of the family member
 * @returns Promise<string> - The download URL of the uploaded photo
 */
export const uploadPhoto = async (file: File, personId: string): Promise<string> => {
  try {
    // Create a reference to the storage location
    const storageRef = ref(storage, `family-photos/${personId}`);
    
    // Upload the file
    await uploadBytes(storageRef, file);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(storageRef);
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading photo:', error);
    throw error;
  }
};

/**
 * Get photo URL from Firebase Storage
 * @param personId - The ID of the family member
 * @returns Promise<string | null> - The download URL or null if not found
 */
export const getPhotoURL = async (personId: string): Promise<string | null> => {
  try {
    const storageRef = ref(storage, `family-photos/${personId}`);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    // Photo doesn't exist yet
    return null;
  }
};

/**
 * Load all photos from Firebase Storage
 * @param memberIds - Array of member IDs to load photos for
 * @returns Promise<Record<string, string>> - Object mapping member IDs to photo URLs
 */
export const loadAllPhotos = async (memberIds: string[]): Promise<Record<string, string>> => {
  const photos: Record<string, string> = {};
  
  await Promise.all(
    memberIds.map(async (id) => {
      const url = await getPhotoURL(id);
      if (url) {
        photos[id] = url;
      }
    })
  );
  
  return photos;
};
