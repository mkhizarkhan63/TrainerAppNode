import { ITrainerRequestDTO } from './../interfaces/ITrainer';
import { ITrainerProfile, ITrainerProfileCreate } from "../interfaces/IProfile";
import { AuthModel, GenderModel, SocialLinkModel } from "../models/_associations";
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
import { createUserPersonalTrainingByTrainerIdQuery, deleteUserPersonalTrainingByTrainerIdQuery } from "./personalTrainingService";
import { createUserSpecializationByTrainerIdQuery, deleteUserSpecializationByTrainerIdQuery } from "./specializationService";
import { updateTrainerById } from "./trainerService";
import { createUserLanguagesByTrainerId, deleteUserLangugagesByTrainerId } from './languageService';
import { createSocialLinksByTrainerId, deleteSocialLinksByTrainerId } from './socialLinkService';


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
            console.log("Trainer not found");
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

        const { Gender } = trainer.Gender;

        const NationalCertificate = trainer.UserNationalCertificates;

        const emailAddress = trainer.Auth ? trainer.Auth.EmailAddress : ""
        const profileObj: ITrainerProfile = {
            Id: trainer.Id,
            EmailAddress: emailAddress,
            FirstName: trainer.FirstName,
            LastName: trainer.LastName,
            DoB: trainer.DoB,
            CountryResidence: trainer.CountryResidence,
            Gender: Gender,
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



export const CreateOrUpdateTrainerProfileQuery = async (_profile: ITrainerProfileCreate) => {
    try {

        //trainer update

        const trainerObj: ITrainerRequestDTO = {
            FirstName: _profile.FirstName,
            LastName: _profile.LastName,
            MobileNumber: _profile.MobileNumber,
            DoB: _profile.DoB,
            CountryResidence: _profile.CountryResidence,
            Description: _profile.Description,
            Nationality: _profile.Nationality,
            GenderId: _profile.GenderId
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