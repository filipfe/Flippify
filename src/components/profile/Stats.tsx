import { StyleSheet, Text, View } from "react-native";
import { shadowPrimary } from "../../styles/general";
import PrimaryButton from "../PrimaryButton";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";

export default function Stats() {
  const { font, secondary, background } = useContext(ThemeContext);
  return (
    <View style={{ ...styles.wrapper, backgroundColor: background }}>
      <View style={{ ...styles.row, marginBottom: 8 }}>
        <Text style={{ ...styles.title, color: font }}>Wynik profilu</Text>
        <Text style={{ ...styles.title, color: font }}>77%</Text>
      </View>
      <View style={styles.row}>
        <Text style={{ ...styles.stat, color: secondary }}>Dokładność</Text>
        <Text style={{ ...styles.stat, color: secondary }}>57%</Text>
      </View>
      <View style={styles.row}>
        <Text style={{ ...styles.stat, color: secondary }}>Dodane fiszki</Text>
        <Text style={{ ...styles.stat, color: secondary }}>24</Text>
      </View>
      <View style={styles.row}>
        <Text style={{ ...styles.stat, color: secondary }}>Dodane notatki</Text>
        <Text style={{ ...styles.stat, color: secondary }}>33</Text>
      </View>
      <View style={styles.row}>
        <Text style={{ ...styles.stat, color: secondary }}>Liczba uznań</Text>
        <Text style={{ ...styles.stat, color: secondary }}>22</Text>
      </View>
      <View style={{ ...styles.row, marginTop: 12 }}>
        <PrimaryButton
          width={"100%"}
          paddingVertical={12}
          text="Tablica wyników"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 36,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    ...shadowPrimary,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  title: {
    fontFamily: "Bold",
    fontSize: 16,
  },
  stat: {
    fontFamily: "SemiBold",
    fontSize: 12,
  },
});
