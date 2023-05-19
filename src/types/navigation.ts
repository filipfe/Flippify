import { NavigationProp, RouteProp } from "@react-navigation/native";
import { Topic } from "./flashcards";
import { Category } from "./general";

// FLASHCARDS

export type CategoryStackParams = {
  CategoryList: undefined;
  AddCard: undefined;
  TopicList: { category: Category };
  FlashCardsGenerator: {
    category: Category;
    topic: Topic;
  };
};

export type CategoryNavigationProps = NavigationProp<
CategoryStackParams,
"CategoryList"
>;

export type GeneratorRouteProps = RouteProp<
  CategoryStackParams,
  "FlashCardsGenerator"
>;

export type AddCardStackParams = {
  CardForm: undefined;
  QuestionsForm: undefined;
};

export type TopicListNavigationProp = NavigationProp<CategoryStackParams, "TopicList">;
export type TopicListRouteProp = RouteProp<CategoryStackParams, "TopicList">;

// PROFILE

export type ProfileStackParams = {
    ProfileStack: undefined;
    OwnFlashCards: undefined;
    FlashLists: undefined;
  };

export type ProfileNavigation = NavigationProp<ProfileStackParams, "ProfileStack">;