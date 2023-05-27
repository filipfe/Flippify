import { User } from "./auth";

export type Topic = string

export type Answer = {
  id?: number;
  text: string;
  is_correct: boolean;
}

export type FlashCard = {
  id: number;
  question: string;
  type: "radio" | "input"
  answers: Answer[];
  user?: User
}

export type AddedFlashCard = FlashCard & {
  category: string;
  topic: string;
}

export type FlashListCard = FlashCard & {
  topic: string;
};

export type FlashList = {
  id: number;
  name: string;
  created_at: string;
  count: number;
  flashcards: FlashListCard[];
}