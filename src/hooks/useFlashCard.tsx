import { Answer, FlashCard, Topic } from "../types/flashcards";
import { useState, useMemo, useEffect, useContext, useCallback } from "react";
import { Category } from "../types/general";
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

  const checkIfCorrect = useCallback(
    (answer: Answer) => {
      const { type, answers } = activeDeck[activeCardIndex];
      switch (type) {
        case "radio":
          return answer.is_correct;
        case "input":
          return (
            answers[0].text.toLowerCase().split(" ").join("") ===
            answer.text.toLowerCase().split(" ").join("")
          );
      }
    },
    [activeDeck, activeCardIndex]
  );

  async function getDeck() {
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
  }

  const submitAnswer = useCallback(
    (answer: Answer) => {
      if (hasAlreadyAnswered) return;
      const is_correct = checkIfCorrect(answer);
      setAnswer({ text: answer.text, is_correct });
      is_correct ? addPoints(CORRECT_ANSWER_POINTS) : level.points;
    },
    [hasAlreadyAnswered, checkIfCorrect]
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

  async function changeCard() {
    setAnswer({ is_correct: false, text: "" });
    activeCardIndex > 8 && setActiveDeck(nextDeck);
    setActiveCardIndex((prev) => (activeCardIndex > 8 ? 0 : prev + 1));
    setHasAlreadyAnswered(false);
    activeCardIndex === 8 && fetchDeck("next");
  }

  useEffect(() => {
    fetchDeck("active");
  }, [listId]);

  useEffect(() => {
    answer.text ? setHasAlreadyAnswered(true) : setHasAlreadyAnswered(false);
  }, [answer]);

  const completedCount = useMemo(
    () =>
      hasAlreadyAnswered
        ? page * 10 + activeCardIndex + 1
        : page * 10 + activeCardIndex,
    [hasAlreadyAnswered, page, activeCardIndex]
  );

  const contextValue = useMemo<FlashCardContextType>(
    () => ({
      activeCard: activeDeck[activeCardIndex]
        ? activeDeck[activeCardIndex]
        : initialFlashCard,
      submitAnswer,
      changeCard,
      isLoading,
      answer,
      completedCount,
      totalCount: count,
    }),
    [
      activeCardIndex,
      activeDeck,
      nextDeck,
      submitAnswer,
      changeCard,
      isLoading,
      answer,
      count,
    ]
  );

  return contextValue;
}
