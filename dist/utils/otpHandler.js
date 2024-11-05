"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOTP = exports.sendEmailService = void 0;
const nodemailer_1 = require("nodemailer");
const googleapis_1 = require("googleapis");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
const OAuth2 = googleapis_1.google.auth.OAuth2;
const id = process.env.GOOGLE_CLIENT_ID;
const secret = process.env.GOOGLE_SECRET;
const myOAuth2Client = new OAuth2(id, secret);
exports.default = myOAuth2Client;
const sendEmailService = async (to, subject, text) => {
    try {
        myOAuth2Client.setCredentials({
            refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
        });
        const accessToken = await myOAuth2Client.getAccessToken();
        const transportOptions = {
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: process.env.EMAIL,
                clientId: id,
                refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
                accessToken: accessToken.token,
            },
        };
        const smtpTransport = (0, nodemailer_1.createTransport)(transportOptions);
        const mailOptions = {
            from: {
                name: "Trainer",
                address: "no-reply@gmail.com",
            },
            to,
            subject,
            text: `Your OTP is: ${text}`
        };
        await smtpTransport.sendMail(mailOptions);
    }
    catch (error) {
        console.error(error);
    }
};
exports.sendEmailService = sendEmailService;
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};
exports.generateOTP = generateOTP;
