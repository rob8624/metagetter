import { createContext, useContext, useState, useEffect } from "react";
import axiosRaw from "../services/axiosRaw";



export const UserContext = createContext({
  loggedIn: false,
  loading: true,
  setLoggedIn: () => {},
  updating: false,
  setUpdating: () => {}
});

export function UserDataProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("a_t");
      if (!token) {
        setLoggedIn(false);
        return;
      }

      try {
        await axiosRaw.post("/auth/jwt/verify/", { token });
        setLoggedIn(true);
        setLoading(false)
        
      } catch (err) {
        localStorage.removeItem('a_t');
        localStorage.removeItem('r_t');
        localStorage.removeItem('loggedin');
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
    loading,
    updating,
    setUpdating
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