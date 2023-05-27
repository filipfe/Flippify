import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { linearGradient } from "../const/styles";
import Greeting from "../components/home/Greeting";
import ProfileBoxLink from "../components/home/HomeBoxLink";

export default function HomeScreen() {
  return (
    <LinearGradient
      colors={linearGradient}
      start={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <Greeting />
      <View
        style={{
          flex: 1,
          backgroundColor: "#FFF",
          borderTopRightRadius: 36,
          borderTopLeftRadius: 36,
          paddingHorizontal: 24,
        }}
      >
        <View style={{ marginTop: -64 }}>
          <ProfileBoxLink
            to={"OwnFlashCards"}
            title="Dodane fiszki"
            subtitle="12"
            icon="📖"
          />
          <ProfileBoxLink
            to={"FlashLists"}
            title="Moje fiszkolisty"
            subtitle="4"
            icon="📃"
          />
        </View>
      </View>
    </LinearGradient>
  );
}
