import { Text, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "@env";
import { FlashCardProps } from "../flashcards/FlashCardRef";
import Loader from "../Loader";

export default function OwnFlashCards() {
  const [cards, setCards] = useState<FlashCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const tw = useTailwind();

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
    <View style={tw("p-4")}>
      {cards.length > 0 ? (
        cards.map((card) => <CardRef {...card} key={card.question} />)
      ) : (
        <Text>Nie dodałeś żadnych fiszek!</Text>
      )}
    </View>
  );
}

const CardRef = (props: FlashCardProps) => {
  const { question } = props;
  return <Text>{question}</Text>;
};
