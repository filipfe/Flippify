import { NewCardContext } from "../../../../context/OpusContext";
import { Answer } from "../../../../types/flashcards";
import PrimaryInput from "../../../ui/PrimaryInput";
import { View, Pressable, StyleSheet } from "react-native";
import { useContext } from "react";
import { BinIcon } from "../../../../assets/icons/icons";
import { ThemeContext } from "../../../../context/ThemeContext";

export default function RadioAnswer({
  index,
  ...ans
}: Answer & { index: number }) {
  const { wrong } = useContext(ThemeContext);
  const { setItem } = useContext(NewCardContext);
  const deleteAnswer = (index: number) => {
    setItem((prev) => {
      let newAnswers = prev.answers;
      newAnswers.splice(index, 1);
      return {
        ...prev,
        answers: newAnswers,
      };
    });
  };
  return (
    <View
      style={{
        position: "relative",
        justifyContent: "center",
      }}
    >
      <PrimaryInput
        maxLength={32}
        label={`Odpowiedź ${index + 1}`}
        value={ans.text}
        deleteIcon={
          index > 1 ? (
            <Pressable
              onPress={() => deleteAnswer(index)}
              style={[styles.deleteButton, { backgroundColor: wrong }]}
            >
              <BinIcon fill={"#FFF"} height={20} width={20} />
            </Pressable>
          ) : undefined
        }
        onChangeText={(text) =>
          setItem((prev) => {
            let newAnswers = prev.answers;
            newAnswers[index].text = text;
            return {
              ...prev,
              answers: newAnswers,
            };
          })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  deleteButton: {
    position: "absolute",
    right: 0,
    bottom: 0,
    top: 0,
    width: 48,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});
