import { createContext } from "react";
import { FlashCard } from "../types/flashcards";

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
  answer: string;
};

export const FlashCardContext = createContext<FlashCardContextType>(null!);
