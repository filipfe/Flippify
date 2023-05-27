import { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  initialNewCard,
  NewCardContext,
} from "../../../providers/NewCardProvider";
import { AddedFlashCard } from "../../../types/flashcards";
import { AddCardStackParams } from "../../../types/navigation";
import QuestionsForm from "./components/QuestionsForm";
import CardForm from "./components/CardForm";

const AddCardStack = createNativeStackNavigator<AddCardStackParams>();

export default function AddCard() {
  const [newCard, setNewCard] = useState<AddedFlashCard>(initialNewCard);

  return (
    <NewCardContext.Provider value={{ newCard, setNewCard }}>
      <AddCardStack.Navigator
        initialRouteName="CardForm"
        screenOptions={{
          headerTitleStyle: { fontFamily: "Bold" },
        }}
      >
        <AddCardStack.Screen
          name="CardForm"
          component={CardForm}
          options={{
            headerTitle: "Dodaj fiszkę",
          }}
        />
        <AddCardStack.Screen
          name="QuestionsForm"
          component={QuestionsForm}
          options={{
            title: "Konstruuj pytanie",
          }}
        />
      </AddCardStack.Navigator>
    </NewCardContext.Provider>
  );
}
