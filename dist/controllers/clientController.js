"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllClients = void 0;
const responseUtils_1 = require("../utils/responseUtils");
const clientService_1 = require("../services/clientService");
const getAllClients = async (req, res) => {
    try {
        const result = await (0, clientService_1.getAllClientsQuery)();
        res.json((0, responseUtils_1.successResponse)("", 200, result));
    }
    catch (error) {
        res.json((0, responseUtils_1.errorResponse)("Internal Server Error", 500, error));
    }
};
exports.getAllClients = getAllClients;
