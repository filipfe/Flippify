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
        </RootStackNav.Navigator>
      </NavigationContainer>
    </View>
  ) : (
    <EntryScreen />
  );
}
