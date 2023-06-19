export type User = {
    id: number,
    username: string,
    profile_picture: string,
    is_staff: boolean,
    is_premium: boolean,
    level: number
}

export type Tokens = {
    access: string,
    refresh: string
}

export type Auth = {
    isLogged: boolean,
    user: User,
    tokens: Tokens
}