import { StyleSheet, View } from "react-native";
import useShadow from "../../hooks/useShadow";
import Animated from "react-native-reanimated";
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
  const { primary, secondary } = useContext(ThemeContext);
  const shadow = useShadow(4);
  return (
    <Animated.View
      style={{
        ...styles.dot,
        ...shadow,
        ...(activeIndex === index
          ? { backgroundColor: primary, ...styles.activeDot }
          : { ...styles.inActiveDot, backgroundColor: secondary }),
      }}
    />
  );
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
  },
  activeDot: {
    borderColor: "#FFF",
  },
  inActiveDot: {
    borderColor: "#F0F0F0",
  },
});
