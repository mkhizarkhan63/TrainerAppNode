
import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/responseUtils";
import { deleteCertificateByCertificateIdQuery } from "../services/certificateService";




export const deleteCertificateByCertificateId = async (req: Request, res: Response): Promise<void> => {

    try {
        const result = await deleteCertificateByCertificateIdQuery(Number(req.body.certificateId));
        if (result)
            res.json(successResponse("Deleted Successfully!", 200, result));
        else
            res.json(successResponse("Failed to delete!", 200, result));
        return;

    } catch (error) {
        res.json(errorResponse("Internal Server Error", 500, error));
    }

};
