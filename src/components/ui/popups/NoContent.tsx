import { StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../PrimaryButton";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

type Props = {
  text?: string;
  buttonText?: string;
  onPress?: () => void;
};

export default function NoContent({
  text = "Nie znaleziono",
  buttonText,
  onPress,
}: Props) {
  const { font, background } = useContext(ThemeContext);
  return (
    <View style={{ ...styles.wrapper, backgroundColor: background }}>
      <Text style={{ ...styles.text, color: font }}>{text}</Text>
      {text && buttonText && (
        <PrimaryButton
          onPress={onPress}
          paddingVertical={12}
          fontSize={12}
          text={buttonText}
        />
      )}
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
  },
});
