import { createContext, useState, type ReactNode } from "react";
import type React from "react";

type AuthContextType = [
    string,
    React.Dispatch<React.SetStateAction<string>>
] | null;

export const AuthContext = createContext<AuthContextType>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [jwtToken, setJwtToken] = useState("")

    return (
        <AuthContext.Provider value={[jwtToken, setJwtToken]}>
            {children}
        </AuthContext.Provider>
    )
}