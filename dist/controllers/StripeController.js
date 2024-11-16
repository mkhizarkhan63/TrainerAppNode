"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPayment = void 0;
const responseUtils_1 = require("../utils/responseUtils");
const stripeService_1 = require("../services/stripeService");
const createPayment = async (req, res) => {
    try {
        const formData = req.body;
        const result = await (0, stripeService_1.stripeService)(formData);
        res.json(result);
    }
    catch (error) {
        res.json((0, responseUtils_1.errorResponse)("Internal Server Error", 500, error));
    }
};
exports.createPayment = createPayment;
