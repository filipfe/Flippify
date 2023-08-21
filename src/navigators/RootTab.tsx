import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootTabParams } from "../types/navigation";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";
import TabBar from "../components/TabBar";
import HomeScreen from "../screens/HomeScreen";
import AddCard from "../components/flashcards/add-card/AddCard";
import Header from "../components/header/Header";
import CardStack from "./cards/CardStack";
import ProfileStack from "./profile/ProfileStack";
import HomeHeader from "../components/home/HomeHeader";
import ListStack from "./lists/ListStack";

const RootTabNav = createBottomTabNavigator<RootTabParams>();

export default function RootTab() {
  const { background } = useContext(ThemeContext);

  return (
    <RootTabNav.Navigator
      sceneContainerStyle={{ backgroundColor: background }}
      tabBar={(props) => <TabBar {...props} />}
      backBehavior="history"
      screenOptions={{
        tabBarActiveTintColor: "#2386F1",
        tabBarInactiveTintColor: "#382E6D",
      }}
    >
      <RootTabNav.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Eksploruj",
          header: HomeHeader,
        }}
      />
      <RootTabNav.Screen
        name="Cards"
        component={CardStack}
        options={{
          title: "Fiszki",
          headerShown: false,
        }}
      />
      <RootTabNav.Screen
        name="Lists"
        component={ListStack}
        options={{ title: "Fiszkolisty", headerShown: false }}
      />
      <RootTabNav.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          title: "Profil",
          headerShown: false,
        }}
      />
      <RootTabNav.Screen
        name="AddCard"
        component={AddCard}
        options={({ route }) => ({
          title: route.params?.id ? "Modyfikuj fiszkę" : "Nowa fiszka",
          header: (props) => <Header {...props} />,
        })}
      />
    </RootTabNav.Navigator>
  );
}
