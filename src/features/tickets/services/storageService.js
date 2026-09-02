import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase/config";

/**
 * Uploads a file to Firebase Storage under tickets/{ticketId}/{fileName}
 * Returns the download URL.
 */
export const uploadAttachment = async (ticketId, file) => {
  if (!file) return null;
  
  try {
    // Sanitize filename to avoid issues
    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    const filePath = `tickets/${ticketId}/${Date.now()}_${sanitizedFileName}`;
    const storageRef = ref(storage, filePath);
    
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return {
      name: file.name,
      url: downloadURL,
      type: file.type,
      size: file.size,
      path: filePath
    };
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

/**
 * Upload a user avatar to Firebase Storage
 */
export const uploadAvatar = async (userId, file) => {
  try {
    // e.g., avatars/user123_timestamp_filename
    const timestamp = new Date().getTime();
    const filePath = `avatars/${userId}_${timestamp}_${file.name}`;
    const storageRef = ref(storage, filePath);

    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading avatar:", error);
    throw error;
  }
};
