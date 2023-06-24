import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListOfLists from "../../components/flashcards/flashlists/ListOfLists";
import AddFlashList from "../../components/flashcards/flashlists/AddFlashList";
import FlashListDetails from "../../components/flashcards/flashlists/FlashListDetails";
import { FlashListStackParams } from "../../types/navigation";
import Header from "../../components/header/Header";

const FlashListStack = createNativeStackNavigator<FlashListStackParams>();

export default function OwnFlashListsScreen() {
  return (
    <FlashListStack.Navigator
      initialRouteName="ListOfLists"
      screenOptions={{
        header: (props) => <Header {...props} />,
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
        options={({ route }) => ({
          title: route.params.name,
        })}
      />
    </FlashListStack.Navigator>
  );
}
