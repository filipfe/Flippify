import { StyleSheet, Text, View } from "react-native";
import { useContext, useState } from "react";
import PrimaryInput from "../PrimaryInput";
import PrimaryButton from "../PrimaryButton";
import axios from "axios";
import { API_URL } from "@env";
import Loader from "../Loader";
import { AuthContext } from "../../context/AuthContext";
import { FlashList } from "../../types/flashcards";
import { initialFlashList } from "../../const/flashcards";
import { shadowPrimary } from "../../styles/general";
import { THEME } from "../../const/theme";

export default function AddFlashList() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [newFlashList, setNewFlashList] = useState<FlashList>(initialFlashList);

  const handleAdd = () => {
    axios
      .post(
        `${API_URL}/api/flashlists/add`,
        JSON.stringify({ user: user.id, name: newFlashList.name })
      )
      .finally(() => setLoading(false));
  };

  return (
    <View style={styles.wrapper}>
      <View>
        <PrimaryInput
          label="Nazwa"
          onChangeText={(name) =>
            setNewFlashList((prev) => ({ ...prev, name }))
          }
        />
        <View style={styles.flashcardsWrapper}>
          <View style={styles.flashcardsTextWrapper}>
            <Text style={styles.flashcardsText}>Fiszki</Text>
            <Text style={styles.flashcardsCount}>512 fiszek</Text>
          </View>
          <PrimaryButton
            paddingHorizontal={24}
            paddingVertical={8}
            fontSize={10}
            text="Wyświetl"
          />
        </View>
      </View>
      {loading && <Loader />}
      <PrimaryButton onPress={handleAdd} text="Dodaj FiszkoListę" />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    flex: 1,
    backgroundColor: "#FFF",
    justifyContent: "space-between",
  },
  flashcardsWrapper: {
    marginTop: 24,
    backgroundColor: "#FFF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    ...shadowPrimary,
  },
  flashcardsTextWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  flashcardsText: {
    color: THEME.font,
    fontFamily: "SemiBold",
  },
  flashcardsCount: {
    fontSize: 12,
    color: THEME.secondary,
    fontFamily: "SemiBold",
    marginLeft: 12,
  },
});
