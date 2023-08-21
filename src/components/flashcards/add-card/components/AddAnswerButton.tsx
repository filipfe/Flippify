import { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { NewCardContext } from "../../../../context/OpusContext";
import GradientText from "../../../ui/GradientText";
import { LinearGradient } from "expo-linear-gradient";
import { linearGradient } from "../../../../const/styles";

export default function AddAnswerButton() {
  const { setItem } = useContext(NewCardContext);
  const addAnswer = () => {
    setItem((prev) => ({
      ...prev,
      answers: [...prev.answers, { text: "", is_correct: false }],
    }));
  };
  return (
    <Pressable style={styles.button} onPress={addAnswer}>
      <LinearGradient
        style={styles.plusWrapper}
        colors={linearGradient}
        start={{ x: 0, y: 0 }}
      >
        <Text style={styles.plus}>+</Text>
      </LinearGradient>
      <GradientText style={styles.text}>Dodaj odpowiedź</GradientText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 24,
    alignItems: "center",
    flexDirection: "row",
  },
  plusWrapper: {
    height: 24,
    width: 24,
    borderRadius: 24,
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  plus: {
    fontFamily: "Bold",
    fontSize: 12,
    lineHeight: 12,
    color: "#FFF",
  },
  text: {
    fontFamily: "Bold",
    fontSize: 12,
    lineHeight: 12,
  },
});
