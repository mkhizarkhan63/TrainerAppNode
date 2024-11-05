import { createTransport } from "nodemailer";
import { google } from "googleapis";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const OAuth2 = google.auth.OAuth2;
const id = process.env.GOOGLE_CLIENT_ID;
const secret = process.env.GOOGLE_SECRET;

const myOAuth2Client = new OAuth2(id, secret);
export default myOAuth2Client;



export const sendEmailService = async (
    to: string,
    subject: string,
    text: string
) => {
    try {
        myOAuth2Client.setCredentials({
            refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
        });
        const accessToken = await myOAuth2Client.getAccessToken();

        const transportOptions: any = {
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: process.env.EMAIL,
                clientId: id,
                refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
                accessToken: accessToken.token,
            },
        };
        const smtpTransport = createTransport(transportOptions);
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
    } catch (error: any) {
        console.error(error);
    }
};

export const generateOTP = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};


