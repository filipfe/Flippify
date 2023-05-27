import { NavigationProp, RouteProp } from "@react-navigation/native";
import { FlashList, Topic } from "./flashcards";
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


export type TopicListNavigationProp = NavigationProp<CategoryStackParams, "TopicList">;
export type TopicListRouteProp = RouteProp<CategoryStackParams, "TopicList">;

export type AddCardStackParams = {
  CardForm: undefined;
  QuestionsForm: undefined;
};

export type QuestionsFormNavigationProp = NavigationProp<
  AddCardStackParams,
  "QuestionsForm"
>;

export type CardFormNavigationProp = NavigationProp<AddCardStackParams, "CardForm">;

export type FlashListStackParams = {
  ListOfLists: undefined;
  AddFlashList: undefined;
  FlashList: FlashList;
};

export type ListOfFlashCardListsNavigation = NavigationProp<
FlashListStackParams,
"ListOfLists"
>;

// PROFILE

export type ProfileStackParams = {
    ProfileStack: undefined;
    OwnFlashCards: undefined;
    FlashLists: undefined;
  };

export type ProfileNavigation = NavigationProp<ProfileStackParams, "ProfileStack">;