"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserPersonalTrainingServiceQuery = exports.getPersonalTrainingServiceByIdQuery = exports.getAllPersonalTrainingServiceQuery = void 0;
const PersonalTrainingServicesModel_1 = __importDefault(require("../models/PersonalTrainingServicesModel"));
const UserPersonalTrainingServicesModel_1 = __importDefault(require("../models/UserPersonalTrainingServicesModel"));
const enums_1 = require("../utils/enums");
const getAllPersonalTrainingServiceQuery = async () => {
    try {
        const obj = await PersonalTrainingServicesModel_1.default.findAll();
        return { data: obj, message: '' };
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.getAllPersonalTrainingServiceQuery = getAllPersonalTrainingServiceQuery;
const getPersonalTrainingServiceByIdQuery = async (Id) => {
    try {
        const obj = await PersonalTrainingServicesModel_1.default.findOne(({ where: { Id: Id } }));
        let msg = "";
        if (!obj)
            msg = "Data Not Found";
        return { data: obj, message: msg };
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.getPersonalTrainingServiceByIdQuery = getPersonalTrainingServiceByIdQuery;
const createUserPersonalTrainingServiceQuery = async (_trainerId, _clientId, _typeId, _personalTrainingServiceIds) => {
    const transaction = await UserPersonalTrainingServicesModel_1.default.sequelize?.transaction();
    try {
        if (_typeId.toString() === enums_1.UserTypeEnum.Trainer) {
            const getAllByTrainerIdExists = await UserPersonalTrainingServicesModel_1.default.findAll({ where: { TrainerId: _trainerId } });
            if (getAllByTrainerIdExists)
                await UserPersonalTrainingServicesModel_1.default.destroy({ where: { TrainerId: _trainerId } });
            for (const item of _personalTrainingServiceIds) {
                await UserPersonalTrainingServicesModel_1.default.create({
                    TrainerId: _trainerId,
                    PersonalTrainingServiceId: item,
                }, { transaction });
            }
        }
        else if (_typeId.toString() === enums_1.UserTypeEnum.Client) {
            const getAllByTrainerIdExists = await UserPersonalTrainingServicesModel_1.default.findAll({ where: { ClientId: _clientId } });
            if (getAllByTrainerIdExists)
                await UserPersonalTrainingServicesModel_1.default.destroy({ where: { ClientId: _clientId } });
            for (const item of _personalTrainingServiceIds) {
                await UserPersonalTrainingServicesModel_1.default.create({
                    ClientId: _clientId,
                    PersonalTrainingServiceId: item,
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
        throw new Error(error);
    }
};
exports.createUserPersonalTrainingServiceQuery = createUserPersonalTrainingServiceQuery;
