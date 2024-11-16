

import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/responseUtils";
import { StipeFormDataType, stripeService } from "../services/stripeService";



export const createPayment = async (req: Request, res: Response) => {
    try {

        const formData: StipeFormDataType = req.body;
        const result =  await stripeService(formData);
        res.json(result);
    }
    catch (error) {
        res.json(errorResponse("Internal Server Error", 500, error));
    }
}

