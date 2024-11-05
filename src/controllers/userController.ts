import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/responseUtils";
import { createUserSpecializationQuery } from "../services/specializationService";
import { createUserPersonalTrainingServiceQuery } from "../services/personalTrainingService";

export const createUserSpecialization = async (req: Request, res: Response): Promise<void> => {

    try {
        const { trainerId, clientId, typeId, specializationIds } = req.body;
        const { data, message } = await createUserSpecializationQuery(trainerId, clientId, typeId, specializationIds);
        res.json(successResponse(message, 200, data));
    }
    catch (error) {
        res.json(errorResponse("Internal Server Error", 500, error));
    }
}


export const createUserPersonalTraining = async (req: Request, res: Response): Promise<void> => {

    try {
        const { trainerId, clientId, typeId, personalTrainingServiceIds } = req.body;
        const { data, message } = await createUserPersonalTrainingServiceQuery(trainerId, clientId, typeId, personalTrainingServiceIds);
        res.json(successResponse(message, 200, data));
    }
    catch (error) {
        res.json(errorResponse("Internal Server Error", 500, error));
    }
}
