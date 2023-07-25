import { createContext } from "react";
import { Auth } from "../types/auth";
import { VerifyEmailOtpParams } from "@supabase/supabase-js";

export type AuthContextType = Auth & {
    addPoints: (points: number) => number,
    signInWithEmail: (email: string) => void
    verifyOTP: (params: VerifyEmailOtpParams) => void;
    signInWithGoogle: () => void;
    logOut: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!)