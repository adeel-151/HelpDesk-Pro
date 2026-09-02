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
    const storageRef = ref(storage, `tickets/${ticketId}/${Date.now()}_${sanitizedFileName}`);
    
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return {
      name: file.name,
      url: downloadURL,
      type: file.type,
      size: file.size
    };
  } catch (error) {
    console.error("Error uploading attachment:", error);
    throw error;
  }
};
