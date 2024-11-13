"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionByIdQuery = exports.updateSessionByIdQuery = exports.deleteSessionByIdQuery = exports.getAllSesionByIdGenericQuery = exports.getMySessionByIdGenericQuery = exports.createSessionQuery = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const _associations_1 = require("../models/_associations");
const ActivitiesModel_1 = __importDefault(require("../models/ActivitiesModel"));
const SessionsModel_1 = __importDefault(require("../models/SessionsModel"));
const enums_1 = require("../utils/enums");
const trainerService_1 = require("./trainerService");
const clientService_1 = require("./clientService");
const createSessionQuery = async (_session) => {
    const transaction = await connection_1.default.transaction();
    try {
        const { title, scheduledDate, scheduledTime, activityId, totalCapacity, classType, description, location, address, price, link, TrainerId, ClientId, TypeId } = _session;
        if (TypeId.toString() === enums_1.UserTypeEnum.Trainer) {
            const createSession = await SessionsModel_1.default.create({ title: title, scheduledDate: scheduledDate, scheduledTime: scheduledTime, activityId: activityId, totalCapacity: totalCapacity, classType: classType.toLowerCase(), description: description, location: location, address: address, price: price, link: link, ClientId: null, TrainerId: TrainerId, TypeId: TypeId }, { transaction });
            transaction.commit();
            return { data: createSession, message: 'Session Created Successfully!' };
        }
        else if (TypeId.toString() === enums_1.UserTypeEnum.Client) {
            const createSession = await SessionsModel_1.default.create({ title: title, scheduledDate: scheduledDate, scheduledTime: scheduledTime, activityId: activityId, totalCapacity: totalCapacity, classType: classType.toLowerCase(), description: description, location: location, address: address, price: price, link: link, ClientId: ClientId, TrainerId: null, TypeId: TypeId }, { transaction });
            transaction.commit();
            return { data: createSession, message: 'Session Created Successfully!' };
        }
        else {
            return { data: null, message: 'Check user Type' };
        }
    }
    catch (error) {
        transaction.rollback();
        throw new Error(error);
    }
};
exports.createSessionQuery = createSessionQuery;
const getMySessionByIdGenericQuery = async (_typeId, _trainerId, _clientId) => {
    try {
        if (_typeId.toString() === enums_1.UserTypeEnum.Trainer) {
            const trainer = await _associations_1.TrainerModel.findOne({
                where: { Id: _trainerId },
                attributes: ["FirstName", "LastName"],
                include: [
                    {
                        model: SessionsModel_1.default,
                        as: "Sessions",
                        include: [
                            {
                                model: ActivitiesModel_1.default,
                                as: "Activity",
                                attributes: ["Id", "Name"]
                            },
                            {
                                model: _associations_1.SessionParticipantModel,
                                as: "SessionParticipant",
                                required: false,
                            },
                        ],
                    },
                ]
            });
            const sessionWithParticipantCount = trainer?.Sessions.map(session => {
                // Count the number of participants for each session
                const participantCount = session.SessionParticipant ? session.SessionParticipant.length : 0;
                // Add the participant count to each session
                return {
                    ...session.toJSON(),
                    trainerName: `${trainer.FirstName} ${trainer.LastName}`,
                    participantCount: participantCount
                };
            });
            return sessionWithParticipantCount;
        }
        else if (_typeId.toString() === enums_1.UserTypeEnum.Client) {
            const client = await _associations_1.ClientModel.findOne({
                where: { Id: _clientId },
                attributes: ["FirstName", "LastName"],
                include: [
                    {
                        model: SessionsModel_1.default,
                        as: "Sessions",
                        include: [
                            {
                                model: ActivitiesModel_1.default,
                                as: "Activity",
                                attributes: ["Id", "Name"]
                            },
                            {
                                model: _associations_1.SessionParticipantModel,
                                as: "SessionParticipant",
                                // where: {
                                //     SessionId: sequelize.col('sessions_tbl.Id')
                                // },
                                required: false,
                            },
                        ]
                    },
                ]
            });
            const sessionWithParticipantCount = client?.Sessions.map(session => {
                // Count the number of participants for each session
                const participantCount = session.SessionParticipant ? session.SessionParticipant.length : 0;
                // Add the participant count to each session
                return {
                    ...session.toJSON(),
                    clientName: `${client.FirstName} ${client.LastName}`,
                    participantCount: participantCount
                };
            });
            return sessionWithParticipantCount;
        }
    }
    catch (error) {
        throw error;
    }
};
exports.getMySessionByIdGenericQuery = getMySessionByIdGenericQuery;
const getAllSesionByIdGenericQuery = async (_classType, _scheduledDate, _price) => {
    try {
        const whereConditions = {};
        // ClassType Filter
        if (_classType && _classType.length > 0 && _classType[0] !== "") {
            whereConditions.classType = {
                [sequelize_1.Op.in]: _classType // Split the passed string into an array
            };
        }
        // Scheduled Date Filter (if provided)
        if (_scheduledDate) {
            whereConditions.scheduledDate = _scheduledDate; // You can further adjust to handle date range if needed
        }
        // Price Filter
        if (_price && _price.length > 0 && _price[0] !== "") {
            if (_price.includes('free') && _price.includes('paid')) {
                // If both 'free' and 'paid' are passed, return all sessions regardless of price
                // You can decide whether to allow this or add more specific logic.
            }
            else if (_price.includes('free')) {
                // Price is free, i.e., price field is null or empty
                whereConditions.price = {
                    [sequelize_1.Op.or]: [
                        { [sequelize_1.Op.is]: null }, // check for null
                        { [sequelize_1.Op.eq]: '' } // check for empty string
                    ]
                };
            }
            else if (_price.includes('paid')) {
                // Price is paid, i.e., price field is not null or empty
                whereConditions.price = {
                    [sequelize_1.Op.and]: [
                        { [sequelize_1.Op.not]: null },
                        { [sequelize_1.Op.not]: '' }
                    ]
                };
            }
        }
        const session = await SessionsModel_1.default.findAll({
            where: whereConditions,
            include: [
                {
                    model: ActivitiesModel_1.default,
                    as: "Activity",
                    attributes: ["Id", "Name"]
                },
                {
                    model: _associations_1.SessionParticipantModel,
                    as: "SessionParticipant",
                    required: false,
                },
            ]
        });
        const sessionWithParticipantCount = await Promise.all(session.map(async (session) => {
            // Count the number of participants for each session
            const participantCount = session.SessionParticipant ? session.SessionParticipant.length : 0;
            let trainer = null;
            let client = null;
            if (session.TrainerId) {
                trainer = await (0, trainerService_1.getTrainerById)(session.TrainerId);
            }
            if (session.ClientId) {
                client = await (0, clientService_1.getClientById)(session.ClientId);
            }
            // Add the participant count to each session
            return {
                trainer: trainer ? `${trainer?.FirstName} ${trainer?.LastName}` : null,
                client: client ? `${client?.FirstName} ${client?.LastName}` : null,
                ...session.toJSON(),
                participantCount: participantCount
            };
        }));
        return sessionWithParticipantCount;
    }
    catch (error) {
        throw error;
    }
};
exports.getAllSesionByIdGenericQuery = getAllSesionByIdGenericQuery;
const deleteSessionByIdQuery = async (_sessionId) => {
    try {
        const found = await (0, exports.sessionByIdQuery)(_sessionId);
        if (found) {
            const res = await SessionsModel_1.default.destroy({ where: { Id: _sessionId } });
            if (res > 0) {
                return { data: null, message: "Deleted Successfully!" };
            }
            else {
                return { data: null, message: "Failed to delete!" };
            }
        }
        else {
            return { data: null, message: "Session is not exist on this Id!" };
        }
    }
    catch (error) {
        throw error;
    }
};
exports.deleteSessionByIdQuery = deleteSessionByIdQuery;
const updateSessionByIdQuery = async (_session) => {
    const transaction = await connection_1.default.transaction();
    try {
        const { Id, title, scheduledDate, scheduledTime, activityId, totalCapacity, classType, description, location, address, price, link, TrainerId, ClientId, TypeId } = _session;
        if (TypeId.toString() === enums_1.UserTypeEnum.Trainer) {
            const createSession = await SessionsModel_1.default.update({ title: title, scheduledDate: scheduledDate, scheduledTime: scheduledTime, activityId: activityId, totalCapacity: totalCapacity, classType: classType.toLowerCase(), description: description, location: location, address: address, price: price, link: link, ClientId: null, TrainerId: TrainerId, TypeId: TypeId }, { where: { Id: Id }, transaction });
            transaction.commit();
            return { data: createSession, message: 'Session Created Successfully!' };
        }
        else if (TypeId.toString() === enums_1.UserTypeEnum.Client) {
            const createSession = await SessionsModel_1.default.update({ title: title, scheduledDate: scheduledDate, scheduledTime: scheduledTime, activityId: activityId, totalCapacity: totalCapacity, classType: classType.toLowerCase(), description: description, location: location, address: address, price: price, link: link, ClientId: ClientId, TrainerId: null, TypeId: TypeId }, { where: { Id: Id }, transaction });
            transaction.commit();
            return { data: createSession, message: 'Session Created Successfully!' };
        }
        else {
            return { data: null, message: 'Check user Type' };
        }
    }
    catch (error) {
        transaction.rollback();
        throw error;
    }
};
exports.updateSessionByIdQuery = updateSessionByIdQuery;
const sessionByIdQuery = async (_sessionId) => {
    try {
        const res = await SessionsModel_1.default.findOne({ where: { Id: _sessionId } });
        return res;
    }
    catch (error) {
        throw error;
    }
};
exports.sessionByIdQuery = sessionByIdQuery;
