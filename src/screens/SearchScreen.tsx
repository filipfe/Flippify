import { useContext, useCallback, useEffect, useState } from "react";
import { FlashList } from "../types/flashcards";
import Loader from "../components/ui/Loader";
import Layout from "../components/ui/layout/Layout";
import { FlatList } from "react-native-gesture-handler";
import FlashListRef from "../components/lists/FlashListRef";
import { Text, View } from "react-native";
import { supabase } from "../hooks/useAuth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../types/navigation";
import { ThemeContext } from "../context/ThemeContext";

export default function SearchScreen({
  route,
}: NativeStackScreenProps<RootStackParams, "SearchScreen">) {
  const { input } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [lists, setLists] = useState<FlashList[]>([]);
  const [total, setTotal] = useState(0);
  const { font, secondary } = useContext(ThemeContext);

  const fetchLists = useCallback(async () => {
    const { data, count } = await supabase
      .from("flashlists")
      .select(
        "id, name, description, user:profiles(id, username, avatar_url, is_premium), category:categories(id, name, icon), cards_count:flashlist_elements(...flashcards(count)), likes_count:saves(count)",
        { count: "exact" }
      )
      .textSearch("name", input);

    setTotal(count || 0);

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

    setLists(lists || []);
    setIsLoading(false);
  }, [input]);

  useEffect(() => {
    if (!input) return;
    setLists([]);
    setIsLoading(true);
    fetchLists();
  }, [input]);

  if (!input)
    return (
      <Layout>
        <></>
      </Layout>
    );

  return isLoading ? (
    <Loader />
  ) : (
    <Layout paddingHorizontal={0}>
      <FlatList
        ItemSeparatorComponent={() => <View style={{ height: 16 }}></View>}
        showsVerticalScrollIndicator={false}
        data={lists}
        renderItem={({ item }) => <FlashListRef {...item} key={item.id} />}
        ListHeaderComponent={() => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 24,
              marginBottom: 16,
            }}
          >
            <Text style={{ fontFamily: "SemiBold", color: font, fontSize: 16 }}>
              Wyszukane fiszkolisty
            </Text>
            <Text
              style={{
                color: secondary,
                fontFamily: "Medium",
                fontSize: 12,
                textAlign: "right",
              }}
            >
              {total} wyników
            </Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <Text
            style={{ color: font, textAlign: "center", fontFamily: "Medium" }}
          >
            Nie znaleźliśmy wyników wyszukiwania.
          </Text>
        )}
      />
    </Layout>
  );
}
