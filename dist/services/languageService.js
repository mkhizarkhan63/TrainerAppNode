"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserLanguagesByLanguageIdSingleQuery = exports.createUserLanguagesByTrainerId = exports.deleteUserLangugagesByTrainerId = exports.getAllLanguagesQuery = void 0;
const LanguageModel_1 = __importDefault(require("../models/LanguageModel"));
const UserLanguagesModel_1 = __importDefault(require("../models/UserLanguagesModel"));
const connection_1 = __importDefault(require("../database/connection"));
const getAllLanguagesQuery = async () => {
    try {
        const languages = await LanguageModel_1.default.findAll();
        return { data: languages, message: '' };
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.getAllLanguagesQuery = getAllLanguagesQuery;
const deleteUserLangugagesByTrainerId = async (_trainerId) => {
    try {
        const obj = await UserLanguagesModel_1.default.destroy({ where: { TrainerId: _trainerId } });
        if (obj > 0)
            return true;
        else
            return false;
    }
    catch (error) {
        throw error;
    }
};
exports.deleteUserLangugagesByTrainerId = deleteUserLangugagesByTrainerId;
const createUserLanguagesByTrainerId = async (_langaugesIds, _trainerId) => {
    const transaction = await connection_1.default?.transaction();
    try {
        const languagesIds = _langaugesIds.split(",");
        for (const item of languagesIds) {
            await UserLanguagesModel_1.default.create({ LanguageId: parseInt(item), TrainerId: _trainerId }, { transaction });
        }
        await transaction.commit();
        return true;
    }
    catch (error) {
        await transaction.rollback();
        throw error;
    }
};
exports.createUserLanguagesByTrainerId = createUserLanguagesByTrainerId;
const deleteUserLanguagesByLanguageIdSingleQuery = async (Id) => {
    try {
        const obj = await UserLanguagesModel_1.default.destroy({ where: { LanguageId: Id } });
        if (obj > 0)
            return true;
        else
            return false;
    }
    catch (error) {
    }
};
exports.deleteUserLanguagesByLanguageIdSingleQuery = deleteUserLanguagesByLanguageIdSingleQuery;
