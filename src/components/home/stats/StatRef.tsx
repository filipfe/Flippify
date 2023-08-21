import { LinearGradient } from "expo-linear-gradient";
import { Stat } from "../../../types/home";
import { linearGradient } from "../../../const/styles";
import { StyleSheet, Text, View, Dimensions, Pressable } from "react-native";
import GradientText from "../../ui/GradientText";
import useShadow from "../../../hooks/useShadow";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

interface Props extends Stat {
  isActive: boolean;
  changeIndex: () => void;
}

const { width } = Dimensions.get("screen");

export default function StatRef({
  title,
  value,
  sufix,
  changeIndex,
  isActive,
}: Props) {
  const shadow = useShadow(16);

  const animatedStyle = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateY: withTiming(isActive ? -16 : 0, { duration: 200 }),
        },
      ],
      opacity: withTiming(isActive ? 1 : 0.6, { duration: 200 }),
    }),
    [isActive]
  );

  return (
    <Pressable onPress={changeIndex}>
      <Animated.View style={animatedStyle}>
        <LinearGradient
          style={styles.wrapper}
          colors={linearGradient}
          start={{ x: 0, y: 0 }}
        >
          <View style={[styles.circle, shadow]}>
            <GradientText style={styles.circleText}>{value}</GradientText>
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.value}>{value + sufix}</Text>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    borderRadius: 16,
    alignItems: "flex-start",
    paddingHorizontal: 24,
    paddingVertical: 36,
    width: (width / 3) * 1.2,
  },
  title: {
    fontFamily: "Bold",
    color: "#FFF",
    fontSize: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  value: {
    fontFamily: "SemiBold",
    color: "#FFF",
    fontSize: 14,
  },
  circle: {
    borderRadius: 64,
    height: 64,
    width: 64,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -4,
    backgroundColor: "#F2F8FD",
    borderColor: "#FFFFFF",
  },
  circleText: {
    fontFamily: "Bold",
    fontSize: 22,
    lineHeight: 26,
  },
});
