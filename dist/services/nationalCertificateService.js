"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateNationalCertificate = exports.CreateNationalCertificate = void 0;
const connection_1 = __importDefault(require("../database/connection"));
const TrainerModel_1 = __importDefault(require("../models/TrainerModel"));
const UserNationalCertificateModel_1 = __importDefault(require("../models/UserNationalCertificateModel"));
const CreateNationalCertificate = async (_trainerId, path) => {
    const transaction = await connection_1.default?.transaction();
    try {
        const newFile = await UserNationalCertificateModel_1.default.create({
            Name: path
        }, { transaction });
        await TrainerModel_1.default.update({ NationalCertificateId: newFile.Id }, { where: { Id: _trainerId }, transaction });
        await transaction?.commit();
        return {
            Id: newFile.Id,
            Name: path
        };
    }
    catch (error) {
        await transaction?.rollback;
        throw new Error(error);
    }
};
exports.CreateNationalCertificate = CreateNationalCertificate;
const UpdateNationalCertificate = async (_path, _nationalCertificateId) => {
    const transaction = await connection_1.default?.transaction();
    try {
        const newFile = await UserNationalCertificateModel_1.default.update({ Name: _path }, {
            where: { Id: _nationalCertificateId },
            transaction,
        });
        await transaction?.commit();
        return {
            Name: _path,
            Id: _nationalCertificateId
        };
    }
    catch (error) {
        await transaction?.rollback;
        throw new Error(error);
    }
};
exports.UpdateNationalCertificate = UpdateNationalCertificate;
