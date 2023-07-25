import { useState, useContext } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { RouteProp, useRoute } from "@react-navigation/native";
import { AuthContext } from "../../../context/AuthContext";
import { FlashListCard } from "../../../types/flashcards";
import { FlashListStackParams } from "../../../types/navigation";

export default function CardChooser() {
  const auth = useContext(AuthContext);
  const { id } = auth.user;
  const [cardChooseActive, setCardChooseActive] = useState(false);
  const [userCards, setUserCards] = useState<FlashListCard[]>([]);

  async function fetchCards() {
    setCardChooseActive((prev) => !prev);
    if (cardChooseActive) return;
  }

  return (
    <View>
      <TouchableOpacity onPress={fetchCards}>
        <Text>Dodaj fiszki do listy</Text>
      </TouchableOpacity>
      {cardChooseActive && (
        <View>
          {userCards.length > 0 ? (
            userCards.map((card) => <ChosenCard {...card} key={card.id} />)
          ) : (
            <Text>Nie znaleziono twoich fiszek.</Text>
          )}
        </View>
      )}
    </View>
  );
}

const ChosenCard = ({ id, question }: FlashListCard) => {
  const [active, setActive] = useState(false);
  const route = useRoute<RouteProp<FlashListStackParams, "FlashList">>();

  async function addCard() {}

  return (
    <Pressable onPress={addCard}>
      <Text>{question}</Text>
      <Text>{active ? "✔" : "❌"}</Text>
    </Pressable>
  );
};
