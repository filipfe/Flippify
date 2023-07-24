import { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { ThemeContext } from "../../context/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import { linearGradient } from "../../const/styles";
import { AuthContext } from "../../context/AuthContext";
import useShadow from "../../hooks/useShadow";
import GradientText from "../GradientText";

export default function HomeLevel() {
  const auth = useContext(AuthContext);
  const { points, points_required, current_level } = auth.level;
  const { secondary, light, background } = useContext(ThemeContext);
  const shadow = useShadow(16);

  const animatedWidthStyle = useAnimatedStyle(
    () => ({
      width: withTiming(`${((points / points_required) * 100).toFixed(2)}%`),
    }),
    [points, points_required]
  );

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.levelWrapper,
          shadow,
          { backgroundColor: light, borderColor: background },
        ]}
      >
        <GradientText style={styles.level}>{current_level}</GradientText>
      </View>
      <View style={styles.progressWrapper}>
        <Animated.View style={animatedWidthStyle}>
          <LinearGradient
            style={styles.progress}
            start={{ x: 0, y: 0 }}
            colors={linearGradient}
          />
        </Animated.View>
        <Text style={{ ...styles.points, fontSize: 12, color: secondary }}>
          {points} / {points_required}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    marginTop: -64,
  },
  progressWrapper: {
    width: "100%",
    height: 5,
    borderRadius: 255,
    backgroundColor: "#D4E9FA",
    marginVertical: 16,
    position: "relative",
  },
  progress: {
    width: "100%",
    height: "100%",
    borderRadius: 255,
    position: "relative",
    overflow: "visible",
  },
  points: {
    position: "absolute",
    top: -28,
    right: 0,
    fontFamily: "SemiBold",
  },
  levelWrapper: {
    borderRadius: 80,
    height: 80,
    width: 80,
    borderWidth: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  level: {
    fontFamily: "Bold",
    fontSize: 26,
    lineHeight: 30,
  },
});
