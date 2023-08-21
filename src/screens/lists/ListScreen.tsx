import { SectionList } from "react-native";
import { Text, StyleSheet } from "react-native";
import Layout from "../../components/Layout";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "../../hooks/useAuth";
import { FlashList } from "../../types/flashcards";
import FlashListRef from "../../components/lists/FlashListRef";
import Loader from "../../components/Loader";
import { RefreshControl } from "react-native-gesture-handler";

export default function ListScreen() {
  const { font, background } = useContext(ThemeContext);
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lists, setLists] = useState<FlashList[]>([]);

  async function fetchLists() {
    const { data } = await supabase
      .from("flashlists")
      .select("id, name, user:profiles(id, username, avatar_url)");
    console.log(data);
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
    <Layout paddingHorizontal={0}>
      <SectionList
        contentContainerStyle={{ paddingHorizontal: 24 }}
        sections={[
          { title: "Polecane dla Ciebie", data: lists },
          { title: "Popularne teraz", data: lists },
        ]}
        renderItem={({ item }) => <FlashListRef {...item} />}
        renderSectionHeader={({ section }) => (
          <Text style={[styles.sectionTitle, { color: font }]}>
            {section.title}
          </Text>
        )}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        keyExtractor={({ id }, index) => `${id}${index}`}
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontFamily: "SemiBold",
    fontSize: 22,
    lineHeight: 24,
    marginBottom: 24,
  },
});
