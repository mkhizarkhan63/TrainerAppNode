import { Op } from "sequelize";
import sequelize from "../database/connection";
import { SessionRequest, SessionResponseDTO } from "../interfaces/ISession";
import { ClientModel, SessionParticipantModel, TrainerModel, TypeModel } from "../models/_associations";
import ActivitesModel from "../models/ActivitiesModel";
import SessionModel from "../models/SessionsModel";
import { UserTypeEnum as E } from "../utils/enums";
import { ResponseDTO } from "../utils/responseUtils";
import { getTrainerByIdQuery} from "./trainerService";
import { getClientByIdQuery } from "./clientService";




export const createSessionQuery = async (_session: SessionRequest): Promise<ResponseDTO> => {
    const transaction = await sequelize.transaction();
    try {
        const { title, scheduledDate, scheduledTime, activityId, totalCapacity, classType, description, location, address, price, link, TrainerId, ClientId, TypeId }: SessionRequest = _session;
        if (TypeId.toString() === E.Trainer) {
            const createSession = await SessionModel.create({ title: title, scheduledDate: scheduledDate, scheduledTime: scheduledTime, activityId: activityId, totalCapacity: totalCapacity, classType: classType.toLowerCase(), description: description, location: location, address: address, price: price, link: link, ClientId: null, TrainerId: TrainerId, TypeId: TypeId }, { transaction });
            transaction.commit();
            return { data: createSession, message: 'Session Created Successfully!' }
        } else if (TypeId.toString() === E.Client) {
            const createSession = await SessionModel.create({ title: title, scheduledDate: scheduledDate, scheduledTime: scheduledTime, activityId: activityId, totalCapacity: totalCapacity, classType: classType.toLowerCase(), description: description, location: location, address: address, price: price, link: link, ClientId: ClientId, TrainerId: null, TypeId: TypeId }, { transaction });
            transaction.commit();
            return { data: createSession, message: 'Session Created Successfully!' }
        }
        else {
            return { data: null, message: 'Check user Type' }
        }

    }
    catch (error: any) {
        transaction.rollback();
        throw new Error(error);
    }

}


export const getMySessionByIdGenericQuery = async (_typeId: number, _trainerId: number, _clientId: number) => {
    try {

        if (_typeId.toString() === E.Trainer) {

            const trainer = await TrainerModel.findOne({
                where: { Id: _trainerId },
                attributes: ["FirstName", "LastName"],
                include: [
                    {
                        model: SessionModel,
                        as: "Sessions",
                        include: [
                            {
                                model: ActivitesModel,
                                as: "Activity",
                                attributes: ["Id", "Name"]
                            },
                            {
                                model: SessionParticipantModel,
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
        else if (_typeId.toString() === E.Client) {
            const client = await ClientModel.findOne({
                where: { Id: _clientId },
                attributes: ["FirstName", "LastName"],
                include: [
                    {
                        model: SessionModel,
                        as: "Sessions",
                        include: [
                            {
                                model: ActivitesModel,
                                as: "Activity",
                                attributes: ["Id", "Name"]
                            },
                            {
                                model: SessionParticipantModel,
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
    } catch (error) {
        throw error;
    }
}


export const getAllSesionByIdGenericQuery = async (_classType: string[], _scheduledDate: string, _price: string[]) => {
    try {

        const whereConditions: any = {};

        // ClassType Filter
        if (_classType && _classType.length > 0 && _classType[0] !== "") {
            whereConditions.classType = {
                [Op.in]: _classType // Split the passed string into an array
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
            } else if (_price.includes('free')) {
                // Price is free, i.e., price field is null or empty
                whereConditions.price = {
                    [Op.or]: [
                        { [Op.is]: null },   // check for null
                        { [Op.eq]: '' }      // check for empty string
                    ]
                };
            } else if (_price.includes('paid')) {
                // Price is paid, i.e., price field is not null or empty
                whereConditions.price = {
                    [Op.and]: [
                        { [Op.not]: null },
                        { [Op.not]: '' }
                    ]
                };
            }
        }
        const session = await SessionModel.findAll({
            where: whereConditions,
            include: [
                {
                    model: ActivitesModel,
                    as: "Activity",
                    attributes: ["Id", "Name"]
                },
                {
                    model: SessionParticipantModel,
                    as: "SessionParticipant",
                    required: false,
                },

            ]

        });


        const sessionWithParticipantCount = await Promise.all(session.map(async session => {
            // Count the number of participants for each session
            const participantCount = session.SessionParticipant ? session.SessionParticipant.length : 0;

            let trainer: TrainerModel | null = null;
            let client: ClientModel | null = null;
            if (session.TrainerId) {
                trainer = await getTrainerByIdQuery(session.TrainerId);

            }
            if (session.ClientId) {
                client = await getClientByIdQuery(session.ClientId);

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


    } catch (error) {
        throw error;
    }
}

export const deleteSessionByIdQuery = async (_sessionId: number): Promise<ResponseDTO> => {
    try {
        const found = await sessionByIdQuery(_sessionId);
        if (found) {
            const res = await SessionModel.destroy({ where: { Id: _sessionId } });
            if (res > 0) {
                return { data: null, message: "Deleted Successfully!" };
            }
            else {
                return { data: null, message: "Failed to delete!" };
            }
        } else {
            return { data: null, message: "Session is not exist on this Id!" };
        }


    } catch (error) {
        throw error;
    }
}

export const updateSessionByIdQuery = async (_session: SessionRequest) => {
    const transaction = await sequelize.transaction();
    try {
        const { Id, title, scheduledDate, scheduledTime, activityId, totalCapacity, classType, description, location, address, price, link, TrainerId, ClientId, TypeId }: SessionRequest = _session;
        if (TypeId.toString() === E.Trainer) {
            const createSession = await SessionModel.update({ title: title, scheduledDate: scheduledDate, scheduledTime: scheduledTime, activityId: activityId, totalCapacity: totalCapacity, classType: classType.toLowerCase(), description: description, location: location, address: address, price: price, link: link, ClientId: null, TrainerId: TrainerId, TypeId: TypeId }, { where: { Id: Id }, transaction });
            transaction.commit();
            return { data: createSession, message: 'Session Created Successfully!' }
        } else if (TypeId.toString() === E.Client) {
            const createSession = await SessionModel.update({ title: title, scheduledDate: scheduledDate, scheduledTime: scheduledTime, activityId: activityId, totalCapacity: totalCapacity, classType: classType.toLowerCase(), description: description, location: location, address: address, price: price, link: link, ClientId: ClientId, TrainerId: null, TypeId: TypeId }, { where: { Id: Id }, transaction });
            transaction.commit();
            return { data: createSession, message: 'Session Created Successfully!' }
        }
        else {
            return { data: null, message: 'Check user Type' }
        }

    } catch (error) {
        transaction.rollback();
        throw error;
    }
}

export const sessionByIdQuery = async (_sessionId: number) => {
    try {
        const res = await SessionModel.findOne({ where: { Id: _sessionId } });
        return res;
    } catch (error) {
        throw error;
    }
}