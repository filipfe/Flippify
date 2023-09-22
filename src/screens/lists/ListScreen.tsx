import Layout from "../../components/ui/layout/Layout";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState, useCallback, useContext } from "react";
import { supabase } from "../../hooks/useAuth";
import { FlashList } from "../../types/flashcards";
import FlashListRef from "../../components/lists/FlashListRef";
import Loader from "../../components/ui/Loader";
import { Text, View, Pressable } from "react-native";
import {
  FlatList,
  RefreshControl,
  ScrollView,
} from "react-native-gesture-handler";
import { ThemeContext } from "../../context/ThemeContext";
import { ArrowIcon } from "../../assets/icons/icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ListStackParams } from "../../types/navigation";
import { initialFilter } from "../../const/flashcards";
import ListSection from "../../components/lists/ListSection";

export default function ListScreen({
  navigation,
}: NativeStackScreenProps<ListStackParams, "ListScreen">) {
  const { font, ripple } = useContext(ThemeContext);
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lists, setLists] = useState<FlashList[]>([]);

  async function fetchLists() {
    const { data } = await supabase
      .from("flashlists")
      .select(
        "id, name, description, is_public, user:profiles(id, username, avatar_url, is_premium), category:categories(id, name, icon), cards_count:flashlist_elements(...flashcards(count)), likes_count:saves(count)"
      );

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
  }

  useEffect(() => {
    if (!isFocused) return;
    setIsLoading(true);
    async function fetchInitial() {
      await fetchLists();
      setIsLoading(false);
    }
    fetchInitial();
  }, [isFocused]);

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchLists();
    setIsRefreshing(false);
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <Layout paddingHorizontal={0} paddingVertical={0}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 16 }}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      >
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            marginTop: 12,
            paddingLeft: 24,
            position: "relative",
          }}
        >
          <Text
            style={{
              fontFamily: "SemiBold",
              fontSize: 22,
              color: font,
            }}
          >
            Moje Fiszkolisty
          </Text>
          <Pressable
            onPress={() => navigation.navigate("OwnListsScreen", initialFilter)}
            style={{
              paddingHorizontal: 24,
              justifyContent: "center",
              alignSelf: "stretch",
            }}
            android_ripple={{ color: ripple, radius: 24, borderless: true }}
          >
            <ArrowIcon fill={font} />
          </Pressable>
        </View>
        <FlatList
          data={lists}
          contentContainerStyle={{ paddingVertical: 24, paddingHorizontal: 12 }}
          renderItem={({ item }) => (
            <FlashListRef {...item} hideUser size="small" />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={({ id }, index) => `${id}${index}`}
        />
        <ListSection lists={lists} title="Wybrane dla Ciebie" />
        <ListSection lists={lists} title="Popularne teraz" />
        <ListSection lists={lists} title="Ostatnio dodane" />
      </ScrollView>
    </Layout>
  );
}
