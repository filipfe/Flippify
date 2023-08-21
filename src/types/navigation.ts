import { NavigationProp, NavigatorScreenParams, RouteProp } from "@react-navigation/native";
import { AddedFlashCard, FlashList, Topic } from "./flashcards";
import { Category, Filter } from "./general";

export type RootStackParams = {
  RootTab: NavigatorScreenParams<RootTabParams>;
  CardsGenerator: {
    list?: Omit<FlashList, 'cards'>
    category?: Category;
    topic?: Topic;
  };
  ListDetailsScreen: Omit<FlashList, 'cards'>
}

export type RootTabParams = {
  Home: undefined;
  Cards: NavigatorScreenParams<CardStackParams>;
  Lists: NavigatorScreenParams<ListStackParams>;
  Profile: NavigatorScreenParams<ProfileStackParams>;
  AddCard: AddedFlashCard | undefined;
};

// CARDS

export type CardStackParams = {
  CategoryList: undefined;
  TopicList: { category: Category };
  OwnFlashCards: Filter;
  OwnFlashLists: undefined;
};

export type CategoryNavigationProps = NavigationProp<
  CardStackParams,
  "CategoryList"
>;

export type GeneratorRouteProps = RouteProp<
  RootStackParams,
  "CardsGenerator"
>;

export type AddCardStackParams = {
  CardForm: undefined;
  QuestionsForm: undefined;
};

export type QuestionsFormNavigationProp = NavigationProp<
  AddCardStackParams,
  "QuestionsForm"
>;

export type CardFormNavigationProp = NavigationProp<AddCardStackParams, "CardForm">;

// LISTS 

export type ListStackParams = {
  ListScreen: undefined;
  
}


// PROFILE

export type ProfileStackParams = {
    ProfileScreen: undefined;
    Settings: undefined;
    Notifications: undefined;
  };


// OTHER 

export type FilterComponentProps = {
  route: keyof CardStackParams | keyof ListStackParams;
};