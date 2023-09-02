import { useMemo, useState, useEffect } from "react";
import { Level, Profile, User } from "../types/auth";
import { AuthContextType } from "../context/AuthContext";
import { initialUserState } from "../const/auth";
import { SUPABASE_KEY } from "@env";
import "react-native-url-polyfill/auto";
import * as SecureStore from "expo-secure-store";
import {
  AuthResponse,
  createClient,
  PostgrestError,
  Session,
  VerifyEmailOtpParams,
} from "@supabase/supabase-js";
import * as SplashScreen from "expo-splash-screen";

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key);
  },
};

const supabaseUrl = "https://viiurwkqrzbkvrauqbjq.supabase.co";
const supabaseAnonKey = SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export default function useAuth(): AuthContextType {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<User>(initialUserState);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [level, setLevel] = useState<Level>({
    current_level: 0,
    points: 0,
    points_required: 1,
  });

  async function logIn(session: Session) {
    const user = session.user as any;
    setUser(user);
    setIsLogged(true);
  }

  async function fetchProfile() {
    const { data } = await supabase
      .from("profiles")
      .select(
        "username, avatar_url, is_premium, points, level:levels(current_level:level_number, points_required)"
      )
      .eq("id", user.id)
      .single();
    if (!data) return logOut();
    const { points, level, ...profile } = data;
    //@ts-ignore
    const { points_required, current_level } = level;
    setLevel({ points, points_required, current_level });
    setUser((prev) => ({ ...prev, ...profile }));
  }

  async function signInWithEmail(email: string) {
    const { error } = await supabase.auth.signInWithOtp({ email });
    return error;
  }

  async function verifyOTP(
    params: VerifyEmailOtpParams
  ): Promise<AuthResponse> {
    const response = await supabase.auth.verifyOtp(params);
    response.data.session && (await logIn(response.data.session));
    return response;
  }

  async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  }

  async function logOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(error?.message);
    } else {
      setUser(initialUserState);
      setIsLogged(false);
    }
  }

  async function updateUser<T extends keyof User>(
    field: T,
    value: User[T]
  ): Promise<PostgrestError | null> {
    const { error } = await supabase
      .from("profiles")
      .update({ [field]: value })
      .eq("id", user.id);
    !error && setUser((prev) => ({ ...prev, [field]: value }));
    return error;
  }

  const addPoints = async (points: number) => {
    const addedPoints = level.points + points;
    const isPromoted = addedPoints >= level.points_required;
    const newPointsRequired = isPromoted
      ? level.points_required
      : level.points_required;
    const newPoints = isPromoted
      ? addedPoints - level.points_required
      : level.points + points;
    const newLevel = isPromoted ? level.current_level + 1 : level.current_level;
    const query = isPromoted
      ? { points: newPoints, level_id: newLevel }
      : { points: newPoints };
    await supabase.from("profiles").update(query).eq("id", user.id);
    setLevel({
      points_required: newPointsRequired,
      current_level: newLevel,
      points: newPoints,
    });
    return newPoints;
  };

  useEffect(() => {
    async function fetchSession() {
      try {
        const { data } = await supabase.auth.getSession();
        const { session } = data;
        session && (await logIn(session));
      } finally {
        SplashScreen.hideAsync();
      }
    }
    fetchSession();
  }, []);

  useEffect(() => {
    if (!isLogged) return;
    async function initialFetch() {
      setIsProfileLoading(true);
      await fetchProfile();
      setIsProfileLoading(false);
    }
    initialFetch();
  }, [isLogged]);

  const authInterface = useMemo<AuthContextType>(
    () => ({
      isProfileLoading,
      isLogged,
      user,
      level,
      addPoints,
      signInWithEmail,
      verifyOTP,
      signInWithGoogle,
      logOut,
      updateUser,
    }),
    [
      isProfileLoading,
      isLogged,
      user,
      level,
      addPoints,
      signInWithEmail,
      verifyOTP,
      signInWithGoogle,
      logOut,
      updateUser,
    ]
  );

  return authInterface;
}
