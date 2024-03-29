import { NewCardContext } from "../../context/OpusContext";
import { StyleSheet, Text, View, Modal, ScrollView } from "react-native";
import { globalStyles, shadowPrimary } from "../../styles/general";
import Switch from "../../components/ui/Switch";
import UserCredentials from "../../components/ui/layout/UserCredentials";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState, useLayoutEffect, useRef } from "react";
import RadioForm from "../../components/flashcards/add-card/RadioForm";
import InputForm from "../../components/flashcards/add-card/InputForm";
import PrimaryButton from "../../components/ui/PrimaryButton";
import Loader from "../../components/ui/Loader";
import { initialNewCard } from "../../const/flashcards";
import { AddedFlashCard } from "../../types/flashcards";
import useOpus from "../../hooks/useOpus";
import { ThemeContext } from "../../context/ThemeContext";
import CategoryPicker from "../../components/filter/CategoryPicker";
import TopicPicker from "../../components/filter/TopicPicker";
import Success from "../../components/ui/popups/Success";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParams, RootTabParams } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { supabase } from "../../hooks/useAuth";

export default function AddCard({
  route,
}: NativeStackScreenProps<RootStackParams, "AddCard">) {
  const scrollRef = useRef<ScrollView>(null!);
  const { navigate } =
    useNavigation<NavigationProp<RootStackParams, "RootTab">>();
  const { secondary, background, box } = useContext(ThemeContext);
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

  async function insertCard() {
    setIsLoading(true);
    const { id, category, topic, answers, ...card } = item;
    await supabase
      .from("flashcards")
      .insert({
        ...card,
        user_id: user.id,
        topic_id: topic.id,
      })
      .select();
    await supabase
      .from("answers")
      .insert(answers.map((ans) => ({ ...ans, flashcard_id: id })));
    setHasBeenAdded(true);
    setIsLoading(false);
  }

  async function modifyCard() {
    setIsLoading(true);
    const { id, category, topic, answers, ...card } = item;
    const { data } = await supabase
      .from("flashcards")
      .update({ ...card, topic_id: topic.id })
      .eq("id", id);
    const newCard: AddedFlashCard = data![0];
    await supabase.from("answers").delete().eq("flashcard_id", newCard.id);
    await supabase
      .from("answers")
      .insert(answers.map((ans) => ({ ...ans, flashcard_id: newCard.id })));
    setHasBeenAdded(true);
    setIsLoading(false);
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
    navigate("CardsGenerator", { category, topic });
  };

  const onModalSubmit = () => {
    setItem(initialNewCard);
    setIsLoading(false);
    setHasBeenAdded(false);
  };

  useLayoutEffect(() => {
    if (!scrollRef.current) return;
    route.params && setItem(route.params);
    scrollRef.current.scrollTo({ y: 0, animated: false });
  }, [route.params, scrollRef.current]);

  return (
    <NewCardContext.Provider value={opus}>
      <View style={{ flex: 1, backgroundColor: background }}>
        <ScrollView ref={(ref) => ref && (scrollRef.current = ref)}>
          <View
            style={{
              paddingHorizontal: 24,
              paddingTop: 12,
              paddingBottom: 36,
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
              <View style={[styles.card, { backgroundColor: box }]}>
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
            {isLoading ? (
              <Loader />
            ) : (
              <PrimaryButton
                text="Dodaj fiszkę"
                onPress={id ? modifyCard : insertCard}
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
