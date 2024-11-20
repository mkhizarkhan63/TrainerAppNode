"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResendOTP = exports.CheckOTP = exports.auth = void 0;
const userService_1 = require("./../services/userService");
const responseUtils_1 = require("../utils/responseUtils");
const authService_1 = require("../services/authService");
const auth = async (req, res) => {
    const { emailAddress, password } = req.body;
    try {
        const auth = await (0, authService_1.login)(emailAddress, password);
        if (!auth) {
            const exits = await (0, userService_1.userByEmailExists)(emailAddress);
            if (exits)
                res.json((0, responseUtils_1.successResponse)("Invalid Credentials", 400));
            res.json((0, responseUtils_1.successResponse)("User Not Found", 404));
        }
        if (auth != null) {
            const { ...userData } = auth;
            res.json((0, responseUtils_1.successResponse)("Login Successfully", 200, userData));
        }
    }
    catch (error) {
        console.error('Error during login:', error);
        res.json((0, responseUtils_1.errorResponse)("Internal Server Error", 500, error));
    }
};
exports.auth = auth;
const CheckOTP = async (req, res) => {
    const { emailAddress, otp } = req.body;
    const check = await (0, authService_1.checkotp)(emailAddress, otp);
    const currentTime = new Date();
    if (check) {
        if (currentTime > check.OTPExpires) {
            res.json((0, responseUtils_1.successResponse)("OTP has Expired!", 400, true));
        }
        else {
            res.json((0, responseUtils_1.successResponse)("OTP Verified Successfully!", 200, false));
        }
    }
    else {
        res.json((0, responseUtils_1.successResponse)("Invalid OTP!", 400, true));
    }
};
exports.CheckOTP = CheckOTP;
const ResendOTP = async (req, res) => {
    const { emailAddress } = req.body;
    const resend = await (0, authService_1.resendOtp)(emailAddress);
    if (resend)
        res.json((0, responseUtils_1.successResponse)("OTP has been Send Successfully", 200));
    else
        res.json((0, responseUtils_1.successResponse)("Something went wrong", 400));
};
exports.ResendOTP = ResendOTP;
