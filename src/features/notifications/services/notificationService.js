import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  updateDoc,
  doc,
  writeBatch
} from "firebase/firestore";
import { db } from "@/lib/firebase/config";

const NOTIFICATIONS_COLLECTION = "notifications";

/**
 * Create a new notification for a user
 */
export const createNotification = async ({ userId, type, title, body, ticketId }) => {
  if (!userId) return; // Don't notify if no target user
  
  try {
    const notificationsRef = collection(db, NOTIFICATIONS_COLLECTION);
    
    await addDoc(notificationsRef, {
      userId,
      type, // 'new_reply', 'assigned', 'status_changed', etc.
      title,
      body,
      ticketId,
      read: false,
      createdAt: serverTimestamp()
    });
  } catch (error) {
    console.error("Error creating notification:", error);
  }
};

/**
 * Mark a notification as read
 */
export const markNotificationRead = async (notificationId) => {
  try {
    const docRef = doc(db, NOTIFICATIONS_COLLECTION, notificationId);
    await updateDoc(docRef, { read: true });
  } catch (error) {
    console.error("Error marking notification read:", error);
  }
};

/**
 * Mark all unread notifications for a user as read (batch write)
 */
export const markAllNotificationsRead = async (userId, notificationIds = []) => {
  if (notificationIds.length === 0) return;
  
  try {
    const batch = writeBatch(db);
    
    notificationIds.forEach((notifId) => {
      const docRef = doc(db, NOTIFICATIONS_COLLECTION, notifId);
      batch.update(docRef, { read: true });
    });
    
    await batch.commit();
  } catch (error) {
    console.error("Error marking all notifications read:", error);
  }
};
