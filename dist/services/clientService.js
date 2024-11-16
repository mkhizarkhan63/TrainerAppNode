"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateClientById = exports.getAllClientsQuery = exports.getClientByIdQuery = void 0;
const ClientModel_1 = __importDefault(require("../models/ClientModel"));
const getClientByIdQuery = async (Id) => {
    try {
        const client = await ClientModel_1.default.findOne({ where: { Id: Id } });
        return client;
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.getClientByIdQuery = getClientByIdQuery;
const getAllClientsQuery = async () => {
    try {
        const trainer = await ClientModel_1.default.findAll();
        return trainer;
    }
    catch (error) {
        throw error;
    }
};
exports.getAllClientsQuery = getAllClientsQuery;
const updateClientById = async (_profile, clientId) => {
    try {
        if (_profile.ProfileImage) {
            const obj = await ClientModel_1.default.update({
                FirstName: _profile.FirstName,
                LastName: _profile.LastName,
                MobileNumber: _profile.MobileNumber,
                DoB: _profile.DoB,
                location: _profile.location,
                CountryResidence: _profile.CountryResidence,
                Nationality: _profile.Nationality,
                GenderId: _profile.GenderId,
                ProfileImage: _profile.ProfileImage
            }, {
                where: {
                    Id: clientId,
                },
            });
            if (obj[0] > 0)
                return true;
            else
                return false;
        }
        else {
            const obj = await ClientModel_1.default.update({
                FirstName: _profile.FirstName,
                LastName: _profile.LastName,
                MobileNumber: _profile.MobileNumber,
                DoB: _profile.DoB,
                location: _profile.location,
                CountryResidence: _profile.CountryResidence,
                Nationality: _profile.Nationality,
                GenderId: _profile.GenderId,
            }, {
                where: {
                    Id: clientId,
                },
            });
            if (obj[0] > 0)
                return true;
            else
                return false;
        }
    }
    catch (error) {
        throw error;
    }
};
exports.updateClientById = updateClientById;
