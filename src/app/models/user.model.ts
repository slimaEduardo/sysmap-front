export interface User{
    id: number
    name: string
    userName: string
    password: string
    userProfile: UserProfile
}

export enum UserProfile{
    ADMIN = 1,
    USER = 0
}

export interface UserNew{
    id: number
    name: string
    userName: string
    password: string
    profileId: number
}

export class UserLogin{

    userName: string
    password: string
}

export interface LocalUser {
    token: string;
    userName: string
} 