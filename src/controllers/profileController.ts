import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/responseUtils";
import { getTrainerProfileData } from "../services/profileService";




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
