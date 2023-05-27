import { Topic } from "../../../types/flashcards";
import { Category } from "../../../types/general";
import { useNavigation } from "@react-navigation/native";
import { TopicListNavigationProp } from "../../../types/navigation";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { THEME } from "../../../const/theme";
import { linearGradient } from "../../../const/styles";
import { LinearGradient } from "expo-linear-gradient";
import RangeSlider from "../../RangeSlider";

const TopicRef = ({
  topic,
  category,
}: {
  topic: Topic;
  category: Category;
}) => {
  const navigation = useNavigation<TopicListNavigationProp>();
  return (
    <TouchableOpacity
      style={styles.wrapper}
      onPress={() =>
        navigation.navigate("FlashCardsGenerator", { topic, category })
      }
    >
      <View style={styles.topWrapper}>
        <Text style={styles.title}>{topic}</Text>
        <Text style={styles.title}>58%</Text>
      </View>
      <View style={{ marginVertical: 16 }}>
        <RangeSlider value={20} />
      </View>
      <View style={{ ...styles.topWrapper }}>
        <Text style={styles.points}>144 / 255 punkty</Text>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          style={styles.button}
          colors={linearGradient}
        >
          <Text style={styles.buttonText}>Wybierz</Text>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "white",
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
    color: THEME.font,
  },
  topWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  points: {
    color: THEME.secondary,
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
