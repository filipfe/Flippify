import { Image, StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../PrimaryButton";
import { useContext, useState, useEffect } from "react";
import { FlashCardContext } from "../../context/FlashCardContext";
import { shadowPrimary } from "../../styles/general";
import { AuthContext } from "../../context/AuthContext";
import { DefaultProfileIcon } from "../../assets/icons/icons";
import SecondaryButton from "../SecondaryButton";
import { LinearGradient } from "expo-linear-gradient";
import { linearGradient } from "../../const/styles";
import { ThemeContext } from "../../context/ThemeContext";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import LevelDisplayer from "./result/LevelDisplayer";
import { useCountUp } from "use-count-up";
import { indexToLetter } from "./answers/RadioAnswer";

export default function Result() {
  const { font, secondary, light } = useContext(ThemeContext);
  const { flipCard, changeCard, activeCard, answer } =
    useContext(FlashCardContext);
  const { user, level } = useContext(AuthContext);
  const { avatar_url } = user;
  const [oldPoints, setOldPoints] = useState(level.points);
  const { value: points, reset } = useCountUp({
    isCounting: true,
    start: oldPoints,
    end: level.points,
    decimalPlaces: 0,
    easing: "easeOutCubic",
    duration: 0.6,
    onComplete: () => setOldPoints(level.points),
  });
  const isPromotion = answer.is_correct && level.points < 20;
  const answerLetter = indexToLetter(
    activeCard.answers.findIndex((item) => item.text === answer.text)
  );

  const animatedWidthStyle = useAnimatedStyle(
    () => ({
      width: withTiming(
        ((level.points / level.points_required) * 100).toFixed(2) + "%",
        {
          duration: 600,
        }
      ),
    }),
    [level]
  );

  useEffect(reset, [level.points]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.innerWrapper}>
        <View style={styles.userPictureWrapper}>
          {avatar_url ? (
            <Image source={{ uri: avatar_url }} />
          ) : (
            <DefaultProfileIcon width={96} height={96} />
          )}
        </View>
        <View style={{ marginTop: 24 }}>
          <LevelDisplayer {...level} isPromotion={isPromotion} />
        </View>
        <View style={styles.pointsWrapper}>
          <View>
            {answer.is_correct && (
              <Text
                numberOfLines={1}
                style={{
                  ...styles.points,
                  color: secondary,
                }}
              >
                +20
              </Text>
            )}
          </View>
          <Text style={{ ...styles.points, fontSize: 12, color: secondary }}>
            {points} / {level.points_required}
          </Text>
        </View>
        <View style={[styles.progressWrapper, { backgroundColor: light }]}>
          <Animated.View style={animatedWidthStyle}>
            <LinearGradient
              style={styles.progress}
              start={{ x: 0, y: 0 }}
              colors={linearGradient}
            />
          </Animated.View>
        </View>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "ExtraBold",
            marginTop: 16,
            color: font,
          }}
        >
          {answer.is_correct
            ? "To poprawna odpowiedź!"
            : "Niepoprawna odpowiedź!"}
        </Text>
      </View>
      <View style={styles.answerWrapper}>
        {answer.text && (
          <Text
            style={{
              fontFamily: "SemiBold",
              textAlign: "center",
              color: answer.is_correct ? "#13C331" : "#FA4646",
              marginBottom: 8,
            }}
          >
            Odpowiedź {answerLetter}
          </Text>
        )}
        <Text
          style={{
            ...styles.answer,
            color: answer.is_correct ? "#13C331" : "#FA4646",
          }}
        >
          {answer.text}
        </Text>
      </View>
      <View style={styles.buttonsWrapper}>
        <SecondaryButton
          text={"Odwróć"}
          style={{ marginRight: 4, flex: 1 }}
          paddingHorizontal={0}
          onPress={flipCard}
        />
        <PrimaryButton
          style={{ marginLeft: 4, flex: 1 }}
          paddingHorizontal={0}
          text="Przejdź dalej"
          onPress={changeCard}
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
    paddingBottom: 64,
    paddingTop: 16,
  },
  answer: {
    fontFamily: "ExtraBold",
    fontSize: 18,
    textAlign: "center",
  },
  progressWrapper: {
    width: "95%",
    height: 5,
    borderRadius: 255,
    marginBottom: 24,
    marginTop: 8,
    position: "relative",
  },
  progress: {
    width: "100%",
    height: "100%",
    borderRadius: 255,
    position: "relative",
    overflow: "visible",
  },
  points: {
    fontFamily: "SemiBold",
  },
  pointsWrapper: {
    width: "95%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
