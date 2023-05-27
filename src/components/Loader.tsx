import { ActivityIndicator, View } from "react-native";
import { THEME } from "../const/theme";

export default function Loader() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFF",
        width: "100%",
      }}
    >
      <ActivityIndicator size="large" color={THEME.primary} />
    </View>
  );
}
