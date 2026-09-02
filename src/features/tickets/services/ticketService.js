import { 
  collection, 
  doc, 
  addDoc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  updateDoc
} from "firebase/firestore";
import { db } from "@/lib/firebase/config";

// Ticket Collections
const TICKETS_COLLECTION = "tickets";

/**
 * Generates a simple random ticket number (e.g., TKT-12345)
 */
const generateTicketNumber = () => {
  return `TKT-${Math.floor(10000 + Math.random() * 90000)}`;
};

/**
 * Create a new ticket
 */
export const createTicket = async (ticketData, customerId) => {
  try {
    const ticketRef = doc(collection(db, TICKETS_COLLECTION));
    
    const newTicket = {
      id: ticketRef.id,
      ticketNumber: generateTicketNumber(),
      subject: ticketData.subject,
      description: ticketData.description,
      categoryId: ticketData.categoryId,
      priority: ticketData.priority || "normal",
      status: "new",
      customerId: customerId,
      assignedAgentId: null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDoc(ticketRef, newTicket);
    return newTicket;
  } catch (error) {
    console.error("Error creating ticket:", error);
    throw error;
  }
};

/**
 * Fetch tickets for a specific user (customer) or queues (agent/admin)
 */
export const getTickets = async (userRole, userId, queueType = "all") => {
  try {
    let q;
    const ticketsRef = collection(db, TICKETS_COLLECTION);
    
    if (userRole === "customer") {
      q = query(
        ticketsRef,
        where("customerId", "==", userId),
        orderBy("createdAt", "desc")
      );
    } else {
      // Agents and Admins
      if (queueType === "unassigned") {
        q = query(ticketsRef, where("assignedAgentId", "==", null), orderBy("createdAt", "desc"));
      } else if (queueType === "mine") {
        q = query(ticketsRef, where("assignedAgentId", "==", userId), orderBy("createdAt", "desc"));
      } else {
        // all
        q = query(ticketsRef, orderBy("createdAt", "desc"));
      }
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching tickets:", error);
    throw error;
  }
};

/**
 * Fetch a single ticket by ID
 */
export const getTicketById = async (ticketId) => {
  try {
    const docRef = doc(db, TICKETS_COLLECTION, ticketId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error("Ticket not found");
    }
  } catch (error) {
    console.error("Error fetching ticket:", error);
    throw error;
  }
};

/**
 * Update ticket status/priority
 */
export const updateTicket = async (ticketId, updates) => {
  try {
    const docRef = doc(db, TICKETS_COLLECTION, ticketId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error("Error updating ticket:", error);
    throw error;
  }
};

/**
 * Add a message to a ticket
 */
export const addTicketMessage = async (ticketId, senderId, senderRole, body, isInternal = false) => {
  try {
    const messagesRef = collection(db, `${TICKETS_COLLECTION}/${ticketId}/messages`);
    
    const newMessage = {
      senderId,
      senderRole,
      body,
      visibility: isInternal ? "internal" : "public",
      createdAt: serverTimestamp()
    };

    await addDoc(messagesRef, newMessage);
    
    // Also update the ticket's updatedAt
    await updateTicket(ticketId, { updatedAt: serverTimestamp() });
    
  } catch (error) {
    console.error("Error adding message:", error);
    throw error;
  }
};

/**
 * Assign ticket to agent
 */
export const assignTicket = async (ticketId, agentId) => {
  try {
    await updateTicket(ticketId, {
      assignedAgentId: agentId,
      status: "open"
    });
  } catch (error) {
    console.error("Error assigning ticket:", error);
    throw error;
  }
};
