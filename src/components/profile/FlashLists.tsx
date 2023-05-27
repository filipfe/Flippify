import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListOfLists from "../flashlists/ListOfLists";
import AddFlashList from "../flashlists/AddFlashList";
import FlashListDetails from "../flashlists/FlashListDetails";
import { FlashList } from "../../types/flashcards";
import { THEME } from "../../const/theme";

export type FlashListStackParams = {
  ListOfLists: undefined;
  AddFlashList: undefined;
  FlashList: FlashList;
};

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
          title: "Dodaj fiszkolistę",
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
