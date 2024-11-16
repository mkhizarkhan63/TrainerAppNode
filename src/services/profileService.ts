import { ITrainerRequestDTO } from './../interfaces/ITrainer';
import { IClientProfile, IClientProfileDTO, ITrainerProfile, ITrainerProfileDTO } from "../interfaces/IProfile";
import { AuthModel, ClientModel, GenderModel, SocialLinkModel } from "../models/_associations";
import CertificateModel from "../models/CertificateModel";
import LanguageModel from "../models/LanguageModel";
import PersonalTrainingServicesModel from "../models/PersonalTrainingServicesModel";
import SpecializationModel from "../models/SpecializationModel";
import TrainerModel from "../models/TrainerModel";
import UserCertificateModel from "../models/UserCertificateModel";
import UserLanguageModel from "../models/UserLanguagesModel";
import UserNationalCertificateModel from "../models/UserNationalCertificateModel";
import UserPersonalTrainingServicesModel from "../models/UserPersonalTrainingServicesModel";
import UserSpecializationModel from "../models/UserSpecializationModel";
import { createUserPersonalTrainingByClientIdQuery, createUserPersonalTrainingByTrainerIdQuery, deleteUserPersonalTrainingByClientIdQuery, deleteUserPersonalTrainingByTrainerIdQuery } from "./personalTrainingService";
import { createUserSpecializationByClientIdQuery, createUserSpecializationByTrainerIdQuery, deleteUserSpecializationByClientIdQuery, deleteUserSpecializationByTrainerIdQuery } from "./specializationService";
import { updateTrainerById } from "./trainerService";
import { createUserLanguagesByTrainerId, deleteUserLangugagesByTrainerId } from './languageService';
import { createSocialLinksByTrainerId, deleteSocialLinksByTrainerId } from './socialLinkService';
import { IClientRequestDTO } from '../interfaces/IClient';
import { updateClientById } from './clientService';


//#region  Trainer
export const getTrainerProfileData = async (_trainerId: number): Promise<ITrainerProfile | null> => {
    try {
        const trainer = await TrainerModel.findOne({
            where: { Id: _trainerId },
            include: [
                {
                    model: AuthModel,
                    as: "Auth",
                    attributes: ['EmailAddress']

                },

                {//PersonalTraining Join
                    model: UserPersonalTrainingServicesModel,
                    as: "UserPersonalTrainingServices",
                    include: [
                        {
                            model: PersonalTrainingServicesModel,
                            as: "PersonalTrainingService",
                            attributes: ['Id', 'Name'] // Specify fields from PersonalTrainingServicesModel
                        }
                    ]
                },
                { //Specialization Join
                    model: UserSpecializationModel,
                    as: "UserSpecialization",
                    include: [
                        {
                            model: SpecializationModel,
                            as: "Specializations",
                            attributes: ['Id', 'Name']
                        }
                    ]
                },
                { //Languages join
                    model: UserLanguageModel,
                    as: "UserLanguages",
                    include: [{
                        model: LanguageModel,
                        as: "Languages",
                        attributes: ['Id', 'Name']
                    }]
                },
                {
                    //Certificates Join
                    model: UserCertificateModel,
                    as: "UserCertificates",
                    include: [
                        {
                            model: CertificateModel,
                            as: "Certificates",
                            attributes: ['Id', 'Name']
                        }
                    ]
                },
                {
                    model: UserNationalCertificateModel,
                    as: "UserNationalCertificates",
                    attributes: ['Id', 'Name']
                },
                {
                    model: GenderModel,
                    as: "Gender",
                    attributes: ['Id', 'Gender']
                },
                {
                    model: SocialLinkModel,
                    as: "SocialLinks",
                    attributes: ['Id', 'SocialLink']
                }


            ]
        });

        // If trainer not found, return null
        if (!trainer) {
            return null;
        }

        // Reshape the data to extract services
        const personalTrainingServices = trainer.UserPersonalTrainingServices.map(x => {
            return x.PersonalTrainingService;
        });

        const specialization = trainer.UserSpecialization.map(x => {
            return x.Specializations;
        });

        const languages = trainer.UserLanguages.map(x => {
            return x.Languages
        });

        const certificates = trainer.UserCertificates.map(x => {
            return x.Certificates
        });

        // const { Gender } = trainer.Gender;

        const NationalCertificate = trainer.UserNationalCertificates;

        const emailAddress = trainer.Auth ? trainer.Auth.EmailAddress : ""
        const profileObj: ITrainerProfile = {
            Id: trainer.Id,
            EmailAddress: emailAddress,
            FirstName: trainer.FirstName,
            LastName: trainer.LastName,
            ProfileImage: trainer.ProfileImage,
            DoB: trainer.DoB,
            CountryResidence: trainer.CountryResidence,
            Gender: trainer.Gender,
            Location : trainer.location,
            MobileNumber: trainer.MobileNumber,
            Nationality: trainer.Nationality,
            Description: trainer.Description,
            TypeId: trainer.TypeId,
            NationalCertificate: NationalCertificate,
            PersonalTrainingservices: personalTrainingServices,
            Specializations: specialization,
            Languages: languages,
            Certificates: certificates,
            SocialLinks: trainer.SocialLinks
        }
        return profileObj

    } catch (error) {
        console.error("Error fetching trainer data:", error);
        throw error;
    }
}


