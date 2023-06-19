import { AddedNote, Note } from "../types/notes";
import { initialUserState } from "./auth";

export const initialNote: Note = {
    id: -1,
    title: '',
    desc: '',
    image: '',
    images: [],
    category: '',
    created_at: '',
    like_count: 0,
    is_liked: false,
    user: initialUserState
}

export const initialAddedNote: AddedNote = {
    title: '',
    desc: '',
    images: [],
    created_at: '',
    user: initialUserState,
    is_public: true,
    category: {
        id: -1,
        name: '',
        icon: ''
    }
}