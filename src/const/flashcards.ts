import { AddedFlashCard, Answer, FlashCard, FlashList, Topic } from "../types/flashcards";
import { Category, Filter, Option } from "../types/general";

export const CORRECT_ANSWER_POINTS = 20;

export const initialFlashList: FlashList = {
  id: 0,
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
  id: 0,
  name: "",
  icon: "",
};

export const initialTopic: Topic = {
  id: 0,
  name: ''
}

export const initialFilter: Filter = {
  category: initialCategory,
  topic: initialTopic,
  search: ''
}

export const initialNewCard: AddedFlashCard = {
  id: 0,
  category: initialCategory,
  topic: initialTopic,
  question: "",
  type: "radio",
  answers: initialAnswers,
};

export const initialFlashCard: FlashCard = {
  id: 0,
  question: '',
  type: "radio",
  answers: [],
}

export const typeOptions: Option<"radio" | "input">[] = [
  {
    label: "Zamknięte",
    value: "radio"
  },
  {
    label: "Otwarte",
    value: "input"
  }
]