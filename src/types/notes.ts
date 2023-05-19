import { NavigationProp } from "@react-navigation/native";
import { Category } from "./general";

export type Note = {
    id: number;
    title: string;
    desc: string;
    image: string;
    category?: string;
    likes?: number;
    is_liked?: boolean;
}
  

export type Filter = {
    category: string
}

export type NoteStackParams = {
    NoteList: undefined;
    Note: Note;
    AddNote: undefined;
  };

export type NoteRefNavigationProp = NavigationProp<NoteStackParams, "NoteList">;

export type AddedNoteProps = Omit<Note, "image" | "likes" | "id" | "category" | "is_liked"> & {
  image: {
    uri: string;
    name: string;
    type: string;
  };
  category: Omit<Category, "image">;
};