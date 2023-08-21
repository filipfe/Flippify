import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ThemeContext } from "../../../context/ThemeContext";

export default function NotFound() {
  const { font, secondary, background } = useContext(ThemeContext);
  return (
    <View style={{ ...styles.wrapper, backgroundColor: background }}>
      <View style={styles.innerWrapper}>
        <Text style={{ ...styles.title, color: font }}>Nie znaleziono!</Text>
        <Text style={{ ...styles.p, color: secondary }}>
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
    fontFamily: "Bold",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 12,
  },
  p: {
    lineHeight: 24,
    fontFamily: "Medium",
    textAlign: "center",
  },
});
