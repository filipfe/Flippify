export type Topic = string

export type Answer = {
  id?: number;
  content: string;
  correct: boolean | undefined;
}

export type FlashCard = {
  id: number;
  question: string;
  type: "radio" | "input" | null;
  answers: Answer[];
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