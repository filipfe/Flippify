import { Text, View } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "@env";
import Loader from "../Loader";
import { FlashCard } from "../../types/flashcards";

export default function OwnFlashCards() {
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

  return (
    <View style={{ padding: 16 }}>
      {cards.length > 0 ? (
        cards.map((card) => <CardRef {...card} key={card.question} />)
      ) : (
        <Text>Nie dodałeś żadnych fiszek!</Text>
      )}
    </View>
  );
}

const CardRef = (props: FlashCard) => {
  const { question } = props;
  return <Text>{question}</Text>;
};
