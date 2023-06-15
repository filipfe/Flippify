import { Topic } from "../../../types/flashcards";
import { Category } from "../../../types/general";
import { useNavigation } from "@react-navigation/native";
import { TopicListNavigationProp } from "../../../types/navigation";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { linearGradient } from "../../../const/styles";
import { LinearGradient } from "expo-linear-gradient";
import RangeSlider from "../../RangeSlider";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

const TopicRef = ({
  topic,
  category,
}: {
  topic: Topic;
  category: Category;
}) => {
  const { font, secondary, background } = useContext(ThemeContext);
  const navigation = useNavigation<TopicListNavigationProp>();
  return (
    <View style={{ ...styles.wrapper, backgroundColor: background }}>
      <View style={styles.topWrapper}>
        <Text style={{ ...styles.title, color: font }}>{topic}</Text>
        <Text style={{ ...styles.title, color: font }}>58%</Text>
      </View>
      <View style={{ marginVertical: 16 }}>
        <RangeSlider value={20} />
      </View>
      <View style={{ ...styles.topWrapper }}>
        <Text style={{ ...styles.points, color: secondary }}>
          144 / 255 punkty
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("FlashCardsGenerator", { topic, category })
          }
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            style={styles.button}
            colors={linearGradient}
          >
            <Text style={styles.buttonText}>Wybierz</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
    elevation: 16,
    shadowColor: "#3C85C2",
    borderRadius: 24,
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
