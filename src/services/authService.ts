import Auth from '../models/AuthModel';
import { generateOTP, sendEmailService } from '../utils/otpHandler';



export const login = async (EmailAddress: string, Password: string) => {
    try {
        const auth = await Auth.findOne({ where: { EmailAddress, Password } });
        if (!auth?.IsVerified) {
            //sending an email
            const otp = generateOTP();
            const otpExpires = new Date();
            otpExpires.setMinutes(otpExpires.getMinutes() + 5);
            await sendEmailService(EmailAddress, 'OTP', otp);
            await Auth.update({ OTP: otp, OTPExpires: otpExpires }, { where: { EmailAddress: EmailAddress } })
        }
        return auth;
    } catch (error) {
        console.error('Error during login:', error); // Log error
        throw new Error('Unable to fetch auth data');
    }
}


export const checkotp = async (email: string, otp: string) => {
    try {
        const obj = await Auth.findOne({ where: { EmailAddress: email, OTP: otp } });
        if (obj) {
            await Auth.update({ IsVerified: true }, { where: { EmailAddress: email } })
        }
        return obj;
    } catch (error) {
        throw new Error('Unable to fetch auth data');
    }

}

export const resendOtp = async (email: string) => {
    try {
        const obj = await Auth.findOne({ where: { EmailAddress: email } });
        if (obj) {
            //sending an email
            const otp = generateOTP();
            const otpExpires = new Date();
            otpExpires.setMinutes(otpExpires.getMinutes() + 5);
            await sendEmailService(email, 'OTP', otp);
            await Auth.update({ OTP: otp, OTPExpires: otpExpires }, { where: { EmailAddress: email } })

        }
        return obj;
    } catch (error) {
        throw new Error('Unable to fetch auth data');
    }

}