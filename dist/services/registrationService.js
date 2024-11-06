"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trainerRegistration = exports.clientRegistration = void 0;
const AuthModel_1 = __importDefault(require("../models/AuthModel"));
const ClientModel_1 = __importDefault(require("../models/ClientModel"));
const TrainerModel_1 = __importDefault(require("../models/TrainerModel"));
const UserLanguagesModel_1 = __importDefault(require("../models/UserLanguagesModel"));
const otpHandler_1 = require("../utils/otpHandler");
// Function to generate a 6-digit OTP
const clientRegistration = async (_client) => {
    const transaction = await ClientModel_1.default.sequelize?.transaction();
    try {
        const newClient = await ClientModel_1.default.create({
            FirstName: _client.FirstName,
            LastName: _client.LastName,
            MobileNumber: _client.MobileNumber,
            DoB: _client.DoB,
            Nationality: _client.Nationality,
            CountryResidence: _client.CountryResidence,
            GenderId: _client.GenderId,
            TypeId: _client.TypeId,
        }, { transaction });
        //sending an email
        const otp = (0, otpHandler_1.generateOTP)();
        const otpExpires = new Date();
        otpExpires.setMinutes(otpExpires.getMinutes() + 5);
        await (0, otpHandler_1.sendEmailService)(_client.EmailAddress, 'OTP', otp);
        await AuthModel_1.default.create({
            EmailAddress: _client.EmailAddress,
            Password: _client.Password,
            TypeId: _client.TypeId,
            ClientId: newClient.Id, // Use the newly created client's Id
            TrainerId: null,
            OTP: otp,
            OTPExpires: otpExpires,
            IsVerified: false
        }, { transaction });
        // Commit the transaction if everything is successful
        await transaction?.commit();
        const authdata = await AuthModel_1.default.findOne({ where: { ClientId: newClient.Id } });
        if (!authdata) {
            await transaction?.rollback();
            return {
                message: "Failed to Create Client",
                //data: userData
            };
        }
        const { Password, ...userData } = authdata?.toJSON();
        return {
            message: "Client Created Successfully",
            data: userData
        };
    }
    catch (error) {
        console.error('Error during login:', error);
        throw new Error('Unable to fetch auth data');
    }
};
exports.clientRegistration = clientRegistration;
const trainerRegistration = async (_trainer) => {
    const transaction = await TrainerModel_1.default.sequelize?.transaction();
    try {
        const newClient = await TrainerModel_1.default.create({
            FirstName: _trainer.FirstName,
            LastName: _trainer.LastName,
            MobileNumber: _trainer.MobileNumber,
            DoB: _trainer.DoB,
            Nationality: _trainer.Nationality,
            CountryResidence: _trainer.CountryResidence,
            GenderId: _trainer.GenderId,
            TypeId: _trainer.TypeId,
        }, { transaction });
        const otp = (0, otpHandler_1.generateOTP)();
        const otpExpires = new Date();
        otpExpires.setMinutes(otpExpires.getMinutes() + 5);
        await (0, otpHandler_1.sendEmailService)(_trainer.EmailAddress, 'OTP', otp);
        await AuthModel_1.default.create({
            EmailAddress: _trainer.EmailAddress,
            Password: _trainer.Password,
            TypeId: _trainer.TypeId,
            ClientId: null, // Use the newly created client's Id
            TrainerId: newClient.Id,
            OTP: otp,
            OTPExpires: otpExpires,
            IsVerified: false
        }, { transaction });
        // Commit the transaction if everything is successful
        await transaction?.commit();
        let langIds = _trainer.LanguagesIds.toString().split(',');
        for (const langId of langIds) {
            await UserLanguagesModel_1.default.create({
                TrainerId: newClient.Id,
                LanguageId: Number(langId),
            });
        }
        const authdata = await AuthModel_1.default.findOne({ where: { TrainerId: newClient.Id } });
        if (!authdata) {
            await transaction?.rollback();
            return {
                message: "Failed to Create Trainer",
                //data: userData
            };
        }
        const { Password, ...userData } = authdata?.toJSON();
        return {
            message: "Trainer Created Successfully",
            data: userData
        };
    }
    catch (error) {
        console.error('Error during login:', error);
        throw new Error('Unable to fetch auth data');
    }
};
exports.trainerRegistration = trainerRegistration;
