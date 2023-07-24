import { NewCardContext } from "../../../context/OpusContext";
import { StyleSheet, Text, View, Modal } from "react-native";
import { globalStyles, shadowPrimary } from "../../../styles/general";
import Switch from "../../Switch";
import { ScrollView } from "react-native-gesture-handler";
import UserCredentials from "../../UserCredentials";
import { AuthContext } from "../../../context/AuthContext";
import { useContext, useState, useEffect } from "react";
import RadioForm from "./components/RadioForm";
import InputForm from "./components/InputForm";
import PrimaryButton from "../../PrimaryButton";
import Loader from "../../Loader";
import { initialNewCard } from "../../../const/flashcards";
import { AddedFlashCard } from "../../../types/flashcards";
import useOpus from "../../../hooks/useOpus";
import { ThemeContext } from "../../../context/ThemeContext";
import CategoryPicker from "../../filter/CategoryPicker";
import TopicPicker from "../../filter/TopicPicker";
import Success from "../../Success";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import {
  FlashCardsStackParams,
  RootTabParams,
} from "../../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { supabase } from "../../../hooks/useAuth";

export default function AddCard({
  route,
}: NativeStackScreenProps<RootTabParams, "AddCard">) {
  const { navigate } = useNavigation<NavigationProp<FlashCardsStackParams>>();
  const { secondary, background } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const opus = useOpus<Omit<AddedFlashCard, "user">>(
    route.params || initialNewCard
  );
  const { item, setItem } = opus;
  const { id, question, answers, type, category, topic } = item;
  const [hasBeenAdded, setHasBeenAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const canAdd = !!(
    answers.filter((item) => item.text).length > (type === "input" ? 0 : 1) &&
    question.length > 12 &&
    category.id &&
    topic.id
  );
  console.log(topic, category);

  async function insertCard() {
    setIsLoading(true);
    const { id, category, topic, answers, ...card } = item;
    const isModification = Boolean(id);
    try {
      if (isModification) {
        const { data } = await supabase
          .from("flashcards")
          .update({ ...card, topic_id: topic.id })
          .eq("id", id);
        const newCard: AddedFlashCard = data![0];
        await supabase.from("answers").delete().eq("flashcard_id", newCard.id);
        await supabase
          .from("answers")
          .insert(answers.map((ans) => ({ ...ans, flashcard_id: newCard.id })));
      } else {
        const response = await supabase
          .from("flashcards")
          .insert({
            ...card,
            user_id: user.id,
            topic_id: topic.id,
          })
          .select();
        console.log(response.data, response.error);
        await supabase
          .from("answers")
          .insert(answers.map((ans) => ({ ...ans, flashcard_id: id })));
      }
      setHasBeenAdded(true);
    } finally {
      setIsLoading(false);
    }
  }

  const changeType = (type: string) => {
    const cardType = type as "radio" | "input";
    setItem((prev) => ({
      ...prev,
      type: cardType,
      answers,
    }));
  };

  const onModalReject = () => {
    setHasBeenAdded(false);
    navigate("FlashCardsGenerator", { category, topic });
  };

  const onModalSubmit = () => {
    setItem(initialNewCard);
    setIsLoading(false);
    setHasBeenAdded(false);
  };

  useEffect(() => {
    route.params && setItem(route.params);
  }, [route.params]);

  return (
    <NewCardContext.Provider value={opus}>
      <View style={{ flex: 1, backgroundColor: background }}>
        <ScrollView>
          <View
            style={{
              paddingHorizontal: 24,
              paddingTop: 12,
              paddingBottom: 24,
            }}
          >
            <View style={styles.section}>
              <Text
                style={{
                  ...globalStyles.paramText,
                  marginBottom: 16,
                  color: secondary,
                }}
              >
                Typ pytania
              </Text>
              <Switch
                activeValue={type}
                onChange={changeType}
                options={[
                  { label: "Pytanie zamknięte", value: "radio" },
                  { label: "Pytanie otwarte", value: "input" },
                ]}
              />
            </View>
            <View style={styles.section}>
              <View style={{ ...styles.card, backgroundColor: background }}>
                {type === "radio" && <RadioForm />}
                {type === "input" && <InputForm />}
              </View>
            </View>
            <View style={{ marginVertical: 16 }}>
              <View style={styles.section}>
                <CategoryPicker
                  label="Kategoria notatki"
                  active={category}
                  onChange={(category) =>
                    setItem((prev) => ({ ...prev, category }))
                  }
                />
              </View>
              <View style={styles.section}>
                <TopicPicker
                  category={category}
                  active={topic}
                  onChange={(topic) => setItem((prev) => ({ ...prev, topic }))}
                />
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
                onPress={insertCard}
                active={canAdd}
                width={"100%"}
              />
            )}
          </View>
        </ScrollView>
      </View>
      <Modal
        animationType="fade"
        visible={hasBeenAdded}
        onRequestClose={onModalSubmit}
      >
        <Success
          text={
            id
              ? "Fiszka została pomyślnie zmodyfikowana"
              : "Fiszka została pomyślnie dodana"
          }
          rejectButtonText="Rozwiązuj"
          submitButtonText="Dodaj następną"
          onReject={onModalReject}
          onSubmit={onModalSubmit}
        />
      </Modal>
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
  answersWrapper: {
    marginTop: 24,
    width: "100%",
  },
  section: {
    marginBottom: 24,
  },
});
