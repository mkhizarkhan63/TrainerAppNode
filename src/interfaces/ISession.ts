import SessionModel from "../models/SessionsModel";

export interface ISessionAttributes {

    Id?: number;
    title: string;
    scheduledDate: string;
    scheduledTime: string;
    activityId: number;
    totalCapacity: number;
    location: locationType;
    address: string;
    classType: string;
    description: string;
    price: string;
    link: string;
    TypeId: number;
    ClientId: number | null;
    TrainerId: number | null;
}


export type locationType = {
    lat: number;
    longt: number;
    locationName: string;
}

export type SessionRequest = {
    Id?: number;
    title: string;
    scheduledDate: string;
    scheduledTime: string;
    activityId: number;
    totalCapacity: number;
    location: locationType;
    address: string;
    classType: string;
    description: string;
    price: string;
    link: string;
    TypeId: number;
    ClientId: number;
    TrainerId: number;
}

export type SessionResponseDTO = {
    Sessions: SessionModel[]

};