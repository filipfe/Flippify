import { View, Text, StyleSheet, useColorScheme } from "react-native";
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
  const colorScheme = useColorScheme();
  const shadow = useShadow(24);
  const { box, font, userPreferredTheme } = useContext(ThemeContext);
  const isLight =
    userPreferredTheme === "system"
      ? colorScheme === "light"
      : userPreferredTheme === "light";
  return (
    <View style={[styles.wrapper, isLight && shadow, { backgroundColor: box }]}>
      <View style={styles.row}>
        <View style={{ marginRight: 16 }}>
          <HintIcon strokeWidth={2} />
        </View>
        <Text style={[styles.text, { color: font }]}>{text}</Text>
      </View>
      <PrimaryButton
        onPress={onPress}
        paddingVertical={12}
        fontSize={12}
        borderRadius={12}
        text={buttonText}
      />
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
