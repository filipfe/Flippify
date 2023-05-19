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
} from "./src/assets/home";
import { useContext } from "react";
import { AuthContext } from "./src/context/AuthContext";
import EntryScreen from "./src/screens/EntryScreen";

export type RootTabParams = {
  Home: undefined;
  FlashCards: undefined;
  Notes: undefined;
  Profile: undefined;
};

const RootTab = createBottomTabNavigator<RootTabParams>();

export default function App() {
  const tw = useTailwind();
  const { isLogged } = useContext(AuthContext);

  if (!isLogged) return <EntryScreen />;

  return (
    <NavigationContainer>
      <RootTab.Navigator
        sceneContainerStyle={tw("bg-white")}
        screenOptions={{
          headerTitleStyle: { fontFamily: "Bold" },
          tabBarActiveTintColor: "#2386F1",
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
                stroke={focused ? "#2386F1" : "#3A234E"}
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
                stroke={focused ? "#2386F1" : "#3A234E"}
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
                stroke={focused ? "#2386F1" : "#3A234E"}
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
                stroke={focused ? "#2386F1" : "#3A234E"}
                strokeWidth="2"
                height={26}
                width={24}
              />
            ),
          }}
        />
      </RootTab.Navigator>
    </NavigationContainer>
  );
}
