import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/responseUtils";
import { CreateOrUpdateClientProfileQuery, CreateOrUpdateTrainerProfileQuery, getClientProfileData, getTrainerProfileData } from "../services/profileService";
import { ITrainerProfileDTO, IClientProfileDTO } from "../interfaces/IProfile";


type FileField = Express.Multer.File[] | { [fieldname: string]: Express.Multer.File[] } | undefined;

// Extend the Express Request interface to include the custom `files` property
interface RequestWithFiles extends Request {
    files?: FileField; // Use the union type for files
}

//#region  Trainer
export const getTrainerProfileByTrainerId = async (req: Request, res: Response): Promise<void> => {

    try {
        const { trainerId } = req.body;
        const data = await getTrainerProfileData(trainerId);

        res.json(successResponse("message", 200, data));
    }
    catch (error) {
        res.json(errorResponse("Internal Server Error", 500, error));
    }
}

export const createOrUpdateTrainerProfile = async (req: RequestWithFiles, res: Response) => {
    try {

        const trainerProfileCreate: ITrainerProfileDTO = {
            Id: parseInt(req.body.Id),
            FirstName: req.body.firstName,
            LastName: req.body.lastName,
            MobileNumber: req.body.mobileNumber,
            DoB: req.body.DoB,
            location: req.body.location,
            Nationality: req.body.nationality,
            CountryResidence: req.body.countryResidence,
            GenderId: req.body.genderId,
            Description: req.body.description,
            TypeId: req.body.typeId,
            PersonalTrainingservices: req.body.personalTrainingServicesIds,
            Specializations: req.body.specializationsIds,
            Languages: req.body.languagesIds,
            SocialLinks: req.body.socialLinks
        }
        const profilePicture = req.files && typeof req.files === 'object' && 'profilePictures' in req.files
            ? req.files['profilePictures'][0]
            : null;
        const profilePicturePath = profilePicture ? `${process.env.SERVER_URL}${profilePicture.path}` : null;

        trainerProfileCreate.profilePicture = profilePicturePath ? profilePicturePath : undefined;

        const result = await CreateOrUpdateTrainerProfileQuery(trainerProfileCreate);
        if (result) {

            const data = await getTrainerProfileData(parseInt(req.body.Id));
            res.json(successResponse("Updated Successfully", 200, data));
        }
        else
            res.json(successResponse("Not Updated", 400));
    }
    catch (error) {
        res.json(errorResponse("Internal Server Error", 500, error));
    }
}

//#endregion

//#region  Client

export const getClientProfileByClientId = async (req: Request, res: Response) => {
    try {
        const { clientId } = req.body;
        const data = await getClientProfileData(clientId);

        res.json(successResponse("message", 200, data));
    }
    catch (error) {
        res.json(errorResponse("Internal Server Error", 500, error));
    }
}

export const createOrUpdateClientProfile = async (req: RequestWithFiles, res: Response) => {
    try {
        const clientProfileObj: IClientProfileDTO = {
            Id: parseInt(req.body.Id),
            FirstName: req.body.firstName,
            LastName: req.body.lastName,
            MobileNumber: req.body.mobileNumber,
            DoB: req.body.DoB,
            location: req.body.location,
            Nationality: req.body.nationality,
            CountryResidence: req.body.countryResidence,
            GenderId: req.body.genderId,
            Description: req.body.description,
            TypeId: req.body.typeId,
            PersonalTrainingservices: req.body.personalTrainingServicesIds,
            Specializations: req.body.specializationsIds,
        }
        const profilePicture = req.files && typeof req.files === 'object' && 'profilePictures' in req.files
            ? req.files['profilePictures'][0]
            : null;
        const profilePicturePath = profilePicture ? `${process.env.SERVER_URL}${profilePicture.path}` : null;

        clientProfileObj.profilePicture = profilePicturePath ? profilePicturePath : undefined;
        const result = await CreateOrUpdateClientProfileQuery(clientProfileObj);
        if (result) {

            const data = await getClientProfileData(parseInt(req.body.Id));
            res.json(successResponse("Updated Successfully", 200, data));
        }
        else
            res.json(successResponse("Not Updated", 400));
    }
    catch (error) {
        res.json(errorResponse("Internal Server Error", 500, error));
    }
}

//#endregion
