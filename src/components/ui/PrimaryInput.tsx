import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

type Input = {
  label?: string;
  deleteIcon?: JSX.Element;
};

export default function PrimaryInput({
  label,
  deleteIcon,
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
      <View
        style={{ position: "relative", borderRadius: 16, overflow: "hidden" }}
      >
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
            paddingVertical: label ? 12 : 10,
            color: font,
            backgroundColor: light,
            ...(style as any),
          }}
          onChangeText={onChangeText}
        />
        {deleteIcon}
      </View>
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
