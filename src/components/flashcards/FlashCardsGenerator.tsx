import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { useState, useEffect } from "react";
import { API_URL } from "@env";
import FlashCardRef from "./FlashCardRef";
import Loader from "../Loader";
import { AnswerContext } from "../../providers/AnswerProvider";
import { GeneratorRouteProps } from "../../types/navigation";
import { FlashCard } from "../../types/flashcards";

export default function FlashCardsGenerator() {
  const { params } = useRoute<GeneratorRouteProps>();
  const { category, topic } = params;
  const [activeCard, setActiveCard] = useState<FlashCard | null>(null);
  const [answer, setAnswer] = useState<string>("");

  useEffect(() => {
    if (answer === "") return;
    let isCancelled = false;
    if (!isCancelled)
      axios
        .get(
          `${API_URL}/api/flashcards/random?category_name=${category.name}${
            topic && "&topic_name=" + topic
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
      <FlashCardRef {...activeCard} />
    </AnswerContext.Provider>
  );
}
