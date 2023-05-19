import { createContext, Dispatch, SetStateAction } from "react";

export const AuthFormContext = createContext<{
  authFormIndex: 0 | 1;
  setAuthFormIndex: Dispatch<SetStateAction<0 | 1>>;
}>({
  authFormIndex: 0,
  setAuthFormIndex: null!,
});
