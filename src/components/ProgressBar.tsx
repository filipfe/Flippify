import { View, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import { linearGradient } from "../const/styles";

type Props = {
  currentValue: number;
  requiredValue: number;
};

export default function ProgressBar({ currentValue, requiredValue }: Props) {
  const { light } = useContext(ThemeContext);

  const animatedWidthStyle = useAnimatedStyle(
    () => ({
      width: withTiming(`${(currentValue / requiredValue) * 100}%`, {
        duration: 600,
      }),
    }),
    [currentValue, requiredValue]
  );

  return (
    <View style={[styles.progressWrapper, { backgroundColor: light }]}>
      <Animated.View style={animatedWidthStyle}>
        <LinearGradient
          style={styles.progress}
          start={{ x: 0, y: 0 }}
          colors={linearGradient}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  progressWrapper: {
    width: "100%",
    height: 5,
    borderRadius: 255,
    marginBottom: 24,
    marginTop: 8,
    position: "relative",
  },
  progress: {
    width: "100%",
    height: "100%",
    borderRadius: 255,
    position: "relative",
    overflow: "visible",
  },
});
