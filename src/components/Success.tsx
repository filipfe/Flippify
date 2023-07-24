import { ThemeContext } from "../context/ThemeContext";
import PrimaryButton from "./PrimaryButton";
import { View, Text, StyleSheet, Modal } from "react-native";
import { useContext } from "react";
import SecondaryButton from "./SecondaryButton";

type Props = {
  text: string;
  rejectButtonText: string;
  submitButtonText: string;
  onSubmit: () => void;
  onReject: () => void;
};

export default function Success({
  text,
  rejectButtonText,
  submitButtonText,
  onReject,
  onSubmit,
}: Props) {
  const { font, background } = useContext(ThemeContext);
  return (
    <View style={{ ...styles.wrapper, backgroundColor: background }}>
      <Text style={{ ...styles.text, color: font }}>{text}</Text>
      <View style={styles.buttonsWrapper}>
        <SecondaryButton onPress={onReject} text={rejectButtonText} />
        <View style={{ width: 16 }} />
        <PrimaryButton onPress={onSubmit} text={submitButtonText} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
  text: {
    fontFamily: "Bold",
    fontSize: 18,
    marginBottom: 24,
    textAlign: "center",
  },
  buttonsWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
});
