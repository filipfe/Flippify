import { View, useColorScheme } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Greeting from "../components/home/Greeting";
import ProfileBoxLink from "../components/BoxLink";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootTabParams } from "../types/navigation";
import RecentCategories from "../components/home/RecentCategories";
import { linearGradient } from "../const/styles";

export default function HomeScreen() {
  const { navigate } = useNavigation<NavigationProp<RootTabParams>>();
  const { background } = useContext(ThemeContext);
  return (
    <LinearGradient
      colors={linearGradient}
      start={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <Greeting />
        <View
          style={{
            flex: 1,
            backgroundColor: background,
            borderTopRightRadius: 36,
            borderTopLeftRadius: 36,
          }}
        >
          <View style={{ marginTop: -64, paddingHorizontal: 24 }}>
            <ProfileBoxLink
              navigate={() =>
                navigate("FlashCards", { screen: "OwnFlashCards" })
              }
              title="Dodane fiszki"
              subtitle="12"
              icon="📖"
            />
            <ProfileBoxLink
              navigate={() =>
                navigate("FlashCards", { screen: "OwnFlashLists" })
              }
              title="Moje fiszkolisty"
              subtitle="4"
              icon="📃"
            />
          </View>
          <View style={{ marginVertical: 24 }}>
            <RecentCategories />
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
