import AuthModel from "../models/AuthModel";

export const userByEmailExists = async (_emailaddress: string): Promise<AuthModel | null> => {
    //Email should be unique
    const existingAuth = await AuthModel.findOne({
        where: { EmailAddress: _emailaddress }
    });
    return existingAuth;
}