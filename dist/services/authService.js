"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resendOtp = exports.checkotp = exports.login = void 0;
const AuthModel_1 = __importDefault(require("../models/AuthModel"));
const otpHandler_1 = require("../utils/otpHandler");
const clientService_1 = require("./clientService");
const trainerService_1 = require("./trainerService");
const login = async (EmailAddress, Password) => {
    try {
        const auth = await AuthModel_1.default.findOne({ where: { EmailAddress, Password } });
        if (!auth?.IsVerified) {
            //sending an email
            const otp = (0, otpHandler_1.generateOTP)();
            const otpExpires = new Date();
            otpExpires.setMinutes(otpExpires.getMinutes() + 5);
            await (0, otpHandler_1.sendEmailService)(EmailAddress, 'OTP', otp);
            await AuthModel_1.default.update({ OTP: otp, OTPExpires: otpExpires }, { where: { EmailAddress: EmailAddress } });
        }
        if (auth) {
            const loginResponse = {
                Id: auth.Id,
                EmailAddress: auth.EmailAddress,
                IsVerified: auth.IsVerified,
                ClientId: auth.ClientId,
                OTP: auth.OTP,
                OTPExpires: auth.OTPExpires,
                TrainerId: auth.TrainerId,
                TypeId: auth.TypeId,
            };
            if (auth.TrainerId) {
                const trainer = await (0, trainerService_1.getTrainerByIdQuery)(auth.TrainerId);
                loginResponse.FirstName = trainer?.FirstName;
                loginResponse.LastName = trainer?.LastName;
                loginResponse.ProfileImage = trainer?.ProfileImage;
                return loginResponse;
            }
            if (auth.ClientId) {
                const client = await (0, clientService_1.getClientByIdQuery)(auth.ClientId);
                loginResponse.FirstName = client?.FirstName;
                loginResponse.LastName = client?.LastName;
                loginResponse.ProfileImage = client?.ProfileImage;
                return loginResponse;
            }
            return null;
        }
        else {
            return null;
        }
    }
    catch (error) {
        console.error('Error during login:', error); // Log error
        throw new Error('Unable to fetch auth data');
    }
};
exports.login = login;
const checkotp = async (email, otp) => {
    try {
        const obj = await AuthModel_1.default.findOne({ where: { EmailAddress: email, OTP: otp } });
        if (obj) {
            await AuthModel_1.default.update({ IsVerified: true }, { where: { EmailAddress: email } });
        }
        return obj;
    }
    catch (error) {
        throw new Error('Unable to fetch auth data');
    }
};
exports.checkotp = checkotp;
const resendOtp = async (email) => {
    try {
        const obj = await AuthModel_1.default.findOne({ where: { EmailAddress: email } });
        if (obj) {
            //sending an email
            const otp = (0, otpHandler_1.generateOTP)();
            const otpExpires = new Date();
            otpExpires.setMinutes(otpExpires.getMinutes() + 5);
            await (0, otpHandler_1.sendEmailService)(email, 'OTP', otp);
            await AuthModel_1.default.update({ OTP: otp, OTPExpires: otpExpires }, { where: { EmailAddress: email } });
        }
        return obj;
    }
    catch (error) {
        throw new Error('Unable to fetch auth data');
    }
};
exports.resendOtp = resendOtp;
