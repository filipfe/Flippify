import { createContext } from "react";
import { Answer, FlashCard } from "../types/flashcards";

type IsCardLoading = {
  active: boolean;
  next: boolean;
};

export type FlashCardContextType = {
  activeCard: FlashCard;
  flipCard: () => void;
  submitAnswer: (answer: string) => void;
  changeCard: () => void;
  isLoading: IsCardLoading;
  rotateValue: number;
  answer: Answer;
};

export const FlashCardContext = createContext<FlashCardContextType>(null!);
