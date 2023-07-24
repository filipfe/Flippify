import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Note from "../components/notes/NoteDetails";
import NoteList from "../components/notes/NoteList";
import HeaderMenu from "../components/header/HeaderMenu";
import Header from "../components/header/Header";
import { initialCategory } from "../const/flashcards";
import OwnNotesScreen from "./notes/OwnNotesScreen";
import { NoteStackParams } from "../types/navigation";

const NoteStack = createNativeStackNavigator<NoteStackParams>();

export default function NotesScreen() {
  return (
    <NoteStack.Navigator
      initialRouteName="NoteList"
      screenOptions={{
        header: (props) => <Header {...props} />,
      }}
    >
      <NoteStack.Screen
        name="NoteList"
        component={NoteList}
        initialParams={{ search: "", category: initialCategory }}
        options={{
          title: "Notatki",
          headerRight: () => <HeaderMenu route="NoteList" dataType="note" />,
        }}
      />
      <NoteStack.Screen
        name="Note"
        component={Note}
        options={({ route }) => ({
          title: "Notatka " + route.params.title,
          headerTransparent: true,
        })}
      />

      <NoteStack.Screen
        name="OwnNotes"
        component={OwnNotesScreen}
        options={{
          title: "Moje notatki",
          headerRight: () => <HeaderMenu route="OwnNotes" dataType="note" />,
        }}
      />
    </NoteStack.Navigator>
  );
}
