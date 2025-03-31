import { createContext, useContext, useState } from "react";

// Create the context with a default value structure
const UserContext = createContext({
  loggedIn: false,
  setLoggedIn: () => {}
});

export function UserDataProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  
  // Create the value object that will be provided
  const value = {
    loggedIn,
    setLoggedIn
  };
  
  // Provide the value to all children
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