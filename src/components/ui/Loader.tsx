import { ActivityIndicator, View } from "react-native";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";

export default function Loader() {
  const { background } = useContext(ThemeContext);
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        backgroundColor: background,
        paddingVertical: 16,
      }}
    >
      <ActivityIndicator size="large" color={"#2386F1"} />
    </View>
  );
}
