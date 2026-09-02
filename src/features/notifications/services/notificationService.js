import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  updateDoc,
  doc
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
 * Mark all unread notifications for a user as read
 */
export const markAllNotificationsRead = async (userId) => {
  // In a real production app with thousands of notifications, 
  // you might want a Cloud Function or batch write.
  // For MVP, if we handle it client side we'd need to fetch and update.
  // We will leave this for individual clicks in MVP to keep it simple,
  // or just implement a simple map locally if needed.
};
