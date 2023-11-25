"use client"
import React, {createContext, useContext} from "react";
import { SafeUser } from "@/types";

type UserContextProviderProps = {
    getUser : SafeUser | null;
    children: React.ReactNode;
}

type userContextProps = {
    getUser: SafeUser | null;
};
  

const userContext = createContext<userContextProps | null>(null)

export default function UserContextProvider({
    getUser,
    children
}: UserContextProviderProps){
    return (
        <userContext.Provider value={{getUser}}>
            {children}
        </userContext.Provider>
    )
}


export function useUser() {
    const currentUser = useContext(userContext);

    if (currentUser === null){
        throw new Error("useUser must be used within UserContextProvider")
    }

    return currentUser;
}


