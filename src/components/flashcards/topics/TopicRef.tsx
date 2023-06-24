import { Topic } from "../../../types/flashcards";
import { Category } from "../../../types/general";
import { useNavigation } from "@react-navigation/native";
import { TopicListNavigationProp } from "../../../types/navigation";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RangeSlider from "../../RangeSlider";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import useShadow from "../../../hooks/useShadow";
import RippleButton from "../../RippleButton";

const TopicRef = ({
  topic,
  category,
}: {
  topic?: Topic;
  category: Category;
}) => {
  const { font, secondary, background } = useContext(ThemeContext);
  const shadow = useShadow(24);
  const navigation = useNavigation<TopicListNavigationProp>();
  return (
    <View style={[styles.wrapper, shadow, { backgroundColor: background }]}>
      <RippleButton
        borderless
        onPress={() =>
          navigation.navigate("FlashCardsGenerator", {
            topic: topic || undefined,
            category,
          })
        }
      >
        <View style={styles.innerWrapper}>
          <View style={styles.topWrapper}>
            <Text style={{ ...styles.title, color: font }}>
              {topic?.name || "Wszystkie tematy"}
            </Text>
            <Text style={{ ...styles.title, color: font }}>58%</Text>
          </View>
          <View style={{ marginTop: 16, marginBottom: 24 }}>
            <RangeSlider value={20} />
          </View>
          <View style={styles.topWrapper}>
            <Text style={{ ...styles.points, color: secondary }}>
              144 / 255 punkty
            </Text>
          </View>
        </View>
      </RippleButton>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 8,

    marginHorizontal: 24,

    borderRadius: 24,
  },
  innerWrapper: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  title: {
    fontFamily: "SemiBold",
    fontSize: 18,
  },
  topWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  points: {
    fontFamily: "SemiBold",
    lineHeight: 16,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  buttonText: {
    fontFamily: "ExtraBold",
    color: "#FFFFFF",
    fontSize: 12,
  },
});

export default TopicRef;
