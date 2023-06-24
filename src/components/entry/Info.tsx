import { StyleSheet, Text, View, Dimensions } from "react-native";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";
import { LogoIcon } from "../../assets/icons/icons";
import PrimaryButton from "../PrimaryButton";

const { width } = Dimensions.get("screen");

type Props = { setStep: (num: number) => void };

export default function Info({ setStep }: Props) {
  const { primary, font, secondary } = useContext(ThemeContext);
  return (
    <View style={styles.wrapper}>
      <View style={styles.topWrapper}>
        <LogoIcon width={160} height={160} />
        <Text style={{ ...styles.title, color: font }}>
          Witaj w <Text style={{ color: primary }}>Flippify!</Text>
        </Text>
        <Text style={{ ...styles.paragraph, color: secondary }}>
          Przygotuj się na opanowanie najważniejszych i najbardziej
          interesujących Cię informacji przy pomocy jednej aplikacji.
        </Text>
      </View>
      <PrimaryButton
        onPress={() => setStep(1)}
        width="100%"
        text="Rozpocznij"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 96,
    paddingBottom: 24,
    width,
    paddingHorizontal: 24,
  },
  topWrapper: {
    alignItems: "center",
  },
  title: {
    fontFamily: "Bold",
    marginVertical: 24,
    fontSize: 24,
    textAlign: "center",
  },
  paragraph: {
    fontFamily: "Medium",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 24,
    maxWidth: "95%",
    marginBottom: 48,
  },
});
