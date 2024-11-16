import { IClientRequestDTO } from "../interfaces/IClient";
import ClientModel from "../models/ClientModel";

export const getClientByIdQuery = async (Id: number): Promise<ClientModel | null> => {

    try {
        const client = await ClientModel.findOne({ where: { Id: Id } });
        return client;

    } catch (error: any) {
        throw new Error(error);
    }

}


export const getAllClientsQuery = async (): Promise<ClientModel[]> => {
    try {
        const trainer = await ClientModel.findAll();
        return trainer;

    } catch (error) {
        throw error;
    }
}


export const updateClientById = async (_profile: IClientRequestDTO, clientId: number) => {
    try {
        if (_profile.ProfileImage) {
            const obj = await ClientModel.update(
                {
                    FirstName: _profile.FirstName,
                    LastName: _profile.LastName,
                    MobileNumber: _profile.MobileNumber,
                    DoB: _profile.DoB,
                    location: _profile.location,
                    CountryResidence: _profile.CountryResidence,
                    Nationality: _profile.Nationality,
                    GenderId: _profile.GenderId,
                    ProfileImage: _profile.ProfileImage
                },
                {
                    where: {
                        Id: clientId,
                    },
                },
            );

            if (obj[0] > 0)
                return true;
            else
                return false;
        }
        else {
            const obj = await ClientModel.update(
                {
                    FirstName: _profile.FirstName,
                    LastName: _profile.LastName,
                    MobileNumber: _profile.MobileNumber,
                    DoB: _profile.DoB,
                    location: _profile.location,
                    CountryResidence: _profile.CountryResidence,
                    Nationality: _profile.Nationality,
                    GenderId: _profile.GenderId,
                },
                {
                    where: {
                        Id: clientId,
                    },
                },
            );

            if (obj[0] > 0)
                return true;
            else
                return false;
        }

    } catch (error) {
        throw error;
    }
}
