import ClientModel from "../models/ClientModel";

export interface IReviewAttributes {

    Id?: number,
    ClientId: number,
    TrainerId: number,
    Ratings: number,
    Reviews: string,
    CreatedOn?: Date;
    UpdatedOn?: Date;

}


export interface IReviewRequest {
    ClientId: number,
    TrainerId: number,
    Ratings: number,
    Reviews: string,
}


export type Client = {
    Id: number,
    FirstName: string,
    LastName: string
}

export interface IReviewResponse {
    TrainerId: number,
    Ratings: number,
    Reviews: string,
    Client: Client,
    CreatedAt?: Date;

}