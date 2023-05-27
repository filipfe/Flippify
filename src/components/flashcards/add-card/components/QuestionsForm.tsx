import { Pressable, Text, TextInput, View } from "react-native";
import { useState, useContext } from "react";
import PrimaryButton from "../../../PrimaryButton";
import { NewCardContext } from "../../../../providers/NewCardProvider";
import { AddedFlashCard, Answer } from "../../../../types/flashcards";
import { QuestionsFormNavigationProp } from "../../../../types/navigation";

const QuestionsForm = ({
  navigation,
}: {
  navigation: QuestionsFormNavigationProp;
}) => {
  const { newCard, setNewCard } = useContext(NewCardContext);
  const [question, setQuestion] = useState(newCard.question);
  const [wrongAnswers, setWrongAnswers] = useState<Answer[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<Answer>(
    newCard.answers.find((ans) => ans.correct) || {
      content: "",
      correct: true,
    }
  );

  const handleSave = () => {
    setNewCard((prev: AddedFlashCard) => {
      return {
        ...prev,
        question,
        answers: [correctAnswer, ...wrongAnswers],
      };
    });
    navigation.goBack();
  };

  return (
    <View>
      <View>
        <Text>Wprowadź treść pytania</Text>
        <View>
          <TextInput
            placeholderTextColor="#B6C3B9"
            placeholder="W któym roku Polska przyjęła chrzest?"
            value={question}
            onChangeText={(text) => setQuestion(text)}
          />
        </View>
      </View>
      <View>
        <TextInput
          value={correctAnswer.content}
          placeholder="Prawidłowa odpowiedź"
          placeholderTextColor="#B6C3B9"
          onChangeText={(text) =>
            setCorrectAnswer({
              content: text,
              correct: true,
            })
          }
        />
        <View />
      </View>
      {newCard.type === "radio" &&
        wrongAnswers.map((answer, i) => (
          <TextInput
            placeholder="Zła odpowiedź"
            key={i}
            onChangeText={(text) =>
              setWrongAnswers((prev) => {
                if (prev.length === 0) return prev;
                let newArr = prev;
                newArr[i].content = text;
                return newArr;
              })
            }
          />
        ))}
      {newCard.type === "radio" && wrongAnswers.length < 3 && (
        <View>
          <Pressable
            onPress={() =>
              setWrongAnswers((prev: Answer[]) => [
                ...prev,
                { content: "", correct: false },
              ])
            }
          >
            <Text>Dodaj złą odpowiedź</Text>
          </Pressable>
          <View />
        </View>
      )}
      <PrimaryButton
        onPress={handleSave}
        active={
          newCard.type === "radio"
            ? question !== "" &&
              correctAnswer.content !== "" &&
              wrongAnswers.length > 0
            : question !== "" && correctAnswer.content !== ""
        }
        text="Zapisz"
      />
    </View>
  );
};

export default QuestionsForm;
