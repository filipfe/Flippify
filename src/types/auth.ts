export type User = {
    id: number,
    username: string,
    profile_picture: string,
    is_staff: boolean,
    is_premium: boolean,
    level_id: number;
}

export type Tokens = {
    access: string,
    refresh: string
}

export type Auth = {
    isLogged: boolean,
    user: User,
    level: Level;
    tokens: Tokens
}

export type Level = {
    current_level: number,
    points_required: number,
    points: number
}