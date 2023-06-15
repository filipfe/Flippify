import { NavigationProp, NavigatorScreenParams, RouteProp } from "@react-navigation/native";
import { FlashList, Topic } from "./flashcards";
import { Category } from "./general";
import { NoteStackParams } from "./notes";

export type RootTabParams = {
  Home: undefined;
  FlashCards: NavigatorScreenParams<FlashCardsStackParams>;
  Notes: NavigatorScreenParams<NoteStackParams>;
  Profile: NavigatorScreenParams<ProfileStackParams>;
};

// FLASHCARDS

export type FlashCardsStackParams = {
  CategoryList: undefined;
  AddCard: undefined;
  TopicList: { category: Category };
  FlashCardsGenerator: {
    category: Category;
    topic: Topic;
  };
};

export type CategoryNavigationProps = NavigationProp<
  FlashCardsStackParams,
  "CategoryList"
>;

export type GeneratorRouteProps = RouteProp<
  FlashCardsStackParams,
  "FlashCardsGenerator"
>;


export type TopicListNavigationProp = NavigationProp<FlashCardsStackParams, "TopicList">;
export type TopicListRouteProp = RouteProp<FlashCardsStackParams, "TopicList">;

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

// PROFILE

export type ProfileStackParams = {
    ProfileStack: undefined;
    OwnFlashCards: undefined;
    FlashLists: undefined;
  };

export type ProfileNavigation = NavigationProp<ProfileStackParams, "ProfileStack">;