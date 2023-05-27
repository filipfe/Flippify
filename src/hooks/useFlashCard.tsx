import { FlashCard } from "../types/flashcards";
import { useState } from "react";
import { Category } from "../types/general";
import axios from "axios";
import { API_URL } from "@env";
import { Easing, useSharedValue, withTiming } from "react-native-reanimated";
import { FlashCardContextType } from "../context/FlashCardContext";

type Props = Readonly<{
  category: Category;
  topic: string;
}>;

export default function useFlashCard({
  category,
  topic,
}: Props): FlashCardContextType {
  const [isFlipped, setIsFlipped] = useState(false);
  const rotateY = useSharedValue<0 | 180>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [answer, setAnswer] = useState<string>("");
  const [activeCard, setActiveCard] = useState<FlashCard>({
    id: 2,
    question: "Ile nóg ma stonoga?",
    answers: [
      { text: "245", is_correct: true },
      { text: "342", is_correct: false },
      { text: "85", is_correct: false },
      { text: "125", is_correct: false },
    ],
    type: "radio",
  });

  const flipCard = () => {
    setIsFlipped((prev) => !prev);
    rotateY.value = rotateY.value === 0 ? 180 : 0;
  };

  const submitAnswer = (answer: string) => {
    setAnswer(answer);
    flipCard();
  };

  const changeCard = async () => {
    setIsLoading(true);
    setIsFlipped(false);
    setAnswer("");
    const card = await axios
      .get(
        `${API_URL}/api/flashcards/random?category_name=${category.name}${
          topic ? "&topic_name=" + topic : ""
        }`
      )
      .then((res) => res.data[0]);
    setActiveCard(card);
  };

  return {
    activeCard,
    submitAnswer,
    flipCard,
    changeCard,
    isLoading,
    answer,
    rotateY: rotateY.value,
  };
}
