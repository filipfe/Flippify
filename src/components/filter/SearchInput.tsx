import { useContext, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { ThemeContext } from "../../context/ThemeContext";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../../types/navigation";

export default function SearchInput() {
  const { navigate } = useNavigation<NavigationProp<RootStackParams>>();
  const { secondary, font, light } = useContext(ThemeContext);
  const [input, setInput] = useState("");
  const search = () => navigate("SearchScreen", { input });
  return (
    <TextInput
      onSubmitEditing={search}
      onChangeText={(text) => setInput(text)}
      value={input}
      placeholder={"Wyszukaj fiszkolistę"}
      placeholderTextColor={secondary}
      autoFocus
      style={{
        fontFamily: "SemiBold",
        flex: 1,
        color: font,
        backgroundColor: light,
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 24,
      }}
    />
  );
}
