"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTrainerPersonalTrainingService = exports.createTrainerSpecialization = void 0;
const responseUtils_1 = require("../utils/responseUtils");
const specializationService_1 = require("../services/specializationService");
const personalTrainingService_1 = require("../services/personalTrainingService");
const createTrainerSpecialization = async (req, res) => {
    try {
        const trainerId = req.body.trainerId;
        const specializationIds = req.body.specializationIds;
        const { data, message } = await (0, specializationService_1.createTrainerSpecializationQuery)(trainerId, specializationIds);
        res.json((0, responseUtils_1.successResponse)(message, 200, data));
    }
    catch (error) {
        res.json((0, responseUtils_1.errorResponse)("Internal Server Error", 500, error));
    }
};
exports.createTrainerSpecialization = createTrainerSpecialization;
const createTrainerPersonalTrainingService = async (req, res) => {
    try {
        const trainerId = req.body.trainerId;
        const personalTrainingServiceIds = req.body.personalTrainingServiceIds;
        const { data, message } = await (0, personalTrainingService_1.createPersonalTrainingServiceQuery)(trainerId, personalTrainingServiceIds);
        res.json((0, responseUtils_1.successResponse)(message, 200, data));
    }
    catch (error) {
        res.json((0, responseUtils_1.errorResponse)("Internal Server Error", 500, error));
    }
};
exports.createTrainerPersonalTrainingService = createTrainerPersonalTrainingService;
