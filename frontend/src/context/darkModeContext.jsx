import { createContext } from "react";
import { useState } from "react";

export const ThemeContext = createContext(null)


export function ThemeContextProvider({ children }) {

    const [darkMode, setDarkMode] = useState(false)

    const handleDarkModeToggle = () => {
        setDarkMode(!darkMode)
        document.body.classList.toggle("dark")

    }
     
    return (
        <ThemeContext.Provider value={{darkMode, handleDarkModeToggle}}>
            {children}
        </ThemeContext.Provider>
     )   
}