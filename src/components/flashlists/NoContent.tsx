import { StyleSheet, Text, View } from "react-native";
import { THEME } from "../../const/theme";
import PrimaryButton from "../PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import { ListOfFlashCardListsNavigation } from "../../types/navigation";

export default function NoContent() {
  const { navigate } = useNavigation<ListOfFlashCardListsNavigation>();
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>Nie posiadasz żadnych FiszkoList</Text>
      <PrimaryButton
        onPress={() => navigate("AddFlashList")}
        paddingVertical={14}
        text="Dodaj FiszkoListę"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
  text: {
    color: THEME.font,
    fontFamily: "Bold",
    fontSize: 18,
    marginBottom: 24,
  },
});
