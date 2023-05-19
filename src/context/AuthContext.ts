import { createContext } from "react";
import { Auth, Tokens } from "../types/auth";

export type AuthContextType = Auth & {
    getUser: (tokens: Tokens) => void,
    updateToken: (refresh: string) => void,
    login: (tokens: Tokens) => void,
    logout: () => void
}

export const AuthContext = createContext<AuthContextType>(null!)