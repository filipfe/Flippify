import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AddNote from "../components/notes/AddNote";
import Note from "../components/notes/NoteDetails";
import NoteList from "../components/notes/NoteList";
import { NoteStackParams } from "../types/notes";
import { THEME } from "../const/theme";
import NoteSearch from "../components/notes/search/NoteSearch";
import HeaderMenu from "../components/notes/HeaderMenu";

const NoteStack = createNativeStackNavigator<NoteStackParams>();

export default function NotesScreen() {
  return (
    <NoteStack.Navigator
      initialRouteName="NoteList"
      screenOptions={{
        headerTitleStyle: { fontFamily: "SemiBold", color: THEME.font },
      }}
    >
      <NoteStack.Screen
        name="NoteList"
        component={NoteList}
        options={{
          title: "Notatki",
          headerShadowVisible: false,
          headerRight: HeaderMenu,
        }}
      />
      <NoteStack.Screen
        name="Note"
        component={Note}
        options={({ route }) => {
          return {
            title: "Notatka " + route.params.title,
            headerTitleStyle: { fontFamily: "SemiBold", color: THEME.font },
            headerTransparent: true,
            headerStyle: {
              backgroundColor: "#FFFFFF",
            },
          };
        }}
      />
      <NoteStack.Screen
        name="NoteSearch"
        component={NoteSearch}
        options={{
          title: "Wyszukaj notatkę",
          headerShadowVisible: false,
        }}
      />
      <NoteStack.Screen
        name="AddNote"
        component={AddNote}
        options={{ title: "Dodaj notatkę", headerTransparent: true }}
      />
    </NoteStack.Navigator>
  );
}
