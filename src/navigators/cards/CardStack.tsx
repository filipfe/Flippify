import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CategoryList from "../../screens/cards/CategoryList";
import FlashCardsGenerator from "../../screens/CardsGeneratorScreen";
import TopicList from "../../screens/cards/TopicList";
import Header from "../../components/header/Header";
import HeaderMenu from "../../components/header/HeaderMenu";
import OwnFlashCardsScreen from "../../screens/cards/OwnFlashCardsScreen";
import { CardStackParams } from "../../types/navigation";

const CardStackNav = createNativeStackNavigator<CardStackParams>();

export default function CardStack() {
  return (
    <CardStackNav.Navigator
      initialRouteName="CategoryList"
      screenOptions={{
        headerShadowVisible: false,
        header: (props) => <Header {...props} />,
      }}
    >
      <CardStackNav.Screen
        name="CategoryList"
        component={CategoryList}
        options={{ title: "Wybierz kategorię" }}
      />
      <CardStackNav.Screen
        name="TopicList"
        component={TopicList}
        options={({ route }) => ({
          title: "Tematy w kategorii " + route.params.category.name,
        })}
      />
      <CardStackNav.Screen
        name="OwnFlashCards"
        component={OwnFlashCardsScreen}
        options={{
          title: "Dodane fiszki",
          headerRight: () => <HeaderMenu route="OwnFlashCards" />,
        }}
      />
    </CardStackNav.Navigator>
  );
}
