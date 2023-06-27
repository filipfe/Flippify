import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootTabParams } from "../types/navigation";
import { linearGradient } from "../const/styles";
import HomeHeader from "../components/home/HomeHeader";
import HomeLevel from "../components/home/HomeLevel";
import { initialFilter } from "../const/notes";
import HomeSection from "../components/home/HomeSection";
import BoxLink from "../components/BoxLink";

export default function HomeScreen() {
  const { navigate } = useNavigation<NavigationProp<RootTabParams>>();
  const { background } = useContext(ThemeContext);
  return (
    <LinearGradient
      colors={linearGradient}
      start={{ x: 1, y: 1 }}
      style={styles.flex}
    >
      <ScrollView contentContainerStyle={styles.flex}>
        <HomeHeader />
        <View
          style={[styles.flex, styles.wrapper, { backgroundColor: background }]}
        >
          <View style={{ marginTop: -48, paddingHorizontal: 24 }}>
            <View style={styles.firstChild}>
              <HomeLevel />
            </View>
            <HomeSection title="Twoje twory">
              <BoxLink
                navigate={() =>
                  navigate("FlashCards", {
                    screen: "OwnFlashCards",
                    params: initialFilter,
                  })
                }
                title="Dodane fiszki"
                subtitle="12"
                icon="📖"
              />
              <BoxLink
                navigate={() =>
                  navigate("FlashCards", { screen: "OwnFlashLists" })
                }
                title="Moje fiszkolisty"
                subtitle="4"
                icon="📃"
              />
            </HomeSection>
            <HomeSection title="Ostatnie notatki">
              <View></View>
            </HomeSection>
            <HomeSection title="Ulubione kategorie">
              <View></View>
            </HomeSection>
            <HomeSection title="Ostatnie notatki">
              <View></View>
            </HomeSection>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  wrapper: {
    borderTopRightRadius: 36,
    borderTopLeftRadius: 36,
  },
  firstChild: {
    marginBottom: 24,
  },
});
