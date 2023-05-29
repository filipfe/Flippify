import { API_URL } from "@env";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet, Text } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import { THEME } from "../../const/theme";
import Loader from "../Loader";
import { LogoutIcon } from "../../assets/icons/icons";

export default function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    setIsLoading(true);
    const resp = await axios
      .delete(`${API_URL}/api/logout`)
      .finally(() => setIsLoading(false));
    if (resp.status === 200) logout();
  };

  return isLoading ? (
    <Loader />
  ) : (
    <Pressable
      disabled={isLoading}
      style={styles.button}
      onPress={handleLogout}
    >
      <LogoutIcon />
      <Text style={styles.text}>Wyloguj się</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "relative",
    zIndex: 10,
    width: "100%",
    marginTop: 36,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  text: {
    marginHorizontal: "auto",
    fontFamily: "Bold",
    textAlign: "right",
    color: THEME.wrong,
    lineHeight: 18,
    marginLeft: 8,
  },
});
