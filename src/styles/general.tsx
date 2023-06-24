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
  box: "#FFFFFF",
  font: "#211C3F",
  wrong: "#DC555D",
  stroke: "#E3E8E4",
  ripple: "#0B0918",
};

export const darkTheme: Theme = {
  primary: "#2386F1",
  secondary: "#8DA5B9",
  background: "#120F23",
  light: "#211C3F",
  box: "#211C3F",
  font: "#D9D6E9",
  wrong: "#DC555D",
  stroke: "#E3E8E4",
  ripple: "#0B0918",
};
