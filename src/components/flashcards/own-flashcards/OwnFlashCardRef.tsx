import { View, Text, StyleSheet } from "react-native";
import { AddedFlashCard } from "../../../types/flashcards";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import SecondaryButton from "../../SecondaryButton";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootTabParams } from "../../../types/navigation";

export default function OwnFlashCardRef(props: AddedFlashCard) {
  const { navigate } = useNavigation<NavigationProp<RootTabParams>>();
  const { font, secondary } = useContext(ThemeContext);
  const { question, created_at, category, topic, type } = props;
  return (
    <View>
      <View style={[styles.row, { alignItems: "flex-end" }]}>
        <Text style={[styles.classification, { color: secondary }]}>
          {category.name}, {topic.name}
        </Text>
        <Text style={[styles.classification, { color: secondary }]}>
          {created_at
            ? new Date(created_at).toLocaleDateString("default")
            : "-"}
        </Text>
      </View>
      <Text style={[styles.question, { color: font }]}>{question}</Text>
      <View style={styles.row}>
        <Text style={[styles.classification, { color: secondary }]}>
          Typ pytania: {type === "radio" ? "Zamknięte" : "Otwarte"}
        </Text>
        <SecondaryButton
          paddingVertical={8}
          fontSize={10}
          text="Modyfikuj"
          onPress={() => navigate("AddCard", props)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  question: {
    fontSize: 16,
    fontFamily: "SemiBold",
  },
  row: {
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  classification: {
    fontFamily: "Medium",
    fontSize: 12,
  },
});
