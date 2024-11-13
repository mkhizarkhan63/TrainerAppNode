import sequelize from "../database/connection";
import SessionParticipantModel from "../models/SessionParticipantModel";
import { ResponseDTO } from "../utils/responseUtils";


export const createBookingSessionQuery = async (_sessionId: number, _clientId: number): Promise<ResponseDTO> => {
    const transaction = await sequelize.transaction();
    try {

        const bookSession = await SessionParticipantModel.create({ ClientId: _clientId, SessionId: _sessionId });

        transaction.commit();
        return { data: bookSession, message: '' }

    }
    catch (err) {
        transaction.rollback();
        throw err;
    }
}

