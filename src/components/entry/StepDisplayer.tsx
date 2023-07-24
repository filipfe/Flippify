import { LinearGradient } from "expo-linear-gradient";
import { linearGradient } from "../../const/styles";
import { StyleSheet, View, Dimensions } from "react-native";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get("screen");

const StepDisplayer = ({ step }: { step: number }) => {
  const { light } = useContext(ThemeContext);

  const transitionStyle = useAnimatedStyle(
    () => ({
      transform: [{ translateX: withTiming((step * (width / 2)) / 2) }],
    }),
    [step]
  );

  return (
    <View style={{ ...styles.wrapper, backgroundColor: light }}>
      <Animated.View style={[styles.outerBar, transitionStyle]}>
        <LinearGradient colors={linearGradient} style={styles.innerBar} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 32,
    borderRadius: 24,
    height: 6,
    overflow: "hidden",
    width: width / 2,
    flexDirection: "row",
    position: "absolute",
    top: 24,
    alignSelf: "center",
  },
  outerBar: {
    width: "50%",
    height: "100%",
  },
  innerBar: {
    height: "100%",
    width: "100%",
    borderRadius: 24,
  },
});

export default StepDisplayer;
