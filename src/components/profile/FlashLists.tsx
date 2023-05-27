import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListOfLists from "../flashlists/ListOfLists";
import AddFlashList from "../flashlists/AddFlashList";
import FlashListDetails from "../flashlists/FlashListDetails";
import { THEME } from "../../const/theme";
import { FlashListStackParams } from "../../types/navigation";

const FlashListStack = createNativeStackNavigator<FlashListStackParams>();

export default function FlashLists() {
  return (
    <FlashListStack.Navigator
      initialRouteName="ListOfLists"
      screenOptions={{
        headerTitleStyle: { fontFamily: "SemiBold", color: THEME.font },
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
