import { Category } from "./general";
import { User } from "./auth";
import { Dispatch, SetStateAction } from 'react'
import { FlashCardType, Topic } from "./flashcards";
import { FlashCardContextType } from "../context/FlashCardContext";

export type Note = {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    images: string[];
    created_at: string;
    category: Category;
    like_count?: number;
    is_liked?: boolean;
    user: User
}
  

export type NoteFilter = {
    category: Category,
    search: string
}

export type Filter = {
  topic: Topic,
    type: FlashCardType | undefined,
} & NoteFilter

export type AddedNote = Omit<Note, "images" | "likes" | "is_liked"> & {
  images: ImageFile[];
  is_public: boolean;
};

export type ImageFile = {
  uri: string;
  name: string;
  type: string;
};

export type NoteAddButtonProps = {
  size?: number,
  addNewImage: (image: ImageFile) => void
}

export type ImageHandlerProps = { 
  initialIndex?: number; 
  images: ImageFile[], 
  setActiveIndex: Dispatch<SetStateAction<number>>
};

export type ImageListProps = {
  setImageListActive: Dispatch<SetStateAction<boolean>>
}

export type ImageRefProps = {
  chosen: string;
  setChosen: Dispatch<SetStateAction<string>>
}


export type OwnNote = Omit<AddedNote, "images"> & { images: string[] }