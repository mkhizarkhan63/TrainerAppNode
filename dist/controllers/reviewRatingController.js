"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllRatingsByTrainerId = exports.createRatingToTrainer = void 0;
const responseUtils_1 = require("../utils/responseUtils");
const reviewRatingService_1 = require("../services/reviewRatingService");
const createRatingToTrainer = async (req, res) => {
    const { ratings, reviews, clientId, trainerId } = req.body;
    try {
        const obj = {
            TrainerId: trainerId,
            ClientId: clientId,
            Ratings: ratings,
            Reviews: reviews
        };
        await (0, reviewRatingService_1.createRatingToTrainerByClientIdQuery)(obj);
        res.json((0, responseUtils_1.successResponse)("Commented Successfully!", 200));
    }
    catch (error) {
        res.json((0, responseUtils_1.errorResponse)("Internal Server Error", 500, error));
    }
};
exports.createRatingToTrainer = createRatingToTrainer;
const getAllRatingsByTrainerId = async (req, res) => {
    try {
        const { trainerId } = req.body;
        const result = await (0, reviewRatingService_1.getAllRatingsByTrainerIdQuery)(trainerId);
        res.json((0, responseUtils_1.successResponse)("", 200, result));
    }
    catch (error) {
        res.json((0, responseUtils_1.errorResponse)("Internal Server Error", 500, error));
    }
};
exports.getAllRatingsByTrainerId = getAllRatingsByTrainerId;
