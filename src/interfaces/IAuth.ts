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
    IsVerified : boolean;
}