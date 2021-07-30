export interface Destiny{
    id: number
    name: string
    distance: number
    category: TypeLine
    isActive: boolean
}

export interface DestinyNew{
    id: number
    name: string
    distance: number
    categoryId: number
    isActive: boolean
}

export interface TypeLine{
    id: number
    name: string
}