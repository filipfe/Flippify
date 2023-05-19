import { Pressable, ScrollView, Text } from "react-native";
import { useState, useEffect } from "react";
import { useTailwind } from "tailwind-rn/dist";
import axios from "axios";
import { API_URL } from "@env";
import Loader from "../../Loader";
import { Topic } from "../../../types/flashcards";
import {
  TopicListNavigationProp,
  TopicListRouteProp,
} from "../../../types/navigation";
import TopicRef from "./TopicRef";

export default function TopicList({
  navigation,
  route,
}: {
  navigation: TopicListNavigationProp;
  route: TopicListRouteProp;
}) {
  const tw = useTailwind();
  const [topics, setTopics] = useState<Topic[]>([]);
  const category = route.params.category;

  useEffect(() => {
    axios
      .get(`${API_URL}/api/topics/${category.name}`)
      .then((res) => res.data)
      .then((data) => setTopics(data))
      .catch((err) => alert(err));
  }, [route]);

  return (
    <ScrollView style={tw("p-6 bg-white")}>
      <Pressable onPress={() => navigation.navigate("AddCard")}>
        <Text style={tw("text-blue-400 font-medium mb-4 text-[1rem]")}>
          Dodaj fiszkę
        </Text>
      </Pressable>
      {topics.length > 0 ? (
        topics.map((topic) => (
          <TopicRef {...topic} category={category} key={topic.name} />
        ))
      ) : (
        <Loader />
      )}
    </ScrollView>
  );
}
