import { TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { Button } from "../types/general";
import GradientText from "./GradientText";

export default function SecondaryButton({
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
        borderRadius: 20,
        ...tw(`relative bg-light z-10 w-full mx-auto py-4 px-12`),
      }}
    >
      <GradientText
        style={{
          fontFamily: "Bold",
          ...tw(`mx-auto text-base ${active ? "text-white" : "text-font"}`),
        }}
      >
        {text}
      </GradientText>
    </TouchableOpacity>
  );
}
