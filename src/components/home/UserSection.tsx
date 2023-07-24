import { View, Text } from "react-native";
import { useContext, useEffect } from "react";
import UserCredentials from "../UserCredentials";
import { AuthContext } from "../../context/AuthContext";
import { Children } from "../../types/general";
import { supabase } from "../../hooks/useAuth";

export default function UserSection({ children }: Children) {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchNotes = async () => {
      const { data } = await supabase
        .from("notes")
        .select("*")
        .eq("user_id", 1);
    };
  }, []);

  return (
    <View style={{ paddingVertical: 16 }}>
      <UserCredentials user={user} />
      {children}
    </View>
  );
}
