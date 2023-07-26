import { Auth, User } from "../types/auth";

export const initialUserState: User = {
    id: '',
    username: '',
    is_premium: false,
    avatar_url: ''
}

export const initialAuthState: Auth = {
    isLogged: false,
    user: initialUserState,
    level: {
        current_level: 0,
        points: 0,
        points_required: 1
    }
}

export interface LoginData {
    email: string;
    password: string;
}