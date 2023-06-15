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
        backgroundColor: colorScheme === "light" ? "#FFF" : "#120F23",
      }}
    >
      <ActivityIndicator size="large" color={"#2386F1"} />
    </View>
  );
}
