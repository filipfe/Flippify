import { NavigationContainer } from "@react-navigation/native";
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
import { RootTabParams } from "./src/types/navigation";
import TabBar from "./src/components/TabBar";
import ThemeProvider from "./src/providers/ThemeProvider";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator } from "react-native";
import { ThemeContext } from "./src/context/ThemeContext";
import SettingsProvider from "./src/providers/SettingsProvider";
import AddCard from "./src/components/flashcards/add-card/AddCard";
import AddNote from "./src/components/notes/add-note/AddNote";
import Header from "./src/components/header/Header";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function AppProvider() {
  const [isFontLoaded] = useFonts({
    Regular,
    Medium,
    SemiBold,
    Bold,
    ExtraBold,
  });

  if (!isFontLoaded)
    return <ActivityIndicator size="large" color={"#2386F1"} />;

  return (
    <ThemeProvider>
      <AuthProvider>
        <SettingsProvider>
          <AxiosProvider>
            <StatusBar translucent />
            <App />
          </AxiosProvider>
        </SettingsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

const RootTab = createBottomTabNavigator<RootTabParams>();

function App() {
  const { background } = useContext(ThemeContext);
  const { isLogged } = useContext(AuthContext);

  if (!isLogged) return <EntryScreen />;

  return (
    <NavigationContainer>
      <RootTab.Navigator
        sceneContainerStyle={{ backgroundColor: background }}
        tabBar={(props) => <TabBar {...props} />}
        backBehavior="history"
        screenOptions={{
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
        <RootTab.Screen
          name="AddCard"
          component={AddCard}
          options={{
            title: "Nowa fiszka",
            header: (props) => <Header {...props} />,
          }}
        />
        <RootTab.Screen
          name="AddNote"
          component={AddNote}
          options={({ route }) => ({
            title: route.params?.id ? route.params.title : "Dodaj notatkę",
            headerTransparent: true,
            header: (props) => <Header {...props} />,
          })}
        />
      </RootTab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: "Bold",
  },
});
