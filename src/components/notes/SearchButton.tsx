import { Pressable } from "react-native";
import { NoteRefNavigationProp } from "../../types/notes";
import { SearchIcon } from "../../assets/icons/icons";
import { useNavigation } from "@react-navigation/native";

export default function SearchButton() {
  const { navigate } = useNavigation<NoteRefNavigationProp>();
  return (
    <Pressable onPress={() => navigate("NoteSearch")}>
      <SearchIcon />
    </Pressable>
  );
}
