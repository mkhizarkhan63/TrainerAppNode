

export interface IClientAttributes {
    Id?: number,
    FirstName: string,
    LastName: string,
    MobileNumber: string
    DoB: string,
    Nationality: string,
    CountryResidence: string
    GenderId: number,
    TypeId: number,
    location: string,
    ProfileImage?: string,
}

export interface IClientDTO {
    FirstName: string,
    LastName: string,
    MobileNumber: string
    DoB: string,
    location: string,
    Nationality: string,
    CountryResidence: string,
    EmailAddress: string,
    Password: string,
    GenderId: number,
    TypeId: number,
}


export interface IClientRequestDTO {
    Id?: number,
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
