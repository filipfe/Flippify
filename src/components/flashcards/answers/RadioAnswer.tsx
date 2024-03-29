import { Pressable, View } from "react-native";
import { FlashCardContext } from "../../../context/FlashCardContext";
import { Answer } from "../../../types/flashcards";
import { useContext } from "react";
import { Text, StyleSheet } from "react-native";
import { ThemeContext } from "../../../context/ThemeContext";
import { SharedValue } from "react-native-reanimated";

type Props = {
  index: number;
  rotate: SharedValue<number>;
};

const RadioAnswer = (props: Answer & Props) => {
  const { index, rotate, ...card } = props;
  const { is_correct, text } = card;
  const { submitAnswer, answer } = useContext(FlashCardContext);
  const { secondary, font, lighter } = useContext(ThemeContext);

  const correctColor = (base: string) => {
    if (is_correct && answer.text) return "#13C331";
    if (!answer.text || answer.text !== text) return base;
    return "#FA4646";
  };

  return (
    <Pressable
      style={({ pressed }) => [
        { transform: [{ scale: pressed ? 0.95 : 1 }] },
        styles.wrapper,
      ]}
      onPress={() => {
        rotate.value = rotate.value ? 0 : 1;
        submitAnswer(card);
      }}
    >
      <Text
        style={{
          ...styles.label,
          color: correctColor(secondary),
          textAlign: "center",
        }}
      >
        Odpowiedź {indexToLetter(index)}
      </Text>
      <View style={{ ...styles.input, backgroundColor: lighter }}>
        <Text
          style={{
            textAlign: "center",
            fontFamily: "ExtraBold",
            color: correctColor(font),
          }}
        >
          {text}
        </Text>
      </View>
    </Pressable>
  );
};

export const indexToLetter = (index: number) => {
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

export const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    marginBottom: 8,
  },
  label: {
    fontFamily: "SemiBold",
    transform: [{ translateY: 8 }],
    zIndex: 10,
    position: "relative",
    fontSize: 12,
    paddingHorizontal: 24,
  },
  input: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: "100%",
  },
});

export default RadioAnswer;
