import { createContext, Dispatch, SetStateAction } from "react";

type AnswerContextType = {
  answer?: string;
  setAnswer: Dispatch<SetStateAction<string>>;
};

export const AnswerContext = createContext<AnswerContextType>({
  answer: "",
  setAnswer: null!,
});
