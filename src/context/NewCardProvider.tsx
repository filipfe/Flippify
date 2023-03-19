import { createContext, Dispatch, SetStateAction } from "react";
import { AddedFlashCardProps } from "../components/flashcards/AddCard";

export const initialNewCard: AddedFlashCardProps = {
  id: -1,
  category: "",
  topic: "",
  question: "",
  type: null,
  answers: [],
};

export const NewCardContext = createContext<{
  newCard: AddedFlashCardProps;
  setNewCard: Dispatch<SetStateAction<AddedFlashCardProps>>;
}>(null!);
