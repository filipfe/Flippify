import { useState, useContext } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { API_URL } from "@env";
import { RouteProp, useRoute } from "@react-navigation/native";
import { AuthContext } from "../../../context/AuthContext";
import { FlashListCard } from "../../../types/flashcards";
import { FlashListStackParams } from "../../../types/navigation";

export default function CardChooser() {
  const auth = useContext(AuthContext);
  const { id } = auth.user;
  const [cardChooseActive, setCardChooseActive] = useState(false);
  const [userCards, setUserCards] = useState<FlashListCard[]>([]);

  const loadCards = () => {
    setCardChooseActive((prev) => !prev);
    if (cardChooseActive) return;
    axios
      .get(`${API_URL}/api/flashcards/user/${id}`)
      .then((res) => res.data)
      .then((data) => setUserCards(data))
      .catch((err) => alert(err));
  };

  return (
    <View>
      <TouchableOpacity onPress={loadCards}>
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

  const handleAdd = async () => {
    const resp = await axios.post(
      `${API_URL}/api/flashlists/add`,
      JSON.stringify({ flashcard: id, flashlist: route.params.id }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    if (resp.status === 200) return setActive(true);
  };

  return (
    <Pressable onPress={handleAdd}>
      <Text>{question}</Text>
      <Text>{active ? "✔" : "❌"}</Text>
    </Pressable>
  );
};
