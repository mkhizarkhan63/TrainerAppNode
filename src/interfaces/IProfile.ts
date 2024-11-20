import { GenderModel, SocialLinkModel } from "../models/_associations"
import CertificateModel from "../models/CertificateModel"
import LanguageModel from "../models/LanguageModel"
import PersonalTrainingServicesModel from "../models/PersonalTrainingServicesModel"
import SpecializationModel from "../models/SpecializationModel"
import UserNationalCertificateModel from "../models/UserNationalCertificateModel"


//#region Get Profile DTOs For Trainer and Client
export interface ITrainerProfile {
    Id: number,
    EmailAddress: string,
    FirstName: string,
    LastName: string,
    MobileNumber: string
    DoB: string,
    ProfileImage: string,
    Nationality: string,
    CountryResidence: string,
    Location: string,
    Gender: GenderModel,
    Description: string,
    TypeId: number,
    PersonalTrainingservices: PersonalTrainingServicesModel[],
    Specializations: SpecializationModel[],
    Languages: LanguageModel[],
    Certificates: CertificateModel[],
    NationalCertificate: UserNationalCertificateModel,
    SocialLinks: SocialLinkModel[],
}

export interface IClientProfile {
    Id: number,
    EmailAddress: string,
    FirstName: string,
    LastName: string,
    MobileNumber: string
    DoB: string,
    Nationality: string,
    CountryResidence: string,
    Gender: GenderModel,
    Location: string,
    // Description: string,
    TypeId: number,
    PersonalTrainingservices: PersonalTrainingServicesModel[],
    Specializations: SpecializationModel[],
}

//#endregion


//#region Create Profile DTOs For Trainer and Client

export interface ITrainerProfileDTO {
    Id: number,
    FirstName: string,
    LastName: string,
    MobileNumber: string
    DoB: string,
    Nationality: string,
    CountryResidence: string,
    location: string,
    GenderId: number,
    Description: string,
    TypeId: number,
    PersonalTrainingservices: string,
    Specializations: string,
    Languages: string,
    SocialLinks: string,
    profilePicture?: string,
}


export interface IClientProfileDTO {
    Id: number,
    FirstName: string,
    LastName: string,
    MobileNumber: string
    DoB: string,
    Nationality: string,
    CountryResidence: string,
    location: string,
    GenderId: number,
    Description: string,
    TypeId: number,
    PersonalTrainingservices: string,
    Specializations: string,
    // Languages: string,
    // SocialLinks: string,
    profilePicture?: string,
}

//#endregion