export const CreateOrUpdateTrainerProfileQuery = async (_profile: ITrainerProfileDTO) => {
    try {
        //trainer update

        const trainerObj: ITrainerRequestDTO = {
            FirstName: _profile.FirstName,
            LastName: _profile.LastName,
            MobileNumber: _profile.MobileNumber,
            DoB: _profile.DoB,
            location: _profile.location,
            CountryResidence: _profile.CountryResidence,
            Description: _profile.Description,
            Nationality: _profile.Nationality,
            GenderId: _profile.GenderId,
            ProfileImage: _profile.profilePicture
        };

        const trainer = await updateTrainerById(trainerObj, _profile.Id);

        if (trainer) {

            if (_profile.PersonalTrainingservices.length > 0) {
                //UserPersonalTrainingservices Delete
                const isDeleted = await deleteUserPersonalTrainingByTrainerIdQuery(_profile.Id);

                //personalTrainingservice create
                await createUserPersonalTrainingByTrainerIdQuery(_profile.PersonalTrainingservices, _profile.Id);
            }

            if (_profile.Specializations.length > 0) {
                //specialization delete
                const isDeleted = await deleteUserSpecializationByTrainerIdQuery(_profile.Id);
                //specialization create
                await createUserSpecializationByTrainerIdQuery(_profile.Specializations, _profile.Id);
            }

            if (_profile.Languages.length > 0) {
                //langauges delete
                const isDeleted = await deleteUserLangugagesByTrainerId(_profile.Id);
                //langauges create
                await createUserLanguagesByTrainerId(_profile.Languages, _profile.Id);
            }

            if (_profile.SocialLinks.length > 0) {
                const isDeleted = await deleteSocialLinksByTrainerId(_profile.Id);
                await createSocialLinksByTrainerId(_profile.SocialLinks, _profile.Id);
            }
            return true;
        }
        else {
            return false;
        }

    } catch (error) {
        console.error("Error fetching trainer data:", error);
        throw error;
    }
}
//#endregion

//#region  Client
export const getClientProfileData = async (_clientId: number) => {
    try {
        const client = await ClientModel.findOne({
            where: { Id: _clientId },
            include: [
                {
                    model: AuthModel,
                    as: "Auth",
                    attributes: ['EmailAddress']

                },
                {//PersonalTraining Join
                    model: UserPersonalTrainingServicesModel,
                    as: "UserPersonalTrainingServices",
                    include: [
                        {
                            model: PersonalTrainingServicesModel,
                            as: "PersonalTrainingService",
                            attributes: ['Id', 'Name'] // Specify fields from PersonalTrainingServicesModel
                        }
                    ]
                },
                { //Specialization Join
                    model: UserSpecializationModel,
                    as: "UserSpecialization",
                    include: [
                        {
                            model: SpecializationModel,
                            as: "Specializations",
                            attributes: ['Id', 'Name']
                        }
                    ]
                },
                {
                    model: GenderModel,
                    as: "Gender",
                    attributes: ['Id', 'Gender']
                },
            ]
        });
        // If trainer not found, return null
        if (!client) {
            return null;
        }

        // Reshape the data to extract services
        const personalTrainingServices = client.UserPersonalTrainingServices.map(x => {
            return x.PersonalTrainingService;
        });

        const specialization = client.UserSpecialization.map(x => {
            return x.Specializations;
        });
        // const { Gender } = client.Gender;
        const emailAddress = client.Auth ? client.Auth.EmailAddress : ""
        const profileObj: IClientProfile = {
            Id: client.Id,
            EmailAddress: emailAddress,
            FirstName: client.FirstName,
            LastName: client.LastName,
            DoB: client.DoB,
            CountryResidence: client.CountryResidence,
            Gender: client.Gender,
            Location : client.location,
            MobileNumber: client.MobileNumber,
            Nationality: client.Nationality,
            TypeId: client.TypeId,
            PersonalTrainingservices: personalTrainingServices,
            Specializations: specialization

        }
        return profileObj;
    } catch (error) {
        throw error;
    }
}

export const CreateOrUpdateClientProfileQuery = async (_profile: IClientProfileDTO) => {
    try {

        const clientObj: IClientRequestDTO = {
            FirstName: _profile.FirstName,
            LastName: _profile.LastName,
            MobileNumber: _profile.MobileNumber,
            DoB: _profile.DoB,
            location: _profile.location,
            CountryResidence: _profile.CountryResidence,
            Description: _profile.Description,
            Nationality: _profile.Nationality,
            GenderId: _profile.GenderId,
            ProfileImage: _profile.profilePicture
        };
        //update client
        const client = await updateClientById(clientObj, _profile.Id);

        if (client) {

            if (_profile.PersonalTrainingservices.length > 0) {
                //UserPersonalTrainingservices Delete
                const isDeleted = await deleteUserPersonalTrainingByClientIdQuery(_profile.Id);

                //personalTrainingservice create
                await createUserPersonalTrainingByClientIdQuery(_profile.PersonalTrainingservices, _profile.Id);
            }

            if (_profile.Specializations.length > 0) {
                //specialization delete
                const isDeleted = await deleteUserSpecializationByClientIdQuery(_profile.Id);
                //specialization create
                await createUserSpecializationByClientIdQuery(_profile.Specializations, _profile.Id);
            }

            return true;
        }
        else {
            return false;
        }
    } catch (error) {
        throw error;
    }
}
//#endregion