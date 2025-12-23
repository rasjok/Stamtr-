import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, collection, onSnapshot } from 'firebase/firestore';
import { storage, db, isFirebaseEnabled } from '../firebaseConfig.ts';

/**
 * Uploads a file to Firebase Storage and stores the URL in Firestore.
 */
export const uploadMemberPhoto = async (memberId: string, file: File): Promise<string> => {
  if (!isFirebaseEnabled || !storage || !db) {
    throw new Error("Firebase er ikke konfigureret korrekt.");
  }

  const storageRef = ref(storage, `member_photos/${memberId}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  
  await setDoc(doc(db, 'photos', memberId), {
    url: downloadURL,
    updatedAt: new Date().toISOString()
  });
  
  return downloadURL;
};

/**
 * Subscribes to photo updates from Firestore.
 */
export const subscribeToPhotos = (callback: (photos: Record<string, string>) => void) => {
  if (!isFirebaseEnabled || !db) {
    console.warn("Firebase er deaktiveret - fotos synkroniseres ikke.");
    return () => {}; // Return dummy unsubscribe
  }

  return onSnapshot(collection(db, 'photos'), (snapshot) => {
    const photoMap: Record<string, string> = {};
    snapshot.forEach((doc) => {
      photoMap[doc.id] = doc.data().url;
    });
    callback(photoMap);
  });
};