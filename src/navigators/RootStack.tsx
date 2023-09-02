import { RootStackParams } from "../types/navigation";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RootTab from "./RootTab";
import EntryScreen from "../screens/EntryScreen";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import Header from "../components/header/Header";
import CardsGeneratorScreen from "../screens/CardsGeneratorScreen";
import { ThemeContext } from "../context/ThemeContext";
import { View } from "react-native";
import ListDetailsScreen from "../screens/lists/ListDetailsScreen";
import SaveButton from "../components/lists/SaveButton";
import Introduction from "../components/ui/Introduction";
import SearchScreen from "../screens/SearchScreen";
import SearchInput from "../components/filter/SearchInput";
import AddCard from "../components/flashcards/add-card/AddCard";

const RootStackNav = createNativeStackNavigator<RootStackParams>();

export default function RootStack() {
  const { background } = useContext(ThemeContext);
  const { isLogged } = useContext(AuthContext);

  return isLogged ? (
    <View style={{ flex: 1, backgroundColor: background }}>
      <NavigationContainer>
        <RootStackNav.Navigator
          initialRouteName="RootTab"
          screenOptions={{ header: (props) => <Header {...props} /> }}
        >
          <RootStackNav.Screen
            name="RootTab"
            component={RootTab}
            initialParams={{ screen: "Home" }}
            options={{
              headerShown: false,
            }}
          />
          <RootStackNav.Screen
            name="CardsGenerator"
            component={CardsGeneratorScreen}
            options={({ route }) => ({
              title: route.params.list?.id
                ? route.params.list.name
                : route.params.topic?.name || route.params.category?.name,
            })}
          />
          <RootStackNav.Screen
            name="ListDetailsScreen"
            component={ListDetailsScreen}
            options={(props) => ({
              title: "",
              headerRight: (_) => <SaveButton listId={props.route.params.id} />,
            })}
          />
          <RootStackNav.Screen
            name="SearchScreen"
            component={SearchScreen}
            options={{
              title: "",
              headerBackVisible: false,
              headerRight: SearchInput,
              header: (props) => (
                <View style={{ paddingVertical: 8 }}>
                  <Header {...props} />
                </View>
              ),
            }}
          />
          <RootStackNav.Screen
            name="AddCard"
            component={AddCard}
            options={({ route }) => ({
              title: route.params?.id ? "Modyfikuj fiszkę" : "Nowa fiszka",
              header: (props) => <Header {...props} />,
            })}
          />
        </RootStackNav.Navigator>
      </NavigationContainer>
      <Introduction />
    </View>
  ) : (
    <EntryScreen />
  );
}
