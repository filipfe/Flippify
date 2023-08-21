import Layout from "../../components/ui/layout/Layout";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState, useCallback, useContext } from "react";
import { supabase } from "../../hooks/useAuth";
import { FlashList } from "../../types/flashcards";
import FlashListRef from "../../components/lists/FlashListRef";
import Loader from "../../components/ui/Loader";
import { Text } from "react-native";
import {
  FlatList,
  RefreshControl,
  ScrollView,
} from "react-native-gesture-handler";
import { ThemeContext } from "../../context/ThemeContext";

export default function ListScreen() {
  const { font } = useContext(ThemeContext);
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lists, setLists] = useState<FlashList[]>([]);

  async function fetchLists() {
    const { data } = await supabase
      .from("flashlists")
      .select(
        "id, name, description, user:profiles(id, username, avatar_url, is_premium), category:categories(id, name, icon)"
      );
    setLists((data as unknown as FlashList[]) || []);
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
        <Text
          style={{
            marginTop: 12,
            fontFamily: "SemiBold",
            fontSize: 22,
            color: font,
            paddingHorizontal: 24,
          }}
        >
          Wybrane dla Ciebie
        </Text>
        <FlatList
          data={lists}
          contentContainerStyle={{ paddingVertical: 24 }}
          renderItem={({ item }) => <FlashListRef {...item} size="small" />}
          horizontal
          pagingEnabled
          keyExtractor={({ id }, index) => `${id}${index}`}
        />

        <Text
          style={{
            marginTop: 24,
            fontFamily: "SemiBold",
            fontSize: 22,
            color: font,
            paddingHorizontal: 24,
          }}
        >
          Popularne teraz
        </Text>
        <FlatList
          data={lists}
          contentContainerStyle={{ paddingVertical: 24 }}
          renderItem={({ item }) => <FlashListRef {...item} />}
          horizontal
          pagingEnabled
          keyExtractor={({ id }, index) => `${id}${index}`}
        />

        <Text
          style={{
            marginTop: 24,
            fontFamily: "SemiBold",
            fontSize: 22,
            color: font,
            paddingHorizontal: 24,
          }}
        >
          Moje Fiszkolisty
        </Text>
        <FlatList
          data={lists}
          contentContainerStyle={{ paddingVertical: 24 }}
          renderItem={({ item }) => <FlashListRef {...item} size="small" />}
          horizontal
          pagingEnabled
          keyExtractor={({ id }, index) => `${id}${index}`}
        />

        <Text
          style={{
            marginTop: 24,
            fontFamily: "SemiBold",
            fontSize: 22,
            color: font,
            paddingHorizontal: 24,
          }}
        >
          Ostatnio dodane
        </Text>
        <FlatList
          data={lists}
          contentContainerStyle={{ paddingVertical: 24 }}
          renderItem={({ item }) => <FlashListRef {...item} />}
          horizontal
          pagingEnabled
          keyExtractor={({ id }, index) => `${id}${index}`}
        />
      </ScrollView>
    </Layout>
  );
}
