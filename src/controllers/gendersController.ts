import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/responseUtils";
import { getAllGendersQuery } from "../services/genderService";



export const getAllGenders = async (req: Request, res: Response): Promise<void> => {
    try {
        const { data, message } = await getAllGendersQuery();
        res.json(successResponse(message, 200, data));
        return;

    } catch (error) {
        res.json(errorResponse("Internal Server Error", 500, error));
    }
}

