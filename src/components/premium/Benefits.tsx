import { View, StyleSheet, Text } from "react-native";
import { Option } from "../../types/general";

const benefits: Option<string>[] = [
  {
    label: "Benefit",
    value: "87%",
  },
  {
    label: "Benefit",
    value: "90%",
  },
  {
    label: "Benefit",
    value: "63%",
  },
];

export default function Benefits() {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Korzyści pakietu premium</Text>
      {benefits.map((benefit) => (
        <BenefitRef {...benefit} key={benefit.value} />
      ))}
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
    paddingTop: 20,
    paddingBottom: 12,
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
