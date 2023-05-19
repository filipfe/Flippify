import { Text, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { LinearGradient } from "expo-linear-gradient";
import { linearGradient } from "../const/styles";
import { Button } from "../types/general";

export default function PrimaryButton({
  onPress,
  text,
  active = true,
}: Button) {
  const tw = useTailwind();
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={active ? onPress : () => {}}
      style={{
        ...tw(`relative z-10 w-full mx-auto`),
      }}
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        style={{ borderRadius: 20, paddingVertical: 16, paddingHorizontal: 48 }}
        colors={linearGradient}
      >
        <Text
          style={{
            fontFamily: "Bold",
            ...tw(`mx-auto text-base ${active ? "text-white" : "text-font"}`),
          }}
        >
          {text}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}
