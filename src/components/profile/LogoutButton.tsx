import { Pressable, StyleSheet, Text } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import Loader from "../Loader";
import { LogoutIcon } from "../../assets/icons/icons";
import { ThemeContext } from "../../context/ThemeContext";

export default function LogoutButton() {
  const { wrong } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(false);
  const { logOut } = useContext(AuthContext);

  return isLoading ? (
    <Loader />
  ) : (
    <Pressable disabled={isLoading} style={styles.button} onPress={logOut}>
      <LogoutIcon stroke={wrong} />
      <Text style={{ ...styles.text, color: wrong }}>Wyloguj się</Text>
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
    lineHeight: 18,
    marginLeft: 8,
  },
});
