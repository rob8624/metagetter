import { createContext, useEffect} from "react";
import { useState } from "react";

export const ThemeContext = createContext(null)


export function ThemeContextProvider({ children }) {
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem("darkMode");
        return saved === "true";   // convert back to boolean
    });

    useEffect(() => {
        const root = document.getElementById("root");

        if (darkMode) {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    }, [darkMode]);

    const handleDarkModeToggle = () => {
        setDarkMode(prev => {
            const newValue = !prev;
            localStorage.setItem("darkMode", newValue);
            return newValue;
        });
    };

    return (
        <ThemeContext.Provider value={{ darkMode, handleDarkModeToggle, setDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
}

