import { Pressable, Text, TextInput, View } from "react-native";
import { useState, useEffect, useContext } from "react";
import PrimaryButton from "../PrimaryButton";
import { AnswerContext } from "../../providers/AnswerProvider";
import { Answer, FlashCard } from "../../types/flashcards";

export default function FlashCardRef(props: FlashCard) {
  const [status, setStatus] = useState<"correct" | "wrong" | undefined>(
    undefined
  );
  const { answers, type, question } = props;
  const { answer } = useContext(AnswerContext);

  useEffect(() => {
    if (!answer) return;
    let correct = props.answers.find((ans) => ans.correct);
    if (correct?.content === answer) setStatus("correct");
    else setStatus("wrong");
  }, [answer]);

  useEffect(() => {
    return () => setStatus(undefined);
  }, [props]);

  return (
    <View>
      <Text>{question.split("[input]").join(".....")}</Text>
      {type === "radio" &&
        answers.map((answer) => <RadioAnswer {...answer} key={answer.id} />)}
      {type === "input" && <InputAnswer />}
      {status && <Text>{status}</Text>}
    </View>
  );
}

const RadioAnswer = (props: Answer) => {
  const { correct, content } = props;
  const { answer, setAnswer } = useContext(AnswerContext);
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (!answer || (content !== answer && !correct)) return;
    setIsCorrect(correct);
    return () => {
      setIsCorrect(undefined);
    };
  }, [answer]);

  return (
    <View>
      <Pressable onPress={() => setAnswer(content)}>
        <Text>{content}</Text>
      </Pressable>
      <View />
    </View>
  );
};

const InputAnswer = () => {
  const [input, setInput] = useState("");
  const { answer, setAnswer } = useContext(AnswerContext);

  useEffect(() => {
    if (answer) setInput(answer);
    else setInput("");
  }, [answer]);

  return (
    <>
      <TextInput
        placeholder="Odpowiedź"
        value={input}
        onChangeText={(text) => setInput(text.toLowerCase())}
      />
      <PrimaryButton onPress={() => setAnswer(input)} text="Zatwierdź" />
    </>
  );
};
