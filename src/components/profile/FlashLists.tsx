import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListOfLists from "../flashlists/ListOfLists";
import AddFlashList from "../flashlists/AddFlashList";
import FlashListDetails from "../flashlists/FlashListDetails";
import { FlashListStackParams } from "../../types/navigation";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const FlashListStack = createNativeStackNavigator<FlashListStackParams>();

export default function FlashLists() {
  const { font } = useContext(ThemeContext);
  return (
    <FlashListStack.Navigator
      initialRouteName="ListOfLists"
      screenOptions={{
        headerTitleStyle: { fontFamily: "SemiBold", color: font },
      }}
    >
      <FlashListStack.Screen
        name="ListOfLists"
        component={ListOfLists}
        options={{
          title: "Moje FiszkoListy",
        }}
      />
      <FlashListStack.Screen
        name="AddFlashList"
        component={AddFlashList}
        options={{
          title: "Dodaj FiszkoListę",
        }}
      />
      <FlashListStack.Screen
        name="FlashList"
        component={FlashListDetails}
        options={({ route }) => {
          return { title: route.params.name };
        }}
      />
    </FlashListStack.Navigator>
  );
}
