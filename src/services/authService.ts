import { ILoginResponse } from '../interfaces/IAuth';
import Auth from '../models/AuthModel';
import { generateOTP, sendEmailService } from '../utils/otpHandler';
import { getClientByIdQuery } from './clientService';
import { getTrainerByIdQuery } from './trainerService';



export const login = async (EmailAddress: string, Password: string): Promise<ILoginResponse | null> => {
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
        if (auth) {
            const loginResponse: ILoginResponse = {
                Id: auth.Id,
                EmailAddress: auth.EmailAddress,
                IsVerified: auth.IsVerified,
                ClientId: auth.ClientId,
                OTP: auth.OTP,
                OTPExpires: auth.OTPExpires,
                TrainerId: auth.TrainerId,
                TypeId: auth.TypeId,
            }
            if (auth.TrainerId) {
                const trainer = await getTrainerByIdQuery(auth.TrainerId);
                loginResponse.FirstName = trainer?.FirstName
                loginResponse.LastName = trainer?.LastName
                loginResponse.ProfileImage = trainer?.ProfileImage
                return loginResponse
            }

            if (auth.ClientId) {
                const client = await getClientByIdQuery(auth.ClientId);
                loginResponse.FirstName = client?.FirstName
                loginResponse.LastName = client?.LastName
                loginResponse.ProfileImage = client?.ProfileImage
                return loginResponse
            }
            return null;
        } else {
            return null;
        }
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