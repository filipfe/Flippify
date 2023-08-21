import Layout from "../../components/ui/layout/Layout";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "../../hooks/useAuth";
import { FlashList } from "../../types/flashcards";
import FlashListRef from "../../components/lists/FlashListRef";
import Loader from "../../components/ui/Loader";
import {
  FlatList,
  RefreshControl,
  ScrollView,
} from "react-native-gesture-handler";
import HomeSection from "../../components/home/HomeSection";

export default function ListScreen() {
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lists, setLists] = useState<FlashList[]>([]);

  async function fetchLists() {
    const { data } = await supabase
      .from("flashlists")
      .select("id, name, description, user:profiles(id, username, avatar_url)");
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
        <HomeSection padding={false} title="Wybrane dla Ciebie">
          <FlatList
            data={lists}
            renderItem={({ item }) => <FlashListRef {...item} size="small" />}
            horizontal
            pagingEnabled
            keyExtractor={({ id }, index) => `${id}${index}`}
          />
        </HomeSection>
        <HomeSection padding={false} title="Popularne teraz">
          <FlatList
            data={lists}
            renderItem={({ item }) => <FlashListRef {...item} />}
            horizontal
            pagingEnabled
            keyExtractor={({ id }, index) => `${id}${index}`}
          />
        </HomeSection>
        <HomeSection padding={false} title="Twoje listy">
          <FlatList
            data={lists}
            renderItem={({ item }) => <FlashListRef {...item} size="small" />}
            horizontal
            pagingEnabled
            keyExtractor={({ id }, index) => `${id}${index}`}
          />
        </HomeSection>
        <HomeSection padding={false} title="Ostatnio dodane">
          <FlatList
            data={lists}
            renderItem={({ item }) => <FlashListRef {...item} />}
            horizontal
            pagingEnabled
            keyExtractor={({ id }, index) => `${id}${index}`}
          />
        </HomeSection>
      </ScrollView>
    </Layout>
  );
}
