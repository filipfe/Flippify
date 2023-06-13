import { ActivityIndicator, View, useColorScheme } from "react-native";

export default function Loader() {
  const colorScheme = useColorScheme();
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        backgroundColor: colorScheme === "light" ? "#FFF" : "#211C3F",
      }}
    >
      <ActivityIndicator size="large" color={"#2386F1"} />
    </View>
  );
}
