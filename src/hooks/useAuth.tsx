import { useMemo, useState, useEffect } from "react";
import { Level, User } from "../types/auth";
import { AuthContextType } from "../context/AuthContext";
import { LoginData, SignUpData, initialUserState } from "../const/auth";
import { SUPABASE_KEY } from "@env";
import "react-native-url-polyfill/auto";
import * as SecureStore from "expo-secure-store";
import { createClient, Session } from "@supabase/supabase-js";
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

export default function useAuth() {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<User>(initialUserState);
  const [level, setLevel] = useState<Level>({
    current_level: 0,
    points: 0,
    points_required: 1,
  });

  async function logIn(session: Session) {
    const user = { ...session.user, ...session.user.user_metadata } as any;
    setUser(user);
    setIsLogged(true);
    setLevel((prev) => ({ ...prev, points: user.knowledge_points }));
  }

  async function signUpWithEmail(formData: SignUpData) {
    const { email, password, username } = formData;
    const { data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });
    data.session && logIn(data.session);
  }

  async function signInWithPassword(formData: LoginData) {
    const { email, password } = formData;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) alert(error.message);
    data.session && logIn(data.session);
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

  const addPoints = (points: number) => {
    const addedPoints = level.points + points;
    const isPromoted = addedPoints >= level.points_required;
    const newPointsRequired = isPromoted
      ? level.points_required
      : level.points_required;
    const newPoints = isPromoted
      ? addedPoints - level.points_required
      : level.points + points;
    const newLevel = isPromoted ? level.current_level + 1 : level.current_level;
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
    supabase.auth.onAuthStateChange((_event, session) => {
      session && logIn(session);
    });
  }, []);

  useEffect(() => {
    if (!isLogged) return;
    async function fetchPoints() {
      const { data } = await supabase
        .from("levels")
        .select("points_required, level_number")
        .eq("id", user.level_id)
        .single();
      if (!data) return;
      const { level_number, points_required } = data;
      setLevel((prev) => ({
        ...prev,
        current_level: level_number,
        points_required,
      }));
    }
    fetchPoints();
  }, [isLogged]);

  const authInterface = useMemo<AuthContextType>(
    () => ({
      isLogged,
      user,
      level,
      addPoints,
      signInWithPassword,
      signUpWithEmail,
      signInWithGoogle,
      logOut,
    }),
    [
      isLogged,
      user,
      level,
      addPoints,
      signInWithPassword,
      signInWithGoogle,
      signUpWithEmail,
      logOut,
    ]
  );

  return authInterface;
}
