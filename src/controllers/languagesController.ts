
import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/responseUtils";
import { deleteUserLanguagesByLanguageIdSingleQuery, getAllLanguagesQuery } from "../services/languageService";



export const getAllLanguages = async (req: Request, res: Response): Promise<void> => {

    try {
        const { data, message } = await getAllLanguagesQuery();
        res.json(successResponse(message, 200, data));
        return;

    } catch (error) {
        res.json(errorResponse("Internal Server Error", 500, error));
    }

};

export const deleteUserLanguageByLanguageId = async (req: Request, res: Response): Promise<void> => {

    try {
        const result = await deleteUserLanguagesByLanguageIdSingleQuery(Number(req.body.languageId));
        if (result)
            res.json(successResponse("Deleted Successfully!", 200, result));
        else
            res.json(successResponse("Failed to delete!", 400, result));
    }
    catch (error) {
        res.json(errorResponse("Internal Server Error", 500, error));
    }
}
