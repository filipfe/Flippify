import { StyleSheet, Text, View } from "react-native";
import { shadowPrimary } from "../../styles/general";
import { THEME } from "../../const/theme";
import PrimaryButton from "../PrimaryButton";

export default function Stats() {
  return (
    <View style={styles.wrapper}>
      <View style={{ ...styles.row, marginBottom: 8 }}>
        <Text style={styles.title}>Wynik profilu</Text>
        <Text style={styles.title}>77%</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.stat}>Dokładność</Text>
        <Text style={styles.stat}>57%</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.stat}>Dodane fiszki</Text>
        <Text style={styles.stat}>24</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.stat}>Dodane notatki</Text>
        <Text style={styles.stat}>33</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.stat}>Liczba uznań</Text>
        <Text style={styles.stat}>22</Text>
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
    color: THEME.font,
    fontFamily: "Bold",
    fontSize: 16,
  },
  stat: {
    color: THEME.secondary,
    fontFamily: "SemiBold",
    fontSize: 12,
  },
});
