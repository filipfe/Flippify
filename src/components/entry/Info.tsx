import { Image, Text, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";

export default function Info() {
  const tw = useTailwind();
  return (
    <View style={{ alignItems: "center" }}>
      <Text
        style={{
          fontFamily: "Bold",
          ...tw("mb-6 text-3xl text-font text-center"),
        }}
      >
        Witaj w DivideKnowledge!
      </Text>
      <Text
        style={{
          fontFamily: "Medium",
          ...tw(
            "text-p text-sm text-center leading-[1.5rem] max-w-[90%] mb-12 text-center"
          ),
        }}
      >
        Przygotuj się na opanowanie najważniejszych i najbardziej interesujących
        Cię informacji przy pomocy jednej aplikacji.
      </Text>
    </View>
  );
}
