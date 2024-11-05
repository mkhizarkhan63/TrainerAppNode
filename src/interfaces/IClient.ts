

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
}

export interface IClientDTO {
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
}