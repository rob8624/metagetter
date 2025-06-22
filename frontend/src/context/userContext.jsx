import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../services/api"; // assuming axios setup

const UserContext = createContext({
  loggedIn: false,
  loading: true,
  setLoggedIn: () => {}
});

export function UserDataProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true)
  

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("a_t");
      if (!token) {
        setLoggedIn(false);
        return;
      }

      try {
        await axiosInstance.post("/auth/jwt/verify/", { token });
        setLoggedIn(true);
        setLoading(false)
        console.log(loading, 'loading in context')
      } catch (err) {
        setLoggedIn(false);
      } finally {
        setLoading(false)
      }
    };

    verifyUser();
  }, []);

  const value = {
    loggedIn,
    setLoggedIn,
    loading
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function UseLoggedIn() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("UseLoggedIn must be used within a UserDataProvider");
  }
  return context;
}