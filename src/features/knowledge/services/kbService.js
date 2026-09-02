import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query, 
  orderBy, 
  serverTimestamp 
} from "firebase/firestore";
import { db } from "@/lib/firebase/config";

const KB_COLLECTION = "articles";

/**
 * Fetch all articles
 */
export const getArticles = async () => {
  try {
    const q = query(collection(db, KB_COLLECTION), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
};

/**
 * Fetch a single article by ID
 */
export const getArticleById = async (articleId) => {
  try {
    const docRef = doc(db, KB_COLLECTION, articleId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    throw new Error("Article not found");
  } catch (error) {
    console.error("Error fetching article:", error);
    throw error;
  }
};

/**
 * Create a new article
 */
export const createArticle = async (articleData, authorId) => {
  try {
    const newArticle = {
      ...articleData,
      authorId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    const docRef = await addDoc(collection(db, KB_COLLECTION), newArticle);
    return { id: docRef.id, ...newArticle };
  } catch (error) {
    console.error("Error creating article:", error);
    throw error;
  }
};

/**
 * Update an article
 */
export const updateArticle = async (articleId, updates) => {
  try {
    const docRef = doc(db, KB_COLLECTION, articleId);
    await updateDoc(docRef, { ...updates, updatedAt: serverTimestamp() });
  } catch (error) {
    console.error("Error updating article:", error);
    throw error;
  }
};

/**
 * Delete an article
 */
export const deleteArticle = async (articleId) => {
  try {
    const docRef = doc(db, KB_COLLECTION, articleId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting article:", error);
    throw error;
  }
};
