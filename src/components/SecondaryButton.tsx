import { StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "../types/general";
import GradientText from "./GradientText";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function SecondaryButton({
  onPress,
  text,
  active = true,
  style,
  fontSize = 12,
  width = "auto",
  paddingHorizontal = 28,
  paddingVertical = 14,
}: Button) {
  const { light, font } = useContext(ThemeContext);
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={active ? onPress : () => {}}
      style={{
        ...styles.button,
        ...style,
        paddingHorizontal,
        paddingVertical,
        width,
        backgroundColor: light,
      }}
    >
      <GradientText
        style={{
          ...styles.text,
          ...(active ? { color: "#FFF" } : { color: font }),
          fontSize,
        }}
      >
        {text}
      </GradientText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 48,
    position: "relative",
    zIndex: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginHorizontal: "auto",
    fontFamily: "Bold",
  },
});
