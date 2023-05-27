import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { linearGradient } from "../const/styles";
import { Button } from "../types/general";
import { THEME } from "../const/theme";

export default function PrimaryButton({
  onPress,
  text,
  active = true,
  style,
}: Button) {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={active ? onPress : () => {}}
      style={{ ...styles.button, ...style }}
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        style={styles.gradient}
        colors={linearGradient}
      >
        <Text
          style={{
            ...styles.text,
            ...(active ? styles.textActive : styles.textInActive),
          }}
        >
          {text}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "relative",
    zIndex: 10,
    width: "100%",
  },
  gradient: {
    borderRadius: 48,
    paddingVertical: 14,
    paddingHorizontal: 48,
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
