"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllActivities = void 0;
const responseUtils_1 = require("../utils/responseUtils");
const activitiesService_1 = require("../services/activitiesService");
const getAllActivities = async (req, res) => {
    try {
        const data = await (0, activitiesService_1.getAllActivitiesQuery)();
        res.json((0, responseUtils_1.successResponse)("", 200, data));
    }
    catch (error) {
        res.json((0, responseUtils_1.errorResponse)("Internal Server Error", 500, error));
    }
};
exports.getAllActivities = getAllActivities;
