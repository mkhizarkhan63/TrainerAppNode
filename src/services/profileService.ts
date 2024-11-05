import { ITrainerProfile, ITrainerProfileCreate } from "../interfaces/IProfile";
import { GenderModel, SocialLinkModel } from "../models/_associations";
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


export const getTrainerProfileData = async (_trainerId: number): Promise<ITrainerProfile | null> => {
    try {
        const trainer = await TrainerModel.findOne({
            where: { Id: _trainerId },
            include: [
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
                    attributes: ['Gender']
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

        const profileObj: ITrainerProfile = {
            Id: trainer.Id,
            FirstName: trainer.FirstName,
            LastName: trainer.LastName,
            DoB: trainer.DoB,
            CountryResidence: trainer.CountryResidence,
            Gender: Gender,
            MobileNumber: trainer.MobileNumber,
            Nationality: trainer.Nationality,
            Description: trainer.Description,
            TypeId: trainer.TypeId,
            NationalCertificate: NationalCertificate.Name,
            NationalCertificateId: NationalCertificate.Id,
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



export const CreateOrUpdateTrainerProfile = async (_profile: ITrainerProfileCreate) => {
    try {

        //trainer update
        await TrainerModel.update(
            {
                FirstName: _profile.FirstName,
                LastName: _profile.LastName,
                MobileNumber: _profile.MobileNumber,
                DoB: _profile.DoB,
                CountryResidence: _profile.CountryResidence,
                Description: _profile.Description,
                Nationality: _profile.Nationality,

            },
            {
                where: {
                    Id: _profile.Id,
                },
            },
        );



        if (_profile.PersonalTrainingservices.length > 0) {
            //UserPersonalTrainingservices Delete
            await UserPersonalTrainingServicesModel.destroy({
                where: {
                    TrainerId: _profile.Id //trainerId
                },
            });

            //personalTrainingservice create
            _profile.PersonalTrainingservices.forEach(async item => {
                await UserPersonalTrainingServicesModel.create({ PersonalTrainingServiceId: item, TrainerId: _profile.Id });
            });
        }

        if (_profile.Specializations.length > 0) {
            //specialization delete
            await UserSpecializationModel.destroy({
                where: {
                    TrainerId: _profile.Id //trainerId
                },
            });

            //specialization create
            _profile.Specializations.forEach(async id => {
                await UserSpecializationModel.create({ SpecializationId: id, TrainerId: _profile.Id });
            })
        }

    } catch (error) {
        console.error("Error fetching trainer data:", error);
        throw error;
    }
}