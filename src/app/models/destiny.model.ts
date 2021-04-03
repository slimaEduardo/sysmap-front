export interface Destiny{
    id: number
    name: string
    distance: number
    category: TypeLine
}

export interface DestinyNew{
    id: number
    name: string
    distance: number
    categoryId: number
}

export interface TypeLine{
    id: number
    name: string
}