import { View } from "react-native";
import SearchButton from "./SearchButton";
import FilterButton from "./FilterButton";

export default function HeaderMenu() {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <FilterButton />
      <View style={{ marginLeft: 16 }}>
        <SearchButton />
      </View>
    </View>
  );
}
