import { Image, StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../PrimaryButton";
import { useContext, useState, useEffect } from "react";
import { FlashCardContext } from "../../context/FlashCardContext";
import { THEME } from "../../const/theme";
import { shadowPrimary } from "../../styles/general";
import { AuthContext } from "../../context/AuthContext";
import { DefaultProfileIcon } from "../../assets/icons/icons";
import SecondaryButton from "../SecondaryButton";
import { LinearGradient } from "expo-linear-gradient";
import { linearGradient } from "../../const/styles";

export default function Result() {
  const [isCorrect, setIsCorrect] = useState(false);
  const { flipCard, changeCard, activeCard, answer } =
    useContext(FlashCardContext);
  const { type, answers } = activeCard;
  const { user } = useContext(AuthContext);
  const { profile_picture } = user;

  const checkIfCorrect = (answer: string) => {
    switch (type) {
      case "radio":
        const correctAnswer = answers.find((ans) => ans.is_correct)?.text;
        return correctAnswer === answer;
      case "input":
        return false;
    }
  };

  useEffect(() => {
    const isAnswerCorrect = checkIfCorrect(answer);
    setIsCorrect(isAnswerCorrect);
  }, [answer]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.innerWrapper}>
        <View style={styles.userPictureWrapper}>
          {profile_picture ? (
            <Image source={{ uri: profile_picture }} />
          ) : (
            <DefaultProfileIcon width={96} height={96} />
          )}
        </View>
        <Text style={styles.title}>Poziom 17</Text>
        <View style={styles.progressWrapper}>
          <LinearGradient
            style={{ width: `20%`, ...styles.progress }}
            start={{ x: 0, y: 0 }}
            colors={linearGradient}
          >
            <Text style={styles.points}>+24</Text>
          </LinearGradient>
        </View>
        <Text style={styles.title}>
          {isCorrect ? "To poprawna odpowiedź!" : "Niepoprawna odpowiedź!"}
        </Text>
        <View style={styles.answerWrapper}>
          <Text
            style={{ ...styles.answer, color: isCorrect ? "#13C331" : "red" }}
          >
            {answer}
          </Text>
        </View>
      </View>
      <View style={styles.buttonsWrapper}>
        <SecondaryButton
          text={"Odwróć"}
          style={{ marginRight: 4, flex: 1 }}
          paddingHorizontal={0}
          onPress={flipCard}
        />
        <PrimaryButton
          onPress={changeCard}
          style={{ marginLeft: 4, flex: 1 }}
          paddingHorizontal={0}
          text="Przejdź dalej"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    flex: 1,
  },
  innerWrapper: {
    alignItems: "center",
    width: "100%",
  },
  buttonsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    maxWidth: "100%",
  },
  title: {
    color: THEME.font,
    fontSize: 20,
    fontFamily: "ExtraBold",
    marginVertical: 16,
  },
  userPictureWrapper: {
    height: 96,
    width: 96,
    borderRadius: 96,
    borderWidth: 3,
    borderColor: "#FFF",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    ...shadowPrimary,
  },
  answerWrapper: {
    alignItems: "center",
  },
  answer: {
    fontFamily: "Bold",
    fontSize: 24,
  },
  progressWrapper: {
    width: "90%",
    height: 5,
    borderRadius: 255,
    backgroundColor: "#D4E9FA",
    marginVertical: 24,
  },
  progress: {
    height: "100%",
    borderRadius: 255,
    position: "relative",
  },
  points: {
    position: "absolute",
    top: -28,
    right: 0,
    transform: [{ translateX: 8 }],
    color: THEME.secondary,
    fontFamily: "SemiBold",
    fontSize: 14,
  },
});
