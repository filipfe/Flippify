import { Note } from "../types/notes";
import { initialUserState } from "./auth";

export const initialNote: Note = {
    id: -1,
    title: '',
    desc: '',
    image: '',
    category: '',
    created_at: '',
    likes: 0,
    is_liked: false,
    user: initialUserState
}