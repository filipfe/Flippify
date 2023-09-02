import { useState, useEffect, useContext, useCallback } from "react";
import { View } from "react-native";
import Loader from "../../components/ui/Loader";
import { FlashList } from "../../types/flashcards";
import NoContent from "../../components/ui/popups/NoContent";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ListStackParams, RootStackParams } from "../../types/navigation";
import { FlatList } from "react-native-gesture-handler";
import Layout from "../../components/ui/layout/Layout";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { supabase } from "../../hooks/useAuth";
import { AuthContext } from "../../context/AuthContext";
import FlashListRef from "../../components/lists/FlashListRef";

export default function OwnListsScreen({
  route,
}: NativeStackScreenProps<ListStackParams, "OwnListsScreen">) {
  const [page, setPage] = useState(0);
  const { user } = useContext(AuthContext);
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const [lists, setLists] = useState<FlashList[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const { search, category } = route.params;

  const fetchLists = useCallback(
    async (isFirst: boolean) => {
      let query = supabase
        .from("flashlists")
        .select(
          "id, name, description, is_public, category:categories(id, name, icon), cards_count:flashlist_elements(...flashcards(count)), likes_count:saves(count)",
          { count: "exact" }
        );

      if (category.id) query = query.eq("topic.category_id", category.id);
      if (search) query = query.textSearch("question", route.params.search);

      if (isFirst) query = query.limit(10);
      else query = query.range(page * 10, page * 10 + 9);

      const { data, count } = await query
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      count && setHasMore(page * 10 + 10 < count);

      const lists = (data as unknown as FlashList[]).map((item) => {
        const { cards_count, likes_count, ...list } = item;
        const cardsCount = cards_count as unknown as { count: number }[];
        const likesCount = likes_count as unknown as { count: number }[];
        return {
          ...list,
          cards_count: cardsCount[0].count,
          likes_count: likesCount[0].count,
        };
      });

      isFirst
        ? setLists((lists as unknown as FlashList[]) || [])
        : setLists((prev) => [
            ...prev,
            ...((lists as unknown as FlashList[]) || []),
          ]);
      setIsLoading(false);
    },
    [route.params, page]
  );

  useEffect(() => {
    setIsLoading(true);
    setPage(0);
    setLists([]);
    fetchLists(true);
  }, [route.params]);

  useEffect(() => {
    if (page === 0) return;
    fetchLists(false);
  }, [page]);

  return isLoading ? (
    <Loader />
  ) : lists.length > 0 ? (
    <Layout paddingHorizontal={0} paddingVertical={0}>
      <FlatList
        contentContainerStyle={{ paddingVertical: 16 }}
        ItemSeparatorComponent={() => <View style={{ height: 16 }}></View>}
        data={lists}
        renderItem={({ item }) => (
          <View style={{ marginHorizontal: 16 }}>
            <FlashListRef {...item} user={user} isActive hideUser />
          </View>
        )}
        showsVerticalScrollIndicator={false}
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
