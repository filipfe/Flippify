import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useRef } from "react";
import useAuth from "../hooks/useAuth";
import { AuthContext } from "../context/AuthContext";
import * as SplashScreen from "expo-splash-screen";

export default function AuthProvider({ children }: { children: JSX.Element }) {
  const auth = useAuth();
  const { isLogged, tokens, logout, updateToken } = auth;
  const { refresh } = tokens;
  const timer = useRef<any>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const refreshToken = await AsyncStorage.getItem("user");
        refreshToken &&
          (await new Promise((res) => res(updateToken(refreshToken))));
      } finally {
        SplashScreen.hideAsync();
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    if (!isLogged) return;
    timer.current = setTimeout(() => {
      updateToken(refresh);
    }, 600000);
    return () => clearTimeout(timer.current);
  }, [refresh]);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
