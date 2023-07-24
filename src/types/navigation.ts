import { NavigationProp, NavigatorScreenParams, RouteProp } from "@react-navigation/native";
import { AddedFlashCard, FlashList, Topic } from "./flashcards";
import { Category } from "./general";
import { AddedNote, Filter } from "./notes";

export type RootTabParams = {
  Home: undefined;
  FlashCards: NavigatorScreenParams<FlashCardsStackParams>;
  Notes: NavigatorScreenParams<NoteStackParams>;
  Profile: NavigatorScreenParams<ProfileStackParams>;
  AddCard: AddedFlashCard | undefined;
  AddNote: AddedNote | undefined;
};

// FLASHCARDS

export type FlashCardsStackParams = {
  CategoryList: undefined;
  TopicList: { category: Category };
  FlashCardsGenerator: {
    category: Category;
    topic?: Topic;
  };
  OwnFlashCards: Filter;
  OwnFlashLists: undefined;
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

// NOTES

export type NoteStackParams = {
  NoteList: Filter;
  Note: { id: number, title: string };
  OwnNotes: Filter;
  
};

export type NoteRefNavigationProp = NavigationProp<NoteStackParams, "NoteList">;

// PROFILE

export type ProfileStackParams = {
    Profile: undefined;
    EditProfile: undefined;
    Settings: undefined;
  };

export type ProfileNavigation = NavigationProp<ProfileStackParams, "Profile">;


// OTHER 

export type DataType = "note" | "card"

export type FilterComponentProps = {
  route: keyof NoteStackParams | keyof FlashCardsStackParams;
  dataType: DataType
};

export type SearchComponentProps = {

}