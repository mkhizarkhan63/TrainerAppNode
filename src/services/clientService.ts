import ClientModel from "../models/ClientModel";

export const getClientById = async (Id: number): Promise<ClientModel | null> => {

    try {
        const client = await ClientModel.findOne({ where: { Id: Id } });
        return client;

    } catch (error: any) {
        throw new Error(error);
    }

}