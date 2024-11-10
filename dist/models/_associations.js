"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivitesModel = exports.ReviewModel = exports.TrainerMediaModel = exports.SocialLinkModel = exports.UserPersonalTrainingServicesModel = exports.PersonalTrainingServicesModel = exports.UserSpecializationModel = exports.SpecializationModel = exports.LanguageModel = exports.UserLanguageModel = exports.UserNationalCertificateModel = exports.UserCertificateModel = exports.TypeModel = exports.TrainerModel = exports.GenderModel = exports.ClientModel = exports.CertificateModel = exports.AuthModel = void 0;
const AuthModel_1 = __importDefault(require("./AuthModel"));
exports.AuthModel = AuthModel_1.default;
const CertificateModel_1 = __importDefault(require("./CertificateModel"));
exports.CertificateModel = CertificateModel_1.default;
const ClientModel_1 = __importDefault(require("./ClientModel"));
exports.ClientModel = ClientModel_1.default;
const GenderModel_1 = __importDefault(require("./GenderModel"));
exports.GenderModel = GenderModel_1.default;
const LanguageModel_1 = __importDefault(require("./LanguageModel"));
exports.LanguageModel = LanguageModel_1.default;
const PersonalTrainingServicesModel_1 = __importDefault(require("./PersonalTrainingServicesModel"));
exports.PersonalTrainingServicesModel = PersonalTrainingServicesModel_1.default;
const SpecializationModel_1 = __importDefault(require("./SpecializationModel"));
exports.SpecializationModel = SpecializationModel_1.default;
const TrainerModel_1 = __importDefault(require("./TrainerModel"));
exports.TrainerModel = TrainerModel_1.default;
const UserPersonalTrainingServicesModel_1 = __importDefault(require("./UserPersonalTrainingServicesModel"));
exports.UserPersonalTrainingServicesModel = UserPersonalTrainingServicesModel_1.default;
const UserSpecializationModel_1 = __importDefault(require("./UserSpecializationModel"));
exports.UserSpecializationModel = UserSpecializationModel_1.default;
const TypeModel_1 = __importDefault(require("./TypeModel"));
exports.TypeModel = TypeModel_1.default;
const UserCertificateModel_1 = __importDefault(require("./UserCertificateModel"));
exports.UserCertificateModel = UserCertificateModel_1.default;
const UserLanguagesModel_1 = __importDefault(require("./UserLanguagesModel"));
exports.UserLanguageModel = UserLanguagesModel_1.default;
const UserNationalCertificateModel_1 = __importDefault(require("./UserNationalCertificateModel"));
exports.UserNationalCertificateModel = UserNationalCertificateModel_1.default;
const SocialLinksModel_1 = __importDefault(require("./SocialLinksModel"));
exports.SocialLinkModel = SocialLinksModel_1.default;
const TranierMediaModel_1 = __importDefault(require("./TranierMediaModel"));
exports.TrainerMediaModel = TranierMediaModel_1.default;
const ReviewsModel_1 = __importDefault(require("./ReviewsModel"));
exports.ReviewModel = ReviewsModel_1.default;
const ActivitiesModel_1 = __importDefault(require("./ActivitiesModel"));
exports.ActivitesModel = ActivitiesModel_1.default;
// Define associations between TypeModel and auth
TypeModel_1.default.hasMany(AuthModel_1.default, { foreignKey: 'TypeId' });
AuthModel_1.default.belongsTo(TypeModel_1.default, { foreignKey: 'TypeId' });
// Define associations between ClientModel, auth , TypeModel
ClientModel_1.default.belongsTo(TypeModel_1.default, { foreignKey: 'TypeId' });
TypeModel_1.default.hasMany(ClientModel_1.default, { foreignKey: 'TypeId' });
ClientModel_1.default.belongsTo(GenderModel_1.default, { foreignKey: 'GenderId' });
GenderModel_1.default.hasMany(ClientModel_1.default, { foreignKey: 'GenderId' });
//Define associations between auth and ClientModel 
AuthModel_1.default.hasOne(ClientModel_1.default, { foreignKey: 'ClientId' });
ClientModel_1.default.belongsTo(AuthModel_1.default, { foreignKey: 'ClientId' });
//#region  Trainer Associations
//define association trainer and TypeModel
TrainerModel_1.default.belongsTo(TypeModel_1.default, { foreignKey: 'TypeId' });
TypeModel_1.default.hasMany(TrainerModel_1.default, { foreignKey: 'TypeId' });
//Define associations between auth and trainer 
AuthModel_1.default.belongsTo(TrainerModel_1.default, { foreignKey: 'TrainerId', as: "Trainer" });
TrainerModel_1.default.hasOne(AuthModel_1.default, { foreignKey: 'TrainerId', as: "Auth" });
//Define associations between trainer and gender
TrainerModel_1.default.belongsTo(GenderModel_1.default, { foreignKey: 'GenderId', as: "Gender" });
GenderModel_1.default.hasMany(TrainerModel_1.default, { foreignKey: 'GenderId', as: "Trainer" });
//Define associations between trainer and UserNationalCertificate
TrainerModel_1.default.belongsTo(UserNationalCertificateModel_1.default, { foreignKey: 'NationalCertificateId', as: "UserNationalCertificates" });
UserNationalCertificateModel_1.default.hasOne(TrainerModel_1.default, { foreignKey: 'NationalCertificateId', as: "Trainer" });
//#endregion
//Define association between trainer , ClientModel , certificate , TypeModel towards usercertificate
// TypeModel.hasMany(UserCertificateModel, { foreignKey: 'typeId' });
// UserCertificateModel.belongsTo(TypeModel, { foreignKey: 'typeId' });
CertificateModel_1.default.hasMany(UserCertificateModel_1.default, { foreignKey: 'certificateId', as: "UserCertificates" });
UserCertificateModel_1.default.belongsTo(CertificateModel_1.default, { foreignKey: 'certificateId', as: "Certificates" });
// ClientModel.hasMany(UserCertificateModel, { foreignKey: 'clientId' });
// UserCertificateModel.belongsTo(ClientModel, { foreignKey: 'clientId' });
TrainerModel_1.default.hasMany(UserCertificateModel_1.default, { foreignKey: 'trainerId', as: "UserCertificates" });
UserCertificateModel_1.default.belongsTo(TrainerModel_1.default, { foreignKey: 'trainerId', as: "Trainer" });
//Define association between language, trainer towards userlanguage 
LanguageModel_1.default.hasMany(UserLanguagesModel_1.default, { foreignKey: 'LanguageId', as: "UserLanguages" });
UserLanguagesModel_1.default.belongsTo(LanguageModel_1.default, { foreignKey: 'LanguageId', as: "Languages" });
TrainerModel_1.default.hasMany(UserLanguagesModel_1.default, { foreignKey: 'TrainerId', as: "UserLanguages" });
UserLanguagesModel_1.default.belongsTo(TrainerModel_1.default, { foreignKey: 'TrainerId', as: "Trainer" });
ClientModel_1.default.hasMany(UserLanguagesModel_1.default, { foreignKey: 'ClientId' });
UserLanguagesModel_1.default.belongsTo(ClientModel_1.default, { foreignKey: 'ClientId' });
//Define assiciation between Specialization and Trainer towards TranierSpecialization Table
SpecializationModel_1.default.hasMany(UserSpecializationModel_1.default, { foreignKey: 'SpecializationId', as: "UserSpecialization" });
UserSpecializationModel_1.default.belongsTo(SpecializationModel_1.default, { foreignKey: 'SpecializationId', as: "Specializations" });
TrainerModel_1.default.hasMany(UserSpecializationModel_1.default, { foreignKey: 'TrainerId', as: "UserSpecialization" });
UserSpecializationModel_1.default.belongsTo(TrainerModel_1.default, { foreignKey: 'TrainerId', as: "Trainer" });
//Define association between Trainer and personalTrainingServices towards TrainerPersonalTrainServices Table
PersonalTrainingServicesModel_1.default.hasMany(UserPersonalTrainingServicesModel_1.default, { foreignKey: 'PersonalTrainingServiceId', as: 'UserPersonalTrainingServices' });
UserPersonalTrainingServicesModel_1.default.belongsTo(PersonalTrainingServicesModel_1.default, { foreignKey: 'PersonalTrainingServiceId', as: 'PersonalTrainingService' });
TrainerModel_1.default.hasMany(UserPersonalTrainingServicesModel_1.default, { foreignKey: 'TrainerId', as: "UserPersonalTrainingServices" });
UserPersonalTrainingServicesModel_1.default.belongsTo(TrainerModel_1.default, { foreignKey: 'TrainerId', as: "Trainer" });
//Define association between Trainer and SocialLinks
TrainerModel_1.default.hasMany(SocialLinksModel_1.default, { foreignKey: "TrainerId", as: "SocialLinks" });
SocialLinksModel_1.default.belongsTo(TrainerModel_1.default, { foreignKey: "TrainerId", as: "Trainer" });
//Define association between Trainer and TrainerMedia
TrainerModel_1.default.hasMany(TranierMediaModel_1.default, { foreignKey: "TrainerId", as: "TrainerMedia" });
TranierMediaModel_1.default.belongsTo(TrainerModel_1.default, { foreignKey: "TrainerId", as: "Trainer" });
//Define association between Review , Trainer, Client
TrainerModel_1.default.hasMany(ReviewsModel_1.default, { foreignKey: "TrainerId", as: "Review" });
ReviewsModel_1.default.belongsTo(TrainerModel_1.default, { foreignKey: "TrainerId", as: "Trainer" });
ClientModel_1.default.hasMany(ReviewsModel_1.default, { foreignKey: "ClientId", as: "Review" });
ReviewsModel_1.default.belongsTo(ClientModel_1.default, { foreignKey: "ClientId", as: "Client" });
