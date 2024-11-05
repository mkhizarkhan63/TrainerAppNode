import { userByEmailExists } from './../services/userService';
import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/responseUtils";
import { checkotp, login, resendOtp } from "../services/authService";


export const auth = async (req: Request, res: Response): Promise<void> => {

    const { emailAddress, password } = req.body;
    try {
        const auth = await login(emailAddress, password);
        if (!auth) {
            const exits = await userByEmailExists(emailAddress);
            if (exits)
                res.json(successResponse("Invalid Credentials", 400));
            res.json(successResponse("User Not Found", 404));
        }

        if (auth != null) {
            const { Password, ...userData } = auth.toJSON();
            res.json(successResponse("Login Successfully", 200, userData));
        }

    } catch (error) {
        console.error('Error during login:', error);
        res.json(errorResponse("Internal Server Error", 500, error));
    }

};

export const CheckOTP = async (req: Request, res: Response): Promise<void> => {
    const { emailAddress, otp } = req.body;
    const check = await checkotp(emailAddress, otp);

    const currentTime = new Date();
    if (check) {
        if (currentTime > check.OTPExpires) {
            res.json(successResponse("OTP has Expired!", 400, true));
        } else {
            res.json(successResponse("OTP Verified Successfully!", 200, false));
        }
    }
    else {
        res.json(successResponse("Invalid OTP!", 400, true));
    }
}


export const ResendOTP = async (req: Request, res: Response): Promise<void> => {

    const { emailAddress } = req.body;
    const resend = await resendOtp(emailAddress);
    if (resend)
        res.json(successResponse("OTP has been Send Successfully", 200));
    else
        res.json(successResponse("Something went wrong", 400));
}