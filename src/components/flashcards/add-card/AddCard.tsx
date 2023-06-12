import { NewCardContext } from "../../../context/OpusContext";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { API_URL } from "@env";
import { shadowPrimary } from "../../../styles/general";
import { THEME } from "../../../const/theme";
import Switch from "../../Switch";
import { ScrollView } from "react-native-gesture-handler";
import UserCredentials from "../../UserCredentials";
import { AuthContext } from "../../../context/AuthContext";
import { useContext, useState } from "react";
import RadioForm from "./components/RadioForm";
import InputForm from "./components/InputForm";
import PrimaryButton from "../../PrimaryButton";
import Loader from "../../Loader";
import { initialAnswers, initialNewCard } from "../../../const/flashcards";
import { AddedFlashCard } from "../../../types/flashcards";
import useOpus from "../../../hooks/useOpus";

export default function AddCard() {
  const { user } = useContext(AuthContext);
  const opus = useOpus<AddedFlashCard>(initialNewCard);
  const { item, setItem } = opus;
  const { question, answers, type, category, topic } = item;
  const [isLoading, setIsLoading] = useState(false);
  const canAdd = !!(
    answers.filter((item) => item.text).length > (type === "input" ? 0 : 1) &&
    question.length > 12 &&
    category.name &&
    topic
  );

  const handleAdd = () => {
    setIsLoading(true);
    const { category, topic, ...card } = item;
    axios
      .post(
        `${API_URL}/api/flashcards/add`,
        JSON.stringify({
          ...card,
          category_name: category.name,
          topic_name: topic,
        })
      )
      .finally(() => setIsLoading(false));
  };

  const changeType = (type: string) => {
    const cardType = type as "radio" | "input";
    setItem((prev) => ({
      ...prev,
      type: cardType,
      answers: cardType === "radio" ? initialAnswers : [],
    }));
  };

  return (
    <NewCardContext.Provider value={opus}>
      <View style={{ flex: 1, backgroundColor: "#FFF" }}>
        <ScrollView>
          <View
            style={{
              paddingHorizontal: 24,
              paddingTop: 12,
              paddingBottom: 24,
            }}
          >
            <View style={styles.section}>
              <Text style={styles.paramText}>Typ pytania</Text>
              <Switch
                activeValue={type}
                onChange={changeType}
                options={[
                  { label: "Pytanie zamknięte", value: "radio" },
                  { label: "Pytanie otwarte", value: "input" },
                ]}
              />
            </View>
            {/* <SelectDropdown
          data={categories.map((item) => item.name)}
          renderCustomizedButtonChild={(sel) => (
            <View>
              <Text>Kategoria pytania</Text>
              {sel && <Text>{sel}</Text>}
            </View>
          )}
          buttonStyle={{}}
          dropdownStyle={{}}
          onSelect={(item) =>
            setNewCard((prev: AddedFlashCard) => ({
              ...prev,
              category: item,
            }))
          }
          buttonTextAfterSelection={(text) => text}
          rowTextForSelection={(text) => text}
        /> */}
            <View style={styles.section}>
              <View style={styles.card}>
                {type === "radio" && <RadioForm />}
                {type === "input" && <InputForm />}
              </View>
            </View>
            <View style={styles.section}>
              <UserCredentials user={user} />
            </View>
            {isLoading ? (
              <Loader />
            ) : (
              <PrimaryButton
                text="Dodaj fiszkę"
                onPress={handleAdd}
                active={canAdd}
                width={"100%"}
              />
            )}
          </View>
        </ScrollView>
      </View>
    </NewCardContext.Provider>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: "#FFF",
    borderRadius: 24,
    alignItems: "center",
    backfaceVisibility: "hidden",
    flex: 1,
    zIndex: 1,
    ...shadowPrimary,
  },
  backCard: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
  question: {
    color: THEME.font,
    fontSize: 20,
    fontFamily: "ExtraBold",
    textAlign: "center",
  },
  answersWrapper: {
    marginTop: 24,
    width: "100%",
  },
  paramText: {
    color: THEME.secondary,
    fontFamily: "Bold",
    marginBottom: 16,
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
});
