"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTrainerById = void 0;
const TrainerModel_1 = __importDefault(require("../models/TrainerModel"));
const getTrainerById = async (Id) => {
    try {
        const trainer = await TrainerModel_1.default.findOne({ where: { Id: Id } });
        return trainer;
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.getTrainerById = getTrainerById;
