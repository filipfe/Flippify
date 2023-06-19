import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

type Input = {
  label?: string;
};

export default function PrimaryInput({
  label,
  multiline = false,
  numberOfLines,
  maxLength,
  style,
  secureTextEntry,
  placeholder,
  value,
  autoFocus,
  onSubmitEditing,
  onChangeText,
}: TextInputProps & Input) {
  const { secondary, light, font } = useContext(ThemeContext);
  return (
    <View style={styles.wrapper}>
      {label && (
        <Text style={{ ...styles.label, color: secondary }}>{label}</Text>
      )}
      <TextInput
        autoFocus={autoFocus}
        maxLength={maxLength}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        onSubmitEditing={onSubmitEditing}
        numberOfLines={numberOfLines}
        placeholder={placeholder}
        placeholderTextColor={secondary}
        value={value}
        style={{
          ...styles.input,
          ...(style as any),
          paddingVertical: label ? 12 : 10,
          color: font,
          backgroundColor: light,
        }}
        onChangeText={onChangeText}
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
    paddingHorizontal: 24,
  },
  input: {
    fontFamily: "SemiBold",
    paddingHorizontal: 24,
    borderRadius: 16,
    width: "100%",
    alignItems: "flex-start",
  },
});
