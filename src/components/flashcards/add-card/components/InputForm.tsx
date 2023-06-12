import { View, StyleSheet, Text } from "react-native";
import { useContext } from "react";
import PrimaryInput from "../../../PrimaryInput";
import { NewCardContext } from "../../../../context/OpusContext";
import { THEME } from "../../../../const/theme";

export default function InputForm() {
  const { item, setItem } = useContext(NewCardContext);
  const { question, answers } = item;
  const splittedQuestion = question
    .split("[input]")
    .join("______")
    .split("?")
    .join("");
  const formattedQuestion =
    splittedQuestion.charAt(0).toUpperCase() +
    splittedQuestion.substring(1) +
    "?";
  return (
    <View style={{ alignSelf: "stretch" }}>
      {question.length > 0 && (
        <Text style={styles.question}>{formattedQuestion}</Text>
      )}
      <PrimaryInput
        maxLength={56}
        value={question}
        label="Pytanie"
        onChangeText={(text) =>
          setItem((prev) => ({ ...prev, question: text }))
        }
      />
      <PrimaryInput
        maxLength={16}
        label="Odpowiedź"
        onChangeText={(text) =>
          setItem((prev) => ({
            ...prev,
            answers: [{ text, is_correct: true }],
          }))
        }
      />
    </View>
  );
}

export const styles = StyleSheet.create({
  question: {
    color: THEME.font,
    fontFamily: "ExtraBold",
    fontSize: 20,
    textAlign: "center",
    alignSelf: "center",
    marginBottom: 16,
    maxWidth: "80%",
  },
});
