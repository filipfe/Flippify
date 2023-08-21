import { View, StyleSheet, Text } from "react-native";
import { Option } from "../../types/general";
import PrimaryButton from "../ui/PrimaryButton";

export default function Summary() {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Podsumowanie</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Cena sumaryczna</Text>
        <Text style={styles.value}>19 zł</Text>
      </View>
      <PrimaryButton width={"100%"} text="Wykup pakiet premium" />
    </View>
  );
}

const BenefitRef = ({ label, value }: Option<string>) => {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 16,
    fontFamily: "Bold",
    color: "#211C3F",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  label: {
    color: "#8DA5B9",
    fontFamily: "SemiBold",
    fontSize: 14,
    lineHeight: 18,
  },
  value: {
    color: "#8DA5B9",
    fontFamily: "SemiBold",
    fontSize: 14,
    lineHeight: 18,
  },
});
