import { Client, IReviewRequest, IReviewResponse } from "../interfaces/IReview";
import ClientModel from "../models/ClientModel";
import ReviewModel from "../models/ReviewsModel";
import { ResponseDTO } from "../utils/responseUtils";




export const createRatingToTrainerByClientIdQuery = async (_rating: IReviewRequest): Promise<ResponseDTO> => {
    try {
        const reviewModel = await ReviewModel.create({ ClientId: _rating.ClientId, TrainerId: _rating.TrainerId, Ratings: _rating.Ratings, Reviews: _rating.Reviews });
        return { data: reviewModel, message: '' }
    }
    catch (error: any) {
        throw new Error(error);
    }

}


export const getAllRatingsByTrainerIdQuery = async (_trainerId: number) => {
    try {

        const reviewModel = await ReviewModel.findAll({
            where: { TrainerId: _trainerId },
            // attributes: ["TrainerId", "CreatedAt", "Ratings", "Reviews"],
            include: [
                {
                    model: ClientModel,
                    as: "Client",
                    attributes: ["Id", "FirstName", "LastName"]
                }

            ]

        });

        const finalObj: IReviewResponse[] = [];


        for (const item of reviewModel) {
            let client: Client = {
                Id: item.Client.Id,
                FirstName: item.Client.FirstName,
                LastName: item.Client.LastName
            }
            const obj: IReviewResponse = {
                TrainerId: item.TrainerId,
                Ratings: item.Ratings,
                Reviews: item.Reviews,
                Client: client,
                CreatedAt: item.createdAt
            }
            finalObj.push(obj);
        }

        return finalObj;

    }
    catch (error: any) {
        throw new Error(error);
    }
}