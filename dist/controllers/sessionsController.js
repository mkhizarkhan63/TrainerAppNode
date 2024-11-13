"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSessionById = exports.deleteSessionById = exports.getAllSessionDetailById = exports.getMySessionDetailsById = exports.createBookingSession = exports.createSessions = void 0;
const responseUtils_1 = require("../utils/responseUtils");
const sessionService_1 = require("../services/sessionService");
const sessionParticipentService_1 = require("../services/sessionParticipentService");
const createSessions = async (req, res) => {
    try {
        // const { title, scheduledDate, scheduledTime, activityId, totalCapacity, classType, description, location, price, link, TrainerId, ClientId, TypeId }: SessionRequest = req.body;
        const session = req.body;
        const result = await (0, sessionService_1.createSessionQuery)(session);
        res.json((0, responseUtils_1.successResponse)("Session Created Successfully!", 200, result));
    }
    catch (error) {
        res.json((0, responseUtils_1.errorResponse)("Internal Server Error", 500, error));
    }
};
exports.createSessions = createSessions;
const createBookingSession = async (req, res) => {
    try {
        const { clientId, sessionId } = req.body;
        const result = await (0, sessionParticipentService_1.createBookingSessionQuery)(sessionId, clientId);
        res.json((0, responseUtils_1.successResponse)("Successfully booked the Session!", 200, result));
    }
    catch (error) {
        res.json((0, responseUtils_1.errorResponse)("Internal Server Error", 500, error));
    }
};
exports.createBookingSession = createBookingSession;
const getMySessionDetailsById = async (req, res) => {
    try {
        const { trainerId, clientId, typeId } = req.body;
        const result = await (0, sessionService_1.getMySessionByIdGenericQuery)(typeId, trainerId, clientId);
        if (result)
            res.json((0, responseUtils_1.successResponse)("", 200, result));
        else
            res.json((0, responseUtils_1.successResponse)("Data Not Found!", 200));
    }
    catch (error) {
        res.json((0, responseUtils_1.errorResponse)("Internal Server Error", 500, error));
    }
};
exports.getMySessionDetailsById = getMySessionDetailsById;
const getAllSessionDetailById = async (req, res) => {
    try {
        const { classType, scheduledDate, price } = req.body;
        const classTypeArr = classType.split(',').map((item) => item.trim().toLowerCase());
        const priceArr = price.split(',').map((item) => item.trim().toLowerCase());
        const result = await (0, sessionService_1.getAllSesionByIdGenericQuery)(classTypeArr, scheduledDate, priceArr);
        if (result)
            res.json((0, responseUtils_1.successResponse)("", 200, result));
        else
            res.json((0, responseUtils_1.successResponse)("Data Not Found!", 200));
    }
    catch (error) {
        res.json((0, responseUtils_1.errorResponse)("Internal Server Error", 500, error));
    }
};
exports.getAllSessionDetailById = getAllSessionDetailById;
const deleteSessionById = async (req, res) => {
    try {
        const { sessionId } = req.body;
        const result = await (0, sessionService_1.deleteSessionByIdQuery)(sessionId);
        res.json((0, responseUtils_1.successResponse)("", 200, result));
    }
    catch (error) {
        res.json((0, responseUtils_1.errorResponse)("Internal Server Error", 500, error));
    }
};
exports.deleteSessionById = deleteSessionById;
const updateSessionById = async (req, res) => {
    try {
        const session = req.body;
        const result = await (0, sessionService_1.updateSessionByIdQuery)(session);
        res.json((0, responseUtils_1.successResponse)("", 200, result));
    }
    catch (error) {
        res.json((0, responseUtils_1.errorResponse)("Internal Server Error", 500, error));
    }
};
exports.updateSessionById = updateSessionById;
