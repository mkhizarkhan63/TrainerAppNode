import { GenderModel, SocialLinkModel } from "../models/_associations"
import CertificateModel from "../models/CertificateModel"
import LanguageModel from "../models/LanguageModel"
import PersonalTrainingServicesModel from "../models/PersonalTrainingServicesModel"
import SpecializationModel from "../models/SpecializationModel"
import UserNationalCertificateModel from "../models/UserNationalCertificateModel"

export interface ITrainerProfile {
    Id: number,
    FirstName: string,
    LastName: string,
    MobileNumber: string
    DoB: string,
    Nationality: string,
    CountryResidence: string,
    Gender: string,
    Description: string,
    TypeId: number,
    PersonalTrainingservices: PersonalTrainingServicesModel[],
    Specializations: SpecializationModel[],
    Languages: LanguageModel[],
    Certificates: CertificateModel[],
    NationalCertificate: string,
    NationalCertificateId: number,
    SocialLinks: SocialLinkModel[]
}


export interface ITrainerProfileCreate {
    Id: number,
    FirstName: string,
    LastName: string,
    MobileNumber: string
    DoB: string,
    Nationality: string,
    CountryResidence: string,
    GenderId: number,
    Description: string,
    TypeId: number,
    PersonalTrainingservices: number[],
    Specializations: number[],
    Languages: number[],
    SocialLinks: string[]
}