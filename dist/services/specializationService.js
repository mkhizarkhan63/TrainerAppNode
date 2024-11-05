"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSpecializationQuery = exports.getSpecializationByIdQuery = exports.getAllSpecializationQuery = void 0;
const SpecializationModel_1 = __importDefault(require("../models/SpecializationModel"));
const UserSpecializationModel_1 = __importDefault(require("../models/UserSpecializationModel"));
const enums_1 = require("../utils/enums");
const getAllSpecializationQuery = async () => {
    try {
        const obj = await SpecializationModel_1.default.findAll();
        return { data: obj, message: '' };
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.getAllSpecializationQuery = getAllSpecializationQuery;
const getSpecializationByIdQuery = async (Id) => {
    try {
        const obj = await SpecializationModel_1.default.findOne(({ where: { Id: Id } }));
        let msg = "";
        if (!obj)
            msg = "Data Not Found";
        return { data: obj, message: msg };
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.getSpecializationByIdQuery = getSpecializationByIdQuery;
const createUserSpecializationQuery = async (_trainerId, _clientId, _typeId, _specializationIds) => {
    const transaction = await UserSpecializationModel_1.default.sequelize?.transaction();
    try {
        if (_typeId.toString() === enums_1.UserTypeEnum.Trainer) {
            const getAllByTrainerIdExists = await UserSpecializationModel_1.default.findAll({ where: { TrainerId: _trainerId } });
            if (getAllByTrainerIdExists) {
                await UserSpecializationModel_1.default.destroy({ where: { TrainerId: _trainerId } });
            }
            for (const item of _specializationIds) {
                await UserSpecializationModel_1.default.create({
                    TrainerId: _trainerId,
                    SpecializationId: item,
                }, { transaction });
            }
        }
        else if (_typeId.toString() === enums_1.UserTypeEnum.Client) {
            const getAllByTrainerIdExists = await UserSpecializationModel_1.default.findAll({ where: { ClientId: _clientId } });
            if (getAllByTrainerIdExists) {
                await UserSpecializationModel_1.default.destroy({ where: { ClientId: _clientId } });
            }
            for (const item of _specializationIds) {
                await UserSpecializationModel_1.default.create({
                    ClientId: _clientId,
                    SpecializationId: item,
                }, { transaction });
            }
        }
        else {
            return { data: "", message: "Something went wrong!" };
        }
        await transaction?.commit();
        return { data: "", message: "Save Successfully" };
    }
    catch (error) {
        await transaction?.rollback();
        throw new Error(error);
    }
};
exports.createUserSpecializationQuery = createUserSpecializationQuery;
