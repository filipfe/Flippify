import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { API_URL } from "@env";

export default function AxiosProvider({ children }: { children: JSX.Element }) {
  const { tokens } = useContext(AuthContext);
  const { access } = tokens;
  useEffect(() => {
    axios.defaults.headers.post["Content-Type"] = "application/json";
    axios.defaults.baseURL = API_URL;
    access
      ? (axios.defaults.headers.common["Authorization"] = `Bearer ${access}`)
      : delete axios.defaults.headers.common["Authorization"];
  }, [access]);
  return children;
}
