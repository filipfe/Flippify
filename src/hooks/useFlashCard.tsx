import { FlashCard } from "../types/flashcards";
import { useState, useMemo, useEffect } from "react";
import { Category } from "../types/general";
import axios from "axios";
import { API_URL } from "@env";
import { useSharedValue } from "react-native-reanimated";
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
  const rotate = useSharedValue<0 | 180>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [answer, setAnswer] = useState<string>("");
  const [activeCard, setActiveCard] = useState<FlashCard>(initialCard);
  const [nextCard, setNextCard] = useState<FlashCard>(initialNextCard);

  const flipCard = () => {
    rotate.value = rotate.value === 180 ? 0 : 180;
    setIsFlipped((prev) => !prev);
  };

  const submitAnswer = (answer: string) => {
    setAnswer(answer);
    flipCard();
  };

  const changeCard = async () => {
    setActiveCard(nextCard);
    rotate.value = 0;
    setAnswer("");
    const card = await getCard(category.name, topic);
    setNextCard(card);
  };

  // useEffect(() => {
  //   const fetchInitial = async () => {
  //     const card = await getCard(category.name, topic);
  //     console.log(card);
  //     setActiveCard(card);
  //     const nextCard = await getCard(category.name, topic);
  //     setNextCard(nextCard);
  //   };
  //   fetchInitial();
  // }, []);

  const contextValue = useMemo<FlashCardContextType>(
    () => ({
      activeCard,
      submitAnswer,
      flipCard,
      changeCard,
      isLoading,
      rotateValue: rotate.value,
      answer,
    }),
    [
      activeCard,
      submitAnswer,
      flipCard,
      changeCard,
      isLoading,
      rotate.value,
      answer,
    ]
  );

  return contextValue;
}

const initialCard: FlashCard = {
  id: 2,
  question: "Ile nóg ma stonoga?",
  answers: [
    { text: "245", is_correct: true },
    { text: "342", is_correct: false },
    { text: "85", is_correct: false },
    { text: "125", is_correct: false },
  ],
  type: "radio",
};

const initialNextCard: FlashCard = {
  id: 2,
  question: "W którym roku Polska przyjęła chrzest?",
  answers: [
    { text: "1245", is_correct: false },
    { text: "966", is_correct: true },
    { text: "1918", is_correct: false },
    { text: "1125", is_correct: false },
  ],
  type: "radio",
};

const getCard = async (category: string, topic: string) => {
  return axios
    .get(
      `${API_URL}/api/flashcards/random?category_name=${category}${
        topic ? "&topic_name=" + topic : ""
      }`
    )
    .then((res) => res.data[0]);
};
