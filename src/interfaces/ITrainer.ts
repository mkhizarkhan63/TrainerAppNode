

export interface ITrainerAttributes {
    Id?: number,
    FirstName: string,
    LastName: string,
    MobileNumber: string,
    DoB: string,
    Nationality: string,
    CountryResidence: string,
    Description?: string,
    GenderId: number,
    TypeId: number,
    NationalCertificateId?: number,

}


// // Extend the interface to include associations
// export interface ITrainerWithServices extends ITrainerAttributes {
//     UserPersonalTrainingServices?: UserPersonalTrainingServicesModel[]
// }



export interface ITrainerResponseDTO {
    FirstName: string,
    LastName: string,
    MobileNumber: string
    DoB: string,
    Nationality: string,
    CountryResidence: string,
    EmailAddress: string,
    Password: string,
    GenderId: number,
    TypeId: number,
    Description?: string,
    NationalCertificateId?: number,
    LanguagesIds: number[]
}

export interface ITrainerRequestDTO {
    FirstName: string,
    LastName: string,
    MobileNumber: string
    DoB: string,
    Nationality: string,
    CountryResidence: string,
    Description: string,
    GenderId?: number,
    TypeId?: number
}


