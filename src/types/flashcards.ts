import { User } from "./auth";
import { Category } from "./general";

export type Topic = {
  id: number;
  name: string;
  cards?: [{ count: number }];
};

export type Answer = {
  id?: number;
  text: string;
  is_correct: boolean;
};

export type FlashCard = {
  id: number;
  question: string;
  type: "radio" | "input";
  answers: Answer[];
  user?: User;
};

export type AddedFlashCard = FlashCard & {
  created_at?: string;
  category: Category;
  topic: Topic;
};

export type FlashListCard = FlashCard & {
  topic: string;
};

export type FlashList = {
  id: number;
  name: string;
  description: string;
  is_public: boolean;
  created_at: string;
  user: User;
  cards: FlashListCard[];
  cards_count: number;
  likes_count: number;
  category?: Category;
};

export type FlashCardType = "input" | "radio";
