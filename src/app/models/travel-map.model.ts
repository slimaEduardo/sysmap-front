import { Time } from "@angular/common";
import { Company } from "./company.model";
import { Destiny } from "./destiny.model";

export interface TravelMap{
    id: number
    company: Company
    boardingDate: Date
    boardingTime: Time
    destiny: Destiny
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
    isActive: boolean
}