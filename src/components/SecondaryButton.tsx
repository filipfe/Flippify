import { StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "../types/general";
import GradientText from "./GradientText";
import { THEME } from "../const/theme";

export default function SecondaryButton({
  onPress,
  text,
  active = true,
  style,
  fontSize = 12,
  width = "auto",
  paddingHorizontal = 48,
  paddingVertical = 14,
}: Button) {
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
      }}
    >
      <GradientText
        style={{
          ...styles.text,
          ...(active ? styles.textActive : styles.textInActive),
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
    backgroundColor: THEME.light,
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
  textActive: {
    color: "white",
  },
  textInActive: {
    color: THEME.font,
  },
});
