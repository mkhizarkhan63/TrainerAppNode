
import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/responseUtils";
import { getAllSpecializationQuery, getSpecializationByIdQuery } from "../services/specializationService";
import { getAllPersonalTrainingServiceQuery, getPersonalTrainingServiceByIdQuery } from "../services/personalTrainingService";


export const getAllSpecialization = async (req: Request, res: Response): Promise<void> => {

    try {
        const { data, message } = await getAllSpecializationQuery();
        res.json(successResponse(message, 200, data));
    }
    catch (error) {
        res.json(errorResponse("Internal Server Error", 500, error));
    }
}


export const getSpecializationById = async (req: Request, res: Response): Promise<void> => {

    try {
        const Id = parseInt(req.body.Id);
        const { data, message } = await getSpecializationByIdQuery(Id);
        res.json(successResponse(message, 200, data));
    }
    catch (error) {
        res.json(errorResponse("Internal Server Error", 500, error));
    }
}


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