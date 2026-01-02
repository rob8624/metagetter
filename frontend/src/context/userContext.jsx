import { createContext, useContext, useState, useEffect } from "react";

export const UserContext = createContext({
  loggedIn: false,
  loading: true,
  setLoggedIn: () => {},
  updating: false,
  setUpdating: () => {},
});

export function UserDataProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("a_t");
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    setLoading(false);
  }, []);

  const value = {
    loggedIn,
    setLoggedIn,
    loading,
    updating,
    setUpdating,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function UseLoggedIn() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("UseLoggedIn must be used within a UserDataProvider");
  }
  return context;
}