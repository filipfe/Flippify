import { Answer, FlashCard, Topic } from "../types/flashcards";
import { useState, useMemo, useEffect, useContext } from "react";
import { Category } from "../types/general";
import { useSharedValue } from "react-native-reanimated";
import { FlashCardContextType } from "../context/FlashCardContext";
import { CORRECT_ANSWER_POINTS, initialFlashCard } from "../const/flashcards";
import { AuthContext } from "../context/AuthContext";
import { supabase } from "./useAuth";

type Props = Readonly<{
  category: Category;
  topic?: Topic;
}>;

export default function useFlashCard({
  category,
  topic,
}: Props): FlashCardContextType {
  const { level, addPoints } = useContext(AuthContext);
  const rotate = useSharedValue<0 | -180>(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasAlreadyAnswered, setHasAlreadyAnswered] = useState(false);
  const [answer, setAnswer] = useState<Answer>({ text: "", is_correct: false });
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

  const checkIfCorrect = (answer: string) => {
    const { type, answers } = activeDeck[activeCardIndex];
    switch (type) {
      case "radio":
        const correctAnswer = answers.find((ans) => ans.is_correct)?.text;
        return correctAnswer === answer;
      case "input":
        return (
          answers[0].text.toLowerCase().split(" ").join("") ===
          answer.toLowerCase().split(" ").join("")
        );
    }
  };

  async function getDeck() {
    const { data } = await supabase.rpc(
      "get_random_flashcards"
      // topic ? { topic_id: topic.id } : { category_id: category.id }
    );
    console.log(data);
    return (data || []) as FlashCard[];
  }

  const submitAnswer = (answer: string) => {
    setHasAlreadyAnswered(true);
    const isCorrect = checkIfCorrect(answer);
    setAnswer({ text: answer, is_correct: isCorrect });
    isCorrect && !hasAlreadyAnswered
      ? addPoints(CORRECT_ANSWER_POINTS)
      : level.points;
    flipCard();
  };

  const changeCard = async () => {
    activeCardIndex > 8 && setActiveDeck(nextDeck);
    setActiveCardIndex((prev) => (activeCardIndex > 8 ? 0 : prev + 1));
    rotate.value = 0;
    setAnswer({ is_correct: false, text: "" });
    setHasAlreadyAnswered(false);
    activeCardIndex === 8 && fetchDeck("next");
  };

  const fetchDeck = async (deckType: "active" | "next") => {
    setIsLoading((prev) => ({ ...prev, [deckType]: true }));
    if (!category.id) return;
    try {
      const deck = await getDeck();
      deckType === "active" ? setActiveDeck(deck) : setNextDeck(deck);
    } finally {
      setIsLoading((prev) => ({ ...prev, [deckType]: false }));
    }
  };

  useEffect(() => {
    fetchDeck("active");
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
      isFlipped,
      answer,
    ]
  );

  return contextValue;
}
