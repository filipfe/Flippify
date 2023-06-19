import { StyleSheet, Text, View } from "react-native";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";

export default function Info() {
  const { primary, font, secondary } = useContext(ThemeContext);
  return (
    <View style={{ ...styles.wrapper }}>
      <Text style={{ ...styles.title, color: font }}>
        Witaj w <Text style={{ color: primary }}>Flippify!</Text>
      </Text>
      <Text style={{ ...styles.paragraph, color: secondary }}>
        Przygotuj się na opanowanie najważniejszych i najbardziej interesujących
        Cię informacji przy pomocy jednej aplikacji.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { alignItems: "center" },
  title: {
    fontFamily: "Bold",
    marginBottom: 24,
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
