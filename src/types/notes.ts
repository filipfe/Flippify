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
    created_at: string;
    category?: string;
    like_count?: number;
    is_liked?: boolean;
    user: User
}
  

export type Filter = {
    category: string
    search: string
}

export type NoteStackParams = {
    NoteList: { category_id?: number, search?: string };
    Note: { id: number, title: string };
    AddNote: undefined;
  };

export type NoteRefNavigationProp = NavigationProp<NoteStackParams, "NoteList">;

export type AddedNote = Omit<Note, "image" | "images" | "likes" | "id" | "category" | "is_liked"> & {
  images: ImageFile[];
  privacy: "private" | "public";
  category: Omit<Category, "image">;
};

export type ImageFile = {
  uri: string;
  name: string;
  type: string;
};

export type NoteAddButtonProps = {
  addNewImage: (image: ImageFile) => void
}