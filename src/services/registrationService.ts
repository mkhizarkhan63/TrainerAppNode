import { IClientDTO } from "../interfaces/IClient";
import { ITrainerDTO } from "../interfaces/ITrainer";
import AuthModel from "../models/AuthModel";
import ClientModel from "../models/ClientModel";
import TrainerModel from "../models/TrainerModel";
import UserCertificateModel from "../models/UserCertificateModel";
import UserLanguageModel from "../models/UserLanguagesModel";
import { generateOTP, sendEmailService } from "../utils/otpHandler";


// Function to generate a 6-digit OTP

export const clientRegistration = async (_client: IClientDTO) => {

    const transaction = await ClientModel.sequelize?.transaction();
    try {

        const newClient = await ClientModel.create({
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
        const otp = generateOTP();
        const otpExpires = new Date();
        otpExpires.setMinutes(otpExpires.getMinutes() + 5);

        await sendEmailService(_client.EmailAddress, 'OTP', otp);

        await AuthModel.create({
            EmailAddress: _client.EmailAddress,
            Password: _client.Password,
            TypeId: _client.TypeId,
            ClientId: newClient.Id,  // Use the newly created client's Id
            TrainerId: null,
            OTP: otp,
            OTPExpires: otpExpires,
            IsVerified: false
        }, { transaction });
        // Commit the transaction if everything is successful
        await transaction?.commit();

        const authdata = await AuthModel.findOne({ where: { ClientId: newClient.Id } });
        if (!authdata) {
            await transaction?.rollback()
            return {
                message: "Failed to Create Client",
                //data: userData
            }
        }
        const { Password, ...userData } = authdata?.toJSON();
        return {
            message: "Client Created Successfully",
            data: userData
        }
    } catch (error) {
        console.error('Error during login:', error);
        throw new Error('Unable to fetch auth data');
    }
}



export const trainerRegistration = async (_trainer: ITrainerDTO) => {
    const transaction = await TrainerModel.sequelize?.transaction();
    try {

        const newClient = await TrainerModel.create({
            FirstName: _trainer.FirstName,
            LastName: _trainer.LastName,
            MobileNumber: _trainer.MobileNumber,
            DoB: _trainer.DoB,
            Nationality: _trainer.Nationality,
            CountryResidence: _trainer.CountryResidence,
            GenderId: _trainer.GenderId,
            TypeId: _trainer.TypeId,
        }, { transaction });
        const otp = generateOTP();
        const otpExpires = new Date();
        otpExpires.setMinutes(otpExpires.getMinutes() + 5);

        await sendEmailService(_trainer.EmailAddress, 'OTP', otp);

        await AuthModel.create({
            EmailAddress: _trainer.EmailAddress,
            Password: _trainer.Password,
            TypeId: _trainer.TypeId,
            ClientId: null,  // Use the newly created client's Id
            TrainerId: newClient.Id,
            OTP: otp,
            OTPExpires: otpExpires,
            IsVerified: false
        }, { transaction });

        // Commit the transaction if everything is successful
        await transaction?.commit();

       
        let langIds = _trainer.LanguagesIds.toString().split(',');
        for (const langId of langIds) {
            await UserLanguageModel.create({
                TrainerId: newClient.Id,
                LanguageId: Number(langId),
            });
        }

        const authdata = await AuthModel.findOne({ where: { TrainerId: newClient.Id } });
        if (!authdata) {
            await transaction?.rollback()
            return {
                message: "Failed to Create Trainer",
                //data: userData
            }
        }
        const { Password, ...userData } = authdata?.toJSON();
        return {
            message: "Trainer Created Successfully",
            data: userData
        }

    } catch (error) {
        console.error('Error during login:', error);
        throw new Error('Unable to fetch auth data');
    }
}