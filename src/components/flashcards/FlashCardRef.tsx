import { Text, View, StyleSheet } from "react-native";
import { useContext, useEffect } from "react";
import { FlashCardContext } from "../../context/FlashCardContext";
import { shadowPrimary } from "../../styles/general";
import { THEME } from "../../const/theme";
import RadioAnswer from "./answers/RadioAnswer";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import Result from "./Result";

export default function FlashCardRef() {
  const { activeCard, rotateValue } = useContext(FlashCardContext);
  const { question, type, answers } = activeCard;

  const frontCardTransform = useAnimatedStyle(
    () => ({
      transform: [
        { rotateX: withTiming(`${rotateValue}deg`, { duration: 400 }) },
      ],
    }),
    [rotateValue]
  );

  const backCardTransform = useAnimatedStyle(
    () => ({
      transform: [
        { rotateX: withTiming(`${180 + rotateValue}deg`, { duration: 400 }) },
      ],
      zIndex: rotateValue === 180 ? 1 : -1,
    }),
    [rotateValue]
  );

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.card, frontCardTransform]}>
        <Text style={styles.question}>
          {question.split("[input]").join(".....")}
        </Text>
        <View style={styles.answersWrapper}>
          {type === "radio" &&
            answers.map((answer, i) => (
              <RadioAnswer {...answer} index={i} key={answer.text} />
            ))}
        </View>
        {/* {type === "input" && <InputAnswer />} */}
      </Animated.View>
      <Animated.View style={[styles.card, styles.backCard, backCardTransform]}>
        <Result />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#FFF",
    flex: 1,
    position: "relative",
  },
  card: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: "#FFF",
    borderRadius: 24,
    alignItems: "center",
    backfaceVisibility: "hidden",
    flex: 1,
    zIndex: 1,
    ...shadowPrimary,
  },
  backCard: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
  question: {
    color: THEME.font,
    fontSize: 20,
    fontFamily: "ExtraBold",
    textAlign: "center",
  },
  answersWrapper: {
    marginTop: 24,
    width: "100%",
  },
});

// const InputAnswer = () => {
//   const [input, setInput] = useState("");
//   const { answer, setAnswer } = useContext(AnswerContext);

//   useEffect(() => {
//     if (answer) setInput(answer);
//     else setInput("");
//   }, [answer]);

//   return (
//     <>
//       <TextInput
//         placeholder="Odpowiedź"
//         value={input}
//         onChangeText={(text) => setInput(text.toLowerCase())}
//       />
//       <PrimaryButton onPress={() => setAnswer(input)} text="Zatwierdź" />
//     </>
//   );
// };
