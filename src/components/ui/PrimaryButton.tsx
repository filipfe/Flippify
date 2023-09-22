import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { linearGradient } from "../../const/styles";
import { Button } from "../../types/general";

export default function PrimaryButton({
  onPress,
  text,
  active = true,
  style,
  fontSize = 14,
  width = "auto",
  paddingHorizontal = 28,
  paddingVertical = 14,
  borderRadius = 16,
  children,
}: Button) {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={active ? onPress : () => {}}
      style={{
        ...styles.button,
        ...style,
        ...(active ? { opacity: 1 } : { opacity: 0.6 }),
        width,
      }}
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        style={{
          ...styles.gradient,
          paddingHorizontal,
          paddingVertical,
          width: "100%",
          borderRadius,
        }}
        colors={linearGradient}
      >
        {children ? (
          children
        ) : (
          <Text
            style={{
              ...styles.text,
              fontSize,
            }}
          >
            {text}
          </Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "relative",
    zIndex: 10,
  },
  gradient: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "Bold",
    color: "#FFF",
  },
});
