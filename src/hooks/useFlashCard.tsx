import { FlashCard, Topic } from "../types/flashcards";
import { useState, useMemo, useEffect } from "react";
import { Category } from "../types/general";
import axios from "axios";
import { API_URL } from "@env";
import { useSharedValue } from "react-native-reanimated";
import { FlashCardContextType } from "../context/FlashCardContext";
import { initialFlashCard } from "../const/flashcards";

type Props = Readonly<{
  category: Category;
  topic?: Topic;
}>;

export default function useFlashCard({
  category,
  topic,
}: Props): FlashCardContextType {
  const [isFlipped, setIsFlipped] = useState(false);
  const rotate = useSharedValue<0 | -180>(0);
  const [answer, setAnswer] = useState<string>("");
  const [activeDeck, setActiveDeck] = useState<FlashCard[]>([]);
  const [nextDeck, setNextDeck] = useState<FlashCard[]>([]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isLoading, setIsLoading] = useState({
    active: true,
    next: false,
  });

  const flipCard = () => {
    rotate.value = rotate.value === 0 ? -180 : 0;
    setIsFlipped((prev) => !prev);
  };

  const submitAnswer = (answer: string) => {
    setAnswer(answer);
    flipCard();
  };

  const changeCard = async () => {
    activeCardIndex > 8 && setActiveDeck(nextDeck);
    setActiveCardIndex((prev) => (activeCardIndex > 8 ? 0 : prev + 1));
    rotate.value = 0;
    setAnswer("");
    activeCardIndex === 8 && fetchDeck("next");
  };

  const fetchDeck = async (deckType: "active" | "next") => {
    setIsLoading((prev) => ({ ...prev, [deckType]: true }));
    if (!category.id) return;
    const card = await getDeck(category.id, topic?.id).finally(() =>
      setIsLoading((prev) => ({ ...prev, [deckType]: false }))
    );
    deckType === "active" ? setActiveDeck(card) : setNextDeck(card);
  };

  useEffect(() => {
    const fetchInitial = async () => {
      await fetchDeck("active");
    };
    fetchInitial();
  }, []);

  const contextValue = useMemo<FlashCardContextType>(
    () => ({
      activeCard: activeDeck[activeCardIndex]
        ? activeDeck[activeCardIndex]
        : initialFlashCard,
      submitAnswer,
      flipCard,
      changeCard,
      isLoading,
      rotateValue: rotate.value,
      answer,
    }),
    [
      activeCardIndex,
      activeDeck,
      nextDeck,
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

const getDeck = async (categoryId: number, topicId?: number) => {
  return axios
    .get(
      `${API_URL}/api/flashcards/random?category_id=${categoryId}${
        topicId ? "&topic_id=${topicId}" : ""
      }`
    )
    .then((res) => res.data);
};
