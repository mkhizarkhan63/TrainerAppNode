
import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/responseUtils";
import { createUserSpecializationQuery, getAllSpecializationQuery, getSpecializationByIdQuery } from "../services/specializationService";



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
