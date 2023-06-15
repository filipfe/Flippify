import { Text, View } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "@env";
import Loader from "../Loader";
import { FlashCard } from "../../types/flashcards";
import NoContent from "../flashlists/NoContent";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootTabParams } from "../../types/navigation";

export default function OwnFlashCards() {
  const navigation = useNavigation<NavigationProp<RootTabParams>>();
  const [cards, setCards] = useState<FlashCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/profile`)
      .then((res) => res.data)
      .then((data) => setCards(data))
      .catch((err) => alert(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;
  if (cards.length < 1)
    return (
      <NoContent
        text="Jeszcze nie dodałeś żadnych Fiszek"
        buttonText="Dodaj fiszkę"
        onPress={() => navigation.navigate("FlashCards", { screen: "AddCard" })}
      />
    );

  return (
    <View style={{ padding: 16 }}>
      {cards.map((card) => (
        <CardRef {...card} key={card.question} />
      ))}
    </View>
  );
}

const CardRef = (props: FlashCard) => {
  const { question } = props;
  return <Text>{question}</Text>;
};
