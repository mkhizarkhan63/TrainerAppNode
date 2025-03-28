import AuthModel from "./AuthModel";
import CertificateModel from "./CertificateModel";
import ClientModel from "./ClientModel";
import GenderModel from "./GenderModel";
import LanguageModel from "./LanguageModel";
import PersonalTrainingServicesModel from "./PersonalTrainingServicesModel";
import SpecializationModel from "./SpecializationModel";
import TrainerModel from "./TrainerModel";
import UserPersonalTrainingServicesModel from "./UserPersonalTrainingServicesModel";
import UserSpecializationModel from "./UserSpecializationModel";
import TypeModel from "./TypeModel";
import UserCertificateModel from "./UserCertificateModel";
import UserLanguageModel from "./UserLanguagesModel";
import UserNationalCertificateModel from "./UserNationalCertificateModel";
import SocialLinkModel from "./SocialLinksModel";
import TrainerMediaModel from "./TranierMediaModel";
import ReviewModel from "./ReviewsModel";
import ActivitesModel from "./ActivitiesModel";
import SessionModel from "./SessionsModel";
import SessionParticipantModel from "./SessionParticipantModel";

// Define associations between TypeModel and auth
TypeModel.hasMany(AuthModel, { foreignKey: 'TypeId' });
AuthModel.belongsTo(TypeModel, { foreignKey: 'TypeId' });


// Define associations between ClientModel, auth , TypeModel
ClientModel.belongsTo(TypeModel, { foreignKey: 'TypeId' });
TypeModel.hasMany(ClientModel, { foreignKey: 'TypeId' });

ClientModel.belongsTo(GenderModel, { foreignKey: 'GenderId', as: "Gender" });
GenderModel.hasMany(ClientModel, { foreignKey: 'GenderId', as: "Client" });



//Define associations between auth and ClientModel 
AuthModel.hasOne(ClientModel, { foreignKey: 'ClientId', as: "Client" });
ClientModel.belongsTo(AuthModel, { foreignKey: 'ClientId', as: "Auth" });

//#region  Trainer Associations
//define association trainer and TypeModel
TrainerModel.belongsTo(TypeModel, { foreignKey: 'TypeId' });
TypeModel.hasMany(TrainerModel, { foreignKey: 'TypeId' });

//Define associations between auth and trainer 
AuthModel.belongsTo(TrainerModel, { foreignKey: 'TrainerId', as: "Trainer" });
TrainerModel.hasOne(AuthModel, { foreignKey: 'TrainerId', as: "Auth" });

//Define associations between trainer and gender
TrainerModel.belongsTo(GenderModel, { foreignKey: 'GenderId', as: "Gender" });
GenderModel.hasMany(TrainerModel, { foreignKey: 'GenderId', as: "Trainer" })

//Define associations between trainer and UserNationalCertificate
TrainerModel.belongsTo(UserNationalCertificateModel, { foreignKey: 'NationalCertificateId', as: "UserNationalCertificates" });
UserNationalCertificateModel.hasOne(TrainerModel, { foreignKey: 'NationalCertificateId', as: "Trainer" });

//#endregion


//Define association between trainer , ClientModel , certificate , TypeModel towards usercertificate
// TypeModel.hasMany(UserCertificateModel, { foreignKey: 'typeId' });
// UserCertificateModel.belongsTo(TypeModel, { foreignKey: 'typeId' });

CertificateModel.hasMany(UserCertificateModel, { foreignKey: 'certificateId', as: "UserCertificates" });
UserCertificateModel.belongsTo(CertificateModel, { foreignKey: 'certificateId', as: "Certificates" });

// ClientModel.hasMany(UserCertificateModel, { foreignKey: 'clientId' });
// UserCertificateModel.belongsTo(ClientModel, { foreignKey: 'clientId' });

TrainerModel.hasMany(UserCertificateModel, { foreignKey: 'trainerId', as: "UserCertificates" });
UserCertificateModel.belongsTo(TrainerModel, { foreignKey: 'trainerId', as: "Trainer" });

//Define association between language, trainer towards userlanguage 
LanguageModel.hasMany(UserLanguageModel, { foreignKey: 'LanguageId', as: "UserLanguages" })
UserLanguageModel.belongsTo(LanguageModel, { foreignKey: 'LanguageId', as: "Languages" });

TrainerModel.hasMany(UserLanguageModel, { foreignKey: 'TrainerId', as: "UserLanguages" });
UserLanguageModel.belongsTo(TrainerModel, { foreignKey: 'TrainerId', as: "Trainer" });

ClientModel.hasMany(UserLanguageModel, { foreignKey: 'ClientId' });
UserLanguageModel.belongsTo(ClientModel, { foreignKey: 'ClientId' });


