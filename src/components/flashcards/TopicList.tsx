import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useState, useEffect } from "react";
import { useTailwind } from "tailwind-rn/dist";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from "@react-navigation/native";
import { CategoryStackParams } from "../../screens/FlashCardsScreen";
import styles from "../../constants/styles";
import axios from "axios";
import { API_URL } from "@env";
import Loader from "../Loader";
import { CategoryProps } from "./CategoryList";

type TopicListNavigationProp = NavigationProp<CategoryStackParams, "TopicList">;
type TopicListRouteProp = RouteProp<CategoryStackParams, "TopicList">;

export interface TopicProps {
  name: string;
  image: string;
}

type TopicRefProps = TopicProps & { category: CategoryProps };

export default function TopicList({
  navigation,
  route,
}: {
  navigation: TopicListNavigationProp;
  route: TopicListRouteProp;
}) {
  const tw = useTailwind();
  const [topics, setTopics] = useState<TopicProps[]>([]);
  const category = route.params.category;

  useEffect(() => {
    axios
      .get(`${API_URL}/api/flashcards/topics?c=${category.name}`)
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
          <Topic {...topic} category={category} key={topic.name} />
        ))
      ) : (
        <Loader />
      )}
    </ScrollView>
  );
}

const Topic = (props: TopicRefProps) => {
  const tw = useTailwind();
  const navigation = useNavigation<TopicListNavigationProp>();
  const { category } = props;

  return (
    <TouchableOpacity
      style={tw(
        "bg-white mb-8 border-stroke border-[2px] rounded-xl overflow-hidden"
      )}
      onPress={() =>
        navigation.navigate("FlashCardsGenerator", { topic: props, category })
      }
    >
      <Image
        style={styles.imageCover}
        source={{
          uri: props.image,
        }}
      />
      <Text
        style={{ fontFamily: "Bold", ...tw("my-2 ml-4 font-medium text-xl") }}
      >
        {props.name}
      </Text>
    </TouchableOpacity>
  );
};
