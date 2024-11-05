"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClientById = void 0;
const ClientModel_1 = __importDefault(require("../models/ClientModel"));
const getClientById = async (Id) => {
    try {
        const client = await ClientModel_1.default.findOne({ where: { Id: Id } });
        return client;
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.getClientById = getClientById;
