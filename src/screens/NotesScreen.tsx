import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext } from "react";
import AddNote from "../components/notes/add-note/AddNote";
import Note from "../components/notes/NoteDetails";
import NoteList from "../components/notes/NoteList";
import { NoteStackParams } from "../types/notes";
import HeaderMenu from "../components/notes/header/HeaderMenu";
import HeaderTitle from "../components/HeaderTitle";
import { ThemeContext } from "../context/ThemeContext";
import Header from "../components/Header";
import { initialCategory } from "../const/flashcards";
import OwnNotesScreen from "./notes/OwnNotesScreen";

const NoteStack = createNativeStackNavigator<NoteStackParams>();

export default function NotesScreen() {
  const { font, background } = useContext(ThemeContext);
  return (
    <NoteStack.Navigator
      initialRouteName="NoteList"
      screenOptions={{
        headerTitleStyle: { fontFamily: "SemiBold", color: font },
        headerStyle: { backgroundColor: background },
        header: (props) => <Header {...props} />,
      }}
    >
      <NoteStack.Screen
        name="NoteList"
        component={NoteList}
        initialParams={{ search: "", category: initialCategory }}
        options={{
          title: "Notatki",
          headerShadowVisible: false,
          headerTitle: HeaderTitle,
          headerRight: HeaderMenu,
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
        name="AddNote"
        component={AddNote}
        options={{ title: "Dodaj notatkę", headerTransparent: true }}
      />
      <NoteStack.Screen
        name="OwnNotes"
        component={OwnNotesScreen}
        options={{ title: "Moje notatki" }}
      />
    </NoteStack.Navigator>
  );
}
