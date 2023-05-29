import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FlashCardsScreen from "./src/screens/FlashCardsScreen";
import NotesScreen from "./src/screens/NotesScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import {
  FlashCardsIcon,
  HomeIcon,
  NotesIcon,
  ProfileIcon,
} from "./src/assets/general";
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
import { THEME } from "./src/const/theme";

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
  FlashCards: undefined;
  Notes: undefined;
  Profile: undefined;
};

const RootTab = createBottomTabNavigator<RootTabParams>();

function App() {
  const { isLogged } = useContext(AuthContext);

  if (!isLogged) return <EntryScreen />;

  return (
    <NavigationContainer>
      <RootTab.Navigator
        sceneContainerStyle={styles.sceneContainer}
        screenOptions={{
          headerTitleStyle: styles.headerTitle,
          tabBarActiveTintColor: "#2386F1",
          tabBarInactiveTintColor: "#382E6D",
          tabBarStyle: styles.tabBar,
          tabBarShowLabel: false,
        }}
      >
        <RootTab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Eksploruj",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <HomeIcon
                stroke={focused ? "#2386F1" : "#382E6D"}
                strokeWidth="2"
                height={28}
                width={28}
              />
            ),
          }}
        />
        <RootTab.Screen
          name="FlashCards"
          component={FlashCardsScreen}
          options={{
            title: "Fiszki",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <FlashCardsIcon
                stroke={focused ? "#2386F1" : "#382E6D"}
                strokeWidth="2"
                height={24}
                width={24}
              />
            ),
          }}
        />
        <RootTab.Screen
          name="Notes"
          component={NotesScreen}
          options={{
            title: "Notatki",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <NotesIcon
                stroke={focused ? "#2386F1" : "#382E6D"}
                strokeWidth="2"
                height={25}
                width={25}
              />
            ),
          }}
        />
        <RootTab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: "Profil",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <ProfileIcon
                stroke={focused ? "#2386F1" : "#382E6D"}
                strokeWidth="2"
                height={26}
                width={26}
              />
            ),
          }}
        />
      </RootTab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    paddingHorizontal: 24,
    height: 64,
    alignItems: "center",
    flexDirection: "row",
    shadowColor: THEME.primary,
  },
  tabBarLabel: {
    fontSize: 14,
    fontFamily: "Bold",
    paddingBottom: 16,
  },
  sceneContainer: {
    backgroundColor: "#FFFFFF",
  },
  headerTitle: {
    fontFamily: "Bold",
  },
});
