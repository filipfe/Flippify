import { useMemo, useState } from "react";
import { Level, Tokens, User } from "../types/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContextType } from "../context/AuthContext";
import { initialTokensState, initialUserState } from "../const/auth";
import axios from "axios";
import { API_URL } from "@env";

export default function useAuth() {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<User>(initialUserState);
  const [tokens, setTokens] = useState<Tokens>(initialTokensState);
  const [level, setLevel] = useState<Level>({
    current_level: 0,
    points: 0,
    points_required: 1,
  });

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
      .catch(() => console.log("error"));
  };

  const getUser = async (tokens: Tokens) => {
    return axios
      .get("/api/user", {
        headers: { Authorization: `Bearer ${tokens.access}` },
      })
      .then((res) => {
        const userData = res.data;
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${tokens.access}`;
        setUser(userData);
        setTokens(tokens);
        setIsLogged(true);
        setLevel(userData.level);
      })
      .catch(logout);
  };

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
    axios
      .post(
        `${API_URL}/api/flashcards/correct-answer`
        // JSON.stringify({
        //   points: newPoints,
        //   current_level: level.current_level,
        // })
      )
      .catch(() => alert("There was an error adding your points"));
    setLevel({
      points_required: newPointsRequired,
      current_level: newLevel,
      points: newPoints,
    });
    return newPoints;
  };

  const authInterface = useMemo<AuthContextType>(
    () => ({
      isLogged,
      user: { ...user, level },
      tokens,
      addPoints,
      getUser,
      updateToken,
      login,
      logout,
    }),
    [
      isLogged,
      user,
      tokens,
      level,
      addPoints,
      getUser,
      updateToken,
      login,
      logout,
    ]
  );

  return authInterface;
}
