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
import { createNotification } from "@/features/notifications/services/notificationService";

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
export const createTicket = async (ticketData, customerId, attachments = []) => {
  try {
    const ticketRef = doc(collection(db, TICKETS_COLLECTION));
    const ticketNumber = `TKT-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
    
    // Calculate SLA Due Date
    const now = new Date();
    let hoursToAdd = 72; // default low
    const priority = ticketData.priority || "normal";
    
    if (priority === 'urgent') hoursToAdd = 2;
    else if (priority === 'high') hoursToAdd = 24;
    else if (priority === 'medium') hoursToAdd = 48;
    
    const slaDueDate = new Date(now.getTime() + hoursToAdd * 60 * 60 * 1000);

    const newTicket = {
      id: ticketRef.id,
      ticketNumber,
      subject: ticketData.subject,
      description: ticketData.description,
      categoryId: ticketData.categoryId,
      priority: priority,
      status: "new",
      customerId: customerId,
      assignedAgentId: null,
      attachments: attachments,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      slaDueDate: slaDueDate
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
export const addTicketMessage = async (ticketId, senderId, senderRole, body, isInternal = false, attachments = []) => {
  try {
    const messagesRef = collection(db, `${TICKETS_COLLECTION}/${ticketId}/messages`);
    
    const newMessage = {
      senderId,
      senderRole,
      body,
      visibility: isInternal ? "internal" : "public",
      attachments: attachments,
      createdAt: serverTimestamp()
    };

    await addDoc(messagesRef, newMessage);
    
    // Also update the ticket's updatedAt
    await updateTicket(ticketId, { updatedAt: serverTimestamp() });

    // Notification Logic
    // If agent replies, notify customer. If customer replies, we could notify the assigned agent.
    if (!isInternal) {
      // Need ticket info to know who to notify
      const docRef = doc(db, TICKETS_COLLECTION, ticketId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const ticketData = docSnap.data();
        if (senderRole === "agent" || senderRole === "admin") {
          await createNotification({
            userId: ticketData.customerId,
            type: 'new_reply',
            title: `New reply on ticket ${ticketData.ticketNumber}`,
            body: body.substring(0, 50) + (body.length > 50 ? '...' : ''),
            ticketId: ticketId
          });
        } else if (senderRole === "customer" && ticketData.assignedAgentId) {
          await createNotification({
            userId: ticketData.assignedAgentId,
            type: 'new_reply',
            title: `Customer replied to ticket ${ticketData.ticketNumber}`,
            body: body.substring(0, 50) + (body.length > 50 ? '...' : ''),
            ticketId: ticketId
          });
        }
      }
    }
    
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
    
    // Notify customer
    const docRef = doc(db, TICKETS_COLLECTION, ticketId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const ticketData = docSnap.data();
      await createNotification({
        userId: ticketData.customerId,
        type: 'assigned',
        title: `Your ticket has been assigned`,
        body: `Ticket ${ticketData.ticketNumber} is now being processed.`,
        ticketId: ticketId
      });
    }

  } catch (error) {
    console.error("Error assigning ticket:", error);
    throw error;
  }
};
