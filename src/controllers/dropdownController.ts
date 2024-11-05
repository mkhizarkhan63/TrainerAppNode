import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/responseUtils";
import { getAllLanguagesQuery } from "../services/languageService";
import { getAllGendersQuery } from "../services/genderService";

export const getAllLanguages = async (req: Request, res: Response): Promise<void> => {

    try {
        const { data, message } = await getAllLanguagesQuery();
        res.json(successResponse(message, 200, data));
        return;

    } catch (error) {
        res.json(errorResponse("Internal Server Error", 500, error));
    }

};

export const getAllGenders = async (req: Request, res: Response): Promise<void> => {
    try {
        const { data, message } = await getAllGendersQuery();
        res.json(successResponse(message, 200, data));
        return;

    } catch (error) {
        res.json(errorResponse("Internal Server Error", 500, error));
    }
}

