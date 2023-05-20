import { StyleSheet, Text, TextInput, View } from "react-native";
import { useState, useEffect } from "react";
import { THEME } from "../const/theme";

type Input = {
  field: string;
  label?: string;
  secured?: boolean;
  value?: string;
  setState: any;
};

export default function PrimaryInput({
  field,
  label,
  secured,
  value,
  setState,
}: Input) {
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setState((prev: string | {}) => {
      if (typeof prev === "string") return input;
      return {
        ...prev,
        [field]: input,
      };
    });
  }, [input]);

  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        secureTextEntry={secured}
        value={typeof value === "string" ? value : input}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={styles.input}
        onChangeText={(text) => setInput(text)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    marginBottom: 16,
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
    fontFamily: "SemiBold",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 16,
    width: "100%",
    backgroundColor: THEME.light,
  },
});
