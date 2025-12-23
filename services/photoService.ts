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

  try {
    const storageRef = ref(storage, `member_photos/${memberId}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    
    await setDoc(doc(db, 'photos', memberId), {
      url: downloadURL,
      updatedAt: new Date().toISOString()
    });
    
    return downloadURL;
  } catch (error: any) {
    console.error("Firestore upload error:", error);
    if (error.code === 'storage/unauthorized') {
      throw new Error("Adgang nægtet. Du skal opdatere dine Firebase Storage Rules.");
    }
    throw error;
  }
};

/**
 * Subscribes to photo updates from Firestore.
 */
export const subscribeToPhotos = (callback: (photos: Record<string, string>) => void) => {
  if (!isFirebaseEnabled || !db) {
    console.warn("Firebase er deaktiveret - fotos synkroniseres ikke.");
    return () => {}; 
  }

  // Vi logger dette så du kan se i "Inspicer -> Konsol" om din laptop rent faktisk forbinder
  console.log("Forbinder til Firebase for at hente fotos...");

  return onSnapshot(collection(db, 'photos'), (snapshot) => {
    const photoMap: Record<string, string> = {};
    snapshot.forEach((doc) => {
      photoMap[doc.id] = doc.data().url;
    });
    console.log(`Synkroniserede ${snapshot.size} fotos fra skyen.`);
    callback(photoMap);
  }, (error) => {
    console.error("Fejl ved hentning af fotos fra Firebase:", error);
  });
};