import { View } from "react-native";
import { useState, useContext, useCallback } from "react";
import Loader from "../../components/ui/Loader";
import { Topic } from "../../types/flashcards";
import TopicRef from "../../components/flashcards/topics/TopicRef";
import NotFound from "../../components/ui/popups/NotFound";
import { ThemeContext } from "../../context/ThemeContext";
import { FlatList } from "react-native-gesture-handler";
import { supabase } from "../../hooks/useAuth";
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CardStackParams } from "../../types/navigation";

async function fetchTopics(categoryId: number) {
  const { data } = await supabase
    .from("topics")
    .select("*, cards:flashcards(count)")
    .eq("category_id", categoryId)
    .order("name");

  return (data as Topic[]) || [];
}

export default function TopicList({
  route,
}: NativeStackScreenProps<CardStackParams, "TopicList">) {
  const { background } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(true);
  const [topics, setTopics] = useState<Topic[]>([]);
  const category = route.params.category;

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      setIsLoading(true);
      async function fetchInitial() {
        if (!category.id) return;
        const topics = await fetchTopics(category.id);
        isActive && setTopics(topics);
        setIsLoading(false);
      }
      fetchInitial();
      return () => {
        isActive = false;
      };
    }, [])
  );

  return isLoading ? (
    <Loader />
  ) : topics.length > 0 ? (
    <FlatList
      style={{ backgroundColor: background }}
      contentContainerStyle={{ paddingVertical: 16, paddingHorizontal: 24 }}
      ListHeaderComponent={
        <View style={{ marginBottom: 16 }}>
          <TopicRef category={category} />
        </View>
      }
      ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      showsVerticalScrollIndicator={false}
      data={topics}
      renderItem={({ item }) => <TopicRef topic={item} category={category} />}
      keyExtractor={(topic) => topic.id.toString()}
    />
  ) : (
    <NotFound />
  );
}
