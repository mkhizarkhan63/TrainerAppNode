"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrUpdateTrainerProfileQuery = exports.getTrainerProfileData = void 0;
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
const personalTrainingService_1 = require("./personalTrainingService");
const specializationService_1 = require("./specializationService");
const trainerService_1 = require("./trainerService");
const languageService_1 = require("./languageService");
const socialLinkService_1 = require("./socialLinkService");
const getTrainerProfileData = async (_trainerId) => {
    try {
        const trainer = await TrainerModel_1.default.findOne({
            where: { Id: _trainerId },
            include: [
                {
                    model: _associations_1.AuthModel,
                    as: "Auth",
                    attributes: ['EmailAddress']
                },
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
                    attributes: ['Id', 'Gender']
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
        const emailAddress = trainer.Auth ? trainer.Auth.EmailAddress : "";
        const profileObj = {
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
        };
        return profileObj;
    }
    catch (error) {
        console.error("Error fetching trainer data:", error);
        throw error;
    }
};
exports.getTrainerProfileData = getTrainerProfileData;
const CreateOrUpdateTrainerProfileQuery = async (_profile) => {
    try {
        //trainer update
        const trainerObj = {
            FirstName: _profile.FirstName,
            LastName: _profile.LastName,
            MobileNumber: _profile.MobileNumber,
            DoB: _profile.DoB,
            CountryResidence: _profile.CountryResidence,
            Description: _profile.Description,
            Nationality: _profile.Nationality,
            GenderId: _profile.GenderId
        };
        const trainer = await (0, trainerService_1.updateTrainerById)(trainerObj, _profile.Id);
        if (trainer) {
            if (_profile.PersonalTrainingservices.length > 0) {
                //UserPersonalTrainingservices Delete
                const isDeleted = await (0, personalTrainingService_1.deleteUserPersonalTrainingByTrainerIdQuery)(_profile.Id);
                //personalTrainingservice create
                await (0, personalTrainingService_1.createUserPersonalTrainingByTrainerIdQuery)(_profile.PersonalTrainingservices, _profile.Id);
            }
            if (_profile.Specializations.length > 0) {
                //specialization delete
                const isDeleted = await (0, specializationService_1.deleteUserSpecializationByTrainerIdQuery)(_profile.Id);
                //specialization create
                await (0, specializationService_1.createUserSpecializationByTrainerIdQuery)(_profile.Specializations, _profile.Id);
            }
            if (_profile.Languages.length > 0) {
                //langauges delete
                const isDeleted = await (0, languageService_1.deleteUserLangugagesByTrainerId)(_profile.Id);
                //langauges create
                await (0, languageService_1.createUserLanguagesByTrainerId)(_profile.Languages, _profile.Id);
            }
            if (_profile.SocialLinks.length > 0) {
                const isDeleted = await (0, socialLinkService_1.deleteSocialLinksByTrainerId)(_profile.Id);
                await (0, socialLinkService_1.createSocialLinksByTrainerId)(_profile.SocialLinks, _profile.Id);
            }
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.error("Error fetching trainer data:", error);
        throw error;
    }
};
exports.CreateOrUpdateTrainerProfileQuery = CreateOrUpdateTrainerProfileQuery;
