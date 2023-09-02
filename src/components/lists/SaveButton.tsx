import { HeaderButtonProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import { CheckmarkIcon, LikeIcon } from "../../assets/icons/icons";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext, useState } from "react";
import { Pressable, Text } from "react-native";
import GradientText from "../ui/GradientText";

export default function SaveButton({ listId }: { listId: number }) {
  const [isSaved, setIsSaved] = useState(false);
  const { primary, font } = useContext(ThemeContext);

  return isSaved ? (
    <Pressable
      onPress={() => setIsSaved(false)}
      style={{ alignItems: "center", flexDirection: "row" }}
    >
      <CheckmarkIcon fill={primary} height={16} width={16} />
      <GradientText
        style={{
          fontFamily: "SemiBold",
          marginLeft: 8,
          lineHeight: 18,
        }}
      >
        Zapisano
      </GradientText>
    </Pressable>
  ) : (
    <Pressable
      onPress={() => setIsSaved(true)}
      style={{ alignItems: "center", flexDirection: "row" }}
    >
      <LikeIcon stroke={font} strokeWidth={1.8} height={16} width={16} />
      <Text
        style={{
          fontFamily: "SemiBold",
          color: font,
          marginLeft: 8,
          lineHeight: 18,
        }}
      >
        Zapisz
      </Text>
    </Pressable>
  );
}
