export type User = {
    id: string;
} & Profile;

export type Auth = {
    isLogged: boolean,
    user: User,
    level: Level;
}

export type Level = {
    current_level: number,
    points_required: number,
    points: number
}

export type Profile = {
    username: string,
    avatar_url: string,
    is_premium: boolean,
}