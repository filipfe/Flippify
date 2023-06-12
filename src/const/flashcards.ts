import { AddedFlashCard, Answer, FlashList } from "../types/flashcards";
import { Category } from "../types/general";

export const initialFlashList: FlashList = {
    id: -1,
    name: "",
    created_at: '',
    count: 0,
    flashcards: [],
  }

  export const initialAnswers: Answer[] = [
    { text: "", is_correct: true },
    { text: "", is_correct: false },
  ];
  
  export const initialCategory: Category = {
    id: -1,
    name: "",
    icon: "",
  };
  
  export const initialNewCard: AddedFlashCard = {
    id: -1,
    category: initialCategory,
    topic: "",
    question: "",
    type: "radio",
    answers: initialAnswers,
  };