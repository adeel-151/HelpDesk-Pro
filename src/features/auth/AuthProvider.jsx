import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { getUserProfile } from "./services/authService";
import { InitialLoader } from "@/components/ui/InitialLoader";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [minLoadingTimePassed, setMinLoadingTimePassed] = useState(false);

  // Ensure loader shows for at least 1 second for a smooth experience
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinLoadingTimePassed(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        // Fetch the user's role and profile data from Firestore
        const userProfile = await getUserProfile(currentUser.uid);
        setProfile(userProfile);
      } else {
        setProfile(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    profile,
    loading,
    role: profile?.role || null,
  };

  const isAppLoading = loading || !minLoadingTimePassed;

  return (
    <AuthContext.Provider value={value}>
      {isAppLoading ? <InitialLoader /> : children}
    </AuthContext.Provider>
  );
};
