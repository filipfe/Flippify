import { RouteProp } from "@react-navigation/native";
import axios from "axios";
import { useState, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Loader from "../../Loader";
import CardChooser from "./CardChooser";
import { FlashListCard } from "../../../types/flashcards";
import { FlashListStackParams } from "../../../types/navigation";

export default function FlashListDetails({
  route,
}: {
  route: RouteProp<FlashListStackParams, "FlashList">;
}) {
  const { flashcards } = route.params;
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<boolean | undefined>(undefined);
  const [selected, setSelected] = useState<number[]>([]);

  const removeCards = () => {
    setLoading(true);
  };

  return (
    <View>
      <CardChooser />
      <View>
        <Text>Fiszki w tej FiszkoLiście</Text>
        <TouchableOpacity onPress={removeCards}>
          <Text>Usuń zaznaczone</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <Loader />
      ) : flashcards.length > 0 ? (
        flashcards.map((card, i) => (
          <FlashCardRef
            setSelected={setSelected}
            {...card}
            index={i + 1}
            key={card.question}
          />
        ))
      ) : (
        <Text>Brak fiszek w tej liście!</Text>
      )}
    </View>
  );
}

const FlashCardRef = ({
  question,
  type,
  index,
  topic,
  id,
  setSelected,
}: FlashListCard & { index: number; setSelected: any; topic: string }) => {
  const [isSelected, setIsSelected] = useState(false);
  useEffect(() => {
    if (isSelected)
      setSelected((prev: number[]) => {
        if (prev.includes(id)) return prev;
        return [...prev, id];
      });
    if (!isSelected)
      setSelected((prev: number[]) => {
        if (prev.includes(id)) return prev.filter((val) => val !== id);
        return prev;
      });
  }, [isSelected]);
  return (
    <View>
      <Text>{index}. </Text>
      <View>
        <Text>{question.split("[input]").join(" . . . . ")}</Text>
        <Text>
          Typ fiszki:{" "}
          {type === "radio" ? "Wybór odpowiedzi" : "Wprowadzanie odpowiedzi"}
        </Text>
        <Text>Temat fiszki: {topic}</Text>
        {/* {answers.length > 0 && answers.map(answ => <Text style={{fontFamily: 'Medium', ...tw(answ.correct ? 'text-primary' : 'text-red-400')}}>{answ.content}</Text>)}       */}
      </View>
      <TouchableOpacity onPress={() => setIsSelected((prev) => !prev)}>
        <Text>{isSelected ? "✔" : "❌"}</Text>
      </TouchableOpacity>
    </View>
  );
};
