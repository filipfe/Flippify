import { View, Text, StyleSheet } from "react-native";
import useShadow from "../../hooks/useShadow";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import PrimaryButton from "../ui/PrimaryButton";
import { HintIcon } from "../../assets/icons/icons";

type Props = {
  text: string;
  buttonText: string;
  onPress: () => void;
};

export default function Hint({ text, buttonText, onPress }: Props) {
  const shadow = useShadow(24);
  const { background, font } = useContext(ThemeContext);
  return (
    <View style={[styles.wrapper, shadow, { backgroundColor: background }]}>
      <View style={styles.row}>
        <View style={{ marginRight: 16 }}>
          <HintIcon />
        </View>
        <Text style={[styles.text, { color: font }]}>{text}</Text>
      </View>
      <PrimaryButton onPress={onPress} paddingVertical={12} text={buttonText} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 16,
    padding: 24,
  },
  text: {
    fontFamily: "SemiBold",
    fontSize: 13,
    lineHeight: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 24,
  },
});
