import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { linearGradient } from "../const/styles";
import Greeting from "../components/home/Greeting";
import ProfileBoxLink from "../components/BoxLink";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";
import useNotes from "../hooks/useNotes";
import { ScrollView } from "react-native-gesture-handler";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootTabParams } from "../types/navigation";
import RecentCategories from "../components/home/RecentCategories";

export default function HomeScreen() {
  const { navigate } = useNavigation<NavigationProp<RootTabParams>>();
  const { RecentNotes, PopularNotes } = useNotes();
  const { background } = useContext(ThemeContext);
  return (
    <LinearGradient
      colors={linearGradient}
      start={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <ScrollView>
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
              navigate={() => navigate("Profile", { screen: "OwnFlashCards" })}
              title="Dodane fiszki"
              subtitle="12"
              icon="📖"
            />
            <ProfileBoxLink
              navigate={() => navigate("Profile", { screen: "FlashLists" })}
              title="Moje fiszkolisty"
              subtitle="4"
              icon="📃"
            />
          </View>
          <View style={{ marginVertical: 24 }}>
            <PopularNotes text="Popularne notatki" />
            <RecentCategories />
            <RecentNotes text="Ostatnio dodane notatki" />
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
