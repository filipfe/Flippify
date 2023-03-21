import { RouteProp, useRoute } from "@react-navigation/native";
import axios from "axios";
import { useState, useEffect } from "react";
import { API_URL } from "@env";
import { AnswerContext } from "../../context/AnswerProvider";
import { CategoryStackParams } from "../../screens/FlashCardsScreen";
import FlashCard, { FlashCardProps } from "./FlashCard";
import Loader from "../Loader";

type GeneratorRouteProps = RouteProp<
  CategoryStackParams,
  "FlashCardsGenerator"
>;

export default function FlashCardsGenerator() {
  const { params } = useRoute<GeneratorRouteProps>();
  const { category, topic } = params;
  const [activeCard, setActiveCard] = useState<FlashCardProps | null>(null);
  const [answer, setAnswer] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (answer === "") return;
    let isCancelled = false;
    if (!isCancelled)
      axios
        .get(
          `${API_URL}/api/flashcards/random?category_name=${category.name}${
            topic.name && "&topic_name=" + topic.name
          }`
        )
        .then((res) => res.data)
        .then((data) => setActiveCard(data[0]))
        .catch((err) => alert(err));
    return () => {
      isCancelled = true;
    };
  }, [answer]);

  useEffect(() => {
    setAnswer("");
  }, [activeCard]);

  if (!activeCard) return <Loader />;
  return (
    <AnswerContext.Provider value={{ answer, setAnswer }}>
      <FlashCard {...activeCard} />
    </AnswerContext.Provider>
  );
}
