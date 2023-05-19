import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AddNote from "../components/notes/AddNote";
import Note from "../components/notes/NoteDetails";
import NoteList from "../components/notes/NoteList";
import { NoteStackParams } from "../types/notes";

const NoteStack = createNativeStackNavigator<NoteStackParams>();

export default function NotesScreen() {
  return (
    <NoteStack.Navigator
      initialRouteName="NoteList"
      screenOptions={{
        headerTitleStyle: { fontFamily: "Bold" },
      }}
    >
      <NoteStack.Screen
        name="NoteList"
        component={NoteList}
        options={{
          title: "Notatki",
        }}
      />
      <NoteStack.Screen
        name="Note"
        component={Note}
        options={({ route }) => {
          return { title: route.params.title };
        }}
      />
      <NoteStack.Screen
        name="AddNote"
        component={AddNote}
        options={{ title: "Dodaj notatkę" }}
      />
    </NoteStack.Navigator>
  );
}
