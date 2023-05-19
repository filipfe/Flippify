import { createContext, Dispatch, SetStateAction } from "react";
import { AddedFlashCard } from "../types/flashcards";

export const initialNewCard: AddedFlashCard = {
  id: -1,
  category: "",
  topic: "",
  question: "",
  type: null,
  answers: [],
};

export const NewCardContext = createContext<{
  newCard: AddedFlashCard;
  setNewCard: Dispatch<SetStateAction<AddedFlashCard>>;
}>(null!);
