import { StyleSheet, Text } from "react-native";

export default function Loader() {
  return <Text style={styles.loader}>Ładowanie...</Text>;
}

const styles = StyleSheet.create({
  loader: {
    fontFamily: "Bold",
    marginHorizontal: "auto",
    fontSize: 20,
    marginVertical: 24,
  },
});
