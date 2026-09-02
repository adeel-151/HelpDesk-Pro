import { collection, getDocs, doc, updateDoc, query, getCountFromServer, where } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

/**
 * Fetch all registered users
 */
export const getAllUsers = async () => {
  try {
    const usersRef = collection(db, "users");
    const snapshot = await getDocs(usersRef);
    return snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

/**
 * Update a user's role
 */
export const updateUserRole = async (userId, newRole) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { role: newRole });
  } catch (error) {
    console.error("Error updating user role:", error);
    throw error;
  }
};

/**
 * Fetch system metrics (counts)
 */
export const getSystemMetrics = async () => {
  try {
    const ticketsRef = collection(db, "tickets");
    const usersRef = collection(db, "users");

    // Total users
    const usersSnapshot = await getCountFromServer(usersRef);
    const totalUsers = usersSnapshot.data().count;

    // Total tickets
    const allTicketsSnapshot = await getCountFromServer(ticketsRef);
    const totalTickets = allTicketsSnapshot.data().count;

    // Open tickets
    const openQuery = query(ticketsRef, where("status", "in", ["new", "open", "pending customer"]));
    const openSnapshot = await getCountFromServer(openQuery);
    const openTickets = openSnapshot.data().count;

    // Resolved tickets
    const resolvedQuery = query(ticketsRef, where("status", "==", "resolved"));
    const resolvedSnapshot = await getCountFromServer(resolvedQuery);
    const resolvedTickets = resolvedSnapshot.data().count;

    return {
      totalUsers,
      totalTickets,
      openTickets,
      resolvedTickets
    };
  } catch (error) {
    console.error("Error fetching metrics:", error);
    return { totalUsers: 0, totalTickets: 0, openTickets: 0, resolvedTickets: 0 };
  }
};
