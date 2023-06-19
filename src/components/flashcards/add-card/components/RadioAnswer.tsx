import { NewCardContext } from "../../../../context/OpusContext";
import { Answer } from "../../../../types/flashcards";
import PrimaryInput from "../../../PrimaryInput";
import { View, Pressable, StyleSheet } from "react-native";
import { useContext } from "react";
import { BinIcon } from "../../../../assets/icons/icons";

export default function RadioAnswer({
  index,
  ...ans
}: Answer & { index: number }) {
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
        maxLength={16}
        label={`Odpowiedź ${index + 1}`}
        value={ans.text}
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
      {index > 1 && (
        <Pressable
          onPress={() => deleteAnswer(index)}
          style={styles.deleteButton}
        >
          <BinIcon height={22} width={22} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  deleteButton: {
    position: "absolute",
    right: 24,
    paddingTop: 16,
  },
});
