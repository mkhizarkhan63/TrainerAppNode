"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllGendersQuery = void 0;
const GenderModel_1 = __importDefault(require("../models/GenderModel"));
const getAllGendersQuery = async () => {
    try {
        const data = await GenderModel_1.default.findAll();
        return { data: data, message: '' };
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.getAllGendersQuery = getAllGendersQuery;
