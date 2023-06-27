import { AddedNote, Filter, ImageFile, Note } from "../types/notes";
import { initialUserState } from "./auth";
import { initialCategory, initialTopic } from "./flashcards";

export const initialNote: Note = {
    id:0,
    title: '',
    description: '',
    thumbnail: '',
    images: [],
    category: initialCategory,
    created_at: '',
    like_count: 0,
    is_liked: false,
    user: initialUserState
}

export const initialAddedNote: AddedNote = {
    id: 0,
    title: '',
    description: '',
    thumbnail: '',
    images: [],
    created_at: '',
    user: initialUserState,
    is_public: true,
    category: initialCategory
}

export const initialFilter: Filter = {
    search: '',
    category: initialCategory,
    topic: initialTopic,
    type: undefined
}

export const initialImageFile: ImageFile = {
    uri: '',
    name: '',
    type: ''
}