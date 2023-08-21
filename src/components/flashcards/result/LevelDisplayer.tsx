import { Text, View, StyleSheet } from "react-native";
import { ThemeContext } from "../../../context/ThemeContext";
import { useContext } from "react";
import { Level } from "../../../types/auth";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import GradientText from "../../ui/GradientText";

type Props = Level & {
  isPromotion: boolean;
};

export default function LevelDisplayer({ current_level, isPromotion }: Props) {
  const translate = useSharedValue(0);
  const { font } = useContext(ThemeContext);

  const translateStyle = useAnimatedStyle(() => {
    translate.value = isPromotion ? -21 : 0;
    return {
      transform: [
        {
          translateY: withTiming(translate.value, {
            duration: isPromotion ? 800 : 0,
            easing: Easing.out((value) => value),
          }),
        },
      ],
    };
  }, [isPromotion]);

  return (
    <View style={styles.wrapper}>
      {isPromotion && (
        <GradientText style={styles.promotionText}>Awans!</GradientText>
      )}
      <View style={styles.rowWrapper}>
        <Text style={{ ...styles.title, color: font }}>Poziom </Text>
        <View style={styles.transitioner}>
          <Animated.View style={[styles.countWrapper, translateStyle]}>
            <Text style={[styles.title, { color: font }]}>
              {isPromotion ? current_level - 1 : current_level}
            </Text>
            <Text style={[styles.title, { color: font }]}>
              {isPromotion ? current_level : current_level + 1}
            </Text>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
  },
  promotionText: {
    fontSize: 14,
    fontFamily: "SemiBold",
    marginBottom: 8,
  },
  rowWrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    lineHeight: 21,
    fontFamily: "ExtraBold",
  },
  transitioner: {
    maxHeight: 21,
    overflow: "hidden",
  },
  countWrapper: {
    alignItems: "stretch",
    transform: [{ translateY: -20 }],
  },
});
