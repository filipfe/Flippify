import { useState, useEffect, useContext } from "react";
import { View } from "react-native";
import Loader from "../../components/Loader";
import { AddedFlashCard } from "../../types/flashcards";
import NoContent from "../../components/flashcards/flashlists/NoContent";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { FlashCardsStackParams, RootTabParams } from "../../types/navigation";
import { FlatList } from "react-native-gesture-handler";
import Layout from "../../components/Layout";
import OwnFlashCardRef from "../../components/flashcards/own-flashcards/OwnFlashCardRef";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { supabase } from "../../hooks/useAuth";
import { AuthContext } from "../../context/AuthContext";

export default function OwnFlashCards({
  route,
}: NativeStackScreenProps<FlashCardsStackParams, "OwnFlashCards">) {
  const [page, setPage] = useState(0);
  const { user } = useContext(AuthContext);
  const navigation = useNavigation<NavigationProp<RootTabParams>>();
  const [cards, setCards] = useState<AddedFlashCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchFlashCards() {
      const { data } = await supabase
        .from("flashcards")
        .select(
          "*, topic:topics(id, name), category:topics(...categories(id, name, icon)), answers(*)"
        )
        .eq("user_id", user.id)
        .range(page * 10, page * 10 + 9);
      setCards((prev) => [
        ...prev,
        ...((data as unknown as AddedFlashCard[]) || []),
      ]);
      setIsLoading(false);
    }
    fetchFlashCards();
  }, [route.params, page]);

  return isLoading ? (
    <Loader />
  ) : cards.length > 0 ? (
    <Layout paddingHorizontal={0}>
      <FlatList
        contentContainerStyle={{ paddingHorizontal: 24 }}
        ItemSeparatorComponent={() => <View style={{ height: 8 }}></View>}
        data={cards}
        renderItem={({ item }) => <OwnFlashCardRef {...item} />}
        onEndReached={() => setPage((prev) => prev + 1)}
        ListFooterComponent={<Loader />}
        keyExtractor={(card) => card.id.toString()}
      />
    </Layout>
  ) : (
    <NoContent
      text="Jeszcze nie dodałeś żadnych Fiszek"
      buttonText="Dodaj fiszkę"
      onPress={() => navigation.navigate("AddCard")}
    />
  );
}
