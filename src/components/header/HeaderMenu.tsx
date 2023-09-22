import { Pressable, View } from "react-native";
import FilterButton from "./FilterButton";
import { FilterComponentProps, RootStackParams } from "../../types/navigation";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { SearchIcon } from "../../assets/icons/icons";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function HeaderMenu({ route }: FilterComponentProps) {
  const { font } = useContext(ThemeContext);
  const { navigate } = useNavigation<NavigationProp<RootStackParams>>();
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <FilterButton route={route} />
      <View style={{ marginLeft: 16 }}>
        <Pressable onPress={() => navigate("SearchScreen", { input: "" })}>
          <SearchIcon height={24} width={24} stroke={font} />
        </Pressable>
      </View>
    </View>
  );
}
