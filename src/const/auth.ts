import { Auth, Tokens, User } from "../types/auth";

export const initialUserState: User = {
    id: 0,
    username: '',
    is_staff: false,
    profile_picture: '',
    is_premium: false,
    level: {
        current_level: 0,
        points: 0,
        points_required: 1
    }
}

export const initialTokensState: Tokens = {
    access: '',
    refresh: ''
}

export const initialAuthState: Auth = {
    isLogged: false,
    user: initialUserState,
    tokens: initialTokensState
}

export interface LoginData {
    email: string;
    password: string;
}

export interface SignUpData extends LoginData {
    username: string;
}