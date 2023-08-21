import { Task } from "../../../types/task";
import { View, Text, StyleSheet } from "react-native";
import useShadow from "../../../hooks/useShadow";
import { ThemeContext } from "../../../context/ThemeContext";
import { useContext } from "react";
import { ArrowIcon, DoneIcon } from "../../../assets/icons/icons";
import GradientText from "../../ui/GradientText";

export default function TaskRef({
  description,
  required_value,
  current_value,
  reward_points,
}: Task) {
  const { background, secondary, font, light } = useContext(ThemeContext);
  const shadow = useShadow(16);
  const isCompleted = current_value === required_value;

  return (
    <View style={[styles.wrapper, shadow, { backgroundColor: background }]}>
      <View style={styles.leftWrapper}>
        <View style={[styles.circle, { backgroundColor: light }]}>
          <GradientText style={styles.points}>+{reward_points}</GradientText>
        </View>
        <View>
          <Text style={[styles.title, { color: font }]}>{description}</Text>
          <Text style={[styles.topic, { color: secondary }]}>
            {current_value} / {required_value}
          </Text>
        </View>
      </View>
      {isCompleted ? <DoneIcon /> : <ArrowIcon fill={font} />}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginBottom: 16,
  },
  title: {
    fontFamily: "SemiBold",
    fontSize: 16,
    marginBottom: 4,
  },
  topic: {
    fontFamily: "SemiBold",
    fontSize: 12,
  },
  leftWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    height: 56,
    width: 56,
    borderRadius: 56,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  points: {
    fontFamily: "Bold",
  },
});
