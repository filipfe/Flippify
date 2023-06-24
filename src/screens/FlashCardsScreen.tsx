import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CategoryList from "../components/flashcards/categories/CategoryList";
import FlashCardsGenerator from "../components/flashcards/FlashCardsGenerator";
import TopicList from "../components/flashcards/topics/TopicList";
import { FlashCardsStackParams } from "../types/navigation";
import Header from "../components/header/Header";
import OwnFlashCardsScreen from "./flashcards/OwnFlashCardsScreen";
import OwnFlashListsScreen from "./flashcards/OwnFlashListsScreen";
import HeaderMenu from "../components/header/HeaderMenu";

const FlashCardsStack = createNativeStackNavigator<FlashCardsStackParams>();

export default function FlashCardsScreen() {
  return (
    <FlashCardsStack.Navigator
      initialRouteName="CategoryList"
      screenOptions={{
        headerShadowVisible: false,
        header: (props) => <Header {...props} />,
      }}
    >
      <FlashCardsStack.Screen
        name="CategoryList"
        component={CategoryList}
        options={{ title: "Wybierz kategorię" }}
      />

      <FlashCardsStack.Screen
        name="TopicList"
        component={TopicList}
        options={({ route }) => ({
          title: "Tematy w kategorii " + route.params.category.name,
        })}
      />
      <FlashCardsStack.Screen
        name="FlashCardsGenerator"
        component={FlashCardsGenerator}
        options={({ route }) => ({
          title: route.params.topic?.name || route.params.category.name,
        })}
      />
      <FlashCardsStack.Screen
        name="OwnFlashCards"
        component={OwnFlashCardsScreen}
        options={{
          title: "Dodane fiszki",
          headerRight: () => (
            <HeaderMenu route="OwnFlashCards" dataType="card" />
          ),
        }}
      />
      <FlashCardsStack.Screen
        name="OwnFlashLists"
        component={OwnFlashListsScreen}
        options={{
          title: "Moje FiszkoListy",
          headerShown: false,
        }}
      />
    </FlashCardsStack.Navigator>
  );
}
