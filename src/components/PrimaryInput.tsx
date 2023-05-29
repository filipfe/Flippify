import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { useState, Dispatch, SetStateAction } from "react";
import { THEME } from "../const/theme";

type Input = {
  field: string;
  label?: string;
  setState: Dispatch<SetStateAction<any>>;
};

export default function PrimaryInput({
  field,
  label,
  multiline = false,
  numberOfLines,
  maxLength,
  style,
  secureTextEntry,
  value,
  setState,
}: TextInputProps & Input) {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (input: string) => {
    setState((prev: string | {}) => {
      if (typeof prev === "string") return input;
      return {
        ...prev,
        [field]: input,
      };
    });
  };

  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        maxLength={maxLength}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        numberOfLines={numberOfLines}
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{ ...styles.input, ...(style as any) }}
        onChangeText={handleChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
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
    color: THEME.font,
    alignItems: "flex-start",
  },
});
