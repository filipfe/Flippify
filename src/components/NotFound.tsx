import { StyleSheet, Text, View } from "react-native";
import { THEME } from "../const/theme";

export default function NotFound() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.innerWrapper}>
        <Text style={styles.title}>Nie znaleziono!</Text>
        <Text style={styles.p}>
          Nie znaleziono wyników spełniających Twoje kryteria. Spróbuj
          dostosować parametry wyszukiwania lub spróbuj ponownie później.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
  },
  innerWrapper: {
    alignItems: "center",
  },
  title: {
    color: THEME.font,
    fontFamily: "Bold",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 12,
  },
  p: {
    color: THEME.secondary,
    lineHeight: 24,
    fontFamily: "Medium",
    textAlign: "center",
  },
});
