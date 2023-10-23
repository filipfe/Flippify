import { View, StyleSheet, Text } from "react-native";
import { useContext } from "react";
import PrimaryInput from "../../ui/PrimaryInput";
import { NewCardContext } from "../../../context/OpusContext";
import { ThemeContext } from "../../../context/ThemeContext";

export default function InputForm() {
  const { font, lighter } = useContext(ThemeContext);
  const { item, setItem } = useContext(NewCardContext);
  const { question } = item;
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
        <Text style={{ ...styles.question, color: font }}>
          {formattedQuestion}
        </Text>
      )}
      <PrimaryInput
        maxLength={56}
        style={{ backgroundColor: lighter }}
        value={question}
        label="Pytanie"
        onChangeText={(text) =>
          setItem((prev) => ({ ...prev, question: text }))
        }
      />
      <PrimaryInput
        maxLength={32}
        label="Odpowiedź"
        style={{ backgroundColor: lighter }}
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
    fontFamily: "ExtraBold",
    fontSize: 20,
    textAlign: "center",
    alignSelf: "center",
    marginBottom: 16,
  },
});
