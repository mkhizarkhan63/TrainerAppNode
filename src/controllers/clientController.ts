import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/responseUtils";
import { getAllClientsQuery } from "../services/clientService";



export const getAllClients = async (req: Request, res: Response) => {
    try {
        const result = await getAllClientsQuery();
        res.json(successResponse("", 200, result));
    } catch (error) {
        res.json(errorResponse("Internal Server Error", 500, error));
    }
}