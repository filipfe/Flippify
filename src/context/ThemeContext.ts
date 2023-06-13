import { createContext } from "react";

export type Theme = {
    primary: string,
    secondary: string,
    background: string,
    darkPrimary: string,
    light: string,
    font: string,
    wrong: string,
    stroke: string,
}

export const ThemeContext = createContext<Theme>(null!)