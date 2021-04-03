import { Time } from "@angular/common";

export interface TravelMap{
    id: number
    companyName: string
    boardingDate: Date
    boardingTime: Time
    destinyName: string,
    passQtt: number
    busCategory: BusCategory
}

export interface TravelMapNew{
    id: number
    companyId: number
    boardingDate: Date,
    boardingTime: Time,
    destinyId: number,
    passQtt: number,
    busId: number
}

export interface BusCategory{
    id: number
    name: string
}