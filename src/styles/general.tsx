import { StyleSheet } from "react-native";

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
    fontFamily: "SemiBold",
    fontSize: 14,
    lineHeight: 14,
  },
});
