export type Topic = {
  name: string;
  image: string;
}

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