
import { ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js';
import { doc, setDoc, collection, onSnapshot } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';
import { storage, db } from '../firebaseConfig';

/**
 * Uploads a file to Firebase Storage and stores the URL in Firestore.
 */
export const uploadMemberPhoto = async (memberId: string, file: File): Promise<string> => {
  const storageRef = ref(storage, `member_photos/${memberId}`);
  
  // 1. Upload the physical file
  await uploadBytes(storageRef, file);
  
  // 2. Get the public URL
  const downloadURL = await getDownloadURL(storageRef);
  
  // 3. Save mapping in Firestore so all family members see it instantly
  await setDoc(doc(db, 'photos', memberId), {
    url: downloadURL,
    updatedAt: new Date().toISOString()
  });
  
  return downloadURL;
};

/**
 * Subscribes to photo updates from Firestore to keep the local state in sync with the cloud.
 */
export const subscribeToPhotos = (callback: (photos: Record<string, string>) => void) => {
  return onSnapshot(collection(db, 'photos'), (snapshot) => {
    const photoMap: Record<string, string> = {};
    snapshot.forEach((doc) => {
      photoMap[doc.id] = doc.data().url;
    });
    callback(photoMap);
  });
};
