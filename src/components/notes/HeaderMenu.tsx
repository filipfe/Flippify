import { View } from "react-native";
import SearchButton from "./SearchButton";

export default function HeaderMenu() {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <View style={{ marginRight: 8 }}>
        <SearchButton />
      </View>
    </View>
  );
}
