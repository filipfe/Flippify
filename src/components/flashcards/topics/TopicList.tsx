import { StyleSheet } from "react-native";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { API_URL } from "@env";
import Loader from "../../Loader";
import { Topic } from "../../../types/flashcards";
import { TopicListRouteProp } from "../../../types/navigation";
import TopicRef from "./TopicRef";
import NotFound from "../../NotFound";
import { ThemeContext } from "../../../context/ThemeContext";
import { FlatList } from "react-native-gesture-handler";

export default function TopicList({ route }: { route: TopicListRouteProp }) {
  const { background } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(true);
  const [topics, setTopics] = useState<Topic[]>([]);
  const category = route.params.category;

  useEffect(() => {
    axios
      .get(`${API_URL}/api/topics/${category.id}`)
      .then((res) => res.data)
      .then((data) => setTopics(data.items))
      .catch((err) => alert(err))
      .finally(() => setIsLoading(false));
  }, [route.name]);

  return isLoading ? (
    <Loader />
  ) : topics.length > 0 ? (
    <FlatList
      style={{ backgroundColor: background }}
      contentContainerStyle={{ paddingVertical: 16 }}
      ListHeaderComponent={<TopicRef category={category} />}
      data={topics}
      renderItem={({ item }) => <TopicRef topic={item} category={category} />}
      keyExtractor={(topic) => topic.id.toString()}
    />
  ) : (
    <NotFound />
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    flex: 1,
  },
});
