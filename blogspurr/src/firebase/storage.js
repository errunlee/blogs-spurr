import { storage } from "../firebase";
import { Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

class StorageService {
  async uploadImage(file) {
    const timestamp = new Date().getTime(); // Generate a timestamp
    const fileName = `${timestamp}_${file.name}`; // Combine timestamp with file name
    const fileRef = ref(storage, fileName + ".png");
    const snapshot = await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);
    return photoURL;
  }
}

const storageService = new StorageService();

export { storageService };
