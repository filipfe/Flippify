import { useColorScheme } from "react-native";
import { Theme, ThemeContext } from "../context/ThemeContext";
import { useMemo } from "react";

export default function ThemeProvider({ children }: { children: JSX.Element }) {
  const colorScheme = useColorScheme();
  console.log(colorScheme);
  const theme = useMemo<Theme>(
    () =>
      colorScheme === "light"
        ? {
            primary: "#2386F1",
            secondary: "#8DA5B9",
            background: "#FFFFFF",
            darkPrimary: "#0CA236",
            light: "#F2F8FD",
            font: "#211C3F",
            wrong: "#FA4646",
            stroke: "#E3E8E4",
          }
        : {
            primary: "#2386F1",
            secondary: "#8DA5B9",
            background: "#17132C",
            darkPrimary: "#0CA236",
            light: "#211C3F",
            font: "#D9D6E9",
            wrong: "#FA4646",
            stroke: "#E3E8E4",
          },
    [colorScheme]
  );
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}
