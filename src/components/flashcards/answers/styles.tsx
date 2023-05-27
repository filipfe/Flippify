import { StyleSheet } from "react-native";
import { THEME } from "../../../const/theme";

export const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    marginBottom: 8,
  },
  label: {
    fontFamily: "SemiBold",
    transform: [{ translateY: 8 }],
    zIndex: 10,
    position: "relative",
    fontSize: 12,
    color: THEME.p,
    paddingHorizontal: 24,
  },
  input: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    width: "100%",
    backgroundColor: THEME.light,
  },
});
