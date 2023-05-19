import { Auth, Tokens, User } from "../types/auth";

export const initialUserState: User = {
    id: -1,
    username: '',
    is_staff: false
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