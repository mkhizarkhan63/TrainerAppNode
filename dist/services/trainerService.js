"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTrainer = exports.updateTrainerById = exports.getTrainerById = void 0;
const TrainerModel_1 = __importDefault(require("../models/TrainerModel"));
const connection_1 = __importDefault(require("../database/connection"));
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
const updateTrainerById = async (_profile, trainerId) => {
    try {
        const obj = await TrainerModel_1.default.update({
            FirstName: _profile.FirstName,
            LastName: _profile.LastName,
            MobileNumber: _profile.MobileNumber,
            DoB: _profile.DoB,
            CountryResidence: _profile.CountryResidence,
            Description: _profile.Description,
            Nationality: _profile.Nationality,
            GenderId: _profile.GenderId
        }, {
            where: {
                Id: trainerId,
            },
        });
        if (obj[0] > 0)
            return true;
        else
            return false;
    }
    catch (error) {
        throw error;
    }
};
exports.updateTrainerById = updateTrainerById;
const createTrainer = async (_trainer) => {
    const transaction = await connection_1.default?.transaction();
    try {
        const obj = await TrainerModel_1.default.create({
            FirstName: _trainer.FirstName,
            LastName: _trainer.LastName,
            MobileNumber: _trainer.MobileNumber,
            DoB: _trainer.DoB,
            Nationality: _trainer.Nationality,
            CountryResidence: _trainer.CountryResidence,
            GenderId: _trainer.GenderId ? _trainer.GenderId : 1,
            TypeId: _trainer.TypeId ? _trainer.TypeId : 1,
        }, { transaction });
        transaction.commit();
        return obj;
    }
    catch (error) {
        transaction.rollback();
        throw error;
    }
};
exports.createTrainer = createTrainer;
