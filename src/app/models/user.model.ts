export interface User{
    id: number
    name: string
    userName: string
    password: string
    userProfile: UserProfile
}

export enum UserProfile{
    ADMIN = 0,
    USER = 1
}

export interface UserNew{
    id: number
    name: string
    userName: string
    password: string
    profileId: number
}