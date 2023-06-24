import { useState, useEffect } from "react";
import { View } from "react-native";
import axios from "axios";
import { API_URL } from "@env";
import Loader from "../../components/Loader";
import { AddedFlashCard } from "../../types/flashcards";
import NoContent from "../../components/flashcards/flashlists/NoContent";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { FlashCardsStackParams, RootTabParams } from "../../types/navigation";
import { FlatList } from "react-native-gesture-handler";
import Layout from "../../components/Layout";
import OwnFlashCardRef from "../../components/flashcards/own-flashcards/OwnFlashCardRef";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Filter } from "../../types/notes";

export default function OwnFlashCards({
  route,
}: NativeStackScreenProps<FlashCardsStackParams, "OwnFlashCards">) {
  const navigation = useNavigation<NavigationProp<RootTabParams>>();
  const [cards, setCards] = useState<AddedFlashCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const queryArr = route.params
      ? [
          route.params.category?.id &&
            !route.params.topic?.id &&
            `category_id=${route.params.category.id}`,
          route.params.topic?.id && `topic_id=${route.params.topic.id}`,
          route.params.search && `q=${route.params.search}`,
          route.params.type && `type=${route.params.type}`,
        ].filter((item) => item)
      : [];
    const query = queryArr.length > 0 ? "?" + queryArr.join("&") : "";
    axios
      .get(`${API_URL}/api/profile/flashcards${query}`)
      .then((res) => res.data)
      .then((data) => setCards(data.items))
      .catch((err) => alert(err))
      .finally(() => setIsLoading(false));
  }, [route.params]);

  return isLoading ? (
    <Loader />
  ) : cards.length > 0 ? (
    <Layout paddingHorizontal={0}>
      <FlatList
        contentContainerStyle={{ paddingHorizontal: 24 }}
        ItemSeparatorComponent={() => <View style={{ height: 8 }}></View>}
        data={cards}
        renderItem={({ item }) => <OwnFlashCardRef {...item} />}
        keyExtractor={(card) => card.id.toString()}
      />
    </Layout>
  ) : (
    <NoContent
      text="Jeszcze nie dodałeś żadnych Fiszek"
      buttonText="Dodaj fiszkę"
      onPress={() => navigation.navigate("AddCard")}
    />
  );
}
