import { View } from "react-native";
import SearchButton from "./SearchButton";
import FilterButton from "./FilterButton";
import { FilterComponentProps } from "../../types/navigation";

export default function HeaderMenu({ route, dataType }: FilterComponentProps) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <FilterButton route={route} dataType={dataType} />
      <View style={{ marginLeft: 16 }}>
        <SearchButton route={route} dataType={dataType} />
      </View>
    </View>
  );
}
