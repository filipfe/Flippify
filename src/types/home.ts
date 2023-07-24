import { User } from "./auth";
import { FlashList, Topic } from "./flashcards";
import { Category } from "./general";
import { Note } from "./notes";

export interface Stat {
    name: string;
    title: string;
    value: number;
    sufix: string;
}

export type ProposedUser = User & {
    notes: Note[]
}

export type FavouriteCategory = {
    category: Category;
    topic?: Topic;
};

export type InProgress = {
    flashlist: FlashList;
    current_value: number;
    end_value: number;
}