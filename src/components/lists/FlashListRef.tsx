import { View, Pressable, Text } from "react-native";
import { FlashList } from "../../types/flashcards";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParams, RootTabParams } from "../../types/navigation";

export default function FlashListRef({ id, name }: FlashList) {
  const { navigate } =
    useNavigation<NavigationProp<RootStackParams, "RootTab">>();
  const { font } = useContext(ThemeContext);
  return (
    <Pressable
      onPress={() => navigate("CardsGenerator", { list: { id, name } })}
    >
      <Text style={{ color: font }}>{name}</Text>
    </Pressable>
  );
}
