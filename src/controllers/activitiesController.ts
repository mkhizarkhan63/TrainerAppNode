import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/responseUtils";
import { getAllActivitiesQuery } from "../services/activitiesService";




export const getAllActivities = async (req: Request, res: Response) => {
    try {
        const data = await getAllActivitiesQuery();
        res.json(successResponse("", 200, data));
    } catch (error) {
        res.json(errorResponse("Internal Server Error", 500, error));
    }
}
