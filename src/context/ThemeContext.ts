import { createContext, Dispatch, SetStateAction } from "react";
import { ColorSchemeName } from 'react-native'

export type Theme = {
    primary: string,
    secondary: string,
    background: string,
    light: string,
    font: string,
    box: string;
    wrong: string,
    stroke: string,
}

export type ThemeContextType = Theme & {
    userPreferredTheme: ColorSchemeName | 'system',
    setUserPreferredTheme: Dispatch<SetStateAction<ColorSchemeName | 'system'>>
}

export const ThemeContext = createContext<ThemeContextType>(null!)