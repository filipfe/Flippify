import { createContext } from "react";
import { Auth, User } from "../types/auth";
import { AuthError, AuthResponse, PostgrestError, VerifyEmailOtpParams } from "@supabase/supabase-js";

export type AuthContextType = Auth & {
    isProfileLoading: boolean;
    addPoints: (points: number) => Promise<number>,
    updateUser: <T extends keyof User>(field: T, value: User[T]) => Promise<PostgrestError | null>;
    signInWithEmail: (email: string) => Promise<AuthError | null>
    verifyOTP: (params: VerifyEmailOtpParams) => Promise<AuthResponse>;
    signInWithGoogle: () => void;
    logOut: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!)