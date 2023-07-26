import { createContext } from "react";
import { Auth, User } from "../types/auth";
import { AuthResponse, PostgrestError, VerifyEmailOtpParams } from "@supabase/supabase-js";

export type AuthContextType = Auth & {
    addPoints: (points: number) => Promise<number>,
    updateUser: <T extends keyof User>(field: T, value: User[T]) => Promise<PostgrestError | null>;
    signInWithEmail: (email: string) => void
    verifyOTP: (params: VerifyEmailOtpParams) => Promise<AuthResponse>;
    signInWithGoogle: () => void;
    logOut: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!)