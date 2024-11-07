import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/responseUtils";
import { CreateOrUpdateTrainerProfileQuery, getTrainerProfileData } from "../services/profileService";
import { ITrainerProfileCreate } from "../interfaces/IProfile";




export const getTrainerProfile = async (req: Request, res: Response): Promise<void> => {

    try {
        const { trainerId } = req.body;
        const data = await getTrainerProfileData(trainerId);

        res.json(successResponse("message", 200, data));
    }
    catch (error) {
        res.json(errorResponse("Internal Server Error", 500, error));
    }
}

export const createTrainerProfile = async (req: Request, res: Response) => {
    try {

        const trainerProfileCreate: ITrainerProfileCreate = {
            Id: req.body.id,
            FirstName: req.body.firstName,
            LastName: req.body.lastName,
            MobileNumber: req.body.mobileNumber,
            DoB: req.body.DoB,
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
        const result = await CreateOrUpdateTrainerProfileQuery(trainerProfileCreate);
        if (result) {

            const data = await getTrainerProfileData(req.body.id);
            res.json(successResponse("Updated Successfully", 200, data));
        }
        else
            res.json(successResponse("Not Updated", 400));
    }
    catch (error) {
        res.json(errorResponse("Internal Server Error", 500, error));
    }
}
