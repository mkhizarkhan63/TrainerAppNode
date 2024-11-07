"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSpecialization = exports.getSpecializationById = exports.getAllSpecialization = void 0;
const responseUtils_1 = require("../utils/responseUtils");
const specializationService_1 = require("../services/specializationService");
const getAllSpecialization = async (req, res) => {
    try {
        const { data, message } = await (0, specializationService_1.getAllSpecializationQuery)();
        res.json((0, responseUtils_1.successResponse)(message, 200, data));
    }
    catch (error) {
        res.json((0, responseUtils_1.errorResponse)("Internal Server Error", 500, error));
    }
};
exports.getAllSpecialization = getAllSpecialization;
const getSpecializationById = async (req, res) => {
    try {
        const Id = parseInt(req.body.Id);
        const { data, message } = await (0, specializationService_1.getSpecializationByIdQuery)(Id);
        res.json((0, responseUtils_1.successResponse)(message, 200, data));
    }
    catch (error) {
        res.json((0, responseUtils_1.errorResponse)("Internal Server Error", 500, error));
    }
};
exports.getSpecializationById = getSpecializationById;
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
