import {
  NavigationContainer,
  NavigatorScreenParams,
} from "@react-navigation/native";
import HomeScreen from "./src/screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FlashCardsScreen from "./src/screens/FlashCardsScreen";
import NotesScreen from "./src/screens/NotesScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import { useContext } from "react";
import { AuthContext } from "./src/context/AuthContext";
import EntryScreen from "./src/screens/EntryScreen";
import { StyleSheet } from "react-native";
import AuthProvider from "./src/providers/AuthProvider";
import AxiosProvider from "./src/providers/AxiosProvider";
import {
  useFonts,
  PlusJakartaSans_400Regular as Regular,
  PlusJakartaSans_500Medium as Medium,
  PlusJakartaSans_600SemiBold as SemiBold,
  PlusJakartaSans_700Bold as Bold,
  PlusJakartaSans_800ExtraBold as ExtraBold,
} from "@expo-google-fonts/plus-jakarta-sans";
import Loader from "./src/components/Loader";
import * as SplashScreen from "expo-splash-screen";
import {
  FlashCardsStackParams,
  ProfileStackParams,
} from "./src/types/navigation";
import TabBar from "./src/components/TabBar";
import { NoteStackParams } from "./src/types/notes";

SplashScreen.preventAutoHideAsync();

export default function AppProvider() {
  const [isFontLoaded] = useFonts({
    Regular,
    Medium,
    SemiBold,
    Bold,
    ExtraBold,
  });

  if (!isFontLoaded) return <Loader />;

  return (
    <AuthProvider>
      <AxiosProvider>
        <App />
      </AxiosProvider>
    </AuthProvider>
  );
}

export type RootTabParams = {
  Home: undefined;
  FlashCards: NavigatorScreenParams<FlashCardsStackParams>;
  Notes: NavigatorScreenParams<NoteStackParams>;
  Profile: NavigatorScreenParams<ProfileStackParams>;
};

const RootTab = createBottomTabNavigator<RootTabParams>();

function App() {
  const { isLogged } = useContext(AuthContext);

  if (!isLogged) return <EntryScreen />;

  return (
    <NavigationContainer>
      <RootTab.Navigator
        sceneContainerStyle={styles.sceneContainer}
        tabBar={TabBar}
        screenOptions={{
          headerTitleStyle: styles.headerTitle,
          tabBarActiveTintColor: "#2386F1",
          tabBarInactiveTintColor: "#382E6D",
        }}
      >
        <RootTab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Eksploruj",
            headerShown: false,
          }}
        />
        <RootTab.Screen
          name="FlashCards"
          component={FlashCardsScreen}
          options={{
            title: "Fiszki",
            headerShown: false,
          }}
        />
        <RootTab.Screen
          name="Notes"
          component={NotesScreen}
          options={{
            title: "Notatki",
            headerShown: false,
          }}
        />
        <RootTab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: "Profil",
            headerShown: false,
          }}
        />
      </RootTab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sceneContainer: {
    backgroundColor: "#FFFFFF",
  },
  headerTitle: {
    fontFamily: "Bold",
  },
});
