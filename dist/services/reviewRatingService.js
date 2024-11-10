"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllRatingsByTrainerIdQuery = exports.createRatingToTrainerByClientIdQuery = void 0;
const ClientModel_1 = __importDefault(require("../models/ClientModel"));
const ReviewsModel_1 = __importDefault(require("../models/ReviewsModel"));
const createRatingToTrainerByClientIdQuery = async (_rating) => {
    try {
        const reviewModel = await ReviewsModel_1.default.create({ ClientId: _rating.ClientId, TrainerId: _rating.TrainerId, Ratings: _rating.Ratings, Reviews: _rating.Reviews });
        return { data: reviewModel, message: '' };
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.createRatingToTrainerByClientIdQuery = createRatingToTrainerByClientIdQuery;
const getAllRatingsByTrainerIdQuery = async (_trainerId) => {
    try {
        const reviewModel = await ReviewsModel_1.default.findAll({
            where: { TrainerId: _trainerId },
            // attributes: ["TrainerId", "CreatedAt", "Ratings", "Reviews"],
            include: [
                {
                    model: ClientModel_1.default,
                    as: "Client",
                    attributes: ["Id", "FirstName", "LastName"]
                }
            ]
        });
        const finalObj = [];
        for (const item of reviewModel) {
            let client = {
                Id: item.Client.Id,
                FirstName: item.Client.FirstName,
                LastName: item.Client.LastName
            };
            const obj = {
                TrainerId: item.TrainerId,
                Ratings: item.Ratings,
                Reviews: item.Reviews,
                Client: client,
                CreatedAt: item.createdAt
            };
            finalObj.push(obj);
        }
        return finalObj;
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.getAllRatingsByTrainerIdQuery = getAllRatingsByTrainerIdQuery;
