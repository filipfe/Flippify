import { Answer, FlashCard, Topic } from "../types/flashcards";
import { useState, useMemo, useEffect, useContext, useCallback } from "react";
import { Category } from "../types/general";
import { useSharedValue } from "react-native-reanimated";
import { FlashCardContextType } from "../context/FlashCardContext";
import { CORRECT_ANSWER_POINTS, initialFlashCard } from "../const/flashcards";
import { AuthContext } from "../context/AuthContext";
import { supabase } from "./useAuth";

type Params = Readonly<{
  category?: Category;
  topic?: Topic;
}>;

export default function useFlashCard(
  params: Params,
  listId?: number
): FlashCardContextType {
  const { category, topic } = params;
  const { level, addPoints } = useContext(AuthContext);
  const rotate = useSharedValue<0 | -180>(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasAlreadyAnswered, setHasAlreadyAnswered] = useState(false);
  const [answer, setAnswer] = useState<Answer>({ text: "", is_correct: false });
  const [activeDeck, setActiveDeck] = useState<FlashCard[]>([]);
  const [nextDeck, setNextDeck] = useState<FlashCard[]>([]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState({
    active: true,
    next: false,
  });

  const flipCard = () => {
    rotate.value = rotate.value === 0 ? -180 : 0;
    setIsFlipped((prev) => !prev);
  };

  const checkIfCorrect = useCallback(
    (answer: string) => {
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
    },
    [activeDeck, activeCardIndex]
  );

  const getDeck = useCallback(
    async function () {
      const { data, count } = listId
        ? await supabase
            .from("flashlist_elements")
            .select("...flashcards(*, answers(*))", { count: "exact" })
            .eq("flashlist_id", listId)
            .range(page * 10, page * 10 + 9)
        : await supabase.rpc(
            "get_random_flashcards",
            topic ? { p_topic_id: topic.id } : { p_category_id: category?.id }
          );

      listId && setCount(count || 0);
      return (data || []) as FlashCard[];
    },
    [listId, supabase, topic, category, page]
  );

  const submitAnswer = useCallback(
    async (answer: string) => {
      if (hasAlreadyAnswered) return flipCard();
      setHasAlreadyAnswered(true);
      const isCorrect = checkIfCorrect(answer);
      setAnswer({ text: answer, is_correct: isCorrect });
      flipCard();
      isCorrect ? await addPoints(CORRECT_ANSWER_POINTS) : level.points;
    },
    [
      setHasAlreadyAnswered,
      checkIfCorrect,
      setAnswer,
      flipCard,
      hasAlreadyAnswered,
      addPoints,
      level.points,
    ]
  );

  const fetchDeck = useCallback(
    async (deckType: "active" | "next") => {
      setIsLoading((prev) => ({ ...prev, [deckType]: true }));
      if (!category && !listId) return;
      try {
        const deck = await getDeck();
        deckType === "active" ? setActiveDeck(deck) : setNextDeck(deck);
      } finally {
        setIsLoading((prev) => ({ ...prev, [deckType]: false }));
      }
    },
    [setIsLoading, category, listId, getDeck, setActiveDeck, setNextDeck]
  );

  const changeCard = useCallback(async () => {
    setAnswer({ is_correct: false, text: "" });
    activeCardIndex > 8 && setActiveDeck(nextDeck);
    setActiveCardIndex((prev) => (activeCardIndex > 8 ? 0 : prev + 1));
    rotate.value = 0;
    setIsFlipped(false);
    setHasAlreadyAnswered(false);
    activeCardIndex === 8 && fetchDeck("next");
  }, [
    setAnswer,
    activeCardIndex,
    setActiveDeck,
    nextDeck,
    setActiveCardIndex,
    setHasAlreadyAnswered,
    fetchDeck,
  ]);

  useEffect(() => {
    fetchDeck("active");
  }, [listId]);

  const completedCount = useMemo(
    () =>
      isFlipped || hasAlreadyAnswered
        ? page * 10 + activeCardIndex + 1
        : page * 10 + activeCardIndex,
    [isFlipped, hasAlreadyAnswered, page, activeCardIndex]
  );

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
      completedCount,
      totalCount: count,
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
      count,
    ]
  );

  return contextValue;
}
