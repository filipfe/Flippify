import { StyleSheet } from "react-native";
import { Theme } from "../context/ThemeContext";

export const shadowPrimary = {
  elevation: 12,
  shadowColor: "#3C85C295",
  shadowOpacity: 0.25,
  shadowOffset: {
    height: 4,
    width: 0,
  },
};

export const globalStyles = StyleSheet.create({
  paramText: {
    fontFamily: "SemiBold",
    fontSize: 14,
    lineHeight: 14,
  },
});

export const lightTheme: Theme = {
  primary: "#2386F1",
  secondary: "#8DA5B9",
  background: "#FFFFFF",
  light: "#F2F8FD",
  lighter: "#262045",
  box: "#FFFFFF",
  font: "#382E6D",
  wrong: "#DC555D",
  ripple: "#E8E8E8",
};

export const darkTheme: Theme = {
  primary: "#2386F1",
  secondary: "#8DA5B9",
  background: "#100d1c",
  light: "#17132b",
  lighter: "#221d3d",
  box: "#17132b",
  font: "#D9D6E9",
  wrong: "#DC555D",
  ripple: "#0a0917",
};
