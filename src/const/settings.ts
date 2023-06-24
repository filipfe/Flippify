import { Option } from "../types/general";
import { ColorSchemeName } from 'react-native'
import { Settings } from "../types/settings";

export const initialSettings: Settings = {
    animations: true,
}

export const themeOptions: Option<ColorSchemeName | "system">[] = [
    {
      value: "system",
      label: "System",
    },
    { value: "dark", label: "Ciemny" },
    { value: "light", label: "Jasny" },
];

export const animationOptions: Option<boolean>[] = [
    {
        value: true,
        label: "Włączone"
    },
    {
        value: false,
        label: "Wyłączone"
    }
]