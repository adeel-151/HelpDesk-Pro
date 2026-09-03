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

/**
 * Fetch and format data for Admin Dashboard Charts
 */
export const getAdminChartData = async () => {
  try {
    const ticketsRef = collection(db, "tickets");
    const snapshot = await getDocs(ticketsRef);
    const tickets = snapshot.docs.map(doc => doc.data());

    // 1. Status Distribution (Donut Chart)
    const statusCounts = tickets.reduce((acc, ticket) => {
      const status = ticket.status || 'unknown';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});
    
    // Group statuses into simple categories for the donut
    const statusData = [
      { name: 'New/Open', value: (statusCounts['new'] || 0) + (statusCounts['open'] || 0) + (statusCounts['pending customer'] || 0) },
      { name: 'Resolved', value: statusCounts['resolved'] || 0 },
      { name: 'Closed', value: statusCounts['closed'] || 0 }
    ].filter(item => item.value > 0);

    // 2. Tickets Over Time (Bar/Area Chart)
    // We'll group by the last 7 days
    const last7Days = Array.from({length: 7}, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return {
        date: d.toISOString().split('T')[0], // YYYY-MM-DD
        shortDate: d.toLocaleDateString('en-US', { weekday: 'short', month: 'numeric', day: 'numeric' }),
        count: 0
      };
    }).reverse();

    tickets.forEach(ticket => {
      if (ticket.createdAt && ticket.createdAt.toDate) {
        const ticketDate = ticket.createdAt.toDate().toISOString().split('T')[0];
        const dayMatch = last7Days.find(d => d.date === ticketDate);
        if (dayMatch) {
          dayMatch.count++;
        }
      }
    });

    return {
      statusData,
      timeSeriesData: last7Days
    };
  } catch (error) {
    console.error("Error fetching chart data:", error);
    return { statusData: [], timeSeriesData: [] };
  }
};
