import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/responseUtils";
import { SessionRequest } from "../interfaces/ISession";
import { createSessionQuery, deleteSessionByIdQuery, getAllSesionByIdGenericQuery, getMySessionByIdGenericQuery, updateSessionByIdQuery } from "../services/sessionService";
import { createBookingSessionQuery } from "../services/sessionParticipentService";



export const createSessions = async (req: Request, res: Response) => {

    try {

        // const { title, scheduledDate, scheduledTime, activityId, totalCapacity, classType, description, location, price, link, TrainerId, ClientId, TypeId }: SessionRequest = req.body;
        const session: SessionRequest = req.body;
        const result = await createSessionQuery(session);
        res.json(successResponse("Session Created Successfully!", 200, result));
    }
    catch (error) {
        res.json(errorResponse("Internal Server Error", 500, error));
    }
}


export const createBookingSession = async (req: Request, res: Response) => {
    try {
        const { clientId, sessionId } = req.body;
        const result = await createBookingSessionQuery(sessionId, clientId);
        res.json(successResponse("Successfully booked the Session!", 200, result));
    } catch (error) {
        res.json(errorResponse("Internal Server Error", 500, error));
    }
}

export const getMySessionDetailsById = async (req: Request, res: Response) => {
    try {
        const { trainerId, clientId, typeId } = req.body;
        const result = await getMySessionByIdGenericQuery(typeId, trainerId, clientId);
        if (result)
            res.json(successResponse("", 200, result));
        else
            res.json(successResponse("Data Not Found!", 200))
    } catch (error) {
        res.json(errorResponse("Internal Server Error", 500, error));
    }
}


export const getAllSessionDetailById = async (req: Request, res: Response) => {
    try {
        const { classType, scheduledDate, price } = req.body;
        const classTypeArr: string[] = classType.split(',').map((item: string) => item.trim().toLowerCase());
        const priceArr: string[] = price.split(',').map((item: string) => item.trim().toLowerCase());

        const result = await getAllSesionByIdGenericQuery(classTypeArr, scheduledDate, priceArr);
        if (result)
            res.json(successResponse("", 200, result));
        else
            res.json(successResponse("Data Not Found!", 200))
    } catch (error) {
        res.json(errorResponse("Internal Server Error", 500, error));
    }
}

export const deleteSessionById = async (req: Request, res: Response) => {
    try {

        const { sessionId } = req.body;
        const result = await deleteSessionByIdQuery(sessionId);
        res.json(successResponse("", 200, result));

    } catch (error) {
        res.json(errorResponse("Internal Server Error", 500, error));
    }
}


export const updateSessionById = async (req: Request, res: Response) => {
    try {

        const session: SessionRequest = req.body;
        const result = await updateSessionByIdQuery(session);
        res.json(successResponse("", 200, result));

    } catch (error) {
        res.json(errorResponse("Internal Server Error", 500, error));
    }
}