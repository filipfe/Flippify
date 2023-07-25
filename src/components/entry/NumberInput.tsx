import { useContext, useEffect, useRef } from "react";
import { View, TextInput } from "react-native";
import { ThemeContext } from "../../context/ThemeContext";

type Props = {
  code: string;
  index: number;
  onDelete: () => void;
  onType: (char: string) => void;
};

export default function NumberInput({ code, index, onType, onDelete }: Props) {
  const inputRef = useRef<TextInput>(null!);
  const { light, font } = useContext(ThemeContext);

  useEffect(() => {
    if (!inputRef.current) return;
    code.length === index && inputRef.current.focus();
  }, [code, inputRef.current]);

  return (
    <View
      style={{
        borderRadius: 12,
        height: 48,
        width: 36,
        backgroundColor: light,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TextInput
        maxLength={1}
        value={code[index] || ""}
        ref={(ref) => ref && (inputRef.current = ref)}
        onFocus={() => index > code.length && inputRef.current.blur()}
        keyboardType="decimal-pad"
        focusable={index <= code.length}
        style={{
          color: font,
          fontSize: 24,
          fontFamily: "Bold",
          lineHeight: 28,
          marginLeft: 6,
        }}
        onChangeText={(letter) => letter && onType(letter)}
        onKeyPress={(e) => e.nativeEvent.key === "Backspace" && onDelete()}
      />
    </View>
  );
}
