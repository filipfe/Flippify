import { StyleSheet } from "react-native";
import { THEME } from "../const/theme";

export const shadowPrimary = {
  elevation: 12,
  shadowColor: "#3C85C2",
  shadowOpacity: 0.25,
  shadowOffset: {
    height: 4,
    width: 0,
  },
};

export const globalStyles = StyleSheet.create({
  paramText: {
    color: THEME.secondary,
    fontFamily: "SemiBold",
    fontSize: 14,
    lineHeight: 14,
  },
});
