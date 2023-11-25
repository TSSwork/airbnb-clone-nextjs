"use client"
import React, {useEffect, createContext, useContext} from "react";

type ThemeTypes = "dark" | "light";

const themeContext = createContext<themeContextProps | null>(null)

type ThemeContextProviderProps = {
    children: React.ReactNode;
}

type themeContextProps = {
    theme: ThemeTypes,
    toggleTheme: () => void
}

export default function ThemeContextProvider(
   { children }: ThemeContextProviderProps 
) {
        
        const [theme, setTheme] = React.useState<ThemeTypes>("light")
    
        const toggleTheme = () => {
            if (theme === 'light'){
                setTheme("dark");
                window.localStorage.setItem("theme", "dark"); //add -> darkMode : "class" tailwind.config
                document.documentElement.classList.add("dark");
            }else{
                setTheme("light")
                window.localStorage.setItem("theme", "light")
                document.documentElement.classList.remove("dark"); 
            }
        }
    
        useEffect(() => {
            const localTheme = window.localStorage.getItem("theme") as ThemeTypes | null;
    
            if (localTheme){
                setTheme(localTheme);
    
                if (localTheme === 'dark'){
                    document.documentElement.classList.add("dark");
                }
    
            }else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                setTheme("dark")
                document.documentElement.classList.add("dark");
            }
        },[setTheme]);

        return (
            <themeContext.Provider value={{theme,toggleTheme}}>
                {children}
            </themeContext.Provider>
        )
}

export function useTheme() {
    const context = useContext(themeContext);

    if (context === null) {
        throw new Error('useTheme must be within a ThemeContextProvider');
    }
    return context;
}