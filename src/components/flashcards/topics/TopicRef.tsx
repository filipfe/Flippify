import { Topic } from "../../../types/flashcards";
import { Category } from "../../../types/general";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import RippleButton from "../../ui/RippleButton";
import { RootStackParams } from "../../../types/navigation";

const TopicRef = ({
  topic,
  category,
}: {
  topic?: Topic;
  category: Category;
}) => {
  const { font, secondary, box } = useContext(ThemeContext);
  const navigation =
    useNavigation<NavigationProp<RootStackParams, "CardsGenerator">>();
  return (
    <View style={[styles.wrapper, { backgroundColor: box }]}>
      <RippleButton
        borderless
        onPress={() =>
          navigation.navigate("CardsGenerator", {
            topic,
            category,
          })
        }
      >
        <View style={styles.innerWrapper}>
          <Text style={{ ...styles.title, color: font }}>
            {topic?.name || "Wszystkie tematy"}
          </Text>
          {topic?.name && (
            <Text style={{ ...styles.points, color: secondary }}>
              {topic?.cards?.[0].count} fiszki
            </Text>
          )}
        </View>
      </RippleButton>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 12,
  },
  innerWrapper: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 12,
  },
  title: {
    fontFamily: "SemiBold",
  },
  points: {
    fontFamily: "Medium",
    fontSize: 12,
    lineHeight: 16,
  },
});

export default TopicRef;
