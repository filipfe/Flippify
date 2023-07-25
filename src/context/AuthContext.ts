import { createContext } from "react";
import { Auth } from "../types/auth";
import { AuthResponse, VerifyEmailOtpParams } from "@supabase/supabase-js";

export type AuthContextType = Auth & {
    addPoints: (points: number) => number,
    signInWithEmail: (email: string) => void
    verifyOTP: (params: VerifyEmailOtpParams) => Promise<AuthResponse>;
    signInWithGoogle: () => void;
    logOut: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!)