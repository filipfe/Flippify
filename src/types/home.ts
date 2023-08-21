import { FlashList, Topic } from "./flashcards";
import { Category } from "./general";

export interface Stat {
    name: string;
    title: string;
    value: number;
    sufix: string;
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

export type HomeData = {
    stats: Stat[];
}