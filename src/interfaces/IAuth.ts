export interface IAuthAttributes {
    Id?: number;
    EmailAddress: string;
    Password: string;
    TypeId: number;
    ClientId: number | null;
    TrainerId: number | null;
    CreatedOn?: Date;
    UpdatedOn?: Date;
    OTP: string;
    OTPExpires: Date;
    IsVerified: boolean;
}

// "data": {
//     "Id": 48,
//     "EmailAddress": "babar22@yopmail.com",
//     "TypeId": 2,
//     "ClientId": 11,
//     "TrainerId": null,
//     "OTP": "248616",
//     "OTPExpires": "2024-11-12T17:00:31.000Z",
//     "IsVerified": true,
//     "createdAt": "2024-10-31T17:51:38.000Z",
//     "updatedAt": "2024-11-12T16:55:35.000Z"
// }

export interface ILoginResponse {
    Id: number,
    FirstName?: string,
    LastName?: string,
    ProfileImage?: string,
    EmailAddress: string,
    TypeId: number,
    ClientId: number,
    TrainerId: number,
    OTP: string,
    OTPExpires: Date,
    IsVerified: boolean,

}