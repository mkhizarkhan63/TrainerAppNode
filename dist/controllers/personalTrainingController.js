"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserPersonalTraining = exports.getAllPersonalTrainingServices = exports.getPersonalTrainerServiceById = void 0;
const responseUtils_1 = require("../utils/responseUtils");
const personalTrainingService_1 = require("../services/personalTrainingService");
const getPersonalTrainerServiceById = async (req, res) => {
    try {
        const Id = parseInt(req.body.Id);
        const { data, message } = await (0, personalTrainingService_1.getPersonalTrainingServiceByIdQuery)(Id);
        res.json((0, responseUtils_1.successResponse)(message, 200, data));
    }
    catch (error) {
        res.json((0, responseUtils_1.errorResponse)("Internal Server Error", 500, error));
    }
};
exports.getPersonalTrainerServiceById = getPersonalTrainerServiceById;
const getAllPersonalTrainingServices = async (req, res) => {
    try {
        const { data, message } = await (0, personalTrainingService_1.getAllPersonalTrainingServiceQuery)();
        res.json((0, responseUtils_1.successResponse)(message, 200, data));
    }
    catch (error) {
        res.json((0, responseUtils_1.errorResponse)("Internal Server Error", 500, error));
    }
};
exports.getAllPersonalTrainingServices = getAllPersonalTrainingServices;
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
