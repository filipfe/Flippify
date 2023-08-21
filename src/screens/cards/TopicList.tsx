import { View } from "react-native";
import { useState, useEffect, useContext } from "react";
import Loader from "../../components/ui/Loader";
import { Topic } from "../../types/flashcards";
import TopicRef from "../../components/flashcards/topics/TopicRef";
import NotFound from "../../components/ui/popups/NotFound";
import { ThemeContext } from "../../context/ThemeContext";
import { FlatList } from "react-native-gesture-handler";
import { supabase } from "../../hooks/useAuth";
import { useIsFocused } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CardStackParams } from "../../types/navigation";

export default function TopicList({
  route,
}: NativeStackScreenProps<CardStackParams, "TopicList">) {
  const { background } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(true);
  const [topics, setTopics] = useState<Topic[]>([]);
  const isFocused = useIsFocused();
  const category = route.params.category;

  useEffect(() => {
    if (!isFocused) return;
    setIsLoading(true);
    const fetchCategories = async () => {
      const { data } = await supabase
        .from("topics")
        .select("*")
        .eq("category_id", category.id)
        .order("name");
      setTopics((data as Topic[]) || []);
      setIsLoading(false);
    };
    fetchCategories();
  }, [route.params, isFocused]);

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
