import { Auth, User } from "../types/auth";

export const initialUserState: User = {
    id: 0,
    username: '',
    is_staff: false,
    profile_picture: '',
    is_premium: false,
    level_id: 0
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