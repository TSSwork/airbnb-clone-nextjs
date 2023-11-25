"use client"
import React from "react";
import { useTheme } from "@/context/themecontext";
import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";

export default function ThemeSwitch() {
   
    const {theme,toggleTheme} = useTheme();
    return(
        <button className="fixed bottom-7 right-7 bg-white px-4 py-4
        bg-opacity-90 backdrop-blur-[0.5rem] border border-gray-200 border-opacity-40 shadow-2xl
        rounded-full flex items-center justify-center
        hover:scale-110 active:scale-95 transition-all
        dark:bg-gray-950"
        
        onClick={toggleTheme}
        >{
            theme === "light" ? (
                <SunIcon className="text-black w-[1.5rem] h-[1.5rem]" />
            ) : (
                <MoonIcon className="text-white w-[1.5rem] h-[1.5rem]" />
            )
        }
             
        </button>
    )
}

