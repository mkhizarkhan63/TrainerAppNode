"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrUpdateTrainerProfile = exports.getTrainerProfileData = void 0;
const _associations_1 = require("../models/_associations");
const CertificateModel_1 = __importDefault(require("../models/CertificateModel"));
const LanguageModel_1 = __importDefault(require("../models/LanguageModel"));
const PersonalTrainingServicesModel_1 = __importDefault(require("../models/PersonalTrainingServicesModel"));
const SpecializationModel_1 = __importDefault(require("../models/SpecializationModel"));
const TrainerModel_1 = __importDefault(require("../models/TrainerModel"));
const UserCertificateModel_1 = __importDefault(require("../models/UserCertificateModel"));
const UserLanguagesModel_1 = __importDefault(require("../models/UserLanguagesModel"));
const UserNationalCertificateModel_1 = __importDefault(require("../models/UserNationalCertificateModel"));
const UserPersonalTrainingServicesModel_1 = __importDefault(require("../models/UserPersonalTrainingServicesModel"));
const UserSpecializationModel_1 = __importDefault(require("../models/UserSpecializationModel"));
const getTrainerProfileData = async (_trainerId) => {
    try {
        const trainer = await TrainerModel_1.default.findOne({
            where: { Id: _trainerId },
            include: [
                {
                    model: UserPersonalTrainingServicesModel_1.default,
                    as: "UserPersonalTrainingServices",
                    include: [
                        {
                            model: PersonalTrainingServicesModel_1.default,
                            as: "PersonalTrainingService",
                            attributes: ['Id', 'Name'] // Specify fields from PersonalTrainingServicesModel
                        }
                    ]
                },
                {
                    model: UserSpecializationModel_1.default,
                    as: "UserSpecialization",
                    include: [
                        {
                            model: SpecializationModel_1.default,
                            as: "Specializations",
                            attributes: ['Id', 'Name']
                        }
                    ]
                },
                {
                    model: UserLanguagesModel_1.default,
                    as: "UserLanguages",
                    include: [{
                            model: LanguageModel_1.default,
                            as: "Languages",
                            attributes: ['Id', 'Name']
                        }]
                },
                {
                    //Certificates Join
                    model: UserCertificateModel_1.default,
                    as: "UserCertificates",
                    include: [
                        {
                            model: CertificateModel_1.default,
                            as: "Certificates",
                            attributes: ['Id', 'Name']
                        }
                    ]
                },
                {
                    model: UserNationalCertificateModel_1.default,
                    as: "UserNationalCertificates",
                    attributes: ['Id', 'Name']
                },
                {
                    model: _associations_1.GenderModel,
                    as: "Gender",
                    attributes: ['Gender']
                },
                {
                    model: _associations_1.SocialLinkModel,
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
            return x.Languages;
        });
        const certificates = trainer.UserCertificates.map(x => {
            return x.Certificates;
        });
        const { Gender } = trainer.Gender;
        const NationalCertificate = trainer.UserNationalCertificates;
        const profileObj = {
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
        };
        return profileObj;
    }
    catch (error) {
        console.error("Error fetching trainer data:", error);
        throw error;
    }
};
exports.getTrainerProfileData = getTrainerProfileData;
const CreateOrUpdateTrainerProfile = async (_profile) => {
    try {
        //trainer update
        await TrainerModel_1.default.update({
            FirstName: _profile.FirstName,
            LastName: _profile.LastName,
            MobileNumber: _profile.MobileNumber,
            DoB: _profile.DoB,
            CountryResidence: _profile.CountryResidence,
            Description: _profile.Description,
            Nationality: _profile.Nationality,
        }, {
            where: {
                Id: _profile.Id,
            },
        });
        if (_profile.PersonalTrainingservices.length > 0) {
            //UserPersonalTrainingservices Delete
            await UserPersonalTrainingServicesModel_1.default.destroy({
                where: {
                    TrainerId: _profile.Id //trainerId
                },
            });
            //personalTrainingservice create
            _profile.PersonalTrainingservices.forEach(async (item) => {
                await UserPersonalTrainingServicesModel_1.default.create({ PersonalTrainingServiceId: item, TrainerId: _profile.Id });
            });
        }
        if (_profile.Specializations.length > 0) {
            //specialization delete
            await UserSpecializationModel_1.default.destroy({
                where: {
                    TrainerId: _profile.Id //trainerId
                },
            });
            //specialization create
            _profile.Specializations.forEach(async (id) => {
                await UserSpecializationModel_1.default.create({ SpecializationId: id, TrainerId: _profile.Id });
            });
        }
    }
    catch (error) {
        console.error("Error fetching trainer data:", error);
        throw error;
    }
};
exports.CreateOrUpdateTrainerProfile = CreateOrUpdateTrainerProfile;
