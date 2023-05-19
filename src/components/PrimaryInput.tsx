import { Text, TextInput, View } from "react-native";
import { useState, useEffect } from "react";
import { useTailwind } from "tailwind-rn/dist";

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
  const tw = useTailwind();
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
    <View style={tw("relative mb-4")}>
      {label && (
        <Text
          style={{
            fontFamily: "SemiBold",
            transform: [{ translateY: 8 }],
            zIndex: 10,
            position: "relative",
            fontSize: 12,
            ...tw("text-p px-6"),
          }}
        >
          {label}
        </Text>
      )}
      <TextInput
        secureTextEntry={secured}
        value={typeof value === "string" ? value : input}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          fontFamily: "SemiBold",
          ...tw(`py-3 px-6 rounded-2xl w-full bg-light`),
        }}
        onChangeText={(text) => setInput(text)}
      />
    </View>
  );
}
