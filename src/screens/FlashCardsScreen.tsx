import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddCard from "../components/flashcards/add-card/AddCard";
import CategoryList from "../components/flashcards/categories/CategoryList";
import FlashCardsGenerator from "../components/flashcards/FlashCardsGenerator";
import TopicList from "../components/flashcards/topics/TopicList";
import { FlashCardsStackParams } from "../types/navigation";
import HeaderTitle from "../components/HeaderTitle";
import Header from "../components/Header";

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
        options={{ title: "Wybierz kategorię", headerTitle: HeaderTitle }}
      />
      <FlashCardsStack.Screen
        name="AddCard"
        component={AddCard}
        options={{ title: "Nowa fiszka", headerTitle: HeaderTitle }}
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
          title: route.params.topic,
        })}
      />
    </FlashCardsStack.Navigator>
  );
}
