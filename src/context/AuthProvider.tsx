import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "../../reducers/login";
import EntryScreen from "../screens/EntryScreen";
import Loader from "../components/Loader";
import { useAppSelector } from "../hooks/useAppSelector";

export default function AuthProvider({ children }: { children: JSX.Element }) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const auth = useAppSelector((state) => state.login);
  const { logged } = auth;
  const { refresh } = auth.tokens;
  const timer = useRef<any>(null);

  const getUser = async () => {
    const fromStorage = await AsyncStorage.getItem("user");
    let tokens = fromStorage && JSON.parse(fromStorage);
    if (tokens) {
      await updateToken(tokens.refresh).catch(() => dispatch(logout()));
      return setLoading(false);
    }
    dispatch(logout());
    return setLoading(false);
  };

  const updateToken = async (token: string) => {
    axios
      .post(
        `${API_URL}/api/token/refresh`,
        JSON.stringify({ refresh: token }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        let tokens = response.data;
        let user = jwtDecode(tokens.access);
        AsyncStorage.setItem("user", JSON.stringify(tokens));
        dispatch(
          login({
            user,
            tokens,
          })
        );
      });
    await AsyncStorage.removeItem("user");
    dispatch(logout());
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (!logged) return;
    timer.current = setTimeout(() => {
      updateToken(refresh);
    }, 600000);
    return () => clearTimeout(timer.current);
  }, [refresh]);

  if (loading) return <Loader />;
  return logged ? children : <EntryScreen />;
}
