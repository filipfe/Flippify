import { createContext, Dispatch, SetStateAction } from "react";
import { AddedFlashCard, Topic } from "../types/flashcards";
import { Category } from "../types/general";

export type OpusContext<T> = {
  topics: Topic[];
  item: T;
  setItem: Dispatch<SetStateAction<T>>;
  activeCategory: Category;
  changeCategory: (category: Category) => void;
  areTopicsLoading: boolean;
};

export const NewCardContext = createContext<OpusContext<AddedFlashCard>>(null!);
