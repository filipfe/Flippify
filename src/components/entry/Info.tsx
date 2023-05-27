import { StyleSheet, Text, View } from "react-native";
import { THEME } from "../../const/theme";

export default function Info() {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Witaj w DivideKnowledge!</Text>
      <Text style={styles.paragraph}>
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
    color: THEME.font,
    textAlign: "center",
  },
  paragraph: {
    fontFamily: "Medium",
    color: THEME.p,
    fontSize: 12,
    textAlign: "center",
    lineHeight: 24,
    maxWidth: "90%",
    marginBottom: 48,
  },
});