//Define Specialization between UserSpecialization
SpecializationModel.hasMany(UserSpecializationModel, { foreignKey: 'SpecializationId', as: "UserSpecialization" });
UserSpecializationModel.belongsTo(SpecializationModel, { foreignKey: 'SpecializationId', as: "Specializations" });


//Define assiciation  Trainer towards TranierSpecialization Table
TrainerModel.hasMany(UserSpecializationModel, { foreignKey: 'TrainerId', as: "UserSpecialization" });
UserSpecializationModel.belongsTo(TrainerModel, { foreignKey: 'TrainerId', as: "Trainer" });


//Define association  personalTrainingServices towards TrainerPersonalTrainServices Table

PersonalTrainingServicesModel.hasMany(UserPersonalTrainingServicesModel, { foreignKey: 'PersonalTrainingServiceId', as: 'UserPersonalTrainingServices' });
UserPersonalTrainingServicesModel.belongsTo(PersonalTrainingServicesModel, { foreignKey: 'PersonalTrainingServiceId', as: 'PersonalTrainingService' });

//Define assoc between trainer and userperosnaltrainingservice
TrainerModel.hasMany(UserPersonalTrainingServicesModel, { foreignKey: 'TrainerId', as: "UserPersonalTrainingServices" });
UserPersonalTrainingServicesModel.belongsTo(TrainerModel, { foreignKey: 'TrainerId', as: "Trainer" });


//Define association between client and  specialization , client and UserPersonalTrainingServices

ClientModel.hasMany(UserSpecializationModel, { foreignKey: 'ClientId', as: "UserSpecialization" });
UserSpecializationModel.belongsTo(ClientModel, { foreignKey: 'ClientId', as: "Client" });

ClientModel.hasMany(UserPersonalTrainingServicesModel, { foreignKey: 'ClientId', as: "UserPersonalTrainingServices" });
UserPersonalTrainingServicesModel.belongsTo(ClientModel, { foreignKey: 'ClientId', as: "Client" });




//Define association between Trainer and SocialLinks

TrainerModel.hasMany(SocialLinkModel, { foreignKey: "TrainerId", as: "SocialLinks" });
SocialLinkModel.belongsTo(TrainerModel, { foreignKey: "TrainerId", as: "Trainer" });


//Define association between Trainer and TrainerMedia
TrainerModel.hasMany(TrainerMediaModel, { foreignKey: "TrainerId", as: "TrainerMedia" });
TrainerMediaModel.belongsTo(TrainerModel, { foreignKey: "TrainerId", as: "Trainer" });

//Define association between Review , Trainer, Client
TrainerModel.hasMany(ReviewModel, { foreignKey: "TrainerId", as: "Review" });
ReviewModel.belongsTo(TrainerModel, { foreignKey: "TrainerId", as: "Trainer" });

ClientModel.hasMany(ReviewModel, { foreignKey: "ClientId", as: "Review" });
ReviewModel.belongsTo(ClientModel, { foreignKey: "ClientId", as: "Client" });

//Define association between Session, to Trainer, Client , Type

ActivitesModel.hasMany(SessionModel, { foreignKey: "activityId", as: "Sessions" });
SessionModel.belongsTo(ActivitesModel, { foreignKey: "activityId", as: "Activity" });

TrainerModel.hasMany(SessionModel, { foreignKey: "TrainerId", as: "Sessions" });
SessionModel.belongsTo(TrainerModel, { foreignKey: "TrainerId", as: "Trainer" });

ClientModel.hasMany(SessionModel, { foreignKey: "ClientId", as: "Sessions" });
SessionModel.belongsTo(ClientModel, { foreignKey: "ClientId", as: "Client" });

TypeModel.hasMany(SessionModel, { foreignKey: "TypeId", as: "Sessions" });
SessionModel.belongsTo(TypeModel, { foreignKey: "TypeId", as: "Type" });

//Define association  between SessionParticipant to Session , CLient 

SessionModel.hasMany(SessionParticipantModel, { foreignKey: "SessionId", as: "SessionParticipant" });
SessionParticipantModel.belongsTo(SessionModel, { foreignKey: "SessionId", as: "Sessions" });

ClientModel.hasMany(SessionParticipantModel, { foreignKey: "ClientId", as: "SessionParticipant" });
SessionParticipantModel.belongsTo(ClientModel, { foreignKey: "ClientId", as: "Client" })

export {
    AuthModel,
    CertificateModel,
    ClientModel,
    GenderModel,
    TrainerModel,
    TypeModel,
    UserCertificateModel,
    UserNationalCertificateModel,
    UserLanguageModel,
    LanguageModel,
    SpecializationModel,
    UserSpecializationModel,
    PersonalTrainingServicesModel,
    UserPersonalTrainingServicesModel,
    SocialLinkModel,
    TrainerMediaModel,
    ReviewModel,
    ActivitesModel,
    SessionModel,
    SessionParticipantModel
};