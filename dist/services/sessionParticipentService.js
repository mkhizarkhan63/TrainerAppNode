"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBookingSessionQuery = void 0;
const connection_1 = __importDefault(require("../database/connection"));
const SessionParticipantModel_1 = __importDefault(require("../models/SessionParticipantModel"));
const createBookingSessionQuery = async (_sessionId, _clientId) => {
    const transaction = await connection_1.default.transaction();
    try {
        const bookSession = await SessionParticipantModel_1.default.create({ ClientId: _clientId, SessionId: _sessionId });
        transaction.commit();
        return { data: bookSession, message: '' };
    }
    catch (err) {
        transaction.rollback();
        throw err;
    }
};
exports.createBookingSessionQuery = createBookingSessionQuery;
