import { Pressable, View } from "react-native";
import { FlashCardContext } from "../../../context/FlashCardContext";
import { Answer } from "../../../types/flashcards";
import { useContext } from "react";
import { Text } from "react-native";
import { styles } from "./styles";
import { THEME } from "../../../const/theme";

const RadioAnswer = (props: Answer & { index: number }) => {
  const { index, ...card } = props;
  const { is_correct, text } = card;
  const { submitAnswer, answer } = useContext(FlashCardContext);

  const correctColor = (base: string) => {
    if (is_correct && answer) return "#13C331";
    if (!answer || answer !== text) return base;
    return "red";
  };

  return (
    <Pressable style={styles.wrapper} onPress={() => submitAnswer(text)}>
      <Text
        style={{
          ...styles.label,
          color: correctColor(THEME.secondary),
          textAlign: "center",
        }}
      >
        Odpowiedź {indexToLetter(index)}
      </Text>
      <View style={styles.input}>
        <Text
          style={{
            textAlign: "center",
            fontFamily: "ExtraBold",
            color: correctColor(THEME.font),
          }}
        >
          {text}
        </Text>
      </View>
    </Pressable>
  );
};

const indexToLetter = (index: number) => {
  switch (index) {
    case 0:
      return "A";
    case 1:
      return "B";
    case 2:
      return "C";
    case 3:
      return "D";
    default:
      return "";
  }
};

export default RadioAnswer;
