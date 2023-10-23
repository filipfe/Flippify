import { Text, View, StyleSheet, Pressable } from "react-native";
import { useContext } from "react";
import { FlashCardContext } from "../../context/FlashCardContext";
import { shadowPrimary } from "../../styles/general";
import RadioAnswer from "./answers/RadioAnswer";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Result from "./Result";
import { ThemeContext } from "../../context/ThemeContext";
import InputAnswer from "./answers/InputAnswer";
import { SettingsContext } from "../../context/SettingsContext";

export default function FlashCardRef() {
  const rotate = useSharedValue(0);
  const { settings } = useContext(SettingsContext);
  const { font, background, box } = useContext(ThemeContext);
  const { activeCard } = useContext(FlashCardContext);
  const { question, type, answers } = activeCard;

  const frontCardTransform = useAnimatedStyle(
    () => ({
      transform: [
        {
          rotateY: settings.animations
            ? withTiming(`${interpolate(rotate.value, [0, 1], [0, 180])}deg`, {
                duration: 250,
                easing: Easing.bezier(0.25, 0.1, 0.25, 1),
              })
            : `${rotate.value}deg`,
        },
      ],
    }),
    [rotate.value]
  );

  const backCardTransform = useAnimatedStyle(
    () => ({
      transform: [
        {
          rotateY: settings.animations
            ? withTiming(
                `${interpolate(rotate.value, [0, 1], [180, 360])}deg`,
                {
                  duration: 250,
                  easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                }
              )
            : `${rotate.value - 180}deg`,
        },
      ],
      zIndex: rotate.value ? 10 : -10,
    }),
    [rotate.value]
  );

  return (
    <View style={{ ...styles.wrapper, backgroundColor: background }}>
      <Animated.View
        style={[styles.card, frontCardTransform, { backgroundColor: box }]}
      >
        <Text style={{ ...styles.question, color: font }}>
          {question.split("[input]").join(".....")}
        </Text>
        <View style={styles.answersWrapper}>
          {type === "radio" &&
            answers.map((answer, i) => (
              <RadioAnswer
                {...answer}
                rotate={rotate}
                index={i}
                key={answer.text + i}
              />
            ))}
        </View>
        {type === "input" && <InputAnswer {...answers[0]} />}
      </Animated.View>
      <Animated.View
        style={[
          styles.card,
          styles.backCard,
          backCardTransform,
          {
            backgroundColor: box,
          },
        ]}
      >
        <Result rotate={rotate} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: "relative",
  },
  card: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderRadius: 24,
    alignItems: "center",
    backfaceVisibility: "hidden",
    flex: 1,
  },
  backCard: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 10,
  },
  question: {
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
