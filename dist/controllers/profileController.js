"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTrainerProfile = void 0;
const responseUtils_1 = require("../utils/responseUtils");
const profileService_1 = require("../services/profileService");
const getTrainerProfile = async (req, res) => {
    try {
        const { trainerId } = req.body;
        const data = await (0, profileService_1.getTrainerProfileData)(trainerId);
        res.json((0, responseUtils_1.successResponse)("message", 200, data));
    }
    catch (error) {
        res.json((0, responseUtils_1.errorResponse)("Internal Server Error", 500, error));
    }
};
exports.getTrainerProfile = getTrainerProfile;
