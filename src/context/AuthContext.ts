import { createContext } from "react";
import { Auth, Tokens } from "../types/auth";
import { LoginData, SignUpData } from "../const/auth";

export type AuthContextType = Auth & {
    addPoints: (points: number) => number,
    signInWithPassword: (formData: LoginData) => void;
    signUpWithEmail: (formData: SignUpData) => void
    signInWithGoogle: () => void;
    logOut: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!)