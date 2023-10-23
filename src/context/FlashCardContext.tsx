import { createContext } from "react";
import { Answer, FlashCard } from "../types/flashcards";

type IsCardLoading = {
  active: boolean;
  next: boolean;
};

export type FlashCardContextType = {
  completedCount: number;
  totalCount: number;
  activeCard: FlashCard;
  submitAnswer: (answer: Answer) => void;
  changeCard: () => void;
  isLoading: IsCardLoading;
  answer: Answer;
};

export const FlashCardContext = createContext<FlashCardContextType>(null!);
