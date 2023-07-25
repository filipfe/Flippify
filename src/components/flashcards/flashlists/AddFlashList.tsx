import { StyleSheet, Text, View } from "react-native";
import { useContext, useState } from "react";
import PrimaryInput from "../../PrimaryInput";
import PrimaryButton from "../../PrimaryButton";
import axios from "axios";
import Loader from "../../Loader";
import { AuthContext } from "../../../context/AuthContext";
import { FlashList } from "../../../types/flashcards";
import { initialFlashList } from "../../../const/flashcards";
import { shadowPrimary } from "../../../styles/general";
import { ThemeContext } from "../../../context/ThemeContext";
import Layout from "../../Layout";

export default function AddFlashList() {
  const { font, secondary, background } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [newFlashList, setNewFlashList] = useState<FlashList>(initialFlashList);

  return (
    <Layout>
      <View style={styles.wrapper}>
        <View>
          <PrimaryInput
            label="Nazwa"
            onChangeText={(name) =>
              setNewFlashList((prev) => ({ ...prev, name }))
            }
          />
          <View
            style={[styles.flashcardsWrapper, { backgroundColor: background }]}
          >
            <View style={styles.flashcardsTextWrapper}>
              <Text style={{ ...styles.flashcardsText, color: font }}>
                Fiszki
              </Text>
              <Text style={{ ...styles.flashcardsCount, color: secondary }}>
                512 fiszek
              </Text>
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
        <PrimaryButton onPress={() => {}} text="Dodaj FiszkoListę" />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "space-between",
  },
  flashcardsWrapper: {
    marginTop: 24,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    ...shadowPrimary,
  },
  flashcardsTextWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  flashcardsText: {
    fontFamily: "SemiBold",
  },
  flashcardsCount: {
    fontSize: 12,
    fontFamily: "SemiBold",
    marginLeft: 12,
  },
});
