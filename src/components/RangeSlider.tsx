import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";
import { linearGradient } from "../const/styles";

export default function RangeSlider({ value = 40 }: { value?: number }) {
  return (
    <View style={styles.wrapper}>
      <LinearGradient
        style={{ width: `${value}%`, ...styles.progress }}
        start={{ x: 0, y: 0 }}
        colors={linearGradient}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: 5,
    borderRadius: 255,
    backgroundColor: "#D4E9FA",
  },
  progress: {
    height: "100%",
    borderRadius: 255,
  },
});
