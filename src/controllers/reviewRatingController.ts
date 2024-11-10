import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/responseUtils";
import { createRatingToTrainerByClientIdQuery, getAllRatingsByTrainerIdQuery } from "../services/reviewRatingService";
import { IReviewRequest } from "../interfaces/IReview";



export const createRatingToTrainer = async (req: Request, res: Response) => {
    const { ratings, reviews, clientId, trainerId } = req.body;
    try {
        const obj: IReviewRequest = {
            TrainerId: trainerId,
            ClientId: clientId,
            Ratings: ratings,
            Reviews: reviews
        }
        await createRatingToTrainerByClientIdQuery(obj);

        res.json(successResponse("Commented Successfully!", 200));
    }
    catch (error) {
        res.json(errorResponse("Internal Server Error", 500, error));
    }
}


export const getAllRatingsByTrainerId = async (req: Request, res: Response) => {
    try {
        const { trainerId } = req.body;

        const result = await getAllRatingsByTrainerIdQuery(trainerId);
        res.json(successResponse("", 200, result));

    } catch (error) {
        res.json(errorResponse("Internal Server Error", 500, error));
    }
}
