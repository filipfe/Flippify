import { StyleSheet } from "react-native";

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

export const lightTheme = {
  primary: "#2386F1",
  secondary: "#8DA5B9",
  background: "#FFFFFF",
  light: "#F2F8FD",
  box: "#FFFFFF",
  font: "#211C3F",
  wrong: "#FA4646",
  stroke: "#E3E8E4",
};

export const darkTheme = {
  primary: "#2386F1",
  secondary: "#8DA5B9",
  background: "#120F23",
  light: "#211C3F",
  box: "#211C3F",
  font: "#D9D6E9",
  wrong: "#FA4646",
  stroke: "#E3E8E4",
};
