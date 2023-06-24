import { StyleSheet, View } from "react-native";
import useShadow from "../../hooks/useShadow";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

type WrapperProps = {
  images: any[];
  activeIndex: number;
};

type DotProps = {
  index: number;
  activeIndex: number;
};

export default function NoteImageIndex({ images, activeIndex }: WrapperProps) {
  return (
    <View style={styles.wrapper}>
      {images.map((_, i) => (
        <Dot activeIndex={activeIndex} index={i} key={i} />
      ))}
    </View>
  );
}

const Dot = ({ activeIndex, index }: DotProps) => {
  const isActive = activeIndex === index;
  const { primary, secondary } = useContext(ThemeContext);
  const shadow = useShadow(4);

  const activeStyle = useAnimatedStyle(
    () => ({
      opacity: withTiming(isActive ? 1 : 0.6, { duration: 200 }),
      backgroundColor: withTiming(isActive ? primary : secondary, {
        duration: 200,
      }),
    }),
    [activeIndex]
  );

  return <Animated.View style={[styles.dot, shadow, activeStyle]} />;
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    height: 16,
    width: 16,
    borderRadius: 16,
    borderWidth: 4,
    marginHorizontal: 4,
    borderColor: "#FFF",
  },
});
