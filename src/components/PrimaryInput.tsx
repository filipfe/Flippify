import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { THEME } from "../const/theme";

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
  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        autoFocus={autoFocus}
        maxLength={maxLength}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        onSubmitEditing={onSubmitEditing}
        numberOfLines={numberOfLines}
        placeholder={placeholder}
        placeholderTextColor={THEME.secondary}
        value={value}
        style={{
          ...styles.input,
          ...(style as any),
          paddingVertical: label ? 12 : 10,
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
    color: THEME.p,
    paddingHorizontal: 24,
  },
  input: {
    fontFamily: "SemiBold",
    paddingHorizontal: 24,
    borderRadius: 16,
    width: "100%",
    backgroundColor: THEME.light,
    color: THEME.font,
    alignItems: "flex-start",
  },
});
