import { createContext } from "react";
import { FlashCard } from "../types/flashcards";

export type FlashCardContextType = {
  activeCard: FlashCard;
  flipCard: () => void;
  submitAnswer: (answer: string) => void;
  changeCard: () => void;
  isLoading: boolean;
  answer: string;
  rotateY: number;
};

export const FlashCardContext = createContext<FlashCardContextType>(null!);
