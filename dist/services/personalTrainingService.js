"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserPersonalTrainingByClientIdQuery = exports.deleteUserPersonalTrainingByClientIdQuery = exports.createUserPersonalTrainingByTrainerIdQuery = exports.deleteUserPersonalTrainingByTrainerIdQuery = exports.createUserPersonalTrainingServiceQuery = exports.getPersonalTrainingServiceByIdQuery = exports.getAllPersonalTrainingServiceQuery = void 0;
const connection_1 = __importDefault(require("../database/connection"));
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
const deleteUserPersonalTrainingByTrainerIdQuery = async (_trainerId) => {
    try {
        const obj = await UserPersonalTrainingServicesModel_1.default.destroy({
            where: {
                TrainerId: _trainerId
            },
        });
        if (obj > 0)
            return true;
        else
            return false;
    }
    catch (error) {
        throw error;
    }
};
exports.deleteUserPersonalTrainingByTrainerIdQuery = deleteUserPersonalTrainingByTrainerIdQuery;
const createUserPersonalTrainingByTrainerIdQuery = async (_PersonalTrainingservicesIds, _trainerId) => {
    const transaction = await connection_1.default.transaction();
    try {
        // Use a for...of loop to await each create operation
        const personalTrainingServicesIds = _PersonalTrainingservicesIds.split(",");
        for (const item of personalTrainingServicesIds) {
            await UserPersonalTrainingServicesModel_1.default.create({ PersonalTrainingServiceId: parseInt(item), TrainerId: _trainerId }, { transaction });
        }
        // Commit the transaction after all operations succeed
        await transaction.commit();
        return true;
    }
    catch (error) {
        // Rollback the transaction if an error occurs
        await transaction.rollback();
        throw error;
    }
};
exports.createUserPersonalTrainingByTrainerIdQuery = createUserPersonalTrainingByTrainerIdQuery;
//#region  Client
const deleteUserPersonalTrainingByClientIdQuery = async (_clientId) => {
    try {
        const obj = await UserPersonalTrainingServicesModel_1.default.destroy({
            where: {
                ClientId: _clientId
            },
        });
        if (obj > 0)
            return true;
        else
            return false;
    }
    catch (error) {
        throw error;
    }
};
exports.deleteUserPersonalTrainingByClientIdQuery = deleteUserPersonalTrainingByClientIdQuery;
const createUserPersonalTrainingByClientIdQuery = async (_PersonalTrainingservicesIds, _clientId) => {
    const transaction = await connection_1.default.transaction();
    try {
        // Use a for...of loop to await each create operation
        const personalTrainingServicesIds = _PersonalTrainingservicesIds.split(",");
        for (const item of personalTrainingServicesIds) {
            await UserPersonalTrainingServicesModel_1.default.create({ PersonalTrainingServiceId: parseInt(item), ClientId: _clientId }, { transaction });
        }
        // Commit the transaction after all operations succeed
        await transaction.commit();
        return true;
    }
    catch (error) {
        // Rollback the transaction if an error occurs
        await transaction.rollback();
        throw error;
    }
};
exports.createUserPersonalTrainingByClientIdQuery = createUserPersonalTrainingByClientIdQuery;
//#endregion
