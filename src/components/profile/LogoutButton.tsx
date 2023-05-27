import { API_URL } from "@env";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet, Text } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import { THEME } from "../../const/theme";
import Loader from "../Loader";

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
      <LinearGradient
        start={{ x: 0, y: 0 }}
        style={styles.gradient}
        colors={["#F1232F", "#FA4646"]}
      >
        <Text
          style={{
            ...styles.text,
          }}
        >
          Wyloguj się
        </Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "relative",
    zIndex: 10,
    width: "100%",
    marginTop: 24,
  },
  gradient: {
    borderRadius: 48,
    paddingVertical: 16,
    paddingHorizontal: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginHorizontal: "auto",
    fontFamily: "Bold",
    color: "#FFFFFF",
  },
  textActive: {
    color: "white",
  },
  textInActive: {
    color: THEME.font,
  },
});
