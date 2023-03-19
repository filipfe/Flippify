import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddCard from "../components/flashcards/AddCard";
import CategoryList, {
  CategoryProps,
} from "../components/flashcards/CategoryList";
import FlashCardsGenerator from "../components/flashcards/FlashCardsGenerator";
import TopicList, { TopicProps } from "../components/flashcards/TopicList";

export type CategoryStackParams = {
  CategoryList: undefined;
  AddCard: undefined;
  TopicList: { category: CategoryProps };
  FlashCardsGenerator: {
    category: CategoryProps;
    topic: TopicProps;
  };
};

const CategoryStack = createNativeStackNavigator<CategoryStackParams>();

export default function FlashCardsScreen() {
  return (
    <CategoryStack.Navigator
      initialRouteName="CategoryList"
      screenOptions={{
        headerTitleStyle: { fontFamily: "Bold" },
      }}
    >
      <CategoryStack.Screen
        name="CategoryList"
        component={CategoryList}
        options={{ title: "Wybierz kategorię" }}
      />
      <CategoryStack.Screen
        name="AddCard"
        component={AddCard}
        options={{ title: "Dodaj fiszkę", headerShown: false }}
      />
      <CategoryStack.Screen
        name="TopicList"
        component={TopicList}
        options={({ route }) => ({
          title: "Tematy w kategorii " + route.params.category.name,
        })}
      />
      <CategoryStack.Screen
        name="FlashCardsGenerator"
        component={FlashCardsGenerator}
        options={({ route }) => {
          return { title: "Fiszki " + route.params.topic.name };
        }}
      />
    </CategoryStack.Navigator>
  );
}
