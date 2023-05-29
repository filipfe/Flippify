import { createContext } from "react";
import { FlashCard } from "../types/flashcards";

export type FlashCardContextType = {
  activeCard: FlashCard;
  flipCard: () => void;
  submitAnswer: (answer: string) => void;
  changeCard: () => void;
  isLoading: boolean;
  rotateValue: number;
  answer: string;
};

export const FlashCardContext = createContext<FlashCardContextType>(null!);
