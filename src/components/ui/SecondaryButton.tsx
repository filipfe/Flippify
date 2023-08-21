import { StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "../../types/general";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import GradientText from "./GradientText";

export default function SecondaryButton({
  onPress,
  text,
  active = true,
  style,
  fontSize = 12,
  width = "auto",
  paddingHorizontal = 28,
  paddingVertical = 14,
  borderRadius = 16,
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
        borderRadius,
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
