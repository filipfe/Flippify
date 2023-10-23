import { Pressable, View } from "react-native";
import { FlashCardContext } from "../../../context/FlashCardContext";
import { Answer } from "../../../types/flashcards";
import { useContext } from "react";
import { Text, StyleSheet } from "react-native";
import { ThemeContext } from "../../../context/ThemeContext";

const InputAnswer = (props: Answer) => {
  const { is_correct, text } = props;
  const { submitAnswer, answer } = useContext(FlashCardContext);
  const { secondary, font, light } = useContext(ThemeContext);

  const correctColor = (base: string) => {
    if (is_correct && answer.text) return "#13C331";
    if (!answer || answer.text !== text) return base;
    return "red";
  };

  return (
    <Pressable
      style={styles.wrapper}
      onPress={() => submitAnswer({ text, is_correct: false })}
    >
      <Text
        style={{
          ...styles.label,
          color: correctColor(secondary),
          textAlign: "center",
        }}
      >
        Odpowiedź
      </Text>
      <View style={{ ...styles.input, backgroundColor: light }}>
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

export default InputAnswer;
