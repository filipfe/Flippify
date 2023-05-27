import { NavigationProp } from "@react-navigation/native";
import { Category } from "./general";
import { User } from "./auth";
import { Dispatch, SetStateAction } from 'react'

export type Note = {
    id: number;
    title: string;
    desc: string;
    image: string // deprecated
    images: string[];
    thumbnail: string;
    created_at: string;
    category?: string;
    likes?: number;
    is_liked?: boolean;
    user: User
}
  

export type Filter = {
    category: string
}

export type NoteStackParams = {
    NoteList: { category_id?: number, q?: string };
    Note: { id: number, title: string };
    AddNote: undefined;
    NoteSearch: undefined;
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

export type ImageFile = {
  uri: string;
  name: string;
  type: string;
};

export type NoteAddButtonProps = {
  setImages: Dispatch<SetStateAction<ImageFile[]>>;
}