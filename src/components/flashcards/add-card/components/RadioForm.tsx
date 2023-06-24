import { View, Text, Pressable } from "react-native";
import { useContext } from "react";
import PrimaryInput from "../../../PrimaryInput";
import { NewCardContext } from "../../../../context/OpusContext";
import { styles } from "./InputForm";
import AddAnswerButton from "./AddAnswerButton";
import RadioAnswer from "./RadioAnswer";
import { ThemeContext } from "../../../../context/ThemeContext";

export default function RadioForm() {
  const { font } = useContext(ThemeContext);
  const { item, setItem } = useContext(NewCardContext);
  const { question, answers } = item;
  const splittedQuestion = question.split("?").join("");
  const formattedQuestion =
    splittedQuestion.charAt(0).toUpperCase() +
    splittedQuestion.substring(1) +
    "?";

  return (
    <View style={{ alignSelf: "stretch" }}>
      {question.length > 0 && (
        <Text style={[styles.question, { color: font }]}>
          {formattedQuestion}
        </Text>
      )}
      <PrimaryInput
        maxLength={56}
        value={question}
        label="Pytanie"
        onChangeText={(text) =>
          setItem((prev) => ({ ...prev, question: text }))
        }
      />
      {answers.map((ans, index) => (
        <RadioAnswer {...ans} index={index} key={index} />
      ))}
      {answers.length < 4 && <AddAnswerButton />}
    </View>
  );
}
