import { GridIcon } from "../../../../assets/icons/icons";
import { ThemeContext } from "../../../../context/ThemeContext";
import { View, StyleSheet, Pressable } from "react-native";
import { useContext } from "react";
import { GridButtonProps } from "../../../../types/notes";

export default function GridButton({ onPress }: GridButtonProps) {
  const { font, light, ripple } = useContext(ThemeContext);
  return (
    <View style={[styles.wrapper, { backgroundColor: light }]}>
      <Pressable
        android_ripple={{ color: ripple, borderless: true, radius: 36 }}
        onPress={onPress}
      >
        <View style={styles.button}>
          <GridIcon width={20} fill={font} />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 16,
    right: 16,
    zIndex: 1,
    height: 48,
    width: 48,
    borderRadius: 8,
  },
  button: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
