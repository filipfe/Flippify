import { StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import { ListOfFlashCardListsNavigation } from "../../types/navigation";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function NoContent() {
  const { font, background } = useContext(ThemeContext);
  const { navigate } = useNavigation<ListOfFlashCardListsNavigation>();
  return (
    <View style={{ ...styles.wrapper, backgroundColor: background }}>
      <Text style={{ ...styles.text, color: font }}>
        Nie posiadasz żadnych FiszkoList
      </Text>
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
    fontFamily: "Bold",
    fontSize: 18,
    marginBottom: 24,
  },
});
