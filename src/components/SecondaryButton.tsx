import { StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "../types/general";
import GradientText from "./GradientText";
import { THEME } from "../const/theme";

export default function SecondaryButton({
  onPress,
  text,
  active = true,
}: Button) {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={active ? onPress : () => {}}
      style={styles.button}
    >
      <GradientText
        style={{
          ...styles.text,
          ...(active ? styles.textActive : styles.textInActive),
        }}
      >
        {text}
      </GradientText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    backgroundColor: THEME.light,
    position: "relative",
    zIndex: 10,
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 48,
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
