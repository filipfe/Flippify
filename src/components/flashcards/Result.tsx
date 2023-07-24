import { Image, StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../PrimaryButton";
import { useContext, useMemo } from "react";
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

export default function Result() {
  const { font, secondary } = useContext(ThemeContext);
  const { flipCard, changeCard, answer } = useContext(FlashCardContext);
  const { user, level } = useContext(AuthContext);
  const { profile_picture } = user;
  const { points, points_required } = level;
  const isPromotion = answer.is_correct && points < 20;
  const animatedWidth = useMemo(
    () => ((points / points_required) * 100).toFixed(2),
    [points, points_required]
  );

  const animatedWidthStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(animatedWidth + "%", { duration: 600 }),
    };
  }, [points]);

  const animatedWidthStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(animatedWidth.value + "%", { duration: 600 }),
    };
  }, [animatedWidth.value]);

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
        <View style={{ marginTop: 24, marginBottom: 12 }}>
          <LevelDisplayer {...level} isPromotion={isPromotion} />
        </View>
        <View style={styles.progressWrapper}>
          <Animated.View style={animatedWidthStyle}>
            <LinearGradient
              style={styles.progress}
              start={{ x: 0, y: 0 }}
              colors={linearGradient}
            >
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
            </LinearGradient>
          </Animated.View>
          <Text style={{ ...styles.points, fontSize: 12, color: secondary }}>
            {points} / {points_required}
          </Text>
        </View>
        <Text style={{ ...styles.title, color: font }}>
          {answer.is_correct
            ? "To poprawna odpowiedź!"
            : "Niepoprawna odpowiedź!"}
        </Text>
        <View style={styles.answerWrapper}>
          <Text
            style={{
              ...styles.answer,
              color: answer.is_correct ? "#13C331" : "red",
            }}
          >
            {answer.text}
          </Text>
        </View>
      </View>
      <View style={styles.buttonsWrapper}>
        <SecondaryButton
          text={"Odwróć"}
          style={{ marginRight: 4, flex: 1 }}
          paddingHorizontal={0}
          onPress={reflipCard}
        />
        <PrimaryButton
          style={{ marginLeft: 4, flex: 1 }}
          paddingHorizontal={0}
          text="Przejdź dalej"
          onPress={goNext}
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
  },
  answer: {
    fontFamily: "ExtraBold",
    fontSize: 18,
    textAlign: "center",
  },
  progressWrapper: {
    width: "90%",
    height: 5,
    borderRadius: 255,
    backgroundColor: "#D4E9FA",
    marginVertical: 24,
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
    position: "absolute",
    top: -28,
    right: 0,
    transform: [{ translateX: 8 }],
    fontFamily: "Bold",
  },
});
