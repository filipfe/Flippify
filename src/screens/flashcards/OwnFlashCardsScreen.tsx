import { useState, useEffect, useContext, useCallback } from "react";
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
  const [hasMore, setHasMore] = useState(true);
  const { search, category, topic, type } = route.params;

  const fetchCards = useCallback(
    async (isFirst: boolean) => {
      let query = supabase
        .from("flashcards")
        .select(
          "*, topic:topics!inner(id, name), category:topics(...categories(id, name, icon)), answers(*)",
          { count: "exact" }
        );

      if (topic.id) query = query.eq("topic_id", topic.id);
      else if (category.id) query = query.eq("topic.category_id", category.id);
      if (type) query = query.eq("type", type);
      if (search) query = query.textSearch("question", route.params.search);

      if (isFirst) query = query.limit(10);
      else query = query.range(page * 10, page * 10 + 9);

      const { data, count } = await query
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      count && setHasMore(page * 10 + 10 < count);
      isFirst
        ? setCards((data as unknown as AddedFlashCard[]) || [])
        : setCards((prev) => [
            ...prev,
            ...((data as unknown as AddedFlashCard[]) || []),
          ]);
      setIsLoading(false);
    },
    [route.params, page]
  );

  useEffect(() => {
    setIsLoading(true);
    setPage(0);
    setCards([]);
    fetchCards(true);
  }, [route.params]);

  useEffect(() => {
    if (page === 0) return;
    fetchCards(false);
  }, [page]);

  return isLoading ? (
    <Loader />
  ) : cards.length > 0 ? (
    <Layout paddingHorizontal={0} paddingVertical={0}>
      <FlatList
        contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 16 }}
        ItemSeparatorComponent={() => <View style={{ height: 8 }}></View>}
        data={cards}
        renderItem={({ item }) => <OwnFlashCardRef {...item} />}
        onEndReached={() => setPage((prev) => prev + 1)}
        ListFooterComponent={hasMore ? <Loader /> : undefined}
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
