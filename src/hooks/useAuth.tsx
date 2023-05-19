import { useMemo, useState } from "react";
import { Tokens, User } from "../types/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContextType } from "../context/AuthContext";
import { initialTokensState, initialUserState } from "../const/auth";
import axios from "axios";
import { API_URL } from "@env";

export default function useAuth() {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<User>(initialUserState);
  const [tokens, setTokens] = useState<Tokens>(initialTokensState);

  const login = async (tokens: Tokens) => {
    return AsyncStorage.setItem("user", tokens.refresh).then(() =>
      getUser(tokens)
    );
  };

  const logout = async () => {
    return AsyncStorage.removeItem("user").then(() => {
      setUser(initialUserState);
      setTokens(initialTokensState);
      setIsLogged(false);
    });
  };

  const updateToken = async (refresh: string) => {
    return axios
      .post(`${API_URL}/api/refresh`, null, {
        headers: {
          Authorization: "Bearer " + refresh,
        },
      })
      .then(async (response) => {
        let tokens: Tokens = response.data;
        await login(tokens);
      })
      .catch(logout);
  };

  const getUser = async (tokens: Tokens) => {
    return axios
      .get("/api/user", {
        headers: { Authorization: `Bearer ${tokens.access}` },
      })
      .then((res) => {
        const userData = res.data;
        setUser(userData);
        setTokens(tokens);
        setIsLogged(true);
      })
      .catch(logout);
  };

  const authInterface = useMemo<AuthContextType>(
    () => ({
      isLogged,
      user,
      tokens,
      getUser,
      updateToken,
      login,
      logout,
    }),
    [isLogged, user, tokens, getUser, updateToken, login, logout]
  );

  return authInterface;
}
