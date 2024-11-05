"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserPersonalTraining = exports.createUserSpecialization = void 0;
const responseUtils_1 = require("../utils/responseUtils");
const specializationService_1 = require("../services/specializationService");
const personalTrainingService_1 = require("../services/personalTrainingService");
const createUserSpecialization = async (req, res) => {
    try {
        const { trainerId, clientId, typeId, specializationIds } = req.body;
        const { data, message } = await (0, specializationService_1.createUserSpecializationQuery)(trainerId, clientId, typeId, specializationIds);
        res.json((0, responseUtils_1.successResponse)(message, 200, data));
    }
    catch (error) {
        res.json((0, responseUtils_1.errorResponse)("Internal Server Error", 500, error));
    }
};
exports.createUserSpecialization = createUserSpecialization;
const createUserPersonalTraining = async (req, res) => {
    try {
        const { trainerId, clientId, typeId, personalTrainingServiceIds } = req.body;
        const { data, message } = await (0, personalTrainingService_1.createUserPersonalTrainingServiceQuery)(trainerId, clientId, typeId, personalTrainingServiceIds);
        res.json((0, responseUtils_1.successResponse)(message, 200, data));
    }
    catch (error) {
        res.json((0, responseUtils_1.errorResponse)("Internal Server Error", 500, error));
    }
};
exports.createUserPersonalTraining = createUserPersonalTraining;
