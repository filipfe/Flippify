import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FlashCardsScreen from "./src/screens/FlashCardsScreen";
import NotesScreen from "./src/screens/NotesScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import { useTailwind } from "tailwind-rn/dist";
import {
  FlashCardsIcon,
  HomeIcon,
  NotesIcon,
  ProfileIcon,
} from "./assets/home";
import Loader from "./src/components/Loader";
import {
  useFonts,
  Dosis_400Regular as Regular,
  Dosis_500Medium as Medium,
  Dosis_600SemiBold as SemiBold,
  Dosis_700Bold as Bold,
  Dosis_800ExtraBold as ExtraBold,
} from "@expo-google-fonts/dosis";
import AuthProvider from "./src/context/AuthProvider";

export type RootTabParams = {
  Home: undefined;
  FlashCards: undefined;
  Notes: undefined;
  Profile: undefined;
};

const RootTab = createBottomTabNavigator<RootTabParams>();

export default function App() {
  const tw = useTailwind();
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
      <NavigationContainer>
        <RootTab.Navigator
          sceneContainerStyle={tw("bg-white")}
          screenOptions={{
            headerTitleStyle: { fontFamily: "Bold" },
            tabBarActiveTintColor: "#10DC49",
            tabBarInactiveTintColor: "#3A234E",
            tabBarLabelStyle: { ...tw("text-[.9rem]"), fontFamily: "Bold" },
            tabBarStyle: tw("h-20 px-4 py-[0.9rem]"),
          }}
        >
          <RootTab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: "Eksploruj",
              tabBarIcon: ({ focused }) => (
                <HomeIcon
                  stroke={focused ? "#10DC49" : "#3A234E"}
                  strokeWidth="2"
                  height={27}
                  width={25}
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
                  stroke={focused ? "#10DC49" : "#3A234E"}
                  strokeWidth="2"
                  height={25}
                  width={22}
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
                  stroke={focused ? "#10DC49" : "#3A234E"}
                  strokeWidth="2"
                  height={26}
                  width={23}
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
                  stroke={focused ? "#10DC49" : "#3A234E"}
                  strokeWidth="2"
                  height={26}
                  width={24}
                />
              ),
            }}
          />
        </RootTab.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
