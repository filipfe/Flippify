import { useColorScheme } from "react-native";
import { Theme, ThemeContext } from "../context/ThemeContext";
import { useMemo, useState } from "react";
import { darkTheme, lightTheme } from "../styles/general";

export default function ThemeProvider({ children }: { children: JSX.Element }) {
  const colorScheme = useColorScheme();
  const [userPreferredTheme, setUserPreferredTheme] = useState<
    typeof colorScheme | "system"
  >("system");

  const theme = useMemo<Theme>(() => {
    if (userPreferredTheme !== "system") {
      switch (userPreferredTheme) {
        case "light":
          return lightTheme;
        case "dark":
          return darkTheme;
      }
    }
    return colorScheme === "light" ? lightTheme : darkTheme;
  }, [colorScheme, userPreferredTheme]);

  return (
    <ThemeContext.Provider
      value={{ ...theme, userPreferredTheme, setUserPreferredTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
