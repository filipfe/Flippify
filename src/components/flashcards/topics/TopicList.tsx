import { ScrollView, StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "@env";
import Loader from "../../Loader";
import { Topic } from "../../../types/flashcards";
import { TopicListRouteProp } from "../../../types/navigation";
import TopicRef from "./TopicRef";
import NotFound from "../../NotFound";

export default function TopicList({ route }: { route: TopicListRouteProp }) {
  const [isLoading, setIsLoading] = useState(true);
  const [topics, setTopics] = useState<Topic[]>([]);
  const category = route.params.category;

  useEffect(() => {
    axios
      .get(`${API_URL}/api/topics/${category.id}`)
      .then((res) => res.data)
      .then((data) => setTopics(data))
      .catch((err) => alert(err))
      .finally(() => setIsLoading(false));
  }, [route]);

  return isLoading ? (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Loader />
    </View>
  ) : topics.length > 0 ? (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View style={styles.wrapper}>
        {topics.map((topic) => (
          <TopicRef topic={topic} category={category} key={topic} />
        ))}
      </View>
    </ScrollView>
  ) : (
    <NotFound />
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "white",
    paddingVertical: 16,
    paddingHorizontal: 16,
    flex: 1,
  },
});
