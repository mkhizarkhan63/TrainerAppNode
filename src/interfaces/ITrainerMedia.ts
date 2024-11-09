import TrainerMediaModel from "../models/TranierMediaModel";
import { MediaType } from "../utils/enums";


export interface ITrainerMediaAttributes {
    Id?: number,
    TrainerId: number,
    Path: string,
    MediaType: number
}




export interface ITrainerMediaFileRequest {
    trainerId: number,
    emailAddress: string,
    pictures?: string,
    videos: string,
    audios: string,
    mediaType: MediaType
}

export interface ITrainerMediaFileResponse {
    trainerId: number,
    trainerMedia: TrainerMediaModel[]
}