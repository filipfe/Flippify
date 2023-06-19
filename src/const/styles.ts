import { StyleSheet, ColorSchemeName } from "react-native";
import { Option } from "../types/general";

export const DEFAULT_STYLES = StyleSheet.create({
    error: {
        color: '#FF0000'
    }
})

export const linearGradient = ["#2386F1", "#46B8FA"]

export const themeOptions: Option<ColorSchemeName | "system">[] = [
    {
      value: "system",
      label: "System",
    },
    { value: "dark", label: "Ciemny" },
    { value: "light", label: "Jasny" },
  ];