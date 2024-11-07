
import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/responseUtils";
import { createUserPersonalTrainingServiceQuery, getAllPersonalTrainingServiceQuery, getPersonalTrainingServiceByIdQuery } from "../services/personalTrainingService";



export const getPersonalTrainerServiceById = async (req: Request, res: Response): Promise<void> => {

    try {
        const Id = parseInt(req.body.Id);
        const { data, message } = await getPersonalTrainingServiceByIdQuery(Id);
        res.json(successResponse(message, 200, data));
    }
    catch (error) {
        res.json(errorResponse("Internal Server Error", 500, error));
    }
}

export const getAllPersonalTrainingServices = async (req: Request, res: Response): Promise<void> => {

    try {
        const { data, message } = await getAllPersonalTrainingServiceQuery();
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