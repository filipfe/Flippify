import useAuth from "../hooks/useAuth";
import { AuthContext } from "../context/AuthContext";

export default function AuthProvider({ children }: { children: JSX.Element }) {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
