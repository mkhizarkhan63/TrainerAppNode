

export interface ITrainerAttributes {
    Id?: number,
    FirstName: string,
    LastName: string,
    MobileNumber: string,
    location: string,
    DoB: string,
    Nationality: string,
    CountryResidence: string,
    Description?: string,
    GenderId: number,
    TypeId: number,
    NationalCertificateId?: number,
    ProfileImage?: string

}


export interface ITrainerRegistrationDTO {
    FirstName: string,
    LastName: string,
    MobileNumber: string
    DoB: string,
    Nationality: string,
    CountryResidence: string,
    location: string,
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
    MobileNumber: string,
    location?: string,
    DoB: string,
    Nationality: string,
    CountryResidence: string,
    Description: string,
    GenderId?: number,
    TypeId?: number,
    ProfileImage?: string
}


