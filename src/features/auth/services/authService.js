import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase/config";

/**
 * Register a new user and create their profile in Firestore.
 */
export const registerUser = async (email, password, displayName, role = "customer") => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update Firebase Auth profile
    await updateProfile(user, { displayName });

    // Create a corresponding user document in Firestore
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      uid: user.uid,
      name: displayName,
      email: email,
      role: role,
      active: true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return user;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

/**
 * Log in an existing user.
 */
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

/**
 * Log out the current user.
 */
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

/**
 * Log in or Register with Google OAuth.
 */
export const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Check if user exists in Firestore
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      // First time login, create customer profile
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName || "Google User",
        email: user.email,
        role: "customer",
        active: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }

    return user;
  } catch (error) {
    console.error("Error with Google login:", error);
    throw error;
  }
};

/**
 * Update User Profile
 */
export const updateUserProfile = async (displayName, photoURL) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("No authenticated user");

    // Update Firebase Auth profile
    await updateProfile(user, {
      displayName: displayName || user.displayName,
      photoURL: photoURL || user.photoURL
    });

    // Sync with Firestore
    const userDocRef = doc(db, "users", user.uid);
    await updateDoc(userDocRef, {
      displayName: displayName || user.displayName,
      photoURL: photoURL || user.photoURL
    });

    // Force token refresh or state update might be needed in a larger app, 
    // but React's onAuthStateChanged usually catches profile updates if re-triggered, 
    // or we can handle local state via AuthProvider.
  } catch (error) {
    console.error("Error updating profile", error);
    throw error;
  }
};

/**
 * Send a password reset email.
 */
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw error;
  }
};

/**
 * Fetch a user's role profile from Firestore.
 */
export const getUserProfile = async (uid) => {
  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return userSnap.data();
    }
    return null;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};